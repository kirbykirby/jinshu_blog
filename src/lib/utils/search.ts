import type { SearchResult } from '../types';
import { getCollection } from 'astro:content';

interface SearchableDocument {
  id: string;
  title: string;
  englishTitle: string;
  category: string;
  content: string;
  url: string;
}

let searchIndex: SearchableDocument[] | null = null;

async function buildSearchIndex(): Promise<SearchableDocument[]> {
  if (searchIndex) {
    return searchIndex;
  }

  const chronicles = await getCollection('chronicles');
  const biographies = await getCollection('biographies');
  const treatises = await getCollection('treatises');
  const records = await getCollection('records');

  const documents: SearchableDocument[] = [
    ...chronicles.map(entry => ({
      id: entry.id,
      title: entry.data.title,
      englishTitle: entry.data.englishTitle,
      category: 'Imperial Chronicles',
      content: entry.body,
      url: `/chronicles/${entry.slug}`
    })),
    ...biographies.map(entry => ({
      id: entry.id,
      title: entry.data.title,
      englishTitle: entry.data.englishTitle,
      category: 'Biographies',
      content: entry.body,
      url: `/biographies/${entry.slug}`
    })),
    ...treatises.map(entry => ({
      id: entry.id,
      title: entry.data.title,
      englishTitle: entry.data.englishTitle,
      category: 'Treatises',
      content: entry.body,
      url: `/treatises/${entry.slug}`
    })),
    ...records.map(entry => ({
      id: entry.id,
      title: entry.data.title,
      englishTitle: entry.data.englishTitle,
      category: 'Records',
      content: entry.body,
      url: `/records/${entry.slug}`
    }))
  ];

  searchIndex = documents;
  return documents;
}

export async function searchContent(query: string): Promise<SearchResult[]> {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return [];
  }

  const documents = await buildSearchIndex();

  return documents.filter(item => {
    const searchableText = [
      item.title,
      item.englishTitle,
      item.category,
      item.content
    ].join(' ').toLowerCase();

    return searchableText.includes(normalizedQuery);
  }).map(item => ({
    id: item.id,
    title: item.title,
    englishTitle: item.englishTitle,
    category: item.category,
    excerpt: highlightMatch(item.content, normalizedQuery),
    url: item.url
  }));
}

function highlightMatch(text: string, query: string): string {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text.slice(0, 100) + '...';

  const start = Math.max(0, index - 50);
  const end = Math.min(text.length, index + query.length + 50);
  let excerpt = text.slice(start, end);

  if (start > 0) excerpt = '...' + excerpt;
  if (end < text.length) excerpt = excerpt + '...';

  // 高亮匹配的文本
  const highlightedExcerpt = excerpt.replace(
    new RegExp(query, 'gi'),
    match => `<mark>${match}</mark>`
  );

  return highlightedExcerpt;
}