import React, { useState } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Alert,
  AlertTitle,
  Button,
  Snackbar,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Divider,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface StatusMessageExample {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  ariaLive: 'polite' | 'assertive' | 'off';
  role?: string;
  implementation: string;
  explanation: string;
}

const BasicStatusMessagesDemo = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);

  const statusExamples: StatusMessageExample[] = [
    {
      type: 'success',
      message: 'Your profile has been updated successfully',
      ariaLive: 'polite',
      role: 'status',
      implementation: '<div role="status" aria-live="polite">Profile updated successfully</div>',
      explanation: 'Non-critical success message that doesn\'t require immediate attention'
    },
    {
      type: 'error',
      message: 'Error: Failed to save changes. Please try again.',
      ariaLive: 'assertive',
      role: 'alert',
      implementation: '<div role="alert" aria-live="assertive">Error: Failed to save changes</div>',
      explanation: 'Critical error that requires immediate user attention'
    },
    {
      type: 'info',
      message: '3 new messages in your inbox',
      ariaLive: 'polite',
      role: 'status',
      implementation: '<div role="status" aria-live="polite">3 new messages</div>',
      explanation: 'Informational update that can be announced when convenient'
    },
    {
      type: 'warning',
      message: 'Your session will expire in 2 minutes',
      ariaLive: 'assertive',
      role: 'alert',
      implementation: '<div role="alert" aria-live="assertive">Session expiring soon</div>',
      explanation: 'Time-sensitive warning requiring prompt attention'
    }
  ];

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(null), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Status Messages Implementation Guide
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Key Principle</AlertTitle>
          Status messages must be programmatically determined through role or properties, allowing users to receive updates without losing their current focus.
        </Alert>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Interactive Examples
          </Typography>
          <Stack spacing={2}>
            {/* Progress Indicator Example */}
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      component="h3"
                      gutterBottom
                    >
                      Progress Updates
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      onClick={simulateUpload}
                      disabled={uploadProgress !== null}
                    >
                      Upload File
                    </Button>
                    {uploadProgress !== null && (
                      <Box>
                        <Box
                          role="progressbar"
                          aria-label="Upload progress"
                          aria-valuenow={uploadProgress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <LinearProgress 
                            variant="determinate" 
                            value={uploadProgress} 
                            sx={{ mt: 1 }}
                          />
                        </Box>
                        <Typography
                          role="status"
                          aria-live="polite"
                          variant="body2"
                          sx={{ mt: 1 }}
                        >
                          {uploadProgress < 100 
                            ? `Uploading: ${uploadProgress}%`
                            : 'Upload complete!'}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Error Message Example */}
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      component="h3"
                      gutterBottom
                    >
                      Error Messages
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => setShowError(true)}
                    >
                      Trigger Error
                    </Button>
                    {showError && (
                      <Alert 
                        severity="error"
                        role="alert"
                        onClose={() => setShowError(false)}
                      >
                        Unable to connect to the server. Please check your connection.
                      </Alert>
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Toast Notification Example */}
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      component="h3"
                      gutterBottom
                    >
                      Toast Notifications
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => setShowSnackbar(true)}
                      startIcon={<NotificationsIcon />}
                    >
                      Show Notification
                    </Button>
                    <Snackbar
                      open={showSnackbar}
                      autoHideDuration={5000}
                      onClose={() => setShowSnackbar(false)}
                      message="Settings saved successfully"
                      role="status"
                      aria-live="polite"
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Common Status Message Patterns
          </Typography>
          <Stack spacing={2}>
            {statusExamples.map((example, index) => (
              <Card key={index} variant="outlined">
                <CardContent>
                  <Stack spacing={2}>
                    <Box>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        gutterBottom
                      >
                        {example.type.charAt(0).toUpperCase() + example.type.slice(1)} Message
                      </Typography>
                      <Chip
                        label={`aria-live="${example.ariaLive}"`}
                        size="small"
                        color="primary"
                        sx={{ mb: 2 }}
                      />
                    </Box>
                    <Alert severity={example.type}>
                      {example.message}
                    </Alert>
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        Implementation:
                      </Typography>
                      <Box
                        component="pre"
                        tabIndex={0}
                        role="region"
                        aria-label={`Code example: ${example.type} Message`}
                        onKeyDown={(e) => {
                          const box = e.currentTarget;
                          switch (e.key) {
                            case 'ArrowDown':
                              box.scrollTop += 30;
                              break;
                            case 'ArrowUp':
                              box.scrollTop -= 30;
                              break;
                            case 'PageDown':
                              box.scrollTop += box.clientHeight;
                              break;
                            case 'PageUp':
                              box.scrollTop -= box.clientHeight;
                              break;
                            case 'Home':
                              box.scrollTop = 0;
                              break;
                            case 'End':
                              box.scrollTop = box.scrollHeight;
                              break;
                          }
                        }}
                        sx={{
                          p: 2,
                          bgcolor: 'grey.100',
                          borderRadius: 1,
                          overflow: 'auto',
                          maxHeight: '200px',
                          '&:focus': {
                            outline: '2px solid #1976d2',
                            outlineOffset: '2px'
                          },
                          '&:focus-visible': {
                            outline: '2px solid #1976d2',
                            outlineOffset: '2px'
                          }
                        }}
                      >
                        <code>{example.implementation}</code>
                      </Box>
                    </Box>
                    <Alert severity="info" icon={<InfoIcon />}>
                      {example.explanation}
                    </Alert>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Implementation Requirements
          </Typography>
          <List>
            {[
              'Use appropriate ARIA live regions (polite vs. assertive)',
              'Choose correct roles (status vs. alert)',
              'Ensure messages are concise and clear',
              'Avoid interrupting screen readers with non-critical updates',
              'Test with screen readers in different browsers',
              'Consider message priority and timing'
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

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Edge Cases and Considerations
          </Typography>
          <Alert severity="warning">
            <AlertTitle>Common Pitfalls</AlertTitle>
            <Typography variant="body2" component="div">
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                <li>Using assertive for non-critical messages</li>
                <li>Not removing status messages when they become irrelevant</li>
                <li>Overusing aria-live regions causing too many announcements</li>
                <li>Incorrect role usage (mixing up alert and status)</li>
              </ul>
            </Typography>
          </Alert>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            When to Use What
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell><strong>Use Case</strong></TableCell>
                  <TableCell><strong>Implementation</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    type: 'Status',
                    useCase: 'Non-critical updates, progress indicators',
                    implementation: 'role="status" aria-live="polite"'
                  },
                  {
                    type: 'Alert',
                    useCase: 'Errors, warnings, critical updates',
                    implementation: 'role="alert" (implies aria-live="assertive")'
                  },
                  {
                    type: 'Log',
                    useCase: 'Repeated messages, chat logs',
                    implementation: 'role="log" aria-live="polite"'
                  },
                  {
                    type: 'Timer',
                    useCase: 'Countdown, time-sensitive updates',
                    implementation: 'role="timer" with aria-live="off"'
                  }
                ].map((row) => (
                  <TableRow key={row.type}>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.useCase}</TableCell>
                    <TableCell><code>{row.implementation}</code></TableCell>
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

const ComplexStatusMessagesDemo = () => {
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  const [notifications, setNotifications] = useState<string[]>([]);

  const simulateAction = (key: string, duration: number = 2000) => {
    setLoadingStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [key]: false }));
      setNotifications(prev => [...prev, `${key} completed successfully`]);
    }, duration);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Complex Status Message Patterns
        </Typography>

        <Alert severity="info">
          <AlertTitle>Advanced Implementation</AlertTitle>
          Demonstrates complex patterns for handling multiple simultaneous status messages
          and updates in rich applications.
        </Alert>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Handling Multiple Updates
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                disabled={loadingStates['Process 1']}
                onClick={() => simulateAction('Process 1')}
              >
                {loadingStates['Process 1'] ? (
                  <CircularProgress size={24} color="inherit" />
                ) : 'Start Process 1'}
              </Button>
              <Button
                variant="contained"
                disabled={loadingStates['Process 2']}
                onClick={() => simulateAction('Process 2', 3000)}
              >
                {loadingStates['Process 2'] ? (
                  <CircularProgress size={24} color="inherit" />
                ) : 'Start Process 2'}
              </Button>
            </Box>
            
            {/* Status Log */}
            <Box
              role="log"
              aria-live="polite"
              aria-label="Process status updates"
              tabIndex={0}
              onKeyDown={(e) => {
                const box = e.currentTarget;
                switch (e.key) {
                  case 'ArrowDown':
                    box.scrollTop += 30;
                    break;
                  case 'ArrowUp':
                    box.scrollTop -= 30;
                    break;
                  case 'PageDown':
                    box.scrollTop += box.clientHeight;
                    break;
                  case 'PageUp':
                    box.scrollTop -= box.clientHeight;
                    break;
                  case 'Home':
                    box.scrollTop = 0;
                    break;
                  case 'End':
                    box.scrollTop = box.scrollHeight;
                    break;
                }
              }}
              sx={{
                mt: 2,
                p: 2,
                bgcolor: 'grey.100',
                borderRadius: 1,
                minHeight: 100,
                maxHeight: 200,
                overflow: 'auto',
                '&:focus': {
                  outline: '2px solid #1976d2',
                  outlineOffset: '2px'
                },
                '&:focus-visible': {
                  outline: '2px solid #1976d2',
                  outlineOffset: '2px'
                }
              }}
            >
              {notifications.map((notification, index) => (
                <Typography key={index} variant="body2" gutterBottom>
                  {notification}
                </Typography>
              ))}
            </Box>
          </Stack>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Developer Guidelines
          </Typography>
          <Stack spacing={2}>
            {[
              {
                title: 'Message Queue Management',
                description: 'Implement a queue system for multiple status messages to prevent overwhelming users',
                code: `const [messageQueue, setMessageQueue] = useState([]);
const addMessage = (message) => {
  setMessageQueue(prev => [...prev, message]);
  // Remove message after display duration
  setTimeout(() => {
    setMessageQueue(prev => prev.filter(m => m !== message));
  }, duration);
};`
              },
              {
                title: 'Dynamic Priority System',
                description: 'Adjust aria-live based on message importance and context',
                code: `const announceMessage = (message, priority) => {
  const region = document.getElementById('status-region');
  region.setAttribute('aria-live', 
    priority === 'high' ? 'assertive' : 'polite'
  );
  region.textContent = message;
};`
              },
              {
                title: 'Debouncing Updates',
                description: 'Prevent rapid-fire updates from overwhelming screen readers',
                code: `const debouncedUpdate = debounce((message) => {
  setStatus(message);
}, 1000, { maxWait: 2000 });`
              }
            ].map((example, index) => (
              <Card key={index} variant="outlined">
                <CardContent>
                  <Stack spacing={2}>
                    <Box>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        gutterBottom
                      >
                        {example.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {example.description}
                      </Typography>
                      <Box
                        component="pre"
                        tabIndex={0}
                        role="region"
                        aria-label={`Code example: ${example.title}`}
                        onKeyDown={(e) => {
                          const box = e.currentTarget;
                          switch (e.key) {
                            case 'ArrowDown':
                              box.scrollTop += 30;
                              break;
                            case 'ArrowUp':
                              box.scrollTop -= 30;
                              break;
                            case 'PageDown':
                              box.scrollTop += box.clientHeight;
                              break;
                            case 'PageUp':
                              box.scrollTop -= box.clientHeight;
                              break;
                            case 'Home':
                              box.scrollTop = 0;
                              break;
                            case 'End':
                              box.scrollTop = box.scrollHeight;
                              break;
                          }
                        }}
                        sx={{
                          p: 2,
                          bgcolor: 'grey.100',
                          borderRadius: 1,
                          overflow: 'auto',
                          maxHeight: '200px',
                          '&:focus': {
                            outline: '2px solid #1976d2',
                            outlineOffset: '2px'
                          },
                          '&:focus-visible': {
                            outline: '2px solid #1976d2',
                            outlineOffset: '2px'
                          }
                        }}
                      >
                        <code>{example.code}</code>
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Testing Checklist
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Test Case</strong></TableCell>
                  <TableCell><strong>Expected Behavior</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    case: 'Multiple Rapid Updates',
                    behavior: 'Messages should queue and announce without overwhelming'
                  },
                  {
                    case: 'Error During Process',
                    behavior: 'Error message should interrupt and announce immediately'
                  },
                  {
                    case: 'Background Updates',
                    behavior: 'Non-critical updates should not interrupt current tasks'
                  },
                  {
                    case: 'Status Clearance',
                    behavior: 'Outdated status messages should be removed appropriately'
                  }
                ].map((row) => (
                  <TableRow key={row.case}>
                    <TableCell>{row.case}</TableCell>
                    <TableCell>{row.behavior}</TableCell>
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

export default {
  title: 'Accessibility/4. Robust/4.1.3 Status Messages',
  parameters: {
    docs: {
      description: {
        component: `
# WCAG 4.1.3 Status Messages

This component demonstrates how to implement status messages that can be programmatically determined and presented to users by assistive technologies without receiving focus.

## Key Features
- **Live Regions**: Proper implementation of ARIA live regions
- **Message Types**: Different roles for various message types
- **Focus Management**: Messages announced without focus changes
- **Dynamic Updates**: Proper handling of content updates

## Implementation Guidelines
1. **Live Region Types**
   - aria-live="polite" for non-urgent updates
   - aria-live="assertive" for important messages
   - role="status" for status messages
   - role="alert" for important notifications

2. **Message Categories**
   - Success notifications
   - Error messages
   - Loading states
   - Progress updates
   - Status changes

3. **Best Practices**
   - Use appropriate ARIA roles
   - Choose correct live region types
   - Maintain clear message text
   - Avoid focus interruption

4. **Common Patterns**
   - Form submission feedback
   - Loading indicators
   - Progress bars
   - Error notifications
   - Success messages

## Technical Requirements
- ARIA live regions
- Role assignments
- Focus management
- Dynamic content updates
- Screen reader support
- Timing control
`
      }
    }
  },
  argTypes: {
    showARIAExplanations: {
      control: 'boolean',
      description: 'Shows explanations of ARIA live regions and roles',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    simulateSlowNetwork: {
      control: 'boolean',
      description: 'Simulates slow network to demonstrate loading states',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    }
  }
};

const Template: StoryFn<typeof BasicStatusMessagesDemo> = () => <BasicStatusMessagesDemo />;
const ComplexTemplate: StoryFn<typeof ComplexStatusMessagesDemo> = () => <ComplexStatusMessagesDemo />;

export const Basic = Template.bind({});
Basic.args = {
  showARIAExplanations: false,
  simulateSlowNetwork: false,
};
Basic.parameters = {
  docs: {
    description: {
      story: 'Basic view showing different types of status messages and their implementation.'
    }
  }
};

export const Complex = ComplexTemplate.bind({});
Complex.args = {
  showARIAExplanations: true,
  simulateSlowNetwork: false,
};
Complex.parameters = {
  docs: {
    description: {
      story: 'Complex view demonstrating advanced status message patterns and implementations.'
    }
  }
};

export const WithARIAExplanations = Template.bind({});
WithARIAExplanations.args = {
  showARIAExplanations: true,
  simulateSlowNetwork: false,
};
WithARIAExplanations.parameters = {
  docs: {
    description: {
      story: `
Detailed view with ARIA explanations showing:
- Live region implementations
- Role assignments
- Message priorities
- Update behaviors
- Focus management
      `
    }
  }
};

export const SlowNetwork = Template.bind({});
SlowNetwork.args = {
  showARIAExplanations: true,
  simulateSlowNetwork: true,
};
SlowNetwork.parameters = {
  docs: {
    description: {
      story: `
Network simulation view demonstrating:
- Loading states
- Progress indicators
- Error handling
- Success messages
- Status updates timing
      `
    }
  }
}; 