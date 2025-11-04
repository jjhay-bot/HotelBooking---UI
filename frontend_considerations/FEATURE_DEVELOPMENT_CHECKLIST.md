# Frontend Feature Development Checklist

**Use this as your reference guide when developing new features to ensure consistent architecture and avoid missing critical components.**

---

## Pre-Development Planning

### Feature Analysis

- [ ] Define feature scope and user stories
- [ ] Identify data requirements (GraphQL queries/mutations vs REST endpoints)
- [ ] Map out component hierarchy (atoms → molecules → organisms → templates)
- [ ] Determine state management needs (local vs global)
- [ ] Plan routing requirements
- [ ] Consider authentication/authorization needs
- [ ] Identify reusable components that can be leveraged

### Design & UX Considerations

- [ ] Mobile-first responsive design
- [ ] Loading states and skeleton screens
- [ ] Error states and fallbacks
- [ ] Empty states
- [ ] Success feedback (toasts/snackbars)
- [ ] Accessibility (ARIA labels, keyboard navigation)
- [ ] Material-UI theme consistency

---

## Development Implementation

### Component Architecture

```text
📁 src/components/
├── atoms/          # Basic UI elements (buttons, inputs, icons)
├── molecules/      # Simple component combinations
├── organisms/      # Complex UI components
└── templates/      # Page layout components
```

**For Each Component:**

- [ ] Follow atomic design principles
- [ ] Use Material-UI components when available
- [ ] Implement proper TypeScript/PropTypes validation
- [ ] Add proper component documentation
- [ ] Consider component reusability
- [ ] Implement error boundaries where needed

### Data Management

#### GraphQL (Apollo Client)

- [ ] Create/update GraphQL queries in `src/gql/`
- [ ] Implement proper error handling with `onError` link
- [ ] Use Apollo cache effectively
- [ ] Consider optimistic updates for better UX
- [ ] Implement proper loading states with `loadingVar`

#### REST API Calls

- [ ] Use `fetchWithRefresh` utility for authenticated requests
- [ ] Implement proper error handling and retry logic
- [ ] Consider caching strategies
- [ ] Handle token refresh scenarios

#### State Management

- [ ] **Local State**: Use `useState`, `useReducer` for component-specific data
- [ ] **Global State**: Use Context API (`AuthContext`) or Apollo reactive variables
- [ ] **Form State**: Use custom `useForm` hook
- [ ] **Server State**: Use Apollo Client cache or custom hooks with SWR pattern

### Custom Hooks Development

**Location**: `src/hooks/`

**When to Create Custom Hooks:**

- [ ] Data fetching logic that will be reused
- [ ] Complex state logic shared across components  
- [ ] API interactions specific to a domain (users, rooms, bookings)
- [ ] Animation or intersection observer logic

**Hook Patterns to Follow:**

```javascript
// Standard data fetching hook pattern
export function useFeatureName() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Implementation...
  
  return { data, loading, error, refetch };
}
```

### Loading & Skeleton States

**Implementation Options:**

- [ ] **Material-UI Skeleton**: Use `<Skeleton />` for content placeholders
- [ ] **Custom Loading Components**: Create reusable loading atoms
- [ ] **Framer Motion**: Add smooth loading animations
- [ ] **Global Loading**: Use Apollo `loadingVar` for app-wide loading states

**Best Practices:**

- [ ] Match skeleton shape to actual content
- [ ] Provide immediate feedback on user actions
- [ ] Use progressive loading for large datasets
- [ ] Implement timeout fallbacks for slow requests

### Error Handling & User Feedback

**Error Types to Handle:**

- [ ] Network errors (offline, timeout)
- [ ] Authentication errors (401, 403)
- [ ] Validation errors (form inputs)
- [ ] Server errors (500, GraphQL errors)
- [ ] Not found errors (404)

**Feedback Mechanisms:**

- [ ] **Notistack/React-Hot-Toast**: For success/error notifications
- [ ] **Material-UI Alerts**: For inline error messages
- [ ] **Error Boundaries**: Catch JavaScript errors gracefully
- [ ] **Retry Mechanisms**: Allow users to retry failed operations

### Routing & Navigation

**File**: `src/routes/routes.jsx`

