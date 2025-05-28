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

interface SeizureSafeProps {
  enableSafetyChecks: boolean;
  allowAnimations: boolean;
}

const SeizureSafeDemo = ({
  enableSafetyChecks,
  allowAnimations,
}: SeizureSafeProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [flashRate, setFlashRate] = useState(2); // flashes per second
  const [brightness, setBrightness] = useState(100);
  const [showWarning, setShowWarning] = useState(false);

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
        <Typography variant="h4" component="h1" gutterBottom>
          Seizure Safe Content Demo
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
            Warning: Current settings may trigger photosensitive reactions. 
            Consider reducing flash rate or brightness.
          </Alert>
        )}

        {/* Animation Controls */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Animation Controls
            </Typography>
            <Stack spacing={3}>
              <Box>
                <Typography id="flash-rate-slider" gutterBottom>
                  Flash Rate (per second): {flashRate}
                </Typography>
                <Slider
                  value={flashRate}
                  onChange={(_, value) => setFlashRate(value as number)}
                  min={0}
                  max={5}
                  step={0.5}
                  marks
                  disabled={!allowAnimations}
                  aria-labelledby="flash-rate-slider"
                />
              </Box>

              <Box>
                <Typography id="brightness-slider" gutterBottom>
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

              <Stack direction="row" spacing={2} alignItems="center">
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
            </Stack>
          </CardContent>
        </Card>

        {/* Animation Demo */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Animation Example
              <Tooltip title="This is a demonstration of controlled animation with safety features" arrow>
                <IconButton size="small" sx={{ ml: 1 }}>
                  {enableSafetyChecks ? <FlashOffIcon /> : <FlashOnIcon />}
                </IconButton>
              </Tooltip>
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
            <Typography variant="h6" gutterBottom>
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
              <li>Provides warnings about potentially triggering content</li>
              <li>Allows users to control animation speed and brightness</li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/Operable/SeizureSafe',
  component: SeizureSafeDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 2.3 Seizures and Physical Reactions - Do not design content in a way that is known to cause seizures or physical reactions.'
      }
    }
  }
};

const Template: StoryFn<typeof SeizureSafeDemo> = (args) => <SeizureSafeDemo {...args} />;

export const BasicSafety = Template.bind({});
BasicSafety.args = {
  enableSafetyChecks: true,
  allowAnimations: false,
};

export const AdvancedSafety = Template.bind({});
AdvancedSafety.args = {
  enableSafetyChecks: true,
  allowAnimations: true,
}; 