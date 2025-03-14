import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    date: z.coerce.date(),
    authors: z.array(z.string()),
  }),
});

const docs = defineCollection({
  loader: glob({ base: "./src/content/docs", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.coerce.number(),
  }),
});

const docsFolderYaml = defineCollection({
  loader: glob({
    base: "./src/content/docs",
    pattern: "**/_data.yaml",
    generateId: ({ entry }) => entry.replace("/_data.yaml", ""),
  }),
  schema: z.object({
    title: z.coerce.string(),
    sectionOrder: z.coerce.number(),
  }),
});

export const collections = { blog, docs, docsFolderYaml };
