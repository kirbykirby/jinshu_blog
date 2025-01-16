import { defineCollection, z } from 'astro:content';

const documentSchema = z.object({
  title: z.string(),
  chineseTitle: z.string(),
  englishTitle: z.string(),
  pubDate: z.date(),
  author: z.string().optional(),
  content: z.string().optional(),
  status: z.enum(['complete', 'incomplete', 'needs-improvement']).optional(),
});

export const collections = {
  chronicles: defineCollection({
    type: 'content',
    schema: documentSchema,
  }),
  biographies: defineCollection({
    type: 'content',
    schema: documentSchema,
  }),
  treatises: defineCollection({
    type: 'content',
    schema: documentSchema,
  }),
  blog: defineCollection({
    type: 'content',
    schema: documentSchema,
  }),
};