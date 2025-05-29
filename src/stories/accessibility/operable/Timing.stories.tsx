import React, { useState, useEffect, useCallback } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Slider,
  Alert,
  LinearProgress,
  IconButton,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
} from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

interface TimingDemoProps {
  allowTimeAdjustment: boolean;
  enableAutoUpdate: boolean;
}

const TimingDemo = ({
  allowTimeAdjustment,
  enableAutoUpdate,
}: TimingDemoProps) => {
  const [sessionTimeout, setSessionTimeout] = useState(300); // 5 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(sessionTimeout);
  const [isPaused, setIsPaused] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [newsItems, setNewsItems] = useState<string[]>([
    'Breaking News: Latest Updates',
    'Weather Report: Sunny skies ahead',
    'Technology: New accessibility features released',
  ]);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(enableAutoUpdate);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Session timeout countdown
  useEffect(() => {
    if (!isPaused && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          if (newTime <= 60 && !showWarning) {
            setShowWarning(true);
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPaused, timeRemaining, showWarning]);

  // Auto-updating news ticker
  useEffect(() => {
    if (autoUpdateEnabled) {
      const newsTimer = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
      }, 5000);

      return () => clearInterval(newsTimer);
    }
  }, [autoUpdateEnabled, newsItems.length]);

  const handleTimeoutExtend = () => {
    setTimeRemaining(sessionTimeout);
    setShowWarning(false);
  };

  const handleReset = () => {
    setTimeRemaining(sessionTimeout);
    setShowWarning(false);
    setIsPaused(false);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" sx={{ 
          fontSize: { xs: '1.5rem', sm: '2rem' },
          lineHeight: 1.2,
          fontWeight: 500
        }} gutterBottom>
          Timing Accessibility Demo
        </Typography>

        {/* Session Timeout Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Session Timeout
            </Typography>
            
            {showWarning && (
              <Alert 
                severity="warning" 
                sx={{ mb: 2 }}
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={handleTimeoutExtend}
                  >
                    Extend Session
                  </Button>
                }
              >
                Your session will expire in {formatTime(timeRemaining)}. Would you like to extend it?
              </Alert>
            )}

            <Stack spacing={2}>
              {allowTimeAdjustment && (
                <Box>
                  <Typography variant="h6" component="h3" id="timeout-slider" gutterBottom>
                    Adjust Session Timeout (minutes)
                  </Typography>
                  <Slider
                    value={sessionTimeout / 60}
                    onChange={(_, value) => setSessionTimeout((value as number) * 60)}
                    min={1}
                    max={60}
                    aria-labelledby="timeout-slider"
                    marks={[
                      { value: 1, label: '1m' },
                      { value: 30, label: '30m' },
                      { value: 60, label: '60m' },
                    ]}
                  />
                </Box>
              )}

              <Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  Time Remaining: {formatTime(timeRemaining)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(timeRemaining / sessionTimeout) * 100}
                  sx={{ mb: 2 }}
                  aria-label="Session time remaining progress"
                />
                <Stack direction="row" spacing={1}>
                  <IconButton
                    onClick={() => setIsPaused(!isPaused)}
                    aria-label={isPaused ? 'Resume timer' : 'Pause timer'}
                  >
                    {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
                  </IconButton>
                  <IconButton
                    onClick={handleReset}
                    aria-label="Reset timer"
                  >
                    <StopIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Auto-updating Content Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Auto-updating Content
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={autoUpdateEnabled}
                  onChange={(e) => setAutoUpdateEnabled(e.target.checked)}
                />
              }
              label="Enable auto-updates"
            />

            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 1,
              }}
            >
              <Typography variant="body1">
                {newsItems[currentNewsIndex]}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="h2" component="h2" gutterBottom>
            WCAG Guidelines
          </Typography>
          <Typography variant="body2">
            This demo implements WCAG 2.2 Timing guidelines:
            <ul>
              <li>2.2.1 Timing Adjustable - Users can extend or adjust time limits</li>
              <li>2.2.2 Pause, Stop, Hide - Users can control moving or auto-updating content</li>
              <li>2.2.3 No Timing - Content and functionality can be used without time constraints</li>
              <li>2.2.4 Interruptions - Users can postpone or suppress interruptions</li>
              <li>2.2.6 Timeouts - Users are warned about timeouts that could cause data loss</li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/Operable/2.2 Timing',
  component: TimingDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 2.2 Timing - Provide users enough time to read and use content.'
      }
    }
  }
};

const Template: StoryFn<typeof TimingDemo> = (args) => <TimingDemo {...args} />;

export const BasicTiming = Template.bind({});
BasicTiming.args = {
  allowTimeAdjustment: false,
  enableAutoUpdate: false,
};

export const AdvancedTiming = Template.bind({});
AdvancedTiming.args = {
  allowTimeAdjustment: true,
  enableAutoUpdate: true,
}; 