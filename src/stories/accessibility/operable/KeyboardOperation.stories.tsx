import React, { useState, useEffect } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';

interface KeyboardOperationProps {
  enableShortcuts: boolean;
  showTimeoutDialog: boolean;
  timeoutDuration: number;
}

const KeyboardOperation = ({
  enableShortcuts,
  showTimeoutDialog,
  timeoutDuration,
}: KeyboardOperationProps) => {
  const [shortcutsEnabled, setShortcutsEnabled] = useState(enableShortcuts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [timeoutActive, setTimeoutActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeoutDuration);

  useEffect(() => {
    let timer: number | undefined;
    if (timeoutActive && timeRemaining > 0) {
      timer = window.setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setDialogOpen(true);
      setTimeoutActive(false);
    }
    return () => window.clearInterval(timer);
  }, [timeoutActive, timeRemaining]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (shortcutsEnabled) {
      if (event.ctrlKey && event.key === 'h') {
        event.preventDefault();
        alert('Help shortcut activated (Ctrl + H)');
      } else if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        alert('Save shortcut activated (Ctrl + S)');
      }
    }
  };

  const startTimeout = () => {
    setTimeoutActive(true);
    setTimeRemaining(timeoutDuration);
  };

  const extendTimeout = () => {
    setTimeRemaining(timeoutDuration);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ p: 3, maxWidth: 800 }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <Stack spacing={4}>
        <section aria-labelledby="shortcuts-title">
          <Typography id="shortcuts-title" variant="h6" gutterBottom>
            Keyboard Shortcuts
            <Tooltip title="Keyboard shortcuts can be disabled">
              <IconButton size="small" sx={{ ml: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={shortcutsEnabled}
                onChange={(e) => setShortcutsEnabled(e.target.checked)}
              />
            }
            label="Enable keyboard shortcuts"
          />
          {shortcutsEnabled && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                Available shortcuts:
                <ul>
                  <li>Ctrl + H: Help</li>
                  <li>Ctrl + S: Save</li>
                </ul>
              </Typography>
            </Box>
          )}
        </section>

        {showTimeoutDialog && (
          <section aria-labelledby="timeout-title">
            <Typography id="timeout-title" variant="h6" gutterBottom>
              Session Timeout Example
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={startTimeout}
                disabled={timeoutActive}
              >
                Start Session
              </Button>
            </Box>
            {timeoutActive && (
              <Typography variant="body2">
                Session will timeout in {timeRemaining} seconds
                <Button
                  variant="text"
                  size="small"
                  onClick={extendTimeout}
                  sx={{ ml: 2 }}
                >
                  Extend Session
                </Button>
              </Typography>
            )}
          </section>
        )}

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          aria-labelledby="timeout-dialog-title"
        >
          <DialogTitle id="timeout-dialog-title">
            Session Timeout
            <IconButton
              aria-label="close"
              onClick={() => setDialogOpen(false)}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography>
              Your session has timed out. Would you like to continue?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setDialogOpen(false);
                startTimeout();
              }}
              autoFocus
            >
              Continue Session
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/Operable/Keyboard Operation',
  component: KeyboardOperation,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 2.1 Keyboard Operable - All functionality is available from a keyboard, with configurable shortcuts and adequate time to read and use content.'
      }
    }
  }
};

const Template: StoryFn<typeof KeyboardOperation> = (args) => (
  <KeyboardOperation {...args} />
);

export const WithShortcuts = Template.bind({});
WithShortcuts.args = {
  enableShortcuts: true,
  showTimeoutDialog: false,
  timeoutDuration: 30,
};

export const WithTimeout = Template.bind({});
WithTimeout.args = {
  enableShortcuts: true,
  showTimeoutDialog: true,
  timeoutDuration: 30,
}; 