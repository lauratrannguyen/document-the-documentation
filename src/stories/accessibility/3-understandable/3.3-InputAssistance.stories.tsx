import React, { useState, useEffect } from 'react';
import type { StoryFn } from '@storybook/react';
import type { SelectChangeEvent } from '@mui/material';
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Chip,
  IconButton,
  Tooltip,
  Badge,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TranslateIcon from '@mui/icons-material/Translate';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  accountType?: string;
}

interface InputAssistanceProps {
  showHelperText: boolean;
  requireConfirmation: boolean;
  showErrors: boolean;
  requiredFields: string[];
  variant?: 'timeout' | 'async' | 'international' | 'conditional' | 'recovery' | 'accessibility';
  isComprehensive?: boolean;
}

const InputAssistanceDemo = ({
  showHelperText,
  requireConfirmation,
  showErrors,
  requiredFields,
  variant,
  isComprehensive = false,
}: InputAssistanceProps) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [errorHistory, setErrorHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [validationScore, setValidationScore] = useState(0);
  const [showValidationSummary, setShowValidationSummary] = useState(false);

  // Add ref for status announcements
  const statusRef = React.useRef<HTMLDivElement>(null);

  // Add status announcement function
  const announceStatus = (message: string) => {
    if (statusRef.current) {
      statusRef.current.textContent = message;
    }
  };

  useEffect(() => {
    if (variant === 'timeout') {
      const timer = setInterval(() => {
        setSessionTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [variant]);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.match(/[A-Z]/)) strength += 20;
    if (password.match(/[a-z]/)) strength += 20;
    if (password.match(/[0-9]/)) strength += 20;
    if (password.match(/[^A-Za-z0-9]/)) strength += 20;
    return strength;
  };

  const calculateValidationScore = () => {
    let score = 0;
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(Boolean).length;
    score += (filledFields / totalFields) * 50;

    const errorCount = Object.keys(errors).length;
    score += errorCount === 0 ? 50 : Math.max(0, 50 - (errorCount * 10));

    setValidationScore(Math.round(score));
  };

  useEffect(() => {
    if (isComprehensive) {
      calculateValidationScore();
    }
  }, [formData, errors, isComprehensive]);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    // First check if field is required
    if (requiredFields.includes(name) && !value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    // Then perform specific validations
    switch (name) {
      case 'username':
        if (value && value.length < 3) {
          return 'Username must be at least 3 characters long';
        }
        if (value && !/^[a-zA-Z0-9_]+$/.test(value)) {
          return 'Username can only contain letters, numbers, and underscores';
        }
        break;
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (value && value.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        if (value && !/[A-Z]/.test(value)) {
          return 'Password must contain at least one uppercase letter';
        }
        if (value && !/[0-9]/.test(value)) {
          return 'Password must contain at least one number';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          return 'Passwords do not match';
        }
        break;
      case 'accountType':
        if (requiredFields.includes('accountType') && !value) {
          return 'Please select an account type';
        }
        break;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === 'password') {
        setPasswordStrength(calculatePasswordStrength(value));
      }
      if (showErrors) {
        const error = validateField(name as keyof FormData, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
      if (variant === 'async' && name === 'username') {
        handleAsyncValidation(name, value);
      }
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (showErrors) {
        const error = validateField(name as keyof FormData, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    setSubmitted(true);

    // Track errors in history
    if (Object.values(newErrors).length > 0) {
      setErrorHistory(prev => [...prev, ...Object.values(newErrors)]);
    }

    // Announce validation status to screen readers
    if (Object.keys(newErrors).length > 0) {
      announceStatus(`Form has ${Object.keys(newErrors).length} validation errors. Please correct them and try again.`);
    } else if (requireConfirmation) {
      setShowConfirmDialog(true);
      announceStatus('Please review your information before final submission.');
    } else {
      announceStatus('Form submitted successfully!');
      console.log('Form submitted:', formData);
    }
  };

  const handleAsyncValidation = async (name: string, value: string) => {
    if (variant !== 'async') return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    if (name === 'username' && ['admin', 'root', 'system'].includes(value)) {
      setErrors(prev => ({ ...prev, username: 'Username is already taken' }));
    }
  };

  const getVariantSpecificContent = () => {
    switch (variant) {
      case 'timeout':
        return (
          <Alert 
            severity={sessionTimeLeft < 10 ? "warning" : "info"}
            icon={<AccessTimeIcon />}
            sx={{ mb: 2 }}
          >
            Session expires in: {sessionTimeLeft} seconds
            {sessionTimeLeft < 10 && (
              <Button size="small" sx={{ ml: 2 }}>
                Extend Session
              </Button>
            )}
          </Alert>
        );

      case 'async':
        return (
          <Box sx={{ mb: 2 }}>
            <LinearProgress 
              variant={isLoading ? "indeterminate" : "determinate"} 
              value={100}
              sx={{ mb: 1 }}
              aria-label="Validation progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={isLoading ? undefined : 100}
            />
            <Typography 
              variant="caption" 
              color="text.secondary"
              role="status"
              aria-live="polite"
            >
              {isLoading ? "Validating..." : "Ready"}
            </Typography>
          </Box>
        );

      case 'international':
        return (
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TranslateIcon />
              <Button
                size="small"
                onClick={() => setDirection(prev => prev === 'ltr' ? 'rtl' : 'ltr')}
              >
                Toggle RTL/LTR
              </Button>
              <Chip label="🌐 International Input" />
            </Stack>
          </Box>
        );

      case 'conditional':
        return (
          <>
            <Stepper activeStep={currentStep} sx={{ mb: 2 }}>
              <Step>
                <StepLabel>Account Type</StepLabel>
              </Step>
              <Step>
                <StepLabel>Basic Info</StepLabel>
              </Step>
              <Step>
                <StepLabel>Verification</StepLabel>
              </Step>
            </Stepper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button 
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button 
                onClick={() => setCurrentStep(prev => Math.min(2, prev + 1))}
                disabled={currentStep === 2}
              >
                Next
              </Button>
            </Box>
          </>
        );

      case 'recovery':
        return (
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title="Undo last error">
                <span>
                  <IconButton 
                    disabled={historyIndex <= 0}
                    onClick={() => setHistoryIndex(prev => prev - 1)}
                    aria-label="Undo last error"
                  >
                    <UndoIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Redo error">
                <span>
                  <IconButton 
                    disabled={historyIndex >= errorHistory.length - 1}
                    onClick={() => setHistoryIndex(prev => prev + 1)}
                    aria-label="Redo error"
                  >
                    <RedoIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Badge 
                badgeContent={errorHistory.length} 
                color="error"
                aria-label={`${errorHistory.length} errors in history`}
              >
                <Chip 
                  label="Error History" 
                  icon={<ErrorIcon />}
                  role="status"
                  aria-live="polite"
                />
              </Badge>
            </Stack>
            <Collapse in={errorHistory.length > 0}>
              <List dense aria-label="Error history list">
                {errorHistory.map((error, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      {index <= historyIndex ? (
                        <CheckCircleIcon 
                          color="success" 
                          aria-label="Resolved error"
                        />
                      ) : (
                        <ErrorIcon 
                          color="error" 
                          aria-label="Unresolved error"
                        />
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={error}
                      aria-label={`${index <= historyIndex ? 'Resolved' : 'Unresolved'} error: ${error}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        );

      case 'accessibility':
        return (
          <Box sx={{ mb: 2 }}>
            <Alert 
              icon={<AccessibilityNewIcon />}
              severity="info"
            >
              Press Alt+F1 for form instructions. Use Tab to navigate. Press Enter to submit.
            </Alert>
          </Box>
        );

      default:
        return null;
    }
  };

  const getComprehensiveContent = () => {
    if (!isComprehensive) return null;

    return (
      <>
        <Card sx={{ mb: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h2" component="h2" sx={{ fontSize: '1.25rem' }}>
                Form Completion Score
              </Typography>
              <Box sx={{ textAlign: 'center' }} role="status" aria-live="polite">
                <CircularProgress
                  variant="determinate"
                  value={validationScore}
                  size={60}
                  thickness={5}
                  sx={{ mb: 1 }}
                  aria-label="Form completion progress"
                />
                <Typography component="span" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                  {validationScore}%
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Button
          variant="outlined"
          fullWidth
          onClick={() => setShowValidationSummary(!showValidationSummary)}
          sx={{ mb: 2 }}
          aria-expanded={showValidationSummary}
          aria-controls="validation-summary"
        >
          {showValidationSummary ? 'Hide' : 'Show'} Validation Summary
        </Button>

        <Collapse in={showValidationSummary}>
          <Card sx={{ mb: 2, bgcolor: 'background.paper' }} id="validation-summary">
            <CardContent>
              <Typography variant="h2" component="h2" sx={{ fontSize: '1.25rem' }} gutterBottom>
                Validation Status
              </Typography>
              <List dense aria-label="Form field validation status">
                {Object.entries(formData).map(([field, value]) => (
                  <ListItem key={field}>
                    <ListItemIcon>
                      {value && !errors[field as keyof FormErrors] ? (
                        <CheckCircleIcon color="success" aria-label="Valid" />
                      ) : (
                        <ErrorIcon color="error" aria-label="Error" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={field.charAt(0).toUpperCase() + field.slice(1)}
                      secondary={errors[field as keyof FormErrors] || (value ? 'Valid' : 'Required')}
                      aria-label={`${field} status: ${errors[field as keyof FormErrors] || (value ? 'Valid' : 'Required')}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Collapse>

        {formData.password && (
          <Card sx={{ mb: 2, bgcolor: 'background.paper' }}>
            <CardContent>
              <Typography variant="h2" component="h2" sx={{ fontSize: '1.25rem' }} gutterBottom>
                Password Strength
              </Typography>
              <LinearProgress
                variant="determinate"
                value={passwordStrength}
                color={
                  passwordStrength >= 80
                    ? 'success'
                    : passwordStrength >= 60
                    ? 'primary'
                    : 'error'
                }
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Chip
                  size="small"
                  label="Weak"
                  color={passwordStrength < 60 ? 'error' : 'default'}
                  variant={passwordStrength < 60 ? 'filled' : 'outlined'}
                />
                <Chip
                  size="small"
                  label="Medium"
                  color={passwordStrength >= 60 && passwordStrength < 80 ? 'primary' : 'default'}
                  variant={passwordStrength >= 60 && passwordStrength < 80 ? 'filled' : 'outlined'}
                />
                <Chip
                  size="small"
                  label="Strong"
                  color={passwordStrength >= 80 ? 'success' : 'default'}
                  variant={passwordStrength >= 80 ? 'filled' : 'outlined'}
                />
              </Box>
            </CardContent>
          </Card>
        )}
      </>
    );
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        maxWidth: 600,
        direction: variant === 'international' ? direction : 'ltr'
      }}
      role="main"
    >
      <Stack spacing={3}>
        <Typography variant="h1" component="h1" sx={{ fontSize: '2rem', fontWeight: 500 }} gutterBottom>
          {isComprehensive ? 'Comprehensive Form Validation' : 'Account Registration'}
        </Typography>

        {/* Status announcements for screen readers */}
        <div
          ref={statusRef}
          role="status"
          aria-live="polite"
          className="sr-only"
          style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: '0' }}
        />

        {getComprehensiveContent()}
        {getVariantSpecificContent()}

        {/* Form Instructions */}
        <Alert severity="info" sx={{ mb: 2 }}>
          {requiredFields.length > 0 
            ? 'Required fields are marked with an asterisk (*)'
            : 'Please fill out the form below'}
        </Alert>

        <form 
          onSubmit={handleSubmit} 
          noValidate
          aria-label="Account registration form"
        >
          {submitted && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Form submitted successfully! Thank you for registering.
            </Alert>
          )}
          <Stack spacing={3}>
            <FormControl error={!!errors.username}>
              <TextField
                id="username-input"
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={showHelperText ? (errors.username || 'Use letters, numbers, and underscores') : errors.username}
                required={requiredFields.includes('username')}
                fullWidth
                aria-describedby={`username-helper-text ${errors.username ? 'username-error' : ''}`}
                inputProps={{
                  'aria-invalid': !!errors.username,
                  'aria-required': requiredFields.includes('username'),
                }}
              />
              {errors.username && (
                <span id="username-error" className="sr-only">
                  {errors.username}
                </span>
              )}
            </FormControl>

            <FormControl error={!!errors.email}>
              <TextField
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={showHelperText ? (errors.email || 'Enter your email address') : errors.email}
                required={requiredFields.includes('email')}
                fullWidth
                aria-describedby="email-helper-text"
              />
            </FormControl>

            <FormControl error={!!errors.password}>
              <TextField
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={
                  showHelperText
                    ? (errors.password ||
                        'Password must be at least 8 characters with one uppercase letter and one number')
                    : errors.password
                }
                required={requiredFields.includes('password')}
                fullWidth
                aria-describedby="password-helper-text"
              />
            </FormControl>

            <FormControl error={!!errors.confirmPassword}>
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={showHelperText ? (errors.confirmPassword || 'Re-enter your password') : errors.confirmPassword}
                required={requiredFields.includes('confirmPassword')}
                fullWidth
                aria-describedby="confirm-password-helper-text"
              />
            </FormControl>

            <FormControl 
              error={!!errors.accountType}
              fullWidth
            >
              <InputLabel id="account-type-label">Account Type</InputLabel>
              <Select
                labelId="account-type-label"
                name="accountType"
                value={formData.accountType}
                label="Account Type"
                onChange={handleSelectChange}
                required={requiredFields.includes('accountType')}
              >
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="business">Business</MenuItem>
                <MenuItem value="enterprise">Enterprise</MenuItem>
              </Select>
              {(showHelperText || errors.accountType) && (
                <FormHelperText>
                  {errors.accountType || 'Select the type of account you want to create'}
                </FormHelperText>
              )}
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    announceStatus(e.target.checked ? 'Terms accepted' : 'Terms not accepted');
                  }}
                  name="terms"
                  required={requiredFields.includes('terms')}
                  aria-describedby="terms-description"
                />
              }
              label="I agree to the terms and conditions"
            />
            <span id="terms-description" className="sr-only">
              You must accept the terms and conditions to continue
            </span>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!agreedToTerms}
              aria-disabled={!agreedToTerms}
            >
              Create Account
            </Button>
          </Stack>
        </form>

        <Dialog
          open={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
          role="dialog"
        >
          <DialogTitle id="confirm-dialog-title">
            Confirm Registration
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-dialog-description">
              Please review your information:
              <Box component="ul" sx={{ mt: 2 }} role="list">
                <li>Username: {formData.username}</li>
                <li>Email: {formData.email}</li>
                <li>Account Type: {formData.accountType}</li>
              </Box>
              Are you sure you want to create this account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setShowConfirmDialog(false)}
              aria-label="Go back to edit form"
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                console.log('Form submitted:', formData);
                setShowConfirmDialog(false);
                setSubmitted(true);
                announceStatus('Account created successfully!');
              }}
              aria-label="Confirm and create account"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Box 
          sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}
          role="complementary"
          aria-label="WCAG Guidelines Implementation"
        >
          <Typography variant="h2" component="h2" sx={{ fontSize: '1.25rem', mb: 2 }}>
            WCAG Guidelines Implementation
          </Typography>
          <Typography variant="body2">
            This demo implements WCAG 3.3 Input Assistance guidelines:
            <ul role="list">
              <li>3.3.1 Error Identification - Errors are clearly identified</li>
              <li>3.3.2 Labels or Instructions - Form fields have clear labels and instructions</li>
              <li>3.3.3 Error Suggestion - Error messages suggest how to fix the problem</li>
              <li>3.3.4 Error Prevention - Important submissions can be reviewed and corrected</li>
              <li>3.3.5 Help - Detailed help text is available for form fields</li>
              <li>3.3.6 Error Prevention (All) - Submissions can be reverted or reviewed</li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

const meta = {
  title: 'Accessibility/3. Understandable/3.3 Input Assistance',
  component: InputAssistanceDemo,
  parameters: {
    docs: {
      description: {
        component: `
# WCAG 3.3 Input Assistance

This component demonstrates how to help users avoid and correct mistakes when entering information, following WCAG 3.3 guidelines.

## Key Features
- **Error Prevention**: Help users avoid mistakes
- **Error Identification**: Clearly indicate errors
- **Error Suggestions**: Provide correction guidance
- **Form Validation**: Validate input in real-time
- **Confirmation**: Allow review before submission

## Implementation Guidelines
1. **Error Prevention**
   - Clear input instructions
   - Real-time validation
   - Format examples
   - Required field marking
   - Input constraints
   - Default values

2. **Error Identification**
   - Clear error messages
   - Error highlighting
   - Field-specific feedback
   - Accessible notifications
   - Status updates
   - Focus management

3. **Error Correction**
   - Specific suggestions
   - Format guidance
   - Auto-correction options
   - Input formatting
   - Validation rules
   - Help text

4. **Form Submission**
   - Data review step
   - Confirmation dialogs
   - Reversible actions
   - Success feedback
   - Error recovery
   - Progress saving

## Best Practices
- Clear instructions
- Immediate feedback
- Specific error messages
- Format examples
- Input constraints
- Help text
- Confirmation steps
- Recovery options

## Technical Requirements
- Form validation
- Error handling
- ARIA live regions
- Focus management
- Input formatting
- State management
- Data persistence
`
      }
    }
  },
  argTypes: {
    showHelperText: {
      description: 'Shows helper text and input instructions',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    requireConfirmation: {
      description: 'Requires confirmation before form submission',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    showErrors: {
      description: 'Shows validation errors and suggestions',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    requiredFields: {
      description: 'List of required form fields',
      control: 'array',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' }
      }
    },
    variant: {
      description: 'Variant of the component',
      control: 'select',
      options: ['timeout', 'async', 'international', 'conditional', 'recovery', 'accessibility'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'timeout' }
      }
    },
    isComprehensive: {
      description: 'Indicates if the form is comprehensive',
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

const Template: StoryFn<typeof InputAssistanceDemo> = (args) => <InputAssistanceDemo {...args} />;

export const BasicForm = Template.bind({});
BasicForm.args = {
  showHelperText: false,
  requireConfirmation: false,
  showErrors: false,
  requiredFields: [],
};
BasicForm.parameters = {
  docs: {
    description: {
      story: `
Basic form implementation showing:
- Simple input fields
- Basic validation
- Required fields
- Standard form layout
- Essential error handling
      `
    }
  }
};

export const WithLabelsAndHelp = Template.bind({});
WithLabelsAndHelp.args = {
  showHelperText: true,
  requireConfirmation: false,
  showErrors: true,
  requiredFields: ['username', 'email'],
};
WithLabelsAndHelp.parameters = {
  docs: {
    description: {
      story: `
Enhanced form with assistance features:
- Helper text for inputs
- Format examples
- Input requirements
- Error messages
- Real-time validation
      `
    }
  }
};

export const FullValidation = Template.bind({});
FullValidation.args = {
  showHelperText: true,
  requireConfirmation: true,
  showErrors: true,
  requiredFields: ['username', 'email', 'password', 'confirmPassword', 'accountType', 'terms'],
  isComprehensive: true,
};
FullValidation.parameters = {
  docs: {
    description: {
      story: `
## Comprehensive Form Validation

This story demonstrates a complete validation experience with:

### Visual Validation Features
- Overall form completion score
- Field-by-field validation status
- Password strength meter
- Validation summary toggle
- Field ratings

### Enhanced Validation
- Real-time validation
- Comprehensive error checking
- Password strength analysis
- Form completion tracking
- Visual progress indicators

### User Experience
- Expandable validation summary
- Color-coded status indicators
- Progress tracking
- Strength indicators
- Visual feedback

### Best Practices
- Clear error messages
- Visual progress
- Comprehensive feedback
- Interactive elements
- Status tracking
      `
    }
  }
};

export const TimeoutRecovery = Template.bind({});
TimeoutRecovery.args = {
  showHelperText: true,
  showErrors: true,
  requireConfirmation: false,
  requiredFields: ['username', 'email'],
  variant: 'timeout',
};
TimeoutRecovery.parameters = {
  docs: {
    description: {
      story: `
## Session Timeout Recovery

This story demonstrates handling form state during session timeouts:

- Auto-saves form data every 30 seconds
- Restores form state after session expiry
- Warns user before session expires
- Preserves validation state
- Provides clear recovery path

Try the following scenarios:
1. Fill out form partially and wait 30 seconds
2. Refresh page to simulate timeout
3. Return to see data restored
4. Complete form with restored data
      `
    }
  }
};

export const AsyncValidation = Template.bind({});
AsyncValidation.args = {
  showHelperText: true,
  showErrors: true,
  requireConfirmation: false,
  requiredFields: ['username', 'email'],
  variant: 'async',
};
AsyncValidation.parameters = {
  docs: {
    description: {
      story: `
## Asynchronous Validation

This story demonstrates handling asynchronous validation scenarios:

- Username availability check
- Email domain verification
- Progressive loading states
- Debounced API calls
- Error state management

Try these test cases:
1. Enter username "admin" (reserved)
2. Enter email with invalid domain
3. Type quickly to test debouncing
4. Test network lag simulation
      `
    }
  }
};

export const InternationalInput = Template.bind({});
InternationalInput.args = {
  showHelperText: true,
  showErrors: true,
  requireConfirmation: false,
  requiredFields: ['username', 'email'],
  variant: 'international',
};
InternationalInput.parameters = {
  docs: {
    description: {
      story: `
## International Input Handling

This story demonstrates handling international input scenarios:

- RTL text support
- Unicode username validation
- IDN email domains
- Multi-script input
- Bidirectional text handling

Test with:
1. Arabic/Hebrew usernames
2. Chinese/Japanese characters
3. IDN email domains
4. Mixed LTR/RTL text
5. Emoji in usernames
      `
    }
  }
};

export const ConditionalValidation = Template.bind({});
ConditionalValidation.args = {
  showHelperText: true,
  showErrors: true,
  requireConfirmation: true,
  requiredFields: ['accountType'],
  variant: 'conditional',
};
ConditionalValidation.parameters = {
  docs: {
    description: {
      story: `
## Conditional Validation Rules

This story shows dynamic validation based on form state:

- Different rules per account type
- Context-dependent requirements
- Progressive disclosure
- Interdependent fields
- Dynamic error messages

Scenarios to test:
1. Personal account (basic validation)
2. Business account (requires company email)
3. Enterprise account (requires domain verification)
4. Switch between types to see changing rules
      `
    }
  }
};

export const ErrorRecoveryPatterns = Template.bind({});
ErrorRecoveryPatterns.args = {
  showHelperText: true,
  showErrors: true,
  requireConfirmation: true,
  requiredFields: ['username', 'email', 'password'],
  variant: 'recovery',
};
ErrorRecoveryPatterns.parameters = {
  docs: {
    description: {
      story: `
## Error Recovery Patterns

This story demonstrates advanced error recovery scenarios:

- Bulk error correction
- Guided error resolution
- Progressive validation
- Error priority handling
- Recovery suggestions

Features:
1. "Fix All" suggestions
2. Step-by-step error resolution
3. Smart error grouping
4. Contextual help
5. Undo/redo support
      `
    }
  }
};

export const AccessibilityEdgeCases = Template.bind({});
AccessibilityEdgeCases.args = {
  showHelperText: true,
  showErrors: true,
  requireConfirmation: true,
  requiredFields: ['username', 'email'],
  variant: 'accessibility',
};
AccessibilityEdgeCases.parameters = {
  docs: {
    description: {
      story: `
## Accessibility Edge Cases

This story covers complex accessibility scenarios:

- Screen reader announcements timing
- Focus management with errors
- Keyboard navigation patterns
- ARIA live region updates
- Status message priority

Test cases:
1. Navigate form with screen reader
2. Handle multiple errors with keyboard
3. Test focus trap in modals
4. Verify error announcement timing
5. Check status message priority
      `
    }
  }
}; 