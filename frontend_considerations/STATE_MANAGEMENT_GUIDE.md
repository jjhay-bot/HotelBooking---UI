# State Management Patterns

## State Management Decision Tree

```text
Does the state need to be shared across components?
├─ No → Use Local State (useState, useReducer)
└─ Yes → Is it user/auth related?
    ├─ Yes → Use AuthContext
    └─ No → Is it server data?
        ├─ Yes → Use Apollo Cache / React Query
        └─ No → Is it UI state?
            ├─ Yes → Use Apollo Reactive Variables
            └─ No → Create Custom Context
```

## Local State Patterns

### useState for Simple State

```javascript
import { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit logic
      await submitUser(formData);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

### useReducer for Complex State

```javascript
import { useReducer } from 'react';

// State shape
const initialState = {
  items: [],
  selectedItems: [],
  filters: {
    search: '',
    category: '',
    status: ''
  },
  sorting: {
    field: 'name',
    direction: 'asc'
  },
  pagination: {
    page: 1,
    pageSize: 20,
    total: 0
  }
};

// Action types
const ACTIONS = {
  SET_ITEMS: 'SET_ITEMS',
  SELECT_ITEM: 'SELECT_ITEM',
  TOGGLE_SELECT_ALL: 'TOGGLE_SELECT_ALL',
  UPDATE_FILTER: 'UPDATE_FILTER',
  UPDATE_SORT: 'UPDATE_SORT',
  UPDATE_PAGINATION: 'UPDATE_PAGINATION',
  RESET_FILTERS: 'RESET_FILTERS'
};

// Reducer function
function dataTableReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
        selectedItems: []
      };

    case ACTIONS.SELECT_ITEM:
      const isSelected = state.selectedItems.includes(action.payload);
      return {
        ...state,
        selectedItems: isSelected
          ? state.selectedItems.filter(id => id !== action.payload)
          : [...state.selectedItems, action.payload]
      };

    case ACTIONS.TOGGLE_SELECT_ALL:
      const allSelected = state.selectedItems.length === state.items.length;
      return {
        ...state,
        selectedItems: allSelected ? [] : state.items.map(item => item.id)
      };

    case ACTIONS.UPDATE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.field]: action.value
        },
        pagination: {
          ...state.pagination,
          page: 1 // Reset to first page when filtering
        }
      };

    case ACTIONS.UPDATE_SORT:
      return {
        ...state,
        sorting: {
          field: action.field,
          direction: state.sorting.field === action.field && state.sorting.direction === 'asc'
            ? 'desc'
            : 'asc'
        }
      };

    case ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
        pagination: {
          ...state.pagination,
          page: 1
        }
      };

    default:
      return state;
  }
}

// Usage in component
const DataTable = () => {
  const [state, dispatch] = useReducer(dataTableReducer, initialState);

  const handleFilterChange = (field, value) => {
    dispatch({ type: ACTIONS.UPDATE_FILTER, field, value });
  };

  const handleSort = (field) => {
    dispatch({ type: ACTIONS.UPDATE_SORT, field });
  };

  return (
    // Table implementation
  );
};
```

## Global State with Context

### Creating a Custom Context

```javascript
// src/context/NotificationContext.jsx
import { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext();

const initialState = {
  notifications: [],
  unreadCount: 0
};

function notificationReducer(state, action) {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1
      };

    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif =>
          notif.id === action.id ? { ...notif, read: true } : notif
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      };

    case 'CLEAR_ALL':
      return initialState;

    default:
      return state;
  }
}

