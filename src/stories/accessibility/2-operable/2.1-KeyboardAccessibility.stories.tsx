import React, { useState, useRef, useEffect } from 'react';
import type { StoryFn, Meta } from '@storybook/react';
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
  Alert,
  AlertTitle,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ListItemIcon,
  Slider,
  Card,
  CardContent,
  CardActions,
  Menu,
  MenuItem,
  Tabs,
  Tab,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import TabIcon from '@mui/icons-material/Tab';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import WarningIcon from '@mui/icons-material/Warning';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MenuIcon from '@mui/icons-material/Menu';

interface FormData {
  name: string;
  email: string;
}

const KeyboardAccessibilityDemo = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (dialogOpen) {
      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }, 0);
    } else {
      if (dialogTriggerRef.current) {
        dialogTriggerRef.current.focus();
      }
    }
  }, [dialogOpen]);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
    setFormData({ name: '', email: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      tabIndex={-1}
    >
      <Stack spacing={3}>
        <Typography 
          component="h1" 
          variant="h4" 
          gutterBottom
        >
          Keyboard Accessibility Guide
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Key Principle</AlertTitle>
          Ensure all functionality is operable through a keyboard interface, allowing users who cannot use a mouse to access all features and content.
        </Alert>

        {/* Examples Section */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Common Scenarios:
          </Typography>
          <Stack spacing={2}>
            {/* Basic Navigation Example */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="subtitle1" 
                gutterBottom
              >
                1. Basic Navigation
              </Typography>
              <Box>
                <List>
                  {items.map((item) => (
                    <ListItemButton
                      key={item.id}
                      sx={{
                        '&:focus-visible': {
                          outline: '2px solid',
                          outlineColor: 'primary.main',
                          outlineOffset: '2px',
                        }
                      }}
                    >
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  ))}
                </List>
                <Alert severity="success" sx={{ mt: 2 }}>
                  <AlertTitle>Implementation</AlertTitle>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Use native interactive elements (buttons, links)</li>
                      <li>Maintain logical tab order</li>
                      <li>Provide visible focus indicators</li>
                      <li>Support arrow key navigation in lists</li>
                    </ul>
                  </Typography>
                </Alert>
              </Box>
            </Paper>

            {/* Focus Management Example */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="subtitle1" 
                gutterBottom
              >
                2. Focus Management
              </Typography>
              <Box>
                <Button
                  ref={dialogTriggerRef}
                  variant="contained"
                  onClick={() => setDialogOpen(true)}
                  aria-haspopup="dialog"
                >
                  Open Dialog
                </Button>
                <Dialog
                  open={dialogOpen}
                  onClose={handleDialogClose}
                  aria-labelledby="dialog-title"
                  disableEnforceFocus={false}
                  disableRestoreFocus={false}
                >
                  <DialogTitle id="dialog-title">
                    Focus Management Example
                    <IconButton
                      ref={closeButtonRef}
                      aria-label="close dialog"
                      onClick={handleDialogClose}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'grey.500',
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent>
                    <Typography>
                      When this dialog opens, focus moves to the close button.
                      When it closes, focus returns to the trigger button.
                      Try using Tab and Shift+Tab to navigate within the dialog.
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                  </DialogActions>
                </Dialog>
                <Alert severity="success" sx={{ mt: 2 }}>
                  <AlertTitle>Implementation</AlertTitle>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Trap focus within modal dialogs</li>
                      <li>Move focus to primary action on open</li>
                      <li>Return focus to trigger on close</li>
                      <li>Handle Escape key to close</li>
                    </ul>
                  </Typography>
                </Alert>
              </Box>
            </Paper>

            {/* Form Controls Example */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="subtitle1" 
                gutterBottom
              >
                3. Form Controls
              </Typography>
              <Box 
                component="form" 
                onSubmit={handleFormSubmit} 
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  mb: 2
                }}
              >
                <TextField
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused': {
                        '& > fieldset': {
                          borderWidth: 2,
                        }
                      }
                    }
                  }}
                  inputProps={{
                    'aria-label': 'Name field',
                  }}
                />
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  Submit
                </Button>
              </Box>
              <Alert severity="success" sx={{ mt: 2 }}>
                <AlertTitle>Implementation</AlertTitle>
                <Typography variant="body2" component="div">
                  <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                    <li>Use proper label associations</li>
                    <li>Support Enter key for form submission</li>
                    <li>Provide clear focus states</li>
                    <li>Handle form validation with keyboard</li>
                  </ul>
                </Typography>
              </Alert>
            </Paper>
          </Stack>
        </Box>

        <Divider />

        {/* Implementation Guidelines */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Implementation Requirements
          </Typography>
          <List>
            {[
              'All functionality must be operable through keyboard alone',
              'Provide visible focus indicators at all times',
              'Implement logical tab order matching visual layout',
              'Support standard keyboard interactions (Tab, Enter, Space, Arrows)',
              'Manage focus for dynamic content and popups',
              'Ensure no keyboard traps exist',
              'Make custom widgets keyboard accessible'
            ].map((item) => (
              <ListItem key={item}>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Common Pitfalls */}
        <Alert severity="warning">
          <AlertTitle>Common Pitfalls</AlertTitle>
          <Typography variant="body2" component="div">
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Removing focus outlines without alternatives</li>
              <li>Creating custom controls without keyboard support</li>
              <li>Not managing focus for dynamic content</li>
              <li>Relying on mouse-specific events (hover, click)</li>
              <li>Breaking standard keyboard interactions</li>
            </ul>
          </Typography>
        </Alert>

        {/* Quality Checklist */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Quality Checklist
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Feature</strong></TableCell>
                  <TableCell><strong>Requirements</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    feature: 'Navigation',
                    requirements: 'Logical tab order, clear focus indicators, support for arrow keys'
                  },
                  {
                    feature: 'Interactive Elements',
                    requirements: 'Enter/Space activation, proper ARIA roles, keyboard event handling'
                  },
                  {
                    feature: 'Focus Management',
                    requirements: 'Proper focus trapping, focus restoration, handling dynamic content'
                  },
                  {
                    feature: 'Forms',
                    requirements: 'Label associations, keyboard submission, validation feedback'
                  }
                ].map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell>{row.feature}</TableCell>
                    <TableCell>{row.requirements}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Paper>
  );
};

