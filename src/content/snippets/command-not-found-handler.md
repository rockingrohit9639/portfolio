---
title: command not found handler
language: bash
date: 2026-05-28
---

```bash
command_not_found_handler() {
  claude "$*"
  return $?
}
```
