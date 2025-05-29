import React, { useState } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
  Breadcrumbs,
  Link,
  Button,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface NavigationProps {
  pageTitle: string;
  breadcrumbs: string[];
  mainContentId: string;
}

const NavigationDemo = ({
  pageTitle,
  breadcrumbs,
  mainContentId,
}: NavigationProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const skipToMain = (event: React.MouseEvent) => {
    event.preventDefault();
    const mainContent = document.getElementById(mainContentId);
    if (mainContent) {
      mainContent.focus();
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 800 }}>
      {/* Skip Link - Hidden until focused */}
      <Button
        sx={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 999,
          '&:focus': {
            left: '50%',
            transform: 'translateX(-50%)',
          },
        }}
        onClick={skipToMain}
      >
        Skip to main content
      </Button>

      {/* Header with Navigation */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              ml: 2, 
              flexGrow: 1,
              fontSize: { xs: '1.25rem', sm: '1.5rem' }, // Responsive font size
              lineHeight: '1.2',
              fontWeight: 500 // Medium weight for better header appearance
            }}
          >
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Breadcrumb Navigation */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Navigation
        </Typography>
        <Breadcrumbs aria-label="breadcrumb navigation">
          {breadcrumbs.map((crumb, index) => (
            <Link
              key={crumb}
              color={index === breadcrumbs.length - 1 ? 'text.primary' : 'inherit'}
              href="#"
              aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
            >
              {crumb}
            </Link>
          ))}
        </Breadcrumbs>
      </Box>

      {/* Side Navigation Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              aria-label="close menu"
              onClick={() => setDrawerOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Services" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        id={mainContentId}
        component="main"
        tabIndex={-1}
        sx={{
          p: 3,
          '&:focus': {
            outline: 'none',
            backgroundColor: 'action.hover',
          },
        }}
      >
        <Stack spacing={3}>
          <section aria-labelledby="section1-heading">
            <Typography id="section1-heading" variant="h6" component="h2" gutterBottom>
              Section 1
            </Typography>
            <Typography paragraph>
              This section demonstrates proper heading structure and focus management.
              Users can navigate through sections using keyboard shortcuts.
            </Typography>
          </section>

          <section aria-labelledby="section2-heading">
            <Typography id="section2-heading" variant="h6" component="h2" gutterBottom>
              Section 2
            </Typography>
            <Typography paragraph>
              Each section is properly labeled and structured for easy navigation.
              The focus order is logical and follows the visual layout.
            </Typography>
            <Button variant="contained">Interactive Element</Button>
          </section>
        </Stack>
      </Box>

      {/* Help Text */}
      <Box sx={{ p: 2, bgcolor: 'background.default' }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Features
        </Typography>
        <Typography variant="body2">
          Navigation features demonstrated:
          <List>
            <ListItem>
              <ListItemText primary="Skip links for bypassing repeated content" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Clear page title and breadcrumb navigation" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Logical focus order and keyboard navigation" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Multiple ways to find content (menu, breadcrumbs)" />
            </ListItem>
          </List>
        </Typography>
      </Box>
    </Paper>
  );
};

export default {
  title: 'Accessibility/2. Operable/2.4 Navigation',
  component: NavigationDemo,
  parameters: {
    docs: {
      description: {
        component: `
## WCAG 2.4 Navigable
Provide ways to help users navigate, find content, and determine where they are.

### Overview
This component demonstrates best practices for website navigation, ensuring users can easily find content and understand their current location.

### Key Features
- Skip links
- Breadcrumb navigation
- Clear page titles
- Logical focus order
- Multiple navigation methods
- Descriptive headings

### Implementation Guidelines
1. Implement skip links to bypass repeated content
2. Provide clear and consistent navigation
3. Use descriptive page titles and headings
4. Maintain logical tab and reading order
5. Offer multiple ways to find content

### WCAG Success Criteria
- 2.4.1 Bypass Blocks (Level A)
- 2.4.2 Page Titled (Level A)
- 2.4.3 Focus Order (Level A)
- 2.4.4 Link Purpose (Level A)
- 2.4.5 Multiple Ways (Level AA)
- 2.4.6 Headings and Labels (Level AA)
- 2.4.7 Focus Visible (Level AA)
- 2.4.8 Location (Level AAA)
- 2.4.9 Link Purpose (Level AAA)
- 2.4.10 Section Headings (Level AAA)

### Best Practices
- Use clear and descriptive link text
- Implement visible focus indicators
- Structure content with semantic HTML
- Provide consistent navigation patterns
- Use ARIA landmarks appropriately
`
      }
    }
  }
};

const Template: StoryFn<typeof NavigationDemo> = (args) => <NavigationDemo {...args} />;

export const BasicNavigation = Template.bind({});
BasicNavigation.args = {
  pageTitle: 'Products Page',
  breadcrumbs: ['Home', 'Catalog', 'Products'],
  mainContentId: 'main-content',
};
BasicNavigation.parameters = {
  docs: {
    description: {
      story: `
### Basic Navigation Example
Demonstrates fundamental navigation features:
- Simple breadcrumb trail
- Clear page title
- Skip to main content link
- Basic navigation menu
`
    }
  }
};

export const ComplexNavigation = Template.bind({});
ComplexNavigation.args = {
  pageTitle: 'Product Details',
  breadcrumbs: ['Home', 'Catalog', 'Electronics', 'Laptops', 'Product XYZ'],
  mainContentId: 'product-details',
};
ComplexNavigation.parameters = {
  docs: {
    description: {
      story: `
### Complex Navigation Structure
Shows advanced navigation features:
- Deep breadcrumb hierarchy
- Multiple navigation methods
- Section landmarks
- Skip links for different sections
- Enhanced focus management
`
    }
  }
}; 