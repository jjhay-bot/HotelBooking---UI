# Frontend-Focused Meeting Questions 🎨

**Frontend-specific questions when business discusses new features**

## 📱 Device & Responsive
- [ ] Desktop, mobile, or both?
- [ ] Tablet experience needed?
- [ ] Any specific screen size requirements?
- [ ] Portrait/landscape orientations?

## 🎨 UI/UX Specifics
- [ ] Do we have designs or wireframes?
- [ ] Should match existing UI patterns?
- [ ] Any custom components needed?
- [ ] Specific Material-UI components preferred?
- [ ] Dark/light theme support?

## ⚡ User Experience
- [ ] How should loading look? (skeleton, spinner, progress bar)
- [ ] What happens when there's no data?
- [ ] Error messages - inline or toast notifications?
- [ ] Success feedback needed?
- [ ] Any animations or transitions expected?

## 🔍 Interactions
- [ ] Click, hover, or touch interactions?
- [ ] Keyboard navigation important?
- [ ] Drag and drop functionality?
- [ ] Search or filtering needed?
- [ ] Sorting requirements?

## 📊 Data Display
- [ ] Table, cards, or list format?
- [ ] Pagination or infinite scroll?
- [ ] How many items per page/view?
- [ ] Any data visualization (charts, graphs)?
- [ ] Export functionality needed?

## 🚀 Performance Expectations
- [ ] Page load time expectations?
- [ ] Smooth scrolling important?
- [ ] Real-time updates visible to user?
- [ ] Offline functionality needed?

## ♿ Accessibility
- [ ] Screen reader support required?
- [ ] Keyboard-only navigation?
- [ ] Color contrast requirements?
- [ ] Any WCAG compliance needs?

---

## 💬 Frontend Translation Guide

**When they say...** → **Frontend impact:**
- "User dashboard" → Multiple data sources, loading states, responsive grid
- "Simple table" → Sorting, filtering, pagination, mobile layout
- "Quick form" → Validation, error handling, loading states, mobile keyboard
- "Real-time chat" → WebSocket UI, message states, scroll behavior
- "Image gallery" → Progressive loading, lazy loading, responsive images
- "Search feature" → Debounced input, loading states, empty states, autocomplete

## 🚨 Frontend Red Flags

**Clarify these immediately:**
- "Make it look modern" → Get specific design system requirements
- "Fast and responsive" → Define actual performance metrics
- "Works on all devices" → Get device/browser support matrix
- "Intuitive interface" → Get user flow specifications
- "Rich user experience" → Break down into specific interactions
