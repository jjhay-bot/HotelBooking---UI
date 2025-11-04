# Frontend Feature Checklist ⚡

**Quick reference for new features - keep it simple!**

## 🚀 Before You Start
- [ ] What data do I need? (GraphQL query/REST endpoint)
- [ ] What components can I reuse?
- [ ] Local state or global state?
- [ ] Need authentication?

## 🛠️ While Building
- [ ] Loading skeleton for data fetching
- [ ] Error state with retry option  
- [ ] Mobile responsive (Material-UI breakpoints)
- [ ] Use existing hooks (`useAuth`, `useForm`, etc.)

## ✅ Before Committing
- [ ] ESLint clean
- [ ] Console error-free
- [ ] Works on mobile
- [ ] Loading/error states tested

## 📱 Quick Patterns

### Data Fetching
```javascript
const { data, loading, error } = useQuery(QUERY);
if (loading) return <Skeleton />;
if (error) return <ErrorAlert retry={refetch} />;
```

### Forms
```javascript
const { formData, handleChange, handleSubmit } = useForm({
  initialValues: {},
  onSubmit: async (data) => { /* submit */ }
});
```

### Auth Check
```javascript
const { user, loading } = useAuth();
if (loading) return <LoadingSkeleton />;
if (!user) return <LoginPrompt />;
```

That's it! 🎉
