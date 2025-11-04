# Loading States & UX Patterns

## Loading Strategy Decision Matrix

| Scenario | Pattern | Implementation |
|----------|---------|----------------|
| Initial page load | Full page loader | `<SplashScreen />` |
| Data fetching | Skeleton screens | `<Skeleton />` components |
| Form submission | Button loading | `loading` prop on buttons |
| Background updates | Subtle indicators | Progress bars, badges |
| Infinite scroll | Bottom loader | `<CircularProgress />` |
| Image loading | Progressive loading | Blur-to-clear transition |

## Material-UI Skeleton Patterns

### Basic Skeleton Implementation

```javascript
import { 
  Skeleton, 
  Card, 
  CardContent, 
  CardHeader,
  Box,
  Stack
} from '@mui/material';

const UserCardSkeleton = () => (
  <Card>
    <CardHeader
      avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
      title={<Skeleton animation="wave" height={10} width="80%" />}
      subheader={<Skeleton animation="wave" height={10} width="40%" />}
    />
    <CardContent>
      <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
      <Skeleton animation="wave" height={10} width="80%" />
    </CardContent>
  </Card>
);

const UserListSkeleton = ({ count = 5 }) => (
  <Stack spacing={2}>
    {Array.from({ length: count }).map((_, index) => (
      <UserCardSkeleton key={index} />
    ))}
  </Stack>
);
```

### Table Skeleton

```javascript
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Skeleton,
  Paper
} from '@mui/material';

const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          {Array.from({ length: columns }).map((_, index) => (
            <TableCell key={index}>
              <Skeleton animation="wave" height={20} />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton animation="wave" height={20} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
```

### Dashboard Skeleton

```javascript
const DashboardSkeleton = () => (
  <Box sx={{ p: 3 }}>
    {/* Header */}
    <Box sx={{ mb: 4 }}>
      <Skeleton animation="wave" height={40} width="300px" sx={{ mb: 1 }} />
      <Skeleton animation="wave" height={20} width="200px" />
    </Box>

    {/* Stats Cards */}
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
                <Skeleton width="60%" height={20} />
              </Box>
              <Skeleton height={32} width="80%" sx={{ mb: 1 }} />
              <Skeleton height={16} width="40%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    {/* Chart Area */}
    <Card sx={{ mb: 4 }}>
      <CardHeader 
        title={<Skeleton width="200px" height={24} />}
      />
      <CardContent>
        <Skeleton variant="rectangular" height={400} />
      </CardContent>
    </Card>

    {/* Data Table */}
    <Card>
      <CardHeader 
        title={<Skeleton width="150px" height={24} />}
      />
      <CardContent>
        <TableSkeleton rows={8} columns={5} />
      </CardContent>
    </Card>
  </Box>
);
```

## Form Loading States

### Button Loading States

```javascript
import { useState } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import { Save as SaveIcon, Check as CheckIcon } from '@mui/icons-material';

const SubmitButton = ({ 
  onSubmit, 
  children = "Submit",
  variant = "contained",
  ...props 
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      await onSubmit();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        variant={variant}
        onClick={handleClick}
        disabled={loading}
        startIcon={
          success ? <CheckIcon /> : 
          loading ? <CircularProgress size={20} /> : 
          <SaveIcon />
        }
        color={success ? 'success' : 'primary'}
        {...props}
      >
        {success ? 'Saved!' : loading ? 'Saving...' : children}
      </Button>
    </Box>
  );
};
```

### Form Field Loading

```javascript
const AsyncSelectField = ({ 
  label, 
  onSearch, 
  value, 
  onChange,
  ...props 
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useMemo(
    () => debounce(async (searchTerm) => {
      if (!searchTerm) return;
      
      setLoading(true);
      try {
        const results = await onSearch(searchTerm);
        setOptions(results);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  return (
    <Autocomplete
      options={options}
      loading={loading}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...props}
    />
  );
};
```

## Progressive Loading

### Image Loading with Blur Effect

```javascript
import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';

const ProgressiveImage = ({ 
  src, 
  alt, 
  width, 
  height,
  sx = {},
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        width, 
        height,
        ...sx 
      }}
    >
      {!loaded && !error && (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%"
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
      
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          display: error ? 'none' : 'block'
        }}
        {...props}
      />
      
      {error && (
        <Box 
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.200',
            color: 'text.secondary'
          }}
        >
          Failed to load image
        </Box>
      )}
    </Box>
  );
};
```

### Lazy Loading Components