const KeyboardAccessibilityChallenges = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [customSliderValue, setCustomSliderValue] = useState<number>(50);
  const [isDragging, setIsDragging] = useState(false);
  const dragItemRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography 
          component="h1" 
          variant="h4" 
          gutterBottom
        >
          Keyboard Accessibility Challenges
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Key Principle</AlertTitle>
          Common challenges in implementing keyboard accessibility often arise from complex interactions, custom widgets, and dynamic content. Here are examples and solutions.
        </Alert>

        {/* Examples Section */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Common Challenges:
          </Typography>
          <Stack spacing={2}>
            {/* Custom Slider Challenge */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="subtitle1" 
                gutterBottom
              >
                1. Custom Interactive Elements
              </Typography>
              <Box>
                <Box 
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                    mb: 2
                  }}
                >
                  <Typography gutterBottom>
                    Bad Example (not keyboard accessible):
                  </Typography>
                  <Box
                    sx={{
                      height: 4,
                      bgcolor: 'grey.200',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        height: 16,
                        width: 16,
                        bgcolor: 'primary.main',
                        borderRadius: '50%',
                        top: -6,
                        left: `${customSliderValue}%`,
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography gutterBottom>
                    Good Example (fully keyboard accessible):
                  </Typography>
                  <Slider
                    value={customSliderValue}
                    onChange={(_, value) => setCustomSliderValue(value as number)}
                    aria-label="Custom slider"
                    valueLabelDisplay="auto"
                  />
                </Box>

                <Alert severity="warning">
                  <AlertTitle>Challenge</AlertTitle>
                  Custom interactive elements often rely on mouse events (click, drag) and lack keyboard support.
                </Alert>
                <Alert severity="success" sx={{ mt: 1 }}>
                  <AlertTitle>Solution</AlertTitle>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Use native elements when possible (e.g., input[type="range"])</li>
                      <li>Implement proper ARIA roles and properties</li>
                      <li>Support arrow keys for fine control</li>
                      <li>Add proper focus management</li>
                    </ul>
                  </Typography>
                </Alert>
              </Box>
            </Paper>

            {/* Dynamic Content Challenge */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="subtitle1" 
                gutterBottom
              >
                2. Dynamic Menu Navigation
              </Typography>
              <Box>
                <Card variant="outlined">
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography>Dynamic Menu Example</Typography>
                      <IconButton
                        aria-label="menu"
                        onClick={handleMenuOpen}
                        aria-controls={Boolean(menuAnchorEl) ? 'demo-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={Boolean(menuAnchorEl)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>

                <Menu
                  id="demo-menu"
                  anchorEl={menuAnchorEl}
                  open={Boolean(menuAnchorEl)}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    'aria-label': 'Demo actions',
                  }}
                >
                  <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
                </Menu>

                <Alert severity="warning" sx={{ mt: 2 }}>
                  <AlertTitle>Challenge</AlertTitle>
                  Dynamic menus and dropdowns can be difficult to navigate with a keyboard and may not properly announce their state to screen readers.
                </Alert>
                <Alert severity="success" sx={{ mt: 1 }}>
                  <AlertTitle>Solution</AlertTitle>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Use proper ARIA attributes (haspopup, expanded)</li>
                      <li>Maintain focus within menu when open</li>
                      <li>Support both arrow keys and tab navigation</li>
                      <li>Return focus to trigger on close</li>
                    </ul>
                  </Typography>
                </Alert>
              </Box>
            </Paper>

            {/* Tab Panel Challenge */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="subtitle1" 
                gutterBottom
              >
                3. Complex Widget Patterns
              </Typography>
              <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Tabs 
                    value={activeTab} 
                    onChange={handleTabChange}
                    aria-label="Demo tabs"
                  >
                    <Tab label="Tab 1" id="tab-0" aria-controls="tabpanel-0" />
                    <Tab label="Tab 2" id="tab-1" aria-controls="tabpanel-1" />
                    <Tab label="Tab 3" id="tab-2" aria-controls="tabpanel-2" />
                  </Tabs>
                </Box>
                <Box
                  role="tabpanel"
                  id={`tabpanel-${activeTab}`}
                  aria-labelledby={`tab-${activeTab}`}
                  hidden={activeTab !== 0}
                >
                  {activeTab === 0 && (
                    <Typography>Content for Tab 1</Typography>
                  )}
                </Box>
                <Box
                  role="tabpanel"
                  id={`tabpanel-${activeTab}`}
                  aria-labelledby={`tab-${activeTab}`}
                  hidden={activeTab !== 1}
                >
                  {activeTab === 1 && (
                    <Typography>Content for Tab 2</Typography>
                  )}
                </Box>
                <Box
                  role="tabpanel"
                  id={`tabpanel-${activeTab}`}
                  aria-labelledby={`tab-${activeTab}`}
                  hidden={activeTab !== 2}
                >
                  {activeTab === 2 && (
                    <Typography>Content for Tab 3</Typography>
                  )}
                </Box>

                <Alert severity="warning" sx={{ mt: 2 }}>
                  <AlertTitle>Challenge</AlertTitle>
                  Complex widgets like tab panels require specific keyboard interactions and ARIA relationships to be accessible.
                </Alert>
                <Alert severity="success" sx={{ mt: 1 }}>
                  <AlertTitle>Solution</AlertTitle>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Implement correct ARIA roles and relationships</li>
                      <li>Support arrow keys for tab navigation</li>
                      <li>Ensure proper focus management between tabs and panels</li>
                      <li>Maintain state and focus when switching tabs</li>
                    </ul>
                  </Typography>
                </Alert>
              </Box>
            </Paper>
          </Stack>
        </Box>

        <Divider />

        {/* Implementation Guidelines */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Challenge Resolution Strategies
          </Typography>
          <List>
            {[
              'Always test with keyboard navigation during development',
              'Use established design patterns and ARIA authoring practices',
              'Consider the tab order and focus flow early in development',
              'Test with screen readers to verify ARIA implementation',
              'Document keyboard shortcuts and navigation patterns',
              'Provide visible focus indicators for all interactive elements'
            ].map((item) => (
              <ListItem key={item}>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Common Pitfalls */}
        <Alert severity="warning">
          <AlertTitle>Common Development Pitfalls</AlertTitle>
          <Typography variant="body2" component="div">
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Implementing custom controls without proper keyboard support</li>
              <li>Not considering focus management in dynamic content</li>
              <li>Incorrect ARIA usage leading to confusing screen reader output</li>
              <li>Inconsistent keyboard navigation patterns across components</li>
              <li>Not providing keyboard alternatives for drag and drop</li>
            </ul>
          </Typography>
        </Alert>

        {/* Quality Checklist */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Testing Checklist
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Challenge Type</strong></TableCell>
                  <TableCell><strong>Testing Requirements</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    type: 'Custom Controls',
                    requirements: 'Test all keyboard interactions, verify ARIA roles and properties'
                  },
                  {
                    type: 'Dynamic Content',
                    requirements: 'Check focus management, test screen reader announcements'
                  },
                  {
                    type: 'Complex Widgets',
                    requirements: 'Verify keyboard navigation patterns, test all states and interactions'
                  },
                  {
                    type: 'Focus Management',
                    requirements: 'Test focus order, trap focus when needed, ensure focus restoration'
                  }
                ].map((row) => (
                  <TableRow key={row.type}>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.requirements}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Paper>
  );
};

// Story Configuration
const meta: Meta<typeof KeyboardAccessibilityDemo> = {
  title: 'Accessibility/2-Operable/2.1-Keyboard Accessible',
  component: KeyboardAccessibilityDemo,
  parameters: {
    docs: {
      description: {
        component: `WCAG 2.1 Keyboard Accessible\n
Make all functionality available from a keyboard interface.\n
Key Requirements:\n
  • All functionality available via keyboard\n
  • No keyboard traps\n
  • Consistent navigation patterns\n
  • Visible focus indicators\n
Reference:
See WCAG 2.2 - 2.1 Keyboard Accessible (https://www.w3.org/TR/WCAG22/#keyboard-accessible)`
      }
    }
  }
};

export default meta;

// Story Templates
const MainTemplate: StoryFn<typeof KeyboardAccessibilityDemo> = () => <KeyboardAccessibilityDemo />;
const ChallengesTemplate: StoryFn = () => <KeyboardAccessibilityChallenges />;

export const MainDemo = MainTemplate.bind({});
MainDemo.parameters = {
  docs: {
    description: {
      story: `Keyboard Accessibility Implementation\n
This guide demonstrates how to implement proper keyboard accessibility.\n
Key Features:\n
  • Basic Navigation: Tab order and focus management\n
  • Interactive Elements: Standard keyboard interactions\n
  • Focus Management: Proper focus handling for dynamic content\n
Best Practices:\n
  • Use semantic HTML elements\n
  • Maintain visible focus indicators\n
  • Support standard keyboard patterns\n
  • Test with keyboard-only navigation`
    }
  }
};

export const Challenges = ChallengesTemplate.bind({});
Challenges.parameters = {
  docs: {
    description: {
      story: `Common Keyboard Accessibility Challenges\n
This guide demonstrates common challenges and solutions when implementing keyboard accessibility.\n
Key Challenges:\n
  • Custom Interactive Elements: Making custom controls fully keyboard accessible\n
  • Dynamic Content: Managing focus and navigation in dynamic interfaces\n
  • Complex Widgets: Implementing proper keyboard patterns for composite widgets\n
Best Practices:\n
  • Follow ARIA authoring practices\n
  • Test with keyboard and screen readers\n
  • Document keyboard interactions\n
  • Consider all interaction patterns`
    }
  }
}; 