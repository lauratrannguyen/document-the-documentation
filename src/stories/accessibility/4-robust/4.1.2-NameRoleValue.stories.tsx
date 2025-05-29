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
        component: 'WCAG 4.1.2 Name, Role, Value - For all user interface components, the name and role can be programmatically determined; states, properties, and values can be programmatically set; and notification of changes is available to user agents, including assistive technologies.'
      }
    }
  }
};

const Template: StoryFn<typeof NameRoleValueDemo> = (args) => <NameRoleValueDemo {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  showValidation: false,
};

export const WithValidation = Template.bind({});
WithValidation.args = {
  showValidation: true,
};
WithValidation.parameters = {
  docs: {
    description: {
      story: 'Shows detailed validation feedback for each example, including error messages and suggested fixes for common ARIA implementation issues.'
    }
  }
}; 