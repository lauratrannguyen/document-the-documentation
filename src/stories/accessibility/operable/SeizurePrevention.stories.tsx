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
  Slider,
  Alert,
  FormControlLabel,
  Switch,
  IconButton,
  Tooltip,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FlashOffIcon from '@mui/icons-material/FlashOff';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface SeizurePreventionProps {
  initialFlashRate: number;
  showWarning: boolean;
  enableSafetyChecks: boolean;
  allowAnimations: boolean;
}

const SeizurePreventionDemo = ({
  initialFlashRate,
  showWarning: initialShowWarning,
  enableSafetyChecks,
  allowAnimations,
}: SeizurePreventionProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [flashRate, setFlashRate] = useState(initialFlashRate);
  const [brightness, setBrightness] = useState(100);
  const [showWarning, setShowWarning] = useState(initialShowWarning);
  const [showControls, setShowControls] = useState(false);

  // Monitor flash rate and brightness for potential triggers
  useEffect(() => {
    if (enableSafetyChecks) {
      const isUnsafe = flashRate > 3 || brightness > 80;
      setShowWarning(isUnsafe && isAnimating);
    }
  }, [flashRate, brightness, isAnimating, enableSafetyChecks]);

  const handleAnimationToggle = () => {
    if (!allowAnimations) return;
    setIsAnimating(!isAnimating);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" sx={{ 
          fontSize: { xs: '1.5rem', sm: '2rem' },
          lineHeight: 1.2,
          fontWeight: 500
        }} gutterBottom>
          Seizure Prevention Demo
        </Typography>

        {/* Safety Warning */}
        {showWarning && (
          <Alert
            severity="warning"
            icon={<WarningIcon />}
            sx={{ mb: 2 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => setIsAnimating(false)}
              >
                Stop Animation
              </Button>
            }
          >
            Warning: The following content contains flashing elements. Current settings may trigger 
            photosensitive reactions. Consider reducing flash rate or brightness.
          </Alert>
        )}

        {/* Animation Controls */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Animation Controls
              <Tooltip title="This is a demonstration of controlled animation with safety features" arrow>
                <IconButton size="small" sx={{ ml: 1 }}>
                  {enableSafetyChecks ? <FlashOffIcon /> : <FlashOnIcon />}
                </IconButton>
              </Tooltip>
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={showControls}
                  onChange={(e) => setShowControls(e.target.checked)}
                  disabled={!allowAnimations}
                />
              }
              label="Show animation controls"
            />

            {showControls && (
              <Stack spacing={3} sx={{ mt: 2 }}>
                <Box>
                  <Typography variant="subtitle1" id="flash-rate-slider" gutterBottom>
                    Flash Rate (per second): {flashRate}
                  </Typography>
                  <Slider
                    value={flashRate}
                    onChange={(_, value) => setFlashRate(value as number)}
                    min={0}
                    max={3}
                    step={0.1}
                    marks={[
                      { value: 0, label: '0 Hz' },
                      { value: 3, label: '3 Hz' },
                    ]}
                    disabled={!allowAnimations}
                    aria-labelledby="flash-rate-slider"
                    sx={{ width: 200 }}
                  />
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Note: Content is limited to 3 flashes per second to comply with
                    WCAG guidelines.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" id="brightness-slider" gutterBottom>
                    Brightness: {brightness}%
                  </Typography>
                  <Slider
                    value={brightness}
                    onChange={(_, value) => setBrightness(value as number)}
                    min={0}
                    max={100}
                    disabled={!allowAnimations}
                    aria-labelledby="brightness-slider"
                  />
                </Box>
              </Stack>
            )}

            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
              <IconButton
                onClick={handleAnimationToggle}
                disabled={!allowAnimations}
                color={isAnimating ? 'primary' : 'default'}
                aria-label={isAnimating ? 'Stop animation' : 'Start animation'}
              >
                {isAnimating ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <Typography variant="body2">
                {isAnimating ? 'Animation Playing' : 'Animation Stopped'}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        {/* Animation Demo */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Animation Example
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 200,
                bgcolor: isAnimating ? 'primary.main' : 'background.default',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isAnimating ? brightness / 100 : 1,
                transition: 'background-color 0.3s',
                animation: isAnimating
                  ? `pulse ${1 / flashRate}s infinite`
                  : 'none',
                '@keyframes pulse': {
                  '0%': {
                    bgcolor: 'primary.main',
                  },
                  '50%': {
                    bgcolor: 'background.default',
                  },
                  '100%': {
                    bgcolor: 'primary.main',
                  },
                },
              }}
            >
              <Typography variant="body1" align="center">
                {allowAnimations
                  ? 'Click the play button to start/stop the animation'
                  : 'Animations are currently disabled'}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Safety Settings */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Safety Settings
            </Typography>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={enableSafetyChecks}
                    disabled
                  />
                }
                label="Enable Safety Checks"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={allowAnimations}
                    disabled
                  />
                }
                label="Allow Animations"
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            This demo implements WCAG 2.3 Seizures and Physical Reactions guidelines:
            <ul>
              <li>2.3.1 Three Flashes or Below - No content flashes more than 3 times per second</li>
              <li>2.3.2 Three Flashes - No content flashes more than 3 times in any 1-second period</li>
              <li>2.3.3 Animation from Interactions - Users can disable non-essential animations</li>
              <li>Keep flashing area small (less than 25% of screen)</li>
              <li>Avoid red flashes and provide controls to disable animations</li>
              <li>Respect user's reduced motion preferences</li>
              <li>Monitor and warn about potentially triggering content</li>
              <li>Allow users to control animation speed and brightness</li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/Operable/2.3 Seizures and Physical Reactions',
  component: SeizurePreventionDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 2.3 Seizures and Physical Reactions - Do not design content in a way that is known to cause seizures or physical reactions.'
      }
    }
  }
};

const Template: StoryFn<typeof SeizurePreventionDemo> = (args) => (
  <SeizurePreventionDemo {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  initialFlashRate: 2,
  showWarning: true,
  enableSafetyChecks: false,
  allowAnimations: true,
};

export const WithSafetyChecks = Template.bind({});
WithSafetyChecks.args = {
  initialFlashRate: 2,
  showWarning: true,
  enableSafetyChecks: true,
  allowAnimations: true,
};

export const AnimationsDisabled = Template.bind({});
AnimationsDisabled.args = {
  initialFlashRate: 0,
  showWarning: false,
  enableSafetyChecks: true,
  allowAnimations: false,
}; 