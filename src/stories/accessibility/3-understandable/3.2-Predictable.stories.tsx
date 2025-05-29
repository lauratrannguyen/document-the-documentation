import React, { useState } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Breadcrumbs,
  Link,
  Alert,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Snackbar,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Portal,
  Fade,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tabs,
  Tab,
  Backdrop,
  SwipeableDrawer,
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LanguageIcon from '@mui/icons-material/Language';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestoreIcon from '@mui/icons-material/Restore';
import TouchAppIcon from '@mui/icons-material/TouchApp';

interface PredictableProps {
  showConsistentNavigation: boolean;
  enableContextChanges: boolean;
  showConsistentIdentification: boolean;
  variant?: 'navigation' | 'interaction' | 'feedback';
}

const PredictableDemo = ({
  showConsistentNavigation,
  enableContextChanges,
  showConsistentIdentification,
  variant,
}: PredictableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSearchAlert, setShowSearchAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showGlobalAlert, setShowGlobalAlert] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setUserMenuAnchor(null);
  };

  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item);
    handleClose();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    
    if (newValue.length > 2) {
      setShowSearchAlert(true);
    }
  };

  const getVariantContent = () => {
    switch (variant) {
      case 'navigation':
        return (
          <Box>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Navigation Patterns
                </Typography>
                <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
                  <Step><StepLabel>Content</StepLabel></Step>
                  <Step><StepLabel>Preview</StepLabel></Step>
                  <Step><StepLabel>Publish</StepLabel></Step>
                </Stepper>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Button
                    startIcon={<KeyboardArrowLeftIcon />}
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => prev - 1)}
                  >
                    Back
                  </Button>
                  <Button
                    endIcon={<KeyboardArrowRightIcon />}
                    variant="contained"
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => {
                        setActiveStep(prev => Math.min(2, prev + 1));
                        setLoading(false);
                      }, 1000);
                    }}
                    disabled={activeStep === 2 || loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Next'}
                  </Button>
                </Stack>
                <Alert severity="info">
                  Navigation remains consistent and predictable across steps
                </Alert>
              </CardContent>
            </Card>
          </Box>
        );

      case 'interaction':
        return (
          <Box>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Interaction Patterns
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => {
                        setSettingsOpen(true);
                        setLoading(false);
                      }, 500);
                    }}
                  >
                    Open Settings
                  </Button>
                  <TextField
                    fullWidth
                    label="Search"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length > 2) {
                        setNotifications(prev => [...prev, 'Search results updating...']);
                      }
                    }}
                  />
                  <Alert severity="info">
                    Interactions provide consistent feedback and behavior
                  </Alert>
                </Stack>
              </CardContent>
            </Card>

            <Dialog
              open={settingsOpen}
              onClose={() => setSettingsOpen(false)}
              aria-labelledby="settings-dialog"
            >
              <DialogTitle id="settings-dialog">Settings</DialogTitle>
              <DialogContent>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={<Switch />}
                    label="Enable notifications"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Dark mode"
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSettingsOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={() => setSettingsOpen(false)}>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        );

      case 'feedback':
        return (
          <Box>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Feedback
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<NotificationsIcon />}
                    onClick={() => {
                      const newNotification = `Notification ${notifications.length + 1}`;
                      setNotifications(prev => [...prev, newNotification]);
                    }}
                  >
                    Trigger Notification
                  </Button>
                  {notifications.length > 0 && (
                    <List>
                      {notifications.map((notification, index) => (
                        <ListItem key={index}>
                          <ListItemIcon><InfoIcon /></ListItemIcon>
                          <ListItemText primary={notification} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  <Alert severity="info">
                    System feedback is consistent and predictable
                  </Alert>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 800 }}>
      {/* Consistent Navigation */}
      {showConsistentNavigation && (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Predictable UI Demo
            </Typography>
            <IconButton
              size="large"
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleUserMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Navigation Menu */}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem 
          onClick={() => handleMenuItemClick('home')}
          aria-current={selectedItem === 'home' ? 'page' : undefined}
        >
          Home
        </MenuItem>
        <MenuItem 
          onClick={() => handleMenuItemClick('about')}
          aria-current={selectedItem === 'about' ? 'page' : undefined}
        >
          About
        </MenuItem>
        <MenuItem 
          onClick={() => handleMenuItemClick('settings')}
          aria-current={selectedItem === 'settings' ? 'page' : undefined}
        >
          Settings
        </MenuItem>
      </Menu>

      {/* User Menu */}
      <Menu
        id="user-menu"
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={() => {
          handleClose();
          setSettingsOpen(true);
        }}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>

      {/* Main Content */}
      <Box sx={{ p: 3 }}>
        {getVariantContent()}
        
        <Stack spacing={3}>
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link underline="hover" color="inherit" href="#">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="#">
              Products
            </Link>
            <Typography color="text.primary">Details</Typography>
          </Breadcrumbs>

          {/* Search Section */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Search
              </Typography>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Search products"
                  value={searchValue}
                  onChange={handleSearch}
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Context Change Alert */}
          {showSearchAlert && (
            <Alert
              severity="info"
              onClose={() => setShowSearchAlert(false)}
            >
              Search results are being updated as you type
            </Alert>
          )}

          {/* Settings Dialog */}
          <Dialog
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            aria-labelledby="settings-dialog-title"
          >
            <DialogTitle id="settings-dialog-title">
              Settings
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ mt: 1 }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable notifications"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Dark mode"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Auto-save"
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSettingsOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={() => setSettingsOpen(false)}>
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Context Changes */}
          {enableContextChanges && (
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Context Changes
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    onClick={() => {}}
                    aria-label="Save changes and continue"
                  >
                    Save and Continue
                  </Button>
                  <Alert severity="info">
                    Context changes are initiated only by explicit user action
                  </Alert>
                </Stack>
              </CardContent>
            </Card>
          )}

          {/* Consistent Identification */}
          {showConsistentIdentification && (
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Consistent Identification
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Home"
                      secondary="Consistently identified with house icon"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="About"
                      secondary="Consistently identified with info icon"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Settings"
                      secondary="Consistently identified with gear icon"
                    />
                  </ListItem>
                </List>
                <Alert severity="info" sx={{ mt: 2 }}>
                  Icons and labels are used consistently throughout the interface
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* Help Text */}
          <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
            <Typography variant="body2">
              This demo implements WCAG 3.2 Predictable guidelines:
              <ul>
                <li>Navigation remains consistent across pages</li>
                <li>Components maintain consistent functionality</li>
                <li>Changes in context are initiated only by user request</li>
                <li>Components are identified consistently throughout</li>
              </ul>
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

const meta = {
  title: 'Accessibility/3. Understandable/3.2 Predictable',
  component: PredictableDemo,
  parameters: {
    docs: {
      description: {
        component: `
# WCAG 3.2 Predictable Behavior

This component demonstrates how to create web interfaces that appear and operate in predictable ways, following WCAG 3.2 guidelines.

## Key Features
- **Consistent Navigation**: Navigation patterns remain consistent
- **Predictable Interactions**: Components behave as expected
- **Context Changes**: Changes occur only when initiated by user
- **Component Identification**: Components are consistently identified

## Implementation Guidelines
1. **Navigation Consistency**
   - Maintain consistent navigation order
   - Use consistent menu structures
   - Keep navigation placement stable
   - Provide clear navigation paths
   - Use breadcrumbs effectively

2. **Interaction Patterns**
   - Use standard UI patterns
   - Maintain consistent behavior
   - Follow platform conventions
   - Provide clear feedback
   - Handle focus predictably

3. **Context Management**
   - Avoid unexpected changes
   - Warn before context changes
   - Maintain user control
   - Preserve user settings
   - Handle state changes gracefully

4. **Component Identification**
   - Use consistent naming
   - Maintain visual consistency
   - Apply consistent styling
   - Use standard icons
   - Provide clear labels

## Best Practices
- Keep navigation consistent
- Use standard patterns
- Avoid unexpected changes
- Maintain visual consistency
- Provide clear feedback
- Follow platform conventions
- Document interaction patterns

## Technical Requirements
- Consistent DOM structure
- Stable navigation
- Focus management
- State handling
- Event management
- Visual consistency
`
      }
    }
  },
  argTypes: {
    showConsistentNavigation: {
      description: 'Shows consistent navigation patterns across pages',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    enableContextChanges: {
      description: 'Demonstrates predictable context changes in the UI',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    showConsistentIdentification: {
      description: 'Shows consistent identification of UI components',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    variant: {
      description: 'Shows different variants of predictable behavior',
      control: 'select',
      options: ['navigation', 'interaction', 'feedback'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: null }
      }
    }
  },
  tags: ['autodocs']
} as const;

export default meta;

const Template: StoryFn<typeof PredictableDemo> = (args) => <PredictableDemo {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  showConsistentNavigation: true,
  enableContextChanges: false,
  showConsistentIdentification: false,
};
Basic.parameters = {
  docs: {
    description: {
      story: `
Basic implementation showing:
- Simple navigation structure
- Standard interaction patterns
- Basic component identification
- Essential predictability features
      `
    }
  }
};

export const NavigationPatterns = Template.bind({});
NavigationPatterns.args = {
  showConsistentNavigation: true,
  enableContextChanges: true,
  showConsistentIdentification: true,
  variant: 'navigation',
};
NavigationPatterns.parameters = {
  docs: {
    description: {
      story: `
## Navigation Predictability

Demonstrates core navigation patterns:

- Step-by-step progression
- State preservation
- Loading indicators
- Consistent behavior
- Clear feedback
- Focus management
      `
    }
  }
};

export const InteractionPatterns = Template.bind({});
InteractionPatterns.args = {
  showConsistentNavigation: true,
  enableContextChanges: true,
  showConsistentIdentification: true,
  variant: 'interaction',
};
InteractionPatterns.parameters = {
  docs: {
    description: {
      story: `
## Interaction Predictability

Shows consistent interaction patterns:

- Modal dialogs
- Form interactions
- State changes
- Focus management
- Keyboard navigation
- Clear feedback
      `
    }
  }
};

export const FeedbackPatterns = Template.bind({});
FeedbackPatterns.args = {
  showConsistentNavigation: true,
  enableContextChanges: true,
  showConsistentIdentification: true,
  variant: 'feedback',
};
FeedbackPatterns.parameters = {
  docs: {
    description: {
      story: `
## System Feedback

Demonstrates predictable feedback:

- Notifications
- Status updates
- Error messages
- Loading states
- Success indicators
- User alerts
      `
    }
  }
}; 