export function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const addNotification = (notification) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
        ...notification
      }
    });
  };

  const markAsRead = (id) => {
    dispatch({ type: 'MARK_AS_READ', id });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  return (
    <NotificationContext.Provider value={{
      ...state,
      addNotification,
      markAsRead,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}
```

## Apollo Reactive Variables

### UI State Management

```javascript
// src/gql/reactiveVar.js
import { makeVar } from '@apollo/client';

// Loading state
export const loadingVar = makeVar(false);

// Modal state
export const modalVar = makeVar({
  isOpen: false,
  type: null,
  data: null
});

// Theme state
export const themeVar = makeVar({
  mode: 'light',
  primaryColor: '#1976d2'
});

// Sidebar state
export const sidebarVar = makeVar({
  isOpen: true,
  collapsed: false
});
```

### Using Reactive Variables

```javascript
// src/hooks/useModal.js
import { useReactiveVar } from '@apollo/client';
import { modalVar } from '@/gql/reactiveVar';

export function useModal() {
  const modal = useReactiveVar(modalVar);

  const openModal = (type, data = null) => {
    modalVar({
      isOpen: true,
      type,
      data
    });
  };

  const closeModal = () => {
    modalVar({
      isOpen: false,
      type: null,
      data: null
    });
  };

  return {
    modal,
    openModal,
    closeModal,
    isOpen: modal.isOpen
  };
}
```

```javascript
// Usage in component
import { useModal } from '@/hooks/useModal';

const UserList = () => {
  const { openModal } = useModal();

  const handleEditUser = (user) => {
    openModal('editUser', user);
  };

  return (
    // Component implementation
  );
};
```

## Form State Management

### Custom useForm Hook

```javascript
// src/hooks/useForm.jsx
import { useState, useCallback } from 'react';

export function useForm({ 
  initialValues = {}, 
  onSubmit, 
  validate 
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when value changes
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validateForm = useCallback(() => {
    if (!validate) return {};
    
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return validationErrors;
  }, [validate, values]);

  const handleChange = useCallback((name) => (event) => {
    const value = event.target.type === 'checkbox' 
      ? event.target.checked 
      : event.target.value;
    setValue(name, value);
  }, [setValue]);

  const handleBlur = useCallback((name) => () => {
    setFieldTouched(name);
    if (validate && touched[name]) {
      validateForm();
    }
  }, [setFieldTouched, validate, touched, validateForm]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    setFieldTouched,
    resetForm,
    isValid: Object.keys(errors).length === 0
  };
}
```

### Form Validation

```javascript
// src/utils/validation.js
export const validators = {
  required: (value) => 
    !value || value.trim() === '' ? 'This field is required' : null,
  
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? 'Please enter a valid email' : null;
  },
  
  minLength: (min) => (value) =>
    value && value.length < min ? `Must be at least ${min} characters` : null,
  
  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return 'Password must contain uppercase, lowercase, and number';
    }
    return null;
  }
};

export function createValidator(rules) {
  return (values) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]];
      
      for (const rule of fieldRules) {
        const error = rule(values[field], values);
        if (error) {
          errors[field] = error;
          break; // Stop at first error
        }
      }
    });
    
    return errors;
  };
}

// Usage
const userValidator = createValidator({
  name: validators.required,
  email: [validators.required, validators.email],
  password: validators.password
});
```

## Server State Management

### Apollo Client Patterns

```javascript
// Custom hook for user management
export function useUserManagement() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleCreateUser = async (userData) => {
    try {
      const { data } = await createUser({
        variables: { input: userData },
        update(cache, { data: { createUser } }) {
          // Update cache
          const existingUsers = cache.readQuery({ query: GET_USERS });
          cache.writeQuery({
            query: GET_USERS,
            data: {
              users: [...existingUsers.users, createUser]
            }
          });
        }
      });
      return data.createUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    users: data?.users || [],
    loading,
    error,
    refetch,
    createUser: handleCreateUser,
    updateUser,
    deleteUser
  };
}
```

### Optimistic Updates

```javascript
const [updateUserStatus] = useMutation(UPDATE_USER_STATUS, {
  optimisticResponse: (variables) => ({
    updateUserStatus: {
      __typename: 'User',
      id: variables.id,
      status: variables.status
    }
  }),
  update(cache, { data: { updateUserStatus } }) {
    cache.modify({
      id: cache.identify(updateUserStatus),
      fields: {
        status: () => updateUserStatus.status
      }
    });
  },
  onError: (error) => {
    // Handle error, maybe show notification
    console.error('Failed to update user status:', error);
  }
});
```

## State Synchronization Patterns

### Syncing Local and Server State

```javascript
// Custom hook for draft management
export function useDraftSync(id, autoSaveInterval = 30000) {
  const [localData, setLocalData] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { data: serverData } = useQuery(GET_DRAFT, { variables: { id } });
  const [saveDraft] = useMutation(SAVE_DRAFT);

  // Initialize local data from server
  useEffect(() => {
    if (serverData?.draft && !localData) {
      setLocalData(serverData.draft);
      setLastSaved(new Date(serverData.draft.updatedAt));
    }
  }, [serverData, localData]);

  // Auto-save functionality
  useEffect(() => {
    if (!hasUnsavedChanges || !localData) return;

    const timer = setTimeout(() => {
      handleSave();
    }, autoSaveInterval);

    return () => clearTimeout(timer);
  }, [hasUnsavedChanges, localData, autoSaveInterval]);

  const updateData = (updates) => {
    setLocalData(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    if (!localData || !hasUnsavedChanges) return;

    try {
      await saveDraft({
        variables: { id, input: localData }
      });
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  };

  return {
    data: localData,
    updateData,
    handleSave,
    hasUnsavedChanges,
    lastSaved
  };
}
```
