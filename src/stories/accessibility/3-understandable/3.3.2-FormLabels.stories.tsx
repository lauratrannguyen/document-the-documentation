import React, { useState } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  FormHelperText,
  Stack,
  Alert
} from '@mui/material';

interface FormLabelsProps {
  showErrors: boolean;
  requiredFields: string[];
}

const FormLabelsDemo = ({ showErrors, requiredFields }: FormLabelsProps) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    if (requiredFields.includes(name) && !value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      return 'Please enter a valid email address';
    }
    if (name === 'password' && value && value.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (showErrors) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    setSubmitted(true);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <Stack spacing={3}>
        <Typography variant="h6">
          Form with Accessible Labels
        </Typography>

        {submitted && Object.keys(errors).length === 0 && (
          <Alert severity="success">Form submitted successfully!</Alert>
        )}

        <FormControl error={!!errors.username}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            required={requiredFields.includes('username')}
            aria-describedby="username-helper-text"
            fullWidth
          />
          <FormHelperText id="username-helper-text">
            {errors.username || 'Enter your username'}
          </FormHelperText>
        </FormControl>

        <FormControl error={!!errors.email}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            required={requiredFields.includes('email')}
            aria-describedby="email-helper-text"
            fullWidth
          />
          <FormHelperText id="email-helper-text">
            {errors.email || 'Enter your email address'}
          </FormHelperText>
        </FormControl>

        <FormControl error={!!errors.password}>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            required={requiredFields.includes('password')}
            aria-describedby="password-helper-text"
            fullWidth
          />
          <FormHelperText id="password-helper-text">
            {errors.password || 'Password must be at least 8 characters long'}
          </FormHelperText>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default {
  title: 'Accessibility/3. Understandable/3.3.2 Form Labels',
  component: FormLabelsDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 3.3.2 Labels or Instructions - Labels or instructions are provided when content requires user input.'
      }
    }
  }
};

const Template: StoryFn<typeof FormLabelsDemo> = (args) => <FormLabelsDemo {...args} />;

export const BasicLabels = Template.bind({});
BasicLabels.args = {
  showErrors: false,
  requiredFields: []
};

export const WithValidation = Template.bind({});
WithValidation.args = {
  showErrors: true,
  requiredFields: ['username', 'email', 'password']
}; 