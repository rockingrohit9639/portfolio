---
description: Process new images from the gallery inbox — auto-tag, rename, and register them
---

# Add Gallery Image

Process any new images sitting in `src/assets/gallery/_inbox/`.

## Steps

1. **Check the inbox:** List all image files in `src/assets/gallery/_inbox/`. If empty, tell the user there's nothing to process and stop.

2. **For each image:**

   a. **View the image** using the Read tool to understand what's in it.

   b. **Pick tags** from the fixed set: `nature`, `urban`, `abstract`, `misc`. Pick 1-2 tags per image. Only use tags from this set — do not invent new ones.

   c. **Generate a filename** — start with the tag(s), then add a short descriptor to make it unique. For example: `nature-foggy-hills.jpg`, `urban-street-rain.jpg`, `abstract-spheres.jpg`. Preserve the original file extension.

   d. **Move the file** from `_inbox/` to `src/assets/gallery/` with the new filename.

3. **Show a summary** of what was processed: original filename → new filename (tags).

## Rules

- Always look at the image before tagging — don't guess from the original filename.
- Filenames are lowercase, kebab-case, no special characters — each segment is a tag.
- If a file with the generated name already exists, append a number (e.g. `nature-forest-2.jpg`).
- Tags are derived from filenames at build time (`filename.split('-')`) — no manual registry needed.
