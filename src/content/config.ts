import { defineCollection, z } from 'astro:content';

const documentSchema = z.object({
  title: z.string(),
  englishTitle: z.string(),
  pubDate: z.date(),
  author: z.string().optional(),
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
  records: defineCollection({
    type: 'content',
    schema: documentSchema,
  }),
};