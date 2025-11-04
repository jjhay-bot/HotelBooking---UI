# Component Architecture Guide

## Atomic Design Structure

Your project follows atomic design principles with these component levels:

### Atoms (`src/components/atoms/`)

**Purpose**: Smallest, most reusable UI elements

**Examples**:
- Buttons
- Input fields
- Icons
- Labels
- Avatars

**Guidelines**:

```javascript
// Example: Button atom
import { Button as MUIButton } from '@mui/material';
import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'contained', 
  color = 'primary',
  loading = false,
  ...props 
}, ref) => {
  return (
    <MUIButton
      ref={ref}
      variant={variant}
      color={color}
      disabled={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </MUIButton>
  );
});

Button.displayName = 'Button';
export default Button;
```

### Molecules (`src/components/molecules/`)

**Purpose**: Simple combinations of atoms

**Examples**:
- Search bars (input + button)
- Form fields (label + input + error)
- Card headers (title + actions)
- Navigation items

**Guidelines**:

```javascript
// Example: SearchBar molecule
import { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex' }}>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        fullWidth
      />
      {value && (
        <IconButton onClick={handleClear} size="small">
          <ClearIcon />
        </IconButton>
      )}
      <IconButton type="submit" size="small">
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
```

### Organisms (`src/components/organisms/`)

**Purpose**: Complex UI components with their own logic

**Examples**:
- Data tables
- Forms
- Navigation headers
- Content sections
- Lists with filtering

**Guidelines**:

```javascript
// Example: UserList organism
import { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText,
  Skeleton 
} from '@mui/material';
import SearchBar from '../molecules/SearchBar';
import { useUsers } from '@/hooks/useUsers';

const UserList = ({ title = "Users" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { users, loading, error } = useUsers({ searchTerm });

  if (loading) {
    return (
      <Card>
        <CardHeader title={title} />
        <CardContent>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height={60} />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader title={title} />
        <CardContent>Error loading users</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader 
        title={title}
        action={<SearchBar onSearch={setSearchTerm} />}
      />
      <CardContent>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText
                primary={user.name}
                secondary={user.email}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UserList;
```

### Templates (`src/components/templates/`)

**Purpose**: Page-level layouts and structure

**Examples**:
- Page layouts
- Dashboard templates
- Form layouts
- Content wrappers

**Guidelines**:

```javascript
// Example: DashboardTemplate
import { Box, Container, AppBar, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navigation from '../organisms/Navigation';

const DashboardTemplate = ({ title }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Navigation />
        <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardTemplate;
```

## Component Best Practices

### Props and PropTypes

```javascript
import PropTypes from 'prop-types';

const UserCard = ({ user, onEdit, onDelete, showActions = true }) => {
  // Component implementation
};

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  showActions: PropTypes.bool,
};

export default UserCard;
```

### Error Boundaries

```javascript
// src/components/ErrorBoundary.jsx
import React from 'react';
import { Alert, Button, Box } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 2 }}>
          <Alert 
            severity="error"
            action={
              <Button 
                color="inherit" 
                size="small"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Retry
              </Button>
            }
          >
            Something went wrong. Please try again.
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### Forwarding Refs

```javascript
import { forwardRef } from 'react';
import { TextField } from '@mui/material';

const CustomInput = forwardRef(({ label, error, helperText, ...props }, ref) => {
  return (
    <TextField
      ref={ref}
      label={label}
      error={Boolean(error)}
      helperText={error || helperText}
      fullWidth
      margin="normal"
      {...props}
    />
  );
});

CustomInput.displayName = 'CustomInput';
export default CustomInput;
```

## Performance Optimization

### React.memo

```javascript
import { memo } from 'react';

const UserListItem = memo(({ user, onEdit, onDelete }) => {
  return (
    <ListItem>
      <ListItemText primary={user.name} secondary={user.email} />
      <ListItemSecondaryAction>
        <IconButton onClick={() => onEdit(user.id)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(user.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
});

UserListItem.displayName = 'UserListItem';
```

### useCallback and useMemo

```javascript
import { useCallback, useMemo } from 'react';

const DataTable = ({ data, filters }) => {
  // Memoize filtered data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return item[key]?.toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [data, filters]);

  // Memoize event handlers
  const handleSort = useCallback((column) => {
    // Sorting logic
  }, []);

  const handleEdit = useCallback((id) => {
    // Edit logic
  }, []);

  return (
    // Table implementation
  );
};
```

## Testing Components

### Component Testing Pattern

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/utils/theme';
import SearchBar from '../SearchBar';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('SearchBar', () => {
  it('calls onSearch when form is submitted', () => {
    const mockOnSearch = jest.fn();
    renderWithTheme(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(submitButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });
});
```

## Component Documentation

### JSDoc Comments

```javascript
/**
 * Reusable user card component
 * 
 * @param {Object} props
 * @param {Object} props.user - User object with id, name, email
 * @param {Function} props.onEdit - Callback when edit button is clicked
 * @param {Function} props.onDelete - Callback when delete button is clicked  
 * @param {boolean} props.showActions - Whether to show action buttons
 * @returns {JSX.Element}
 * 
 * @example
 * <UserCard 
 *   user={{ id: '1', name: 'John', email: 'john@example.com' }}
 *   onEdit={(id) => console.log('Edit', id)}
 *   onDelete={(id) => console.log('Delete', id)}
 * />
 */
const UserCard = ({ user, onEdit, onDelete, showActions = true }) => {
  // Implementation
};
```

## Accessibility Guidelines

### ARIA Labels and Roles

```javascript
const SearchButton = ({ onSearch, disabled }) => {
  return (
    <IconButton
      onClick={onSearch}
      disabled={disabled}
      aria-label="Search users"
      type="submit"
    >
      <SearchIcon />
    </IconButton>
  );
};
```

### Keyboard Navigation

```javascript
const NavigationMenu = ({ items, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
        break;
      case 'Enter':
        e.preventDefault();
        onSelect(items[selectedIndex]);
        break;
    }
  };

  return (
    <List 
      role="menu"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          role="menuitem"
          selected={index === selectedIndex}
          onClick={() => onSelect(item)}
        >
          {item.name}
        </ListItem>
      ))}
    </List>
  );
};
```