```javascript
import { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';

// Lazy loaded components
const Dashboard = lazy(() => import('../pages/Dashboard'));
const UserManagement = lazy(() => import('../pages/UserManagement'));
const Settings = lazy(() => import('../pages/Settings'));

const LazyLoadingWrapper = ({ children }) => (
  <Suspense 
    fallback={
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '400px' 
        }}
      >
        <CircularProgress />
      </Box>
    }
  >
    {children}
  </Suspense>
);

// Usage in routes
const AppRoutes = () => (
  <Routes>
    <Route 
      path="/dashboard" 
      element={
        <LazyLoadingWrapper>
          <Dashboard />
        </LazyLoadingWrapper>
      } 
    />
    <Route 
      path="/users" 
      element={
        <LazyLoadingWrapper>
          <UserManagement />
        </LazyLoadingWrapper>
      } 
    />
  </Routes>
);
```

## Infinite Scroll Loading

```javascript
import { useEffect, useRef, useCallback } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const InfiniteScrollList = ({ 
  items, 
  hasMore, 
  loading, 
  onLoadMore,
  renderItem,
  ...props 
}) => {
  const observerRef = useRef();
  const loadingRef = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });
      
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <Box {...props}>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        return (
          <Box 
            key={item.id} 
            ref={isLastItem ? lastItemRef : null}
          >
            {renderItem(item, index)}
          </Box>
        );
      })}
      
      {loading && (
        <Box 
          ref={loadingRef}
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            p: 2 
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}
      
      {!hasMore && items.length > 0 && (
        <Typography 
          variant="body2" 
          color="text.secondary" 
          textAlign="center" 
          sx={{ p: 2 }}
        >
          No more items to load
        </Typography>
      )}
    </Box>
  );
};
```

## Global Loading States

### Apollo Loading Integration

```javascript
import { useReactiveVar } from '@apollo/client';
import { loadingVar } from '@/gql/reactiveVar';
import { Backdrop, CircularProgress, LinearProgress } from '@mui/material';

const GlobalLoader = () => {
  const isLoading = useReactiveVar(loadingVar);

  if (!isLoading) return null;

  return (
    <Backdrop
      sx={{ 
        color: '#fff', 
        zIndex: (theme) => theme.zIndex.drawer + 1 
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

// Or for top-bar loading
const TopBarLoader = () => {
  const isLoading = useReactiveVar(loadingVar);

  return (
    <Box sx={{ width: '100%', position: 'fixed', top: 0, zIndex: 9999 }}>
      {isLoading && <LinearProgress />}
    </Box>
  );
};
```

### Custom Loading Hook

```javascript
import { useState, useCallback } from 'react';
import { loadingVar } from '@/gql/reactiveVar';

export function useLoading() {
  const [localLoading, setLocalLoading] = useState(false);

  const withLoading = useCallback(async (asyncFunction, useGlobalLoader = false) => {
    try {
      setLocalLoading(true);
      if (useGlobalLoader) loadingVar(true);
      
      return await asyncFunction();
    } finally {
      setLocalLoading(false);
      if (useGlobalLoader) loadingVar(false);
    }
  }, []);

  return {
    loading: localLoading,
    withLoading
  };
}

// Usage
const MyComponent = () => {
  const { loading, withLoading } = useLoading();

  const handleSubmit = () => {
    withLoading(async () => {
      await submitData();
    }, true); // Use global loader
  };

  return (
    <Button 
      onClick={handleSubmit} 
      disabled={loading}
    >
      {loading ? 'Submitting...' : 'Submit'}
    </Button>
  );
};
```

## Animation-Enhanced Loading

### Framer Motion Loading States

```javascript
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography } from '@mui/material';

const LoadingAnimation = ({ message = "Loading..." }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        p: 4 
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <CircularProgress />
      </motion.div>
      <Typography variant="body2" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  </motion.div>
);

const LoadingTransition = ({ loading, children }) => (
  <AnimatePresence mode="wait">
    {loading ? (
      <LoadingAnimation key="loading" />
    ) : (
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);
```

## Loading State Testing

```javascript
// Testing loading states
describe('UserList Loading States', () => {
  it('shows skeleton while loading', () => {
    render(<UserList />, {
      mocks: [{
        request: { query: GET_USERS },
        result: { loading: true }
      }]
    });

    expect(screen.getByTestId('user-list-skeleton')).toBeInTheDocument();
  });

  it('shows data after loading', async () => {
    render(<UserList />, {
      mocks: [{
        request: { query: GET_USERS },
        result: { 
          data: { users: [{ id: '1', name: 'John' }] }
        }
      }]
    });

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });
  });
});
