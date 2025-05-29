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
        component: `
# WCAG 4.1.2 Name, Role, Value

This component demonstrates how to ensure user interface components are programmatically identifiable and controllable by assistive technologies.

## Key Features
- **Accessible Names**: Every interactive element has a clear, programmatic name
- **Proper Roles**: Components use appropriate ARIA roles or semantic HTML
- **State Management**: Component states are properly communicated
- **Value Updates**: Changes in values are announced to assistive tech

## Implementation Guidelines
1. **Accessible Names**
   - Use proper labels for form controls
   - Provide aria-label when needed
   - Implement descriptive text alternatives
   - Maintain clear button/link text

2. **Role Definition**
   - Use semantic HTML elements
   - Apply appropriate ARIA roles
   - Follow role hierarchy rules
   - Maintain role compatibility

3. **State Management**
   - Track component states
   - Update ARIA states
   - Announce state changes
   - Handle focus management

4. **Value Communication**
   - Update aria-valuenow
   - Maintain aria-valuemin/max
   - Provide value text
   - Handle range inputs

## Best Practices
- Use native HTML elements when possible
- Provide clear accessible names
- Maintain state consistency
- Test with screen readers
- Document ARIA usage
- Validate role implementations
- Monitor state changes

## Technical Requirements
- ARIA 1.2 compliance
- Screen reader compatibility
- Keyboard accessibility
- Focus management
- State tracking
- Event handling
`
      }
    }
  },
  argTypes: {
    showARIA: {
      control: 'boolean',
      description: 'Shows ARIA attributes and roles information',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    showValidation: {
      control: 'boolean',
      description: 'Shows validation feedback for accessibility implementation',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
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
Basic.parameters = {
  docs: {
    description: {
      story: 'Basic view showing components with proper name, role, and value implementation.'
    }
  }
};

export const WithARIA = Template.bind({});
WithARIA.args = {
  showARIA: true,
  showValidation: false,
};
WithARIA.parameters = {
  docs: {
    description: {
      story: `
Detailed view showing ARIA implementation including:
- Role assignments
- State management
- Value updates
- Focus handling
- Event announcement
      `
    }
  }
};

export const WithValidation = Template.bind({});
WithValidation.args = {
  showARIA: true,
  showValidation: true,
};
WithValidation.parameters = {
  docs: {
    description: {
      story: `
Complete view with validation feedback showing:
- Accessibility violations
- ARIA implementation details
- State management validation
- Best practices compliance
- Suggested improvements
      `
    }
  }
}; 