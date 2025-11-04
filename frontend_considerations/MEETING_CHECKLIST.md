# Business Requirements Meeting Checklist 🤝

**Questions to ask when business discusses new features**

## 📊 Data & Backend Questions
- [ ] What data do we need to display?
- [ ] Do we have this data already or need new API?
- [ ] Real-time updates required?
- [ ] How much data? (pagination needed?)
- [ ] Any data validation rules?

## 👥 User & Auth Questions  
- [ ] Who can access this feature? (public/logged-in/admin)
- [ ] Different views for different user roles?
- [ ] Any permissions or restrictions?

## 📱 UX & Design Questions
- [ ] Mobile experience important?
- [ ] Any specific loading requirements?
- [ ] What happens when data is empty?
- [ ] Error handling - what should users see?
- [ ] Any accessibility requirements?

## ⚡ Performance & Scale
- [ ] Expected number of users?
- [ ] How often will this be used?
- [ ] Any performance expectations?
- [ ] Offline functionality needed?

## 🔄 Integration Questions
- [ ] Does this connect to existing features?
- [ ] Any third-party services involved?
- [ ] Email notifications needed?
- [ ] Analytics tracking required?

## ⏰ Timeline & Priority
- [ ] Hard deadline or flexible?
- [ ] Can we break this into smaller releases?
- [ ] What's the minimum viable version?
- [ ] Any dependencies on other teams?

## 🎯 Success Metrics
- [ ] How will we know this is working?
- [ ] What metrics should we track?
- [ ] Any A/B testing planned?

---

## 💡 Quick Translation Guide

**When they say...** → **You think...**
- "Simple form" → Loading states, validation, error handling
- "Show user data" → Authentication, permissions, API calls  
- "Real-time updates" → WebSockets, subscriptions, performance
- "Dashboard" → Multiple data sources, loading strategies
- "Mobile friendly" → Responsive design, touch interactions
- "Fast loading" → Caching, optimization, skeleton screens

**Red Flags to Clarify:**
- "Just like [other app]" → Get specific requirements
- "Should be easy" → Dig into complexity  
- "Users will love it" → Define actual user needs
- "Make it pretty" → Get design specifications
