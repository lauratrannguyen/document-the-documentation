import React, { useState, useEffect } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Snackbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface StatusMessagesProps {
  showARIAExplanations: boolean;
  simulateSlowNetwork: boolean;
}

const StatusMessagesDemo = ({
  showARIAExplanations,
  simulateSlowNetwork,
}: StatusMessagesProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const simulateAction = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve('Success');
          } else {
            reject(new Error('Network error occurred'));
          }
        }, simulateSlowNetwork ? 2000 : 500);
      });

      setSuccess('Operation completed successfully');
      setCartCount(prev => prev + 1);
      setSnackbarMessage('Item added to cart');
      setShowSnackbar(true);
    } catch (err) {
      setError('Failed to complete operation');
      setSnackbarMessage('Error: Could not add item');
      setShowSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Status Messages Demo
        </Typography>

        {/* Loading State Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Loading States
            </Typography>
            <Box sx={{ position: 'relative', minHeight: 100 }}>
              {isLoading && (
                <Box
                  role="status"
                  aria-label="Loading"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <CircularProgress size={24} />
                  <Typography>Processing your request...</Typography>
                </Box>
              )}
              {showARIAExplanations && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Loading state uses role="status" to announce state changes to screen readers
                </Alert>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Error and Success Messages */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Error and Success States
            </Typography>
            <Stack spacing={2}>
              {error && (
                <Alert
                  severity="error"
                  role="alert"
                  aria-live="assertive"
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ErrorIcon />
                    <Typography>{error}</Typography>
                  </Stack>
                </Alert>
              )}
              {success && (
                <Alert
                  severity="success"
                  role="status"
                  aria-live="polite"
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CheckCircleIcon />
                    <Typography>{success}</Typography>
                  </Stack>
                </Alert>
              )}
              {showARIAExplanations && (
                <Alert severity="info">
                  <Typography variant="body2">
                    Message attributes:
                    <ul>
                      <li>Error messages use role="alert" for immediate attention</li>
                      <li>Success messages use role="status" for non-intrusive updates</li>
                      <li>aria-live defines announcement priority</li>
                    </ul>
                  </Typography>
                </Alert>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Live Region Updates */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Live Region Updates
            </Typography>
            <Stack spacing={2}>
              <Box
                aria-live="polite"
                role="status"
                sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}
              >
                <Typography>
                  Cart items: {cartCount}
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={simulateAction}
                disabled={isLoading}
              >
                Add to Cart
              </Button>
              {showARIAExplanations && (
                <Alert severity="info">
                  Cart counter uses aria-live="polite" to announce updates without interrupting
                </Alert>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Toast Notifications */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={() => setShowSnackbar(false)}
          message={snackbarMessage}
          role="status"
          aria-live="polite"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setShowSnackbar(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            This demo implements WCAG 4.1.3 Status Messages guidelines:
            <ul>
              <li>Status messages can be programmatically determined</li>
              <li>Messages are announced without receiving focus</li>
              <li>Different roles used for different types of messages</li>
              <li>Appropriate ARIA live regions for dynamic content</li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/Robust/4.1.3 Status Messages',
  component: StatusMessagesDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 4.1.3 Status Messages - Status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.'
      }
    }
  }
};

const Template: StoryFn<typeof StatusMessagesDemo> = (args) => <StatusMessagesDemo {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  showARIAExplanations: false,
  simulateSlowNetwork: false,
};

export const WithARIAExplanations = Template.bind({});
WithARIAExplanations.args = {
  showARIAExplanations: true,
  simulateSlowNetwork: false,
};

export const SlowNetwork = Template.bind({});
SlowNetwork.args = {
  showARIAExplanations: true,
  simulateSlowNetwork: true,
}; 