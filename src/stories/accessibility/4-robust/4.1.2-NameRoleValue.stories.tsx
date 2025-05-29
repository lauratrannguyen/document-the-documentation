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
  Alert,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import MenuIcon from '@mui/icons-material/Menu';

interface NameRoleValueProps {
  showValidation: boolean;
}

const NameRoleValueDemo = ({
  showValidation,
}: NameRoleValueProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showLiveValidation, setShowLiveValidation] = useState(showValidation);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Common edge cases in ARIA usage
  const edgeCases = [
    {
      title: 'Custom Button States',
      valid: `<button
  aria-pressed="false"
  aria-expanded="false"
  aria-controls="menu-1">
  Toggle Menu
</button>`,
      invalid: `<div 
  onclick="toggleMenu()"
  role="button">
  Toggle Menu
</div>`,
      error: 'Missing proper button semantics and state information',
      fix: 'Use native button element with proper ARIA states'
    },
    {
      title: 'Dynamic Content Updates',
      valid: `<div 
  role="alert" 
  aria-live="assertive">
  Error: Form submission failed
</div>`,
      invalid: `<div class="error-message">
  Error: Form submission failed
</div>`,
      error: 'Changes not announced to screen readers',
      fix: 'Use appropriate live region roles and aria-live attributes'
    },
    {
      title: 'Form Labels and Descriptions',
      valid: `<label for="password">Password</label>
<input 
  id="password"
  type="password"
  aria-describedby="pwd-hint">
<div id="pwd-hint">
  Must be 8+ characters
</div>`,
      invalid: `<input 
  type="password" 
  placeholder="Password">
<span class="hint">
  Must be 8+ characters
</span>`,
      error: 'Missing proper label and description associations',
      fix: 'Use explicit labels and aria-describedby for hints'
    }
  ];

  // Interactive examples demonstrating proper ARIA usage
  const InteractiveExamples = () => {
    return (
      <Stack spacing={3}>
        {/* Menu Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Menu Button Example
            </Typography>
            <Box>
              <Button
                aria-controls={Boolean(anchorEl) ? 'menu-example' : undefined}
                aria-expanded={Boolean(anchorEl)}
                aria-haspopup="true"
                onClick={(e) => {
                  e.preventDefault();
                  setAnchorEl(e.currentTarget);
                }}
                startIcon={<MenuIcon />}
              >
                Open Menu
              </Button>
              <Menu
                id="menu-example"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>Option 1</MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>Option 2</MenuItem>
              </Menu>
            </Box>
            {showValidation && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  ARIA attributes used:
                  <ul>
                    <li>aria-controls: Links button to controlled menu</li>
                    <li>aria-expanded: Indicates menu state</li>
                    <li>aria-haspopup: Indicates presence of popup menu</li>
                  </ul>
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Dialog Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Dialog Example
            </Typography>
            <Box>
              <Button
                onClick={() => setDialogOpen(true)}
                aria-haspopup="dialog"
              >
                Open Dialog
              </Button>
              <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                aria-labelledby="dialog-title"
              >
                <DialogTitle id="dialog-title">
                  Confirmation
                </DialogTitle>
                <DialogContent>
                  Are you sure you want to proceed?
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button 
                    onClick={() => {
                      setDialogOpen(false);
                      setSnackbarOpen(true);
                    }}
                    autoFocus
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Action confirmed"
                role="status"
                aria-live="polite"
              />
            </Box>
            {showValidation && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  ARIA attributes used:
                  <ul>
                    <li>aria-haspopup: Indicates dialog will appear</li>
                    <li>aria-labelledby: Associates dialog with its title</li>
                    <li>role="status": Identifies status message</li>
                    <li>aria-live: Announces confirmation to screen readers</li>
                  </ul>
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>
      </Stack>
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" sx={{ 
          fontSize: { xs: '1.5rem', sm: '2rem' },
          lineHeight: 1.2,
          fontWeight: 500
        }} gutterBottom>
          Name, Role, Value Demo
        </Typography>

        <Alert severity="info">
          Proper use of ARIA attributes ensures that custom interface components are
          accessible to assistive technologies. Common issues include missing labels,
          incorrect roles, and unannounced state changes.
        </Alert>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab label="Common Edge Cases" />
            <Tab label="Interactive Examples" />
            <Tab label="Best Practices" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Stack spacing={3}>
            {edgeCases.map((example, index) => (
              <Card key={index}>
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" component="h2">
                        {example.title}
                      </Typography>
                      <Tooltip title="View validation details">
                        <IconButton
                          size="small"
                          onClick={() => setShowLiveValidation(!showLiveValidation)}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Box>
                      <Typography variant="subtitle1" component="h3" gutterBottom>
                        ✓ Valid Example:
                      </Typography>
                      <Box
                        component="pre"
                        sx={{
                          p: 2,
                          bgcolor: 'success.light',
                          borderRadius: 1,
                          overflow: 'auto',
                        }}
                      >
                        <code>{example.valid}</code>
                      </Box>
                    </Box>

                    <Box>
                      <Typography variant="subtitle1" component="h3" gutterBottom>
                        ✗ Invalid Example:
                      </Typography>
                      <Box
                        component="pre"
                        sx={{
                          p: 2,
                          bgcolor: 'error.light',
                          borderRadius: 1,
                          overflow: 'auto',
                        }}
                      >
                        <code>{example.invalid}</code>
                      </Box>
                    </Box>

                    {(showValidation || showLiveValidation) && (
                      <>
                        <Alert severity="error" icon={<ErrorIcon />}>
                          {example.error}
                        </Alert>
                        <Alert severity="success" icon={<CheckCircleIcon />}>
                          Fix: {example.fix}
                        </Alert>
                      </>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        {activeTab === 1 && <InteractiveExamples />}

        {activeTab === 2 && (
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Best Practices for Name, Role, Value
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="1. Use Native Elements When Possible"
                    secondary="Native HTML elements have built-in accessibility features"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="2. Provide Accessible Names"
                    secondary="Use labels, aria-label, or aria-labelledby for all interactive elements"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="3. Define Clear Roles"
                    secondary="Use appropriate ARIA roles when native elements aren't suitable"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="4. Manage Component States"
                    secondary="Keep ARIA states (expanded, pressed, selected) up to date"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="5. Announce Dynamic Changes"
                    secondary="Use live regions to announce important content updates"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        )}

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
            <Alert severity="warning" sx={{ mt: 2 }}>
              Remember: ARIA should be used to supplement HTML semantics, not replace them.
              Always prefer native HTML elements with built-in accessibility features.
            </Alert>
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