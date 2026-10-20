import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Journal posts live as Markdown in src/content/blog. Add a file and it appears on /blog/.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Food pairing', 'Dogs and beer', 'The pack']),
    image: z.string(),
    beers: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
