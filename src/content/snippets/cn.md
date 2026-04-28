---
title: cn (classnames utility)
language: typescript
date: 2026-04-06
---

```typescript
type ClassValue = string | null | undefined | false;

function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
```
