---
title: truncate string
language: typescript
date: 2026-04-08
---

```typescript
const truncate = (str: string, maxLength: number): string =>
  str.length <= maxLength ? str : str.slice(0, maxLength).trimEnd() + '…';
```
