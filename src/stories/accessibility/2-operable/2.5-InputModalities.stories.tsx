import React, { useState, useRef } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  IconButton,
  Slider,
  FormControlLabel,
  Switch,
  TextField,
  Tooltip,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import MouseIcon from '@mui/icons-material/Mouse';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import GestureIcon from '@mui/icons-material/Gesture';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';

interface InputModalitiesProps {
  enableTouchGestures: boolean;
  showTargetSizing: boolean;
}

const Grid = styled(Box)({}) as typeof Box;

const InputModalitiesDemo = ({
  enableTouchGestures,
  showTargetSizing,
}: InputModalitiesProps) => {
  const [value, setValue] = useState(0);
  const [targetSize, setTargetSize] = useState(44); // Default to WCAG minimum
  const [useMotion, setUseMotion] = useState(false);
  const [lastAction, setLastAction] = useState<string>('');
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  // Handle pointer/touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableTouchGestures) return;
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!enableTouchGestures || !touchStartPos.current) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartPos.current.x;
    const deltaY = touch.clientY - touchStartPos.current.y;
    
    // Detect horizontal swipe
    if (Math.abs(deltaX) > 50) {
      setValue(prev => prev + (deltaX > 0 ? 1 : -1));
      setLastAction('Swipe ' + (deltaX > 0 ? 'right' : 'left'));
    }
    touchStartPos.current = null;
  };

  // Handle keyboard input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        setValue(prev => prev + 1);
        setLastAction('Keyboard increment');
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        setValue(prev => prev - 1);
        setLastAction('Keyboard decrement');
        break;
    }
  };

  // Simulate motion actuation
  const handleMotionToggle = (checked: boolean) => {
    setUseMotion(checked);
    if (checked) {
      setLastAction('Motion controls enabled');
      // In a real app, we would use the DeviceOrientationEvent
      window.addEventListener('deviceorientation', handleDeviceMotion);
    } else {
      setLastAction('Motion controls disabled');
      window.removeEventListener('deviceorientation', handleDeviceMotion);
    }
  };

  const handleDeviceMotion = (event: any) => {
    // This is a simplified example. In a real app, we would:
    // 1. Use proper device orientation handling
    // 2. Apply thresholds and debouncing
    // 3. Consider accessibility preferences
    if (useMotion && event.beta) {
      setValue(prev => prev + (event.beta > 45 ? 1 : -1));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Input Modalities Demo
        </Typography>

        {/* Value Display */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Current Value: {value}
            </Typography>
            {lastAction && (
              <Typography variant="body2" color="text.secondary">
                Last action: {lastAction}
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Touch/Pointer Controls */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Touch & Pointer Controls
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'center',
                my: 2,
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <IconButton
                onClick={() => {
                  setValue(prev => prev - 1);
                  setLastAction('Button click decrease');
                }}
                aria-label="Decrease value"
                sx={showTargetSizing ? { 
                  width: targetSize, 
                  height: targetSize,
                  '& .MuiSvgIcon-root': {
                    fontSize: targetSize * 0.5
                  }
                } : undefined}
              >
                <RemoveIcon />
              </IconButton>
              
              <Typography variant="body1" sx={{ mx: 3 }}>
                {value}
              </Typography>
              
              <IconButton
                onClick={() => {
                  setValue(prev => prev + 1);
                  setLastAction('Button click increase');
                }}
                aria-label="Increase value"
                sx={showTargetSizing ? { 
                  width: targetSize, 
                  height: targetSize,
                  '& .MuiSvgIcon-root': {
                    fontSize: targetSize * 0.5
                  }
                } : undefined}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {enableTouchGestures && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Try swiping left or right to change the value
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Target Size Controls */}
        {showTargetSizing && (
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Target Size Adjustment
              </Typography>
              <Stack spacing={2}>
                <Typography id="target-size-slider" gutterBottom>
                  Button Size: {targetSize}px
                </Typography>
                <Slider
                  value={targetSize}
                  onChange={(_, value) => setTargetSize(value as number)}
                  min={24}
                  max={64}
                  marks={[
                    { value: 24, label: '24px' },
                    { value: 44, label: '44px (WCAG)' },
                    { value: 64, label: '64px' },
                  ]}
                  aria-labelledby="target-size-slider"
                />
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Input Methods Grid */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Available Input Methods
            </Typography>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
              gap: 2,
              mt: 1 
            }}>
              <Stack alignItems="center" spacing={1}>
                <TouchAppIcon color="primary" />
                <Typography variant="body2">Touch</Typography>
              </Stack>
              <Stack alignItems="center" spacing={1}>
                <MouseIcon color="primary" />
                <Typography variant="body2">Mouse</Typography>
              </Stack>
              <Stack alignItems="center" spacing={1}>
                <KeyboardIcon color="primary" />
                <Typography variant="body2">Keyboard</Typography>
              </Stack>
              <Stack alignItems="center" spacing={1}>
                <GestureIcon color={enableTouchGestures ? "primary" : "disabled"} />
                <Typography variant="body2">Gestures</Typography>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* Motion Controls */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Motion Controls
              <Tooltip title="Motion controls can be disabled system-wide" arrow>
                <IconButton size="small" sx={{ ml: 1 }} aria-label="Motion controls information">
                  <ScreenRotationIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={useMotion}
                  onChange={(e) => handleMotionToggle(e.target.checked)}
                />
              }
              label="Enable motion controls"
            />
            {useMotion && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Tilt your device forward/backward to change the value
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            This demo implements WCAG 2.5 Input Modalities guidelines:
            <ul>
              <li>2.5.1 Pointer Gestures - All functionality can be operated with single-pointer actions</li>
              <li>2.5.2 Pointer Cancellation - Actions are completed on up-event and can be aborted</li>
              <li>2.5.3 Label in Name - Visual labels match their accessible names</li>
              <li>2.5.4 Motion Actuation - Functionality through motion can be disabled and has alternatives</li>
              <li>2.5.5 Target Size - Touch targets are at least 44x44 CSS pixels</li>
              <li>2.5.6 Concurrent Input Mechanisms - Content can be operated through multiple input methods</li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/2. Operable/2.5 Input Modalities',
  component: InputModalitiesDemo,
  parameters: {
    docs: {
      description: {
        component: `
## WCAG 2.5 Input Modalities
Make it easier for users to operate functionality through various inputs beyond keyboard.

### Overview
This component demonstrates best practices for supporting different input methods, ensuring content is accessible across various devices and interaction methods.

### Key Features
- Touch gestures
- Pointer cancellation
- Target sizing
- Motion actuation
- Character key shortcuts
- Label targeting

### Implementation Guidelines
1. Support various input methods:
   - Touch
   - Mouse
   - Pen/stylus
   - Voice
2. Ensure adequate target sizes
3. Allow gesture alternatives
4. Provide motion alternatives
5. Support pointer cancellation

### WCAG Success Criteria
- 2.5.1 Pointer Gestures (Level A)
- 2.5.2 Pointer Cancellation (Level A)
- 2.5.3 Label in Name (Level A)
- 2.5.4 Motion Actuation (Level A)
- 2.5.5 Target Size (Level AAA)
- 2.5.6 Concurrent Input Mechanisms (Level AAA)

### Best Practices
- Design for touch-first interaction
- Provide large enough touch targets
- Support both simple and complex gestures
- Allow input method switching
- Maintain consistent interaction patterns
`
      }
    }
  }
};

const Template: StoryFn<typeof InputModalitiesDemo> = (args) => <InputModalitiesDemo {...args} />;

export const BasicInput = Template.bind({});
BasicInput.args = {
  enableTouchGestures: false,
  showTargetSizing: false,
};
BasicInput.parameters = {
  docs: {
    description: {
      story: `
### Basic Input Features
Demonstrates fundamental input handling:
- Simple click/tap interactions
- Basic touch support
- Standard target sizes
- Simple pointer events
`
    }
  }
};

export const AdvancedInput = Template.bind({});
AdvancedInput.args = {
  enableTouchGestures: true,
  showTargetSizing: true,
};
AdvancedInput.parameters = {
  docs: {
    description: {
      story: `
### Advanced Input Features
Shows comprehensive input support:
- Complex touch gestures
- Optimized target sizing
- Motion-based interactions
- Multiple input methods
- Input method switching
`
    }
  }
}; 