import React, { useState, useEffect } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  TextField,
  Tooltip,
  FormControlLabel,
  Switch,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Divider,
  Chip,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import InfoIcon from '@mui/icons-material/Info';
import ImageIcon from '@mui/icons-material/Image';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VideocamIcon from '@mui/icons-material/Videocam';
import WarningIcon from '@mui/icons-material/Warning';
import SecurityIcon from '@mui/icons-material/Security';
import FunctionsIcon from '@mui/icons-material/Functions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import DescriptionIcon from '@mui/icons-material/Description';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

interface DecorativeExample {
  type: 'border' | 'circle' | 'separator';
  description: string;
  usage: string;
}

const BasicTextAlternativesDemo = () => {
  const [showDescriptions, setShowDescriptions] = useState(false);

  const simpleImage = {
    src: 'https://source.unsplash.com/random/345x140/?nature',
    alt: 'A beautiful nature landscape showing mountains and trees',
  };

  const decorativeExamples: DecorativeExample[] = [
    {
      type: 'border',
      description: 'Purely decorative border or divider',
      usage: 'Empty alt="" and role="presentation"'
    },
    {
      type: 'circle',
      description: 'Background accent circle',
      usage: 'CSS background-image or empty alt'
    },
    {
      type: 'separator',
      description: 'Visual separator between sections',
      usage: 'aria-hidden="true" or role="presentation"'
    }
  ];

  const renderDecorativeElement = (example: DecorativeExample) => {
    switch (example.type) {
      case 'border':
        return (
          <Box
            role="presentation"
            aria-hidden="true"
            sx={{
              width: '100%',
              height: '100px',
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: 1,
              bgcolor: 'background.paper',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              typography: 'subtitle1',
              color: 'text.secondary'
            }}
          >
            Decorative Border
          </Box>
        );
      case 'circle':
        return (
          <Box
            role="presentation"
            aria-hidden="true"
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: '#FFC926',
            }}
          />
        );
      case 'separator':
        return (
          <Box
            sx={{
              width: '200px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Divider
              role="presentation"
              aria-hidden="true"
              sx={{
                borderColor: 'black',
                borderWidth: 1,
                width: '100%'
              }}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography 
          component="h1" 
          variant="h4" 
          gutterBottom
        >
          Basic Text Alternatives Guide
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Key Principle</AlertTitle>
          Provide text alternatives for non-text content that serves the equivalent purpose, allowing information to be rendered in different forms to match users' needs.
        </Alert>

        {/* Examples Section */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Common Scenarios:
          </Typography>
          <Stack spacing={2}>
            {/* Informative Image Example */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="subtitle1" 
                gutterBottom
              >
                1. Informative Images
              </Typography>
              <Box>
                <CardMedia
                  component="img"
                  height="140"
                  image={simpleImage.src}
                  alt={simpleImage.alt}
                  sx={{ borderRadius: 1, mb: 2 }}
                />
                <Alert severity="success" sx={{ mb: 1 }}>
                  <strong>Alt text:</strong> "{simpleImage.alt}"
                </Alert>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.primary',
                    mt: 1 
                  }}
                >
                  This image provides content, so it needs clear, concise alt text describing its purpose.
                </Typography>
              </Box>
            </Paper>

            {/* Decorative Images Example */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="subtitle1" 
                gutterBottom
              >
                2. Decorative Images
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                Decorative images are purely aesthetic and don't convey meaning or functionality.
                They should be hidden from assistive technology to avoid unnecessary noise.
              </Alert>
              <Stack spacing={2}>
                {decorativeExamples.map((example, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'grey.100',
                      borderRadius: 1 
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ 
                        width: 'auto',
                        flex: 'none'
                      }}>
                        {renderDecorativeElement(example)}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          {example.description}
                        </Typography>
                        <Chip
                          label={example.usage}
                          size="small"
                          color="primary"
                          sx={{ 
                            mb: 1,
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            '& .MuiChip-label': {
                              color: 'inherit'
                            }
                          }}
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.primary'
                          }}
                        >
                          When this image is {example.description.toLowerCase()}, it adds visual interest
                          but doesn't convey information, so it should be hidden from screen readers.
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Stack>
              <Alert severity="warning" sx={{ mt: 2 }}>
                <AlertTitle>Common Mistake</AlertTitle>
                Don't use empty alt text for images that convey information or have functional purposes.
                Only use it for purely decorative elements.
              </Alert>
            </Paper>

            {/* Functional Image Example */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="subtitle1" 
                gutterBottom
              >
                3. Functional Images
              </Typography>
              <Box>
                <Button
                  startIcon={<ImageIcon />}
                  variant="contained"
                  aria-label="Upload image"
                >
                  Upload
                </Button>
                <Alert severity="success" sx={{ mt: 2, mb: 1 }}>
                  <strong>Implementation:</strong> aria-label="Upload image"
                </Alert>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.primary'
                  }}
                >
                  Icons used as controls need alt text describing their function, not their appearance.
                  Here, we use aria-label to describe the action the button performs.
                </Typography>
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography 
                    component="h4" 
                    variant="subtitle2" 
                    gutterBottom
                  >
                    More Examples:
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconButton 
                        aria-label="Play audio"
                        sx={{ 
                          color: 'primary.main'
                        }}
                      >
                        <PlayArrowIcon />
                      </IconButton>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.primary'
                        }}
                      >
                        aria-label="Play audio"
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconButton 
                        aria-label="Close dialog"
                        sx={{ 
                          color: 'error.main'
                        }}
                      >
                        <WarningIcon />
                      </IconButton>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.primary'
                        }}
                      >
                        aria-label="Close dialog"
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconButton 
                        aria-label="Show more information"
                        sx={{ 
                          color: 'info.main'
                        }}
                      >
                        <InfoIcon />
                      </IconButton>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.primary'
                        }}
                      >
                        aria-label="Show more information"
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Alert severity="info" sx={{ mt: 2 }}>
                  <AlertTitle>Best Practice</AlertTitle>
                  <Typography variant="body2">
                    When writing aria-labels for functional images:
                    <ul style={{ margin: '0.5rem 0 0 1.5rem' }}>
                      <li>Use action verbs (e.g., "Upload", "Play", "Close")</li>
                      <li>Be concise but descriptive</li>
                      <li>Focus on the function, not the visual appearance</li>
                      <li>Consider the context where the control appears</li>
                    </ul>
                  </Typography>
                </Alert>
              </Box>
            </Paper>
          </Stack>
        </Box>

        <Divider />

        {/* Implementation Guidelines */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Implementation Requirements
          </Typography>
          <List>
            {[
              'Use alt text that conveys the purpose/meaning, not just a description',
              'Keep alt text concise (generally under 125 characters)',
              'Use empty alt text and role="presentation" for decorative images',
              'Ensure functional images describe their action',
              'Test with screen readers to verify effectiveness',
              'Consider the context when writing alt text'
            ].map((item) => (
              <ListItem key={item}>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary={item}
                  primaryTypographyProps={{
                    color: 'text.primary'
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Edge Cases and Considerations */}
        <Alert severity="warning">
          <AlertTitle>Common Pitfalls</AlertTitle>
          <Typography variant="body2" component="div">
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Don't include "image of" or "picture of" in alt text - screen readers already announce this</li>
              <li>Don't duplicate alt text in adjacent text content</li>
              <li>Don't leave alt text undefined (alt={undefined}) - use empty string for decorative images</li>
            </ul>
          </Typography>
        </Alert>

        {/* Quality Checklist */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Quality Checklist
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'text.primary' }}><strong>Scenario</strong></TableCell>
                  <TableCell sx={{ color: 'text.primary' }}><strong>Requirements</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    scenario: 'Informative Images',
                    requirements: 'Clear, concise alt text that conveys the image\'s purpose'
                  },
                  {
                    scenario: 'Decorative Images',
                    requirements: 'Empty alt text and role="presentation"'
                  },
                  {
                    scenario: 'Functional Images',
                    requirements: 'Alt text describes the action, not the visual'
                  },
                  {
                    scenario: 'Image Links',
                    requirements: 'Alt text indicates destination or purpose'
                  }
                ].map((row) => (
                  <TableRow key={row.scenario}>
                    <TableCell sx={{ color: 'text.primary' }}>{row.scenario}</TableCell>
                    <TableCell sx={{ color: 'text.primary' }}>{row.requirements}</TableCell>
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

const ComplexContentDemo = () => {
  const [showDescriptions, setShowDescriptions] = useState(false);

  const demoChart = {
    src: 'https://via.placeholder.com/400x300/2196f3/ffffff?text=Sales+Chart',
    alt: 'Bar chart showing monthly sales data for 2023',
    longDesc: 'A vertical bar chart displaying monthly sales figures for 2023. The x-axis shows months from January to December, while the y-axis shows sales values from 0 to 100,000 dollars. There is a clear upward trend, with peak sales in July at 85,000 dollars. The lowest sales were in February at 20,000 dollars.'
  };

  const salesData = [
    { month: 'Jan', sales: 45000 },
    { month: 'Feb', sales: 20000 },
    { month: 'Mar', sales: 52000 },
    { month: 'Apr', sales: 61000 },
    { month: 'May', sales: 73000 },
    { month: 'Jun', sales: 78000 },
    { month: 'Jul', sales: 85000 },
    { month: 'Aug', sales: 82000 },
    { month: 'Sep', sales: 69000 },
    { month: 'Oct', sales: 71000 },
    { month: 'Nov', sales: 77000 },
    { month: 'Dec', sales: 83000 }
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography 
          component="h1" 
          variant="h4" 
          gutterBottom
        >
          Complex Content Accessibility Guide
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Key Principle</AlertTitle>
          Complex content requires multiple layers of text alternatives to ensure all users can understand the information, regardless of how they consume it.
        </Alert>

        {/* Examples Section */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Implementation Examples:
          </Typography>
          <Stack spacing={2}>
            {/* Data Visualization Example */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="subtitle1" 
                gutterBottom
              >
                1. Data Visualization
              </Typography>
              <Box>
                <CardMedia
                  component="img"
                  image={demoChart.src}
                  alt={demoChart.alt}
                  sx={{ width: '100%', height: 'auto', borderRadius: 1, mb: 2 }}
                  aria-describedby="chart-data-table"
                />
                <Stack spacing={2}>
                  <Alert severity="success">
                    <AlertTitle>Layered Accessibility</AlertTitle>
                    <Typography variant="body2" component="div">
                      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                        <li><strong>Short alt text:</strong> "{demoChart.alt}"</li>
                        <li><strong>Long description:</strong> Available via aria-describedby</li>
                        <li><strong>Data table:</strong> Provides structured access to the data</li>
                      </ul>
                    </Typography>
                  </Alert>
                  
                  <TableContainer component={Paper} variant="outlined" id="chart-data-table">
                    <Table size="small" aria-label="Monthly sales data for 2023">
                      <TableHead>
                        <TableRow>
                          <TableCell>Month</TableCell>
                          <TableCell align="right">Sales ($)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {salesData.map((row) => (
                          <TableRow key={row.month}>
                            <TableCell component="th" scope="row">{row.month}</TableCell>
                            <TableCell align="right">${row.sales.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              </Box>
            </Paper>

            {/* Mathematical Content Example */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="subtitle1" 
                gutterBottom
              >
                2. Mathematical Content
              </Typography>
              <Box>
                <Box sx={{ textAlign: 'center', my: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IndoaXRlIi8+CiAgPHRleHQgeD0iMTAwIiB5PSI0NSIgZm9udC1mYW1pbHk9InNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjMzMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5hwrIgKyBiwrIgPSBjwrI8L3RleHQ+Cjwvc3ZnPg=="
                    alt="Pythagorean theorem: a squared plus b squared equals c squared"
                    title="The fundamental theorem relating the sides of a right triangle"
                  />
                </Box>
                <Stack spacing={2}>
                  <Alert severity="success">
                    <AlertTitle>Multiple Representations</AlertTitle>
                    <Typography variant="body2" component="div">
                      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                        <li><strong>Text:</strong> "a squared plus b squared equals c squared"</li>
                        <li><strong>LaTeX:</strong> a^2 + b^2 = c^2</li>
                        <li><strong>MathML:</strong> Structured mathematical markup</li>
                      </ul>
                    </Typography>
                  </Alert>
                </Stack>
              </Box>
            </Paper>
          </Stack>
        </Box>

        <Divider />

        {/* Implementation Guidelines */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Implementation Requirements
          </Typography>
          <List>
            {[
              'Provide short alt text for quick understanding',
              'Include detailed descriptions for complex visuals',
              'Offer structured data alternatives (e.g., tables)',
              'Use appropriate semantic markup (e.g., MathML)',
              'Ensure all interactive elements are keyboard accessible',
              'Test with different assistive technologies'
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

        {/* Edge Cases and Considerations */}
        <Alert severity="warning">
          <AlertTitle>Important Considerations</AlertTitle>
          <Typography variant="body2" component="div">
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Complex images may require multiple accessibility techniques combined</li>
              <li>Consider providing downloadable data in accessible formats</li>
              <li>Use semantic HTML and ARIA attributes appropriately</li>
              <li>Test with users who rely on different assistive technologies</li>
            </ul>
          </Typography>
        </Alert>

        {/* Quality Checklist */}
        <Box sx={{ mt: 2 }}>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Quality Checklist
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Content Type</strong></TableCell>
                  <TableCell><strong>Requirements</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    type: 'Data Visualizations',
                    requirements: 'Short alt text, long description, and structured data alternative'
                  },
                  {
                    type: 'Mathematical Content',
                    requirements: 'Multiple text representations and semantic markup (MathML when possible)'
                  },
                  {
                    type: 'Interactive Charts',
                    requirements: 'Keyboard accessibility, ARIA labels, and text alternatives for all states'
                  },
                  {
                    type: 'Infographics',
                    requirements: 'Logical reading order, structured content, and comprehensive text alternative'
                  }
                ].map((row) => (
                  <TableRow key={row.type}>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.requirements}</TableCell>
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

const CAPTCHAGuidanceDemo = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" gutterBottom>
          CAPTCHA Accessibility Guidelines
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Key Principle</AlertTitle>
          Always provide multiple ways to verify that the user is human, ensuring at least one method is accessible to users with different abilities.
        </Alert>

        <Box>
          <Typography variant="h6" gutterBottom>
            Example Alternative Methods:
          </Typography>
          <Stack spacing={2} sx={{ ml: 2 }}>
            {[
              {
                icon: <AudiotrackIcon />,
                label: 'Audio Alternative',
                description: 'Provide an audio version of visual CAPTCHAs'
              },
              {
                icon: <FunctionsIcon />,
                label: 'Logic Questions',
                description: 'Simple math or logic problems (e.g., "What is 3 + 4?")'
              },
              {
                icon: <SecurityIcon />,
                label: 'Modern Solutions',
                description: 'Consider invisible verification like reCAPTCHA v3'
              }
            ].map((method) => (
              <Paper key={method.label} variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {method.icon}
                  <Box>
                    <Typography variant="subtitle1">{method.label}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {method.description}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Implementation Checklist
          </Typography>
          <List>
            {[
              'Provide clear instructions for each verification method',
              'Ensure all alternatives are equally secure',
              'Support keyboard navigation',
              'Use proper ARIA labels',
              'Test with screen readers',
              'Consider mobile accessibility'
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

        <Alert severity="warning">
          <AlertTitle>Important Note</AlertTitle>
          Traditional visual CAPTCHAs can be a significant barrier for users with visual impairments. 
          Consider using modern alternatives like token-based verification or behavioral analysis when possible.
        </Alert>
      </Stack>
    </Paper>
  );
};

const VideoGuidanceDemo = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" gutterBottom>
          Video Content Accessibility Guidelines
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Key Principle</AlertTitle>
          Ensure video content is accessible to all users by providing multiple ways to consume and understand the content.
        </Alert>

        <Box>
          <Typography variant="h6" gutterBottom>
            Essential Components:
          </Typography>
          <Stack spacing={2} sx={{ ml: 2 }}>
            {[
              {
                icon: <ClosedCaptionIcon />,
                label: 'Captions',
                description: 'Synchronized text alternatives for spoken dialogue and important sounds'
              },
              {
                icon: <DescriptionIcon />,
                label: 'Transcript',
                description: 'Text document containing all audio content and important visual information'
              },
              {
                icon: <RecordVoiceOverIcon />,
                label: 'Audio Description',
                description: 'Narration of important visual content for blind users'
              }
            ].map((method) => (
              <Paper key={method.label} variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {method.icon}
                  <Box>
                    <Typography variant="subtitle1">{method.label}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {method.description}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Implementation Requirements
          </Typography>
          <List>
            {[
              'Captions must be synchronized with the video',
              'Transcripts should include both audio and visual information',
              'Audio descriptions should be available when important visual content is not conveyed through audio',
              'Provide a keyboard-accessible video player',
              'Include proper controls for captions and audio descriptions',
              'Ensure high contrast for captions'
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

        <Alert severity="warning">
          <AlertTitle>Important Considerations</AlertTitle>
          <Typography variant="body2" component="div">
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Auto-generated captions alone do not meet WCAG requirements</li>
              <li>Consider providing a sign language version for content primarily aimed at deaf users</li>
              <li>Ensure video player controls are accessible via keyboard and screen readers</li>
            </ul>
          </Typography>
        </Alert>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Quality Checklist
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Component</strong></TableCell>
                  <TableCell><strong>Requirements</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    component: 'Captions',
                    requirements: 'Accurate, synchronized, and include speaker identification and important sounds'
                  },
                  {
                    component: 'Transcript',
                    requirements: 'Complete, properly formatted, and includes relevant visual information'
                  },
                  {
                    component: 'Audio Description',
                    requirements: 'Describes important visual content without overlapping dialogue'
                  },
                  {
                    component: 'Video Player',
                    requirements: 'Keyboard accessible, screen reader friendly, with adjustable playback speed'
                  }
                ].map((row) => (
                  <TableRow key={row.component}>
                    <TableCell>{row.component}</TableCell>
                    <TableCell>{row.requirements}</TableCell>
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

// Story Templates
const BasicTemplate: StoryFn<typeof BasicTextAlternativesDemo> = () => <BasicTextAlternativesDemo />;
const ComplexTemplate: StoryFn<typeof ComplexContentDemo> = () => <ComplexContentDemo />;
const CAPTCHATemplate: StoryFn<typeof CAPTCHAGuidanceDemo> = () => <CAPTCHAGuidanceDemo />;
const VideoTemplate: StoryFn<typeof VideoGuidanceDemo> = () => <VideoGuidanceDemo />;

export default {
  title: 'Accessibility/1. Perceivable/1.1 Text Alternatives',
  parameters: {
    docs: {
      description: {
        component: `
          # WCAG 1.1 Text Alternatives
          
          This guide demonstrates implementations of WCAG 1.1 Text Alternatives guidelines, which require providing text alternatives for any non-text content.
          
          ## Key Requirements
          - All non-text content must have text alternatives that serve equivalent purpose
          - Decorative content should be implemented to be ignored by assistive technology
          - Live content must have text alternatives that update
          - Complex content (charts, diagrams) must have detailed descriptions
          
          ## Reference
          [WCAG 2.2 - 1.1 Text Alternatives](https://www.w3.org/TR/WCAG22/#text-alternatives)
        `
      }
    }
  }
};

// Story Exports
export const BasicUsage = BasicTemplate.bind({});
BasicUsage.parameters = {
  docs: {
    description: {
      story: `
        # Basic Text Alternatives
        
        This guide demonstrates fundamental implementation of text alternatives for common scenarios.
        
        ## Key Concepts
        1. **Purpose Over Description**: Alt text should convey meaning, not just describe visuals
        2. **Context Matters**: The same image might need different alt text in different contexts
        3. **Decorative vs Functional**: Different approaches for different image roles
        
        ## Best Practices
        - Write alt text that serves the same purpose as the image
        - Use empty alt text for decorative images
        - Keep descriptions concise and meaningful
        - Test with screen readers
      `
    }
  }
};

export const ComplexContent = ComplexTemplate.bind({});
ComplexContent.parameters = {
  docs: {
    description: {
      story: `
        # Complex Content Accessibility
        
        This guide demonstrates how to make complex content accessible through multiple techniques.
        
        ## Key Concepts
        1. **Layered Approach**: Provide multiple ways to understand the content
        2. **Structured Alternatives**: Use semantic markup and structured data
        3. **Progressive Enhancement**: Start with basic text and enhance with visual elements
        
        ## Best Practices
        - Combine multiple accessibility techniques
        - Provide structured data alternatives
        - Use appropriate semantic markup
        - Test with different assistive technologies
      `
    }
  }
};

export const CAPTCHAGuidance = CAPTCHATemplate.bind({});
CAPTCHAGuidance.parameters = {
  docs: {
    description: {
      story: `
        # Implementing Accessible CAPTCHAs
        
        CAPTCHAs present unique accessibility challenges. This guide demonstrates best practices for implementing accessible verification methods.
        
        ## Key Principles
        1. **Multiple Methods**: Always provide alternative verification methods
        2. **Equal Access**: Ensure each method is equally usable and secure
        3. **Clear Instructions**: Provide clear guidance for each verification option
        4. **Modern Alternatives**: Consider using modern solutions that don't rely on visual puzzles
        
        ## Resources
        - [W3C CAPTCHA Alternatives](https://www.w3.org/WAI/GL/wiki/Captcha_Alternatives_and_thoughts)
        - [WCAG 2.2 Success Criterion 1.1.1](https://www.w3.org/TR/WCAG22/#non-text-content)
      `
    }
  }
};

export const VideoGuidance = VideoTemplate.bind({});
VideoGuidance.parameters = {
  docs: {
    description: {
      story: `
        # Video Content Accessibility
        
        This guide outlines the requirements and best practices for making video content accessible according to WCAG 2.2 guidelines.
        
        ## Key Components
        1. **Captions**: Essential for deaf or hard-of-hearing users
        2. **Transcripts**: Provide complete text alternatives
        3. **Audio Descriptions**: Describe important visual content
        4. **Accessible Controls**: Ensure playback controls are usable by all
        
        ## Standards Reference
        - [WCAG 2.2 - 1.2.1 Audio-only and Video-only](https://www.w3.org/TR/WCAG22/#audio-only-and-video-only-prerecorded)
        - [WCAG 2.2 - 1.2.2 Captions](https://www.w3.org/TR/WCAG22/#captions-prerecorded)
        - [WCAG 2.2 - 1.2.3 Audio Description or Media Alternative](https://www.w3.org/TR/WCAG22/#audio-description-or-media-alternative-prerecorded)
        - [WCAG 2.2 - 1.2.5 Audio Description](https://www.w3.org/TR/WCAG22/#audio-description-prerecorded)
      `
    }
  }
};
