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

export default {
  title: 'Accessibility/Understandable/3.2 Predictable',
  component: PredictableDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 3.2 Predictable - Make Web pages appear and operate in predictable ways. Includes guidelines 3.2.1 On Focus, 3.2.2 On Input, 3.2.3 Consistent Navigation, 3.2.4 Consistent Identification, and 3.2.5 Change on Request.'
      }
    }
  }
};

const Template: StoryFn<typeof PredictableDemo> = (args) => <PredictableDemo {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  showConsistentNavigation: false,
  enableContextChanges: false,
  showConsistentIdentification: false,
};

export const WithNavigation = Template.bind({});
WithNavigation.args = {
  showConsistentNavigation: true,
  enableContextChanges: false,
  showConsistentIdentification: false,
};

export const Complete = Template.bind({});
Complete.args = {
  showConsistentNavigation: true,
  enableContextChanges: true,
  showConsistentIdentification: true,
}; 