import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import yaml from "js-yaml";

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

import type { Loader } from "astro/loaders";
import { readdirSync, readFileSync } from "node:fs";

const targetSchema = new yaml.Schema([
  new yaml.Type("!Arm", {kind: 'mapping'}),
  new yaml.Type("!AtsamDsu", {kind: 'mapping'}),
  new yaml.Type("!Espressif", {kind: 'mapping'}),
  new yaml.Type("!Flash", {kind: 'mapping'}),
  new yaml.Type("!Generic", {kind: 'mapping'}),
  new yaml.Type("!InfineonScu", {kind: 'mapping'}),
  new yaml.Type("!InfineonXmcScu", {kind: 'mapping'}),
  new yaml.Type("!InfineonPsocSiid", {kind: 'mapping'}),
  new yaml.Type("!NordicConfigId", {kind: 'mapping'}),
  new yaml.Type("!NordicFicrInfo", {kind: 'mapping'}),
  new yaml.Type("!Nvm", {kind: 'mapping'}),
  new yaml.Type("!Ram", {kind: 'mapping'}),
  new yaml.Type("!Riscv", {kind: 'mapping'}),
  new yaml.Type("!v1", {kind: 'scalar'}),
  new yaml.Type("!v2", {kind: 'scalar'}),
  new yaml.Type("!Xtensa", {kind: 'mapping'}),
]);

const targetLoader: Loader = {
  name: "target-loader",
  load: async ({ store, logger, parseData, meta, generateDigest }) => {
    store.clear();

    // Vite's recommended import.meta.glob doesn't seem
    // to work in content.config.ts :/
    const FOLDER = "src/content/probe-rs-repo/probe-rs/targets/";
    for (const file of readdirSync(FOLDER)) {
      const raw = readFileSync(FOLDER + file).toString();
      const parsed = yaml.load(raw, {
        schema: targetSchema,
      });
      store.set({id: file.replace('.yaml', ''), data: parsed});
    }
  },
};

const targets = defineCollection({
  loader: targetLoader,
  schema: z.object({
    name: z.coerce.string(),
    manufacturer: z.object({
      id: z.coerce.number().default(0),
      cc: z.coerce.number().default(0),
    }).default({id: 0, cc: 0}),
  }),
});

export const collections = { blog, docs, docsFolderYaml, targets };
