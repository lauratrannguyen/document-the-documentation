import React, { useState } from 'react';
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
} from '@mui/material';

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
}

const InputAssistanceDemo = ({
  showHelperText,
  requireConfirmation,
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

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'username':
        if (value.length < 3) {
          return 'Username must be at least 3 characters long';
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return 'Username can only contain letters, numbers, and underscores';
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (value.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        if (!/[A-Z]/.test(value)) {
          return 'Password must contain at least one uppercase letter';
        }
        if (!/[0-9]/.test(value)) {
          return 'Password must contain at least one number';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          return 'Passwords do not match';
        }
        break;
      case 'accountType':
        if (!value) {
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
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (requireConfirmation) {
      setShowConfirmDialog(true);
    } else {
      // Submit form
      console.log('Form submitted:', formData);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Account Registration
        </Typography>

        {/* Form Instructions */}
        <Alert severity="info" sx={{ mb: 2 }}>
          All fields are required. Please review the information carefully before submitting.
        </Alert>

        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <TextField
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={showHelperText ? (errors.username || 'Use letters, numbers, and underscores') : errors.username}
              required
              fullWidth
              aria-describedby="username-helper-text"
            />

            <TextField
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={showHelperText ? (errors.email || 'Enter your email address') : errors.email}
              required
              fullWidth
              aria-describedby="email-helper-text"
            />

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
              required
              fullWidth
              aria-describedby="password-helper-text"
            />

            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={showHelperText ? (errors.confirmPassword || 'Re-enter your password') : errors.confirmPassword}
              required
              fullWidth
              aria-describedby="confirm-password-helper-text"
            />

            <FormControl 
              required 
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
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  name="terms"
                  required
                />
              }
              label="I agree to the terms and conditions"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!agreedToTerms}
            >
              Create Account
            </Button>
          </Stack>
        </form>

        {/* Confirmation Dialog */}
        <Dialog
          open={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          aria-labelledby="confirm-dialog-title"
        >
          <DialogTitle id="confirm-dialog-title">
            Confirm Registration
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please review your information:
              <Box component="ul" sx={{ mt: 2 }}>
                <li>Username: {formData.username}</li>
                <li>Email: {formData.email}</li>
                <li>Account Type: {formData.accountType}</li>
              </Box>
              Are you sure you want to create this account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowConfirmDialog(false)}>
              Go Back
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                console.log('Form submitted:', formData);
                setShowConfirmDialog(false);
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            This demo implements WCAG 3.3 Input Assistance guidelines:
            <ul>
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

export default {
  title: 'Accessibility/3. Understandable/3.3 Input Assistance',
  component: InputAssistanceDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 3.3 Input Assistance - Help users avoid and correct mistakes.'
      }
    }
  }
};

const Template: StoryFn<typeof InputAssistanceDemo> = (args) => <InputAssistanceDemo {...args} />;

export const BasicAssistance = Template.bind({});
BasicAssistance.args = {
  showHelperText: false,
  requireConfirmation: false,
};

export const FullAssistance = Template.bind({});
FullAssistance.args = {
  showHelperText: true,
  requireConfirmation: true,
}; 