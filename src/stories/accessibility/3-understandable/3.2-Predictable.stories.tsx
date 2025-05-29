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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';

interface PredictableProps {
  showConsistentNavigation: boolean;
  enableContextChanges: boolean;
  showConsistentIdentification: boolean;
}

const PredictableDemo = ({
  showConsistentNavigation,
  enableContextChanges,
  showConsistentIdentification,
}: PredictableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSearchAlert, setShowSearchAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState('home');

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
    }
  },
  tags: ['autodocs']
} as const;

export default meta;

const Template: StoryFn<typeof PredictableDemo> = (args) => <PredictableDemo {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  showConsistentNavigation: false,
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

export const WithNavigation = Template.bind({});
WithNavigation.args = {
  showConsistentNavigation: true,
  enableContextChanges: false,
  showConsistentIdentification: false,
};
WithNavigation.parameters = {
  docs: {
    description: {
      story: `
Enhanced navigation features demonstrating:
- Consistent navigation patterns
- Breadcrumb navigation
- Menu structures
- Navigation order
- Location indicators
      `
    }
  }
};

export const Complete = Template.bind({});
Complete.args = {
  showConsistentNavigation: true,
  enableContextChanges: true,
  showConsistentIdentification: true,
};
Complete.parameters = {
  docs: {
    description: {
      story: `
Complete implementation showcasing:
- Consistent navigation
- Predictable interactions
- Context change handling
- Component identification
- Visual consistency
- Full accessibility support
      `
    }
  }
}; 