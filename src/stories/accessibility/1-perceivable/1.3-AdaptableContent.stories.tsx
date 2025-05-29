import React, { useState } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  useTheme,
  useMediaQuery,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  ButtonGroup,
  FormControlLabel,
  Switch,
  Chip,
} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import BuildIcon from '@mui/icons-material/Build';

interface DataItem {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
}

const sampleData: DataItem[] = [
  {
    id: 1,
    title: 'Complete Project Proposal',
    description: 'Draft and submit the Q2 project proposal',
    category: 'Planning',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Review Design Mockups',
    description: 'Review and provide feedback on new design mockups',
    category: 'Design',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Update Documentation',
    description: 'Update API documentation with recent changes',
    category: 'Development',
    priority: 'Low',
  },
];

interface AdaptableContentProps {
  initialView: 'list' | 'grid' | 'table';
  allowOrientationLock: boolean;
}

const AdaptableContentDemo = () => {
  const [view, setView] = useState<'list' | 'grid' | 'table'>('list');
  const [sortBy, setSortBy] = useState<'priority' | 'category'>('priority');
  const [orientation, setOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto');
  const [textSpacing, setTextSpacing] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography 
          component="h1" 
          variant="h4" 
          gutterBottom
        >
          Adaptable Content Guide
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Key Principle</AlertTitle>
          Create content that can be presented in different ways without losing structure or information, ensuring it remains accessible regardless of how users need to perceive it.
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
            {/* Semantic Structure Example */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="subtitle1" 
                gutterBottom
              >
                1. Semantic Structure & View Switching
              </Typography>
              <Box>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Content structure must be preserved across different presentations and view modes.
                </Alert>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    {/* Controls */}
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={2}
                      alignItems={{ xs: 'stretch', sm: 'center' }}
                    >
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          onClick={() => setView('list')}
                          color={view === 'list' ? 'primary' : 'default'}
                          aria-label="List view"
                          aria-pressed={view === 'list'}
                        >
                          <ViewListIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => setView('grid')}
                          color={view === 'grid' ? 'primary' : 'default'}
                          aria-label="Grid view"
                          aria-pressed={view === 'grid'}
                        >
                          <ViewModuleIcon />
                        </IconButton>
                      </Box>

                      <FormControl size="small">
                        <InputLabel id="sort-select-label">Sort by</InputLabel>
                        <Select
                          labelId="sort-select-label"
                          value={sortBy}
                          label="Sort by"
                          onChange={(e) => setSortBy(e.target.value as 'priority' | 'category')}
                        >
                          <MenuItem value="priority">Priority</MenuItem>
                          <MenuItem value="category">Category</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>

                    {/* Content Area */}
                    <Box>
                      {view === 'list' && (
                        <Stack spacing={2}>
                          {sampleData.map((item) => (
                            <Paper
                              key={item.id}
                              elevation={1}
                              sx={{ 
                                p: 2,
                                ...(textSpacing && {
                                  '& .MuiTypography-root': {
                                    lineHeight: 2,
                                    letterSpacing: '0.1em',
                                    wordSpacing: '0.2em'
                                  }
                                })
                              }}
                              role="article"
                              aria-labelledby={`title-${item.id}`}
                            >
                              <Typography
                                id={`title-${item.id}`}
                                variant="h6"
                                gutterBottom
                                component="h3"
                              >
                                {item.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                paragraph
                              >
                                {item.description}
                              </Typography>
                              <Stack
                                direction="row"
                                spacing={2}
                                sx={{ color: 'text.secondary' }}
                              >
                                <Typography variant="caption">
                                  Category: {item.category}
                                </Typography>
                                <Typography variant="caption">
                                  Priority: {item.priority}
                                </Typography>
                              </Stack>
                            </Paper>
                          ))}
                        </Stack>
                      )}

                      {view === 'grid' && (
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                              xs: '1fr',
                              sm: 'repeat(2, 1fr)',
                              md: 'repeat(3, 1fr)',
                            },
                            gap: 2,
                          }}
                        >
                          {sampleData.map((item) => (
                            <Paper
                              key={item.id}
                              elevation={1}
                              sx={{
                                p: 2,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                ...(textSpacing && {
                                  '& .MuiTypography-root': {
                                    lineHeight: 2,
                                    letterSpacing: '0.1em',
                                    wordSpacing: '0.2em'
                                  }
                                })
                              }}
                              role="article"
                              aria-labelledby={`grid-title-${item.id}`}
                            >
                              <Typography
                                id={`grid-title-${item.id}`}
                                variant="h6"
                                gutterBottom
                                component="h3"
                              >
                                {item.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ flex: 1 }}
                              >
                                {item.description}
                              </Typography>
                              <Box sx={{ mt: 2, color: 'text.secondary' }}>
                                <Typography variant="caption" display="block">
                                  Category: {item.category}
                                </Typography>
                                <Typography variant="caption" display="block">
                                  Priority: {item.priority}
                                </Typography>
                              </Box>
                            </Paper>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Stack>
                </Paper>
                <Alert severity="success" sx={{ mt: 2 }}>
                  <AlertTitle>Implementation</AlertTitle>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Use semantic HTML elements (article, heading)</li>
                      <li>Maintain proper heading hierarchy</li>
                      <li>Preserve content relationships across views</li>
                      <li>Announce view changes to screen readers</li>
                    </ul>
                  </Typography>
                </Alert>
              </Box>
            </Paper>

            {/* Device Independence Example */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="subtitle1" 
                gutterBottom
              >
                2. Device & Orientation Independence
              </Typography>
              <Box>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Content must be usable across different devices, input methods, and screen orientations.
                </Alert>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <FormControl size="small">
                      <InputLabel id="orientation-select-label">Orientation</InputLabel>
                      <Select
                        labelId="orientation-select-label"
                        value={orientation}
                        label="Orientation"
                        onChange={(e) => setOrientation(e.target.value as 'auto' | 'portrait' | 'landscape')}
                        startAdornment={<ScreenRotationIcon />}
                      >
                        <MenuItem value="auto">Auto</MenuItem>
                        <MenuItem value="portrait">Portrait</MenuItem>
                        <MenuItem value="landscape">Landscape</MenuItem>
                      </Select>
                    </FormControl>
                    <Box>
                      <ButtonGroup 
                        aria-label="Text formatting options"
                        sx={{ 
                          '& .MuiButton-root': { 
                            minWidth: '44px',
                            height: '44px'
                          } 
                        }}
                      >
                        <Button aria-label="Bold text">B</Button>
                        <Button aria-label="Italic text">I</Button>
                        <Button aria-label="Underline text">U</Button>
                      </ButtonGroup>
                    </Box>
                  </Stack>
                </Paper>
                <Alert severity="success" sx={{ mt: 2 }}>
                  <AlertTitle>Implementation</AlertTitle>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Support both portrait and landscape orientations</li>
                      <li>Ensure touch targets are at least 44x44 pixels</li>
                      <li>Support keyboard navigation</li>
                      <li>Make controls work in any orientation</li>
                    </ul>
                  </Typography>
                </Alert>
              </Box>
            </Paper>

            {/* Text Spacing Example */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="subtitle1" 
                gutterBottom
              >
                3. Text Spacing & Readability
              </Typography>
              <Box>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Allow users to adjust text spacing and presentation for better readability.
                </Alert>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={textSpacing}
                          onChange={(e) => setTextSpacing(e.target.checked)}
                          inputProps={{ 'aria-label': 'Increased text spacing' }}
                        />
                      }
                      label="Increased Spacing"
                    />
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2,
                        ...(textSpacing && {
                          '& .MuiTypography-root': {
                            lineHeight: 2,
                            letterSpacing: '0.1em',
                            wordSpacing: '0.2em'
                          }
                        })
                      }}
                    >
                      <Typography variant="body1" paragraph>
                        This is an example paragraph showing how text spacing adjustments can improve readability. 
                        The spacing between lines, letters, and words can be increased to make text more accessible.
                      </Typography>
                      <Typography variant="body1">
                        Toggle the switch above to see the difference in text presentation.
                      </Typography>
                    </Paper>
                  </Stack>
                </Paper>
                <Alert severity="success" sx={{ mt: 2 }}>
                  <AlertTitle>Implementation</AlertTitle>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Support text spacing adjustments</li>
                      <li>Maintain layout when spacing changes</li>
                      <li>Remember user preferences</li>
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
              'Use semantic HTML to maintain content structure',
              'Implement responsive design patterns',
              'Support content reflow at different zoom levels',
              'Ensure orientation independence',
              'Maintain logical reading order',
              'Preserve state across view changes',
              'Support keyboard navigation',
              'Announce important state changes'
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

        {/* Common Pitfalls */}
        <Alert severity="warning">
          <AlertTitle>Common Pitfalls</AlertTitle>
          <Typography variant="body2" component="div">
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Using fixed width containers that prevent proper zooming</li>
              <li>Hiding content based on screen size or orientation</li>
              <li>Breaking logical reading order when reflowing content</li>
              <li>Not announcing view changes to screen readers</li>
              <li>Losing focus position when switching views</li>
              <li>Poor touch target sizes on mobile devices</li>
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
                  <TableCell><strong>Feature</strong></TableCell>
                  <TableCell><strong>Requirements</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    feature: 'Semantic Structure',
                    requirements: 'Proper HTML elements, heading hierarchy, and ARIA relationships'
                  },
                  {
                    feature: 'Responsive Layout',
                    requirements: 'Content adapts to different viewport sizes without loss of information'
                  },
                  {
                    feature: 'Device Independence',
                    requirements: 'Works with keyboard, touch, and different orientations'
                  },
                  {
                    feature: 'State Management',
                    requirements: 'Preserves preferences, maintains focus, announces changes'
                  }
                ].map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell>{row.feature}</TableCell>
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

const AdaptableChallenges = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography 
          component="h1" 
          variant="h4" 
          gutterBottom
        >
          Adaptable Content Challenges
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Key Principle</AlertTitle>
          Common challenges in implementing adaptable content often arise from complex layouts, dynamic content, and varying device capabilities.
        </Alert>

        {/* Examples Section */}
        <Box>
          <Typography 
            component="h2" 
            variant="h5" 
            gutterBottom
          >
            Common Challenges:
          </Typography>
          <Stack spacing={2}>
            {/* Complex Layout Challenge */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="h6" 
                gutterBottom
              >
                1. Complex Layout Adaptation
              </Typography>
              <Box>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <AlertTitle>Challenge</AlertTitle>
                  Complex layouts with multiple columns, nested content, and dynamic elements can break when adapting to different viewports.
                </Alert>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                      },
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography 
                        component="h4" 
                        variant="subtitle1" 
                        gutterBottom
                      >
                        Desktop Layout
                      </Typography>
                      <Paper 
                        variant="outlined" 
                        sx={{ 
                          p: 1, 
                          bgcolor: 'grey.100',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: 1
                        }}
                      >
                        {[1, 2, 3].map((num) => (
                          <Box 
                            key={num}
                            sx={{ 
                              bgcolor: 'background.paper',
                              p: 1,
                              textAlign: 'center'
                            }}
                          >
                            Column {num}
                          </Box>
                        ))}
                      </Paper>
                    </Box>
                    <Box>
                      <Typography 
                        component="h4" 
                        variant="subtitle1" 
                        gutterBottom
                      >
                        Mobile Layout
                      </Typography>
                      <Paper 
                        variant="outlined" 
                        sx={{ 
                          p: 1, 
                          bgcolor: 'grey.100',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1
                        }}
                      >
                        {[1, 2, 3].map((num) => (
                          <Box 
                            key={num}
                            sx={{ 
                              bgcolor: 'background.paper',
                              p: 1,
                              textAlign: 'center'
                            }}
                          >
                            Column {num}
                          </Box>
                        ))}
                      </Paper>
                    </Box>
                  </Box>
                </Paper>
                <Alert severity="success" sx={{ mt: 2 }}>
                  <AlertTitle>Solution</AlertTitle>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Use CSS Grid and Flexbox for flexible layouts</li>
                      <li>Define clear breakpoints for layout changes</li>
                      <li>Maintain logical reading order in the DOM</li>
                    </ul>
                  </Typography>
                </Alert>
              </Box>
            </Paper>

            {/* Data Table Challenge */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="h6" 
                gutterBottom
              >
                2. Data Table Adaptation
              </Typography>
              <Box>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <AlertTitle>Challenge</AlertTitle>
                  Tables with many columns become unreadable on small screens and can lose their structure when simplified.
                </Alert>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>Department</TableCell>
                          <TableCell>Location</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>John Doe</TableCell>
                          <TableCell>Developer</TableCell>
                          <TableCell>Engineering</TableCell>
                          <TableCell>New York</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ mt: 2 }}>
                    <Typography 
                      component="h4" 
                      variant="subtitle1" 
                      gutterBottom
                    >
                      Mobile View (Card Format)
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Stack spacing={1}>
                        <Typography 
                          component="h5" 
                          variant="subtitle2"
                        >
                          John Doe
                        </Typography>
                        <Typography variant="body2">Role: Developer</Typography>
                        <Typography variant="body2">Department: Engineering</Typography>
                        <Typography variant="body2">Location: New York</Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Paper>
                <Alert severity="success" sx={{ mt: 2 }}>
                  <AlertTitle>Solution</AlertTitle>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Transform to cards/lists on mobile</li>
                      <li>Allow column priority selection</li>
                      <li>Maintain data relationships</li>
                    </ul>
                  </Typography>
                </Alert>
              </Box>
            </Paper>

            {/* Interactive Content Challenge */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography 
                component="h3" 
                variant="h6" 
                gutterBottom
              >
                3. Interactive Content
              </Typography>
              <Box>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <AlertTitle>Challenge</AlertTitle>
                  Interactive elements may become difficult to use when resized or reoriented, especially with touch interfaces.
                </Alert>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography 
                        component="h4" 
                        variant="subtitle1" 
                        gutterBottom
                      >
                        Touch-friendly Controls
                      </Typography>
                      <ButtonGroup>
                        <Button 
                          sx={{ 
                            minWidth: '44px',
                            height: '44px'
                          }}
                        >
                          1
                        </Button>
                        <Button 
                          sx={{ 
                            minWidth: '44px',
                            height: '44px'
                          }}
                        >
                          2
                        </Button>
                        <Button 
                          sx={{ 
                            minWidth: '44px',
                            height: '44px'
                          }}
                        >
                          3
                        </Button>
                      </ButtonGroup>
                    </Box>
                    <Box>
                      <Typography 
                        component="h4" 
                        variant="subtitle1" 
                        gutterBottom
                      >
                        Keyboard Navigation
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="caption">Tab Order:</Typography>
                        <Chip label="1" size="small" />
                        <Typography variant="caption">→</Typography>
                        <Chip label="2" size="small" />
                        <Typography variant="caption">→</Typography>
                        <Chip label="3" size="small" />
                      </Stack>
                    </Box>
                  </Stack>
                </Paper>
                <Alert severity="success" sx={{ mt: 2 }}>
                  <AlertTitle>Solution</AlertTitle>
                  <Typography variant="body2" component="div">
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Ensure adequate touch target sizes (44x44px)</li>
                      <li>Provide keyboard alternatives</li>
                      <li>Adapt interaction patterns for different devices</li>
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
            variant="h5" 
            gutterBottom
          >
            Implementation Tips
          </Typography>
          <List>
            {[
              'Test with real devices and screen readers',
              'Use feature detection instead of device detection',
              'Provide fallbacks for complex interactions',
              'Maintain semantic structure across views',
              'Consider performance implications',
              'Document accessibility features'
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

        {/* Common Pitfalls */}
        <Alert severity="warning">
          <AlertTitle>Common Pitfalls</AlertTitle>
          <Typography variant="body2" component="div">
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Assuming all users have touch capabilities</li>
              <li>Not testing with keyboard navigation</li>
              <li>Breaking semantic structure when adapting layouts</li>
              <li>Forgetting to maintain state across view changes</li>
              <li>Ignoring performance on lower-end devices</li>
            </ul>
          </Typography>
        </Alert>

        {/* Quality Checklist */}
        <Box>
          <Typography 
            component="h2" 
            variant="h5" 
            gutterBottom
          >
            Challenge Resolution Checklist
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Challenge</strong></TableCell>
                  <TableCell><strong>Resolution Criteria</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    challenge: 'Complex Layouts',
                    criteria: 'Maintains structure and readability at all viewport sizes'
                  },
                  {
                    challenge: 'Data Tables',
                    criteria: 'Preserves data relationships in all view modes'
                  },
                  {
                    challenge: 'Interactive Elements',
                    criteria: 'Usable with touch, keyboard, and assistive technologies'
                  },
                  {
                    challenge: 'Performance',
                    criteria: 'Smooth transitions and responsive interactions'
                  }
                ].map((row) => (
                  <TableRow key={row.challenge}>
                    <TableCell>{row.challenge}</TableCell>
                    <TableCell>{row.criteria}</TableCell>
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
const MainTemplate: StoryFn = () => <AdaptableContentDemo />;
const ChallengesTemplate: StoryFn = () => <AdaptableChallenges />;

export default {
  title: 'Accessibility/1-Perceivable/1.3-Adaptable',
  parameters: {
    docs: {
      description: {
        component: `WCAG 1.3 Adaptable Content\n
Create content that can be presented in different ways while preserving structure and information.\n
Key Requirements:\n
  • Preserve information across different presentations\n
  • Support multiple viewing orientations\n
  • Make content adaptable to user preferences\n
  • Ensure clear structure and relationships\n
Reference:
See WCAG 2.2 - 1.3 Adaptable (https://www.w3.org/TR/WCAG22/#adaptable)`
      }
    }
  }
};

export const MainDemo = MainTemplate.bind({});
MainDemo.parameters = {
  docs: {
    description: {
      story: `Adaptable Content Implementation\n
This guide demonstrates how to create content that adapts to different presentations while maintaining accessibility.\n
Key Features:\n
  • Semantic Structure: Proper HTML elements and relationships\n
  • Device Independence: Support for different devices and orientations\n
  • Text Adaptability: Adjustable spacing and presentation\n
Best Practices:\n
  • Use semantic HTML and ARIA attributes\n
  • Implement responsive design patterns\n
  • Support keyboard and touch interactions\n
  • Maintain state and focus management`
    }
  }
};

export const Challenges = ChallengesTemplate.bind({});
Challenges.parameters = {
  docs: {
    description: {
      story: `Common Adaptable Content Challenges\n
Key Challenges:\n
  • Complex Layouts: Maintaining structure across viewports\n
  • Data Tables: Preserving relationships on small screens\n
  • Interactive Elements: Ensuring usability across devices\n
  • Content Reflow: Maintaining readability when scaled\n
Solutions:\n
  • Use flexible layout patterns (Grid/Flexbox)\n
  • Provide alternative view options\n
  • Implement responsive interaction patterns\n
  • Test across different contexts`
    }
  }
}; 