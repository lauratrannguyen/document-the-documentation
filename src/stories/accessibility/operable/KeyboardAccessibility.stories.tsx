import React, { useState, useRef, useEffect } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

interface KeyboardAccessibilityProps {
  enableShortcuts: boolean;
  showTooltips: boolean;
  showAccessibleForm: boolean;
}

interface FormData {
  name: string;
  email: string;
}

const KeyboardAccessibilityDemo = ({
  enableShortcuts,
  showTooltips,
  showAccessibleForm,
}: KeyboardAccessibilityProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [showShortcutInfo, setShowShortcutInfo] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus the close button when dialog opens
  useEffect(() => {
    if (dialogOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [dialogOpen]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (!enableShortcuts) return;

    // Implement keyboard shortcuts
    if (event.altKey) {
      switch (event.key) {
        case 'n':
          event.preventDefault();
          setDialogOpen(true);
          break;
        case 'h':
          event.preventDefault();
          setShowShortcutInfo(true);
          break;
        case 'c':
          event.preventDefault();
          setDialogOpen(false);
          setShowShortcutInfo(false);
          break;
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
    setFormData({ name: '', email: '' });
  };

  const items = [
    { id: 1, title: 'Task 1', description: 'Complete documentation' },
    { id: 2, title: 'Task 2', description: 'Review pull request' },
    { id: 3, title: 'Task 3', description: 'Update dependencies' },
  ];

  return (
    <Paper 
      elevation={3} 
      sx={{ p: 3, maxWidth: 800 }}
      onKeyDown={handleKeyPress}
      tabIndex={-1}
    >
      <Stack spacing={4}>
        <Typography variant="h4" component="h1" sx={{ 
          fontSize: { xs: '1.5rem', sm: '2rem' },
          lineHeight: 1.2,
          fontWeight: 500
        }} gutterBottom>
          Keyboard Accessibility Demo
        </Typography>

        {/* Keyboard Controls Info */}
        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Keyboard Controls
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <InfoIcon color="info" />
            <Typography variant="body2">
              All functionality is available using keyboard only. 
              {enableShortcuts && ' Press Alt+H to view keyboard shortcuts.'}
            </Typography>
          </Stack>
        </Paper>

        {/* Accessible Form Section */}
        {showAccessibleForm && (
          <Box component="form" onSubmit={handleFormSubmit} sx={{ width: '100%' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Keyboard Accessible Form
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
                required
                inputProps={{
                  'aria-label': 'Name field',
                }}
              />
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                fullWidth
                required
                inputProps={{
                  'aria-label': 'Email field',
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit Form
              </Button>
            </Stack>
          </Box>
        )}

        {/* Main Content */}
        <Typography variant="h6" component="h2" gutterBottom>
          Task List
        </Typography>
        <List>
          {items.map((item) => (
            <ListItem
              key={item.id}
              disablePadding
              secondaryAction={
                <Stack direction="row" spacing={1}>
                  <Tooltip 
                    title={showTooltips ? "Edit item (Enter)" : ""}
                    arrow
                  >
                    <IconButton
                      edge="end"
                      aria-label={`Edit ${item.title}`}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title={showTooltips ? "Delete item (Delete)" : ""}
                    arrow
                  >
                    <IconButton
                      edge="end"
                      aria-label={`Delete ${item.title}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            >
              <ListItemButton
                selected={selectedItem === item.id}
                onClick={() => setSelectedItem(item.id)}
                divider
                sx={{
                  '&:focus-within': {
                    bgcolor: 'action.selected',
                  },
                }}
              >
                <ListItemText
                  primary={item.title}
                  secondary={item.description}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Stack direction="row" spacing={2}>
          <Tooltip
            title={showTooltips ? "Add new item (Alt+N)" : ""}
            arrow
          >
            <Button
              variant="contained"
              onClick={() => setDialogOpen(true)}
            >
              Add New Item
            </Button>
          </Tooltip>
          <Button
            variant="outlined"
            onClick={() => setShowShortcutInfo(true)}
          >
            View Keyboard Shortcuts
          </Button>
        </Stack>

        {/* Add/Edit Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">
            <Typography variant="h2" component="h2">
              Add New Item
            </Typography>
            <IconButton
              ref={closeButtonRef}
              aria-label="close"
              onClick={() => setDialogOpen(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                autoFocus
                label="Title"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                variant="outlined"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Keyboard Shortcuts Info Dialog */}
        <Dialog
          open={showShortcutInfo}
          onClose={() => setShowShortcutInfo(false)}
          aria-labelledby="shortcuts-dialog-title"
        >
          <DialogTitle id="shortcuts-dialog-title">
            <Typography variant="h2" component="h2">
              Keyboard Shortcuts
            </Typography>
            <IconButton
              aria-label="close"
              onClick={() => setShowShortcutInfo(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <List>
              <ListItem>
                <ListItemText
                  primary="Alt + N"
                  secondary="Open new item dialog"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Alt + H"
                  secondary="Show keyboard shortcuts"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Alt + C"
                  secondary="Close current dialog"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Tab"
                  secondary="Navigate between interactive elements"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Space/Enter"
                  secondary="Activate buttons and controls"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Escape"
                  secondary="Close dialogs or cancel actions"
                />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowShortcutInfo(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="h2" component="h2" gutterBottom>
            WCAG Guidelines
          </Typography>
          <Typography variant="body2">
            This demo implements WCAG 2.1 Keyboard Accessible guidelines:
            <ul>
              <li>2.1.1 Keyboard - All functionality available from keyboard</li>
              <li>2.1.2 No Keyboard Trap - Focus can be moved away from any component</li>
              <li>2.1.3 Keyboard (No Exception) - All functionality available without timing requirements</li>
              <li>2.1.4 Character Key Shortcuts - Shortcuts can be disabled or remapped</li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/Operable/KeyboardAccessibility',
  component: KeyboardAccessibilityDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 2.1 Keyboard Accessible - Make all functionality available from a keyboard.'
      }
    }
  }
};

const Template: StoryFn<typeof KeyboardAccessibilityDemo> = (args) => <KeyboardAccessibilityDemo {...args} />;

export const BasicForm = Template.bind({});
BasicForm.args = {
  enableShortcuts: false,
  showTooltips: false,
  showAccessibleForm: true,
};

export const BasicKeyboard = Template.bind({});
BasicKeyboard.args = {
  enableShortcuts: false,
  showTooltips: true,
  showAccessibleForm: false,
};

export const AdvancedKeyboard = Template.bind({});
AdvancedKeyboard.args = {
  enableShortcuts: true,
  showTooltips: true,
  showAccessibleForm: false,
};

export const CompleteExample = Template.bind({});
CompleteExample.args = {
  enableShortcuts: true,
  showTooltips: true,
  showAccessibleForm: true,
}; 