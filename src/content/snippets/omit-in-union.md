---
title: omit in union
language: typescript
date: 2026-05-11
---

```typescript
// Source - https://stackoverflow.com/a/57103940
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;
```
