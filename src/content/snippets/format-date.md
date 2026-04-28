---
title: format date
language: typescript
date: 2026-03-28
---

```typescript
const formatDate = (date: Date | string): string =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
```
