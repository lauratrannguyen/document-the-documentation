import React, { useState } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  IconButton,
  TextField,
  Tooltip,
  FormControlLabel,
  Switch,
  Alert,
  LinearProgress,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface NameRoleValueProps {
  showARIA: boolean;
  showValidation: boolean;
}

const NameRoleValueDemo = ({
  showARIA,
  showValidation,
}: NameRoleValueProps) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(!isValid);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Name, Role, Value Demo
        </Typography>

        {/* Custom Controls Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Custom Media Controls
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  aria-pressed={isPlaying}
                >
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <Box sx={{ width: '100%' }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    aria-label="Playback progress"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress}
                  />
                </Box>
              </Stack>
            </Box>
            {showARIA && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  ARIA attributes used:
                  <ul>
                    <li>aria-label: Identifies the control's purpose</li>
                    <li>aria-pressed: Indicates toggle button state</li>
                    <li>role: Defines the element's role</li>
                    <li>aria-valuemin/max/now: Provides progress information</li>
                  </ul>
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Form Controls Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Form Controls with ARIA
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  type="email"
                  required
                  error={showError}
                  helperText={showError ? 'Please enter a valid email' : ''}
                  onChange={(e) => {
                    setIsValid(e.target.value.includes('@'));
                    setShowError(false);
                  }}
                  aria-invalid={showError}
                  aria-describedby={showError ? 'email-error' : undefined}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Switch
                    checked={isSubscribed}
                    onChange={(e) => setIsSubscribed(e.target.checked)}
                    inputProps={{
                      'aria-label': 'Subscribe to newsletter'
                    }}
                  />
                  <Typography>Subscribe to newsletter</Typography>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  aria-label="Submit form"
                >
                  Submit
                </Button>
              </Stack>
            </Box>
            {showARIA && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Form control attributes:
                  <ul>
                    <li>aria-invalid: Indicates validation state</li>
                    <li>aria-describedby: Links error messages</li>
                    <li>role="switch": Defines toggle behavior</li>
                    <li>aria-checked: Indicates switch state</li>
                  </ul>
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Status Updates Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Dynamic Status Updates
            </Typography>
            <Box
              role="status"
              aria-live="polite"
              sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                {isValid ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <ErrorIcon color="error" />
                )}
                <Typography>
                  {isValid ? 'Form is valid' : 'Form needs attention'}
                </Typography>
              </Stack>
            </Box>
            {showARIA && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Status update attributes:
                  <ul>
                    <li>role="status": Identifies status message</li>
                    <li>aria-live: Announces changes to screen readers</li>
                  </ul>
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            This demo implements WCAG 4.1.2 Name, Role, Value guidelines:
            <ul>
              <li>All interface components have proper names (labels)</li>
              <li>Roles are correctly defined for custom elements</li>
              <li>States, properties, and values are programmatically set</li>
              <li>Changes in content are notified to assistive technologies</li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/4. Robust/4.1.2 Name Role Value',
  component: NameRoleValueDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 4.1.2 Name, Role, Value - For all user interface components, the name and role can be programmatically determined; states, properties, and values can be programmatically set; and notification of changes is available to user agents, including assistive technologies.'
      }
    }
  }
};

const Template: StoryFn<typeof NameRoleValueDemo> = (args) => <NameRoleValueDemo {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  showARIA: false,
  showValidation: false,
};

export const WithARIA = Template.bind({});
WithARIA.args = {
  showARIA: true,
  showValidation: false,
};

export const WithValidation = Template.bind({});
WithValidation.args = {
  showARIA: true,
  showValidation: true,
}; 