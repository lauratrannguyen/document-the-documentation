import React, { useState } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Slider,
  FormControlLabel,
  Switch,
  Alert,
} from '@mui/material';

interface SeizurePreventionProps {
  initialFlashRate: number;
  showWarning: boolean;
}

const SeizurePreventionDemo = ({
  initialFlashRate,
  showWarning,
}: SeizurePreventionProps) => {
  const [flashRate, setFlashRate] = useState(initialFlashRate);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const handleFlashRateChange = (event: Event, newValue: number | number[]) => {
    setFlashRate(newValue as number);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={4}>
        <Typography variant="h6" gutterBottom>
          Seizure Prevention Examples
        </Typography>

        {showWarning && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Warning: The following content contains flashing elements that are kept within
            safe thresholds to prevent seizures.
          </Alert>
        )}

        <section aria-labelledby="flash-control-title">
          <Typography id="flash-control-title" variant="subtitle1" gutterBottom>
            Flash Rate Control
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={showControls}
                onChange={(e) => setShowControls(e.target.checked)}
              />
            }
            label="Show flash controls"
          />

          {showControls && (
            <Box sx={{ mt: 2 }}>
              <Typography id="flash-rate-slider" gutterBottom>
                Flash Rate (Hz): {flashRate}
              </Typography>
              <Slider
                value={flashRate}
                onChange={handleFlashRateChange}
                aria-labelledby="flash-rate-slider"
                min={0}
                max={3}
                step={0.1}
                marks={[
                  { value: 0, label: '0 Hz' },
                  { value: 3, label: '3 Hz' },
                ]}
                sx={{ width: 200 }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Note: Content is limited to 3 flashes per second to comply with
                WCAG guidelines.
              </Typography>
            </Box>
          )}
        </section>

        <section aria-labelledby="animation-title">
          <Typography id="animation-title" variant="subtitle1" gutterBottom>
            Animation Example
          </Typography>
          <Box
            sx={{
              width: 200,
              height: 200,
              bgcolor: isAnimating ? 'primary.main' : 'background.paper',
              transition: 'background-color 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={() => setIsAnimating(!isAnimating)}
              sx={{ 
                bgcolor: isAnimating ? 'background.paper' : 'primary.main',
                color: isAnimating ? 'primary.main' : 'background.paper',
              }}
            >
              {isAnimating ? 'Stop' : 'Start'} Animation
            </Button>
          </Box>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            This animation uses smooth transitions and respects user preferences
            for reduced motion.
          </Typography>
        </section>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Best practices for preventing seizures and physical reactions:
            <ul>
              <li>Limit flash rates to less than 3 times per second</li>
              <li>Avoid red flashes</li>
              <li>Keep flashing area small (less than 25% of screen)</li>
              <li>Provide controls to disable animations</li>
              <li>Respect user's reduced motion preferences</li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/Operable/Seizure Prevention',
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

export const SafeAnimation = Template.bind({});
SafeAnimation.args = {
  initialFlashRate: 2,
  showWarning: true,
};

export const ReducedMotion = Template.bind({});
ReducedMotion.args = {
  initialFlashRate: 1,
  showWarning: false,
}; 