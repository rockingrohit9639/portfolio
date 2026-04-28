import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const thoughts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/thoughts" }),
  schema: z.object({
    type: z.enum(["thought", "note", "idea", "quote"]),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});

const bookmarks = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/bookmarks" }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    description: z.string().optional(),
    category: z.enum(["tools", "design", "articles", "misc"]),
    date: z.coerce.date(),
  }),
});

const snippets = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/snippets" }),
  schema: z.object({
    title: z.string(),
    language: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { thoughts, bookmarks, snippets };