- [ ] Add new routes to route configuration
- [ ] Implement proper route guards (`ProtectedRoute`)
- [ ] Add breadcrumb navigation if needed
- [ ] Consider lazy loading for code splitting
- [ ] Update navigation components
- [ ] Test deep linking and browser navigation

### Styling & Theming

**Material-UI Integration:**

- [ ] Use theme tokens for consistent spacing/colors
- [ ] Leverage `useTheme()` for dynamic theming
- [ ] Follow Material Design guidelines
- [ ] Ensure responsive breakpoints
- [ ] Use `sx` prop for component-specific styles

**Custom Styling:**

- [ ] Use CSS-in-JS with Emotion (Material-UI's styling solution)
- [ ] Create reusable style utilities in `src/utils/theme/`
- [ ] Maintain design system consistency

### Animation & Interactions

**Framer Motion Integration:**

- [ ] Add meaningful micro-interactions
- [ ] Implement page transitions
- [ ] Use `useAutoAnimate` hook for automatic animations
- [ ] Consider performance impact of animations
- [ ] Provide reduced motion accessibility options

---

## Testing & Quality Assurance

### Functionality Testing

- [ ] Test all user interactions and edge cases
- [ ] Verify responsive design across breakpoints
- [ ] Test keyboard navigation and accessibility
- [ ] Validate form submissions and error states
- [ ] Test loading and error scenarios
- [ ] Verify authentication flows if applicable

### Performance Considerations

- [ ] Implement React.memo for expensive components
- [ ] Use useCallback/useMemo for optimization
- [ ] Consider code splitting with React.lazy
- [ ] Optimize images and assets
- [ ] Monitor bundle size impact
- [ ] Test on slower devices/networks

### Code Quality

- [ ] Run ESLint and fix all warnings
- [ ] Follow established code conventions
- [ ] Add proper error handling
- [ ] Document complex logic
- [ ] Remove console.logs and debugging code
- [ ] Update relevant documentation

---

## File Organization Patterns

### New Feature File Structure

```text
src/
├── components/
│   ├── atoms/NewFeatureButton.jsx
│   ├── molecules/NewFeatureCard.jsx
│   └── organisms/NewFeatureList.jsx
├── hooks/
│   └── useNewFeature.js
├── pages/
│   └── NewFeaturePage.jsx
├── utils/
│   └── newFeatureHelpers.js
└── gql/
    └── newFeatureQueries.js
```

### Naming Conventions

- **Components**: PascalCase (`UserProfile.jsx`)
- **Hooks**: camelCase with 'use' prefix (`useUserData.js`)
- **Utils**: camelCase (`formatUserName.js`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.js`)

---

## Deployment Considerations

### Pre-Deployment Checklist

- [ ] Build successfully without warnings
- [ ] Test in production-like environment
- [ ] Verify environment variables are set
- [ ] Check API endpoint configurations
- [ ] Test authentication flows
- [ ] Verify routing works correctly
- [ ] Check console for errors
- [ ] Test on multiple browsers/devices

### Performance Optimization

- [ ] Run Lighthouse audit
- [ ] Optimize images and lazy load when appropriate
- [ ] Implement proper caching strategies
- [ ] Consider CDN for static assets
- [ ] Monitor bundle size and chunk loading

---

## Common Patterns & Utilities

### Data Fetching Pattern

```javascript
const { data, loading, error } = useQuery(GET_DATA_QUERY, {
  errorPolicy: 'all',
  onError: (error) => onError(error.message)
});
```

### Form Handling Pattern

```javascript
const { formData, handleChange, handleSubmit } = useForm({
  initialValues: { /* ... */ },
  onSubmit: async (data) => { /* ... */ }
});
```

### Authentication Check

```javascript
const { user, loading } = useAuth();
if (loading) return <LoadingSkeleton />;
if (!user) return <LoginPrompt />;
```

---

## Quick Reference Links

- **Material-UI Components**: <https://mui.com/material-ui/>
- **Apollo Client**: <https://www.apollographql.com/docs/react/>
- **Framer Motion**: <https://www.framer.com/motion/>
- **React Router**: <https://reactrouter.com/>
- **Vite Configuration**: <https://vitejs.dev/config/>

---

*Keep this checklist handy when developing new features to maintain consistency and quality across your application!*
