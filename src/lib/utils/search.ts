import type { SearchResult } from '../types';
import type { MarkdownInstance } from 'astro';

interface SearchableDocument {
  id: string;
  title: string;
  content: string;
  url: string;
}

let searchIndex: SearchableDocument[] | null = null;

async function buildSearchIndex(): Promise<SearchableDocument[]> {
  if (searchIndex) {
    return searchIndex;
  }

  // 修改MDX文件的导入方式
  const mdxPages = await import.meta.glob('/src/pages/**/*.mdx', { 
    eager: true,
    // 移除 query: { raw: true }
  });
  
  const astroPages = await import.meta.glob('/src/pages/**/*.astro', { 
    eager: true,
    query: { raw: true }
  });

  const documents: SearchableDocument[] = [
    // 修改MDX文件处理方式
    ...Object.entries(mdxPages).map(([path, page]) => {
      try {
        const frontmatter = (page as any).frontmatter || {};
        // 获取完整内容的新方法
        const content = frontmatter.rawContent || frontmatter.content || '';
        
        return {
          id: path,
          title: frontmatter.title || '',
          content: stripMdx(content),
          url: path.replace('/src/pages', '').replace('.mdx', '')
        };
      } catch (error) {
        console.error(`Error processing MDX file ${path}:`, error);
        return null;
      }
    }),

    // Astro文件处理保持不变
    ...Object.entries(astroPages).map(([path, page]) => {
      try {
        const frontmatter = (page as any).frontmatter;
        const sections = frontmatter?.sections || [];
        
        const content = sections
          .map((section: any) => {
            const chinese = section.chinese?.text
              ?.map((t: any) => t.content || '')
              .filter(Boolean)
              .join(' ');
            const english = section.english?.text
              ?.map((t: any) => t.content || '')
              .filter(Boolean)
              .join(' ');
            return `${chinese} ${english}`;
          })
          .filter(Boolean)
          .join('\n');

        return {
          id: path,
          title: frontmatter?.title || '',
          content,
          url: path.replace('/src/pages', '').replace('.astro', '')
        };
      } catch (error) {
        console.error(`Error processing Astro file ${path}:`, error);
        return null;
      }
    })
  ].filter((doc): doc is SearchableDocument => 
    doc !== null && Boolean(doc.title || doc.content)
  );

  searchIndex = documents;
  return documents;
}

function stripMdx(mdx: string): string {
  return mdx
    .replace(/---[\s\S]*?---/, '')
    .replace(/import[^;]*;/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/$$([^$$]*)$$$[^)]*$/g, '$1')
    .replace(/!$$[^$$]*$$$[^)]*$/g, '')
    .replace(/[#\-\*$$$$]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// 原有的stripHtml函数保持不变
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')           
    .replace(/\{[^}]*\}/g, ' ')         
    .replace(/\s+/g, ' ')               
    .replace(/[#\-\*$$$$`]/g, ' ')      
    .trim();
}

export async function searchContent(query: string): Promise<SearchResult[]> {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return [];
  }

  const documents = await buildSearchIndex();

  return documents
    .filter(item => {
      const searchableText = [
        item.title,
        item.content
      ].join(' ').toLowerCase();

      return searchableText.includes(normalizedQuery);
    })
    .map(item => ({
      id: item.id,
      title: item.title,
      englishTitle: extractEnglishTitle(item.title),
      category: detectCategory(item.url),
      excerpt: highlightMatch(item.content, normalizedQuery),
      url: item.url
    }));
}

function extractEnglishTitle(title: string): string {
  const parts = title.split('|');
  if (parts.length > 1) {
    return parts[1].trim();
  }
  return '';
}

function detectCategory(url: string): string {
  if (url.startsWith('/blog')) return 'Blog';
  if (url.startsWith('/translations')) return 'Translations';
  if (url.startsWith('/chronicles')) return 'Chronicles';
  return 'Other';
}

function highlightMatch(text: string, query: string): string {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text.slice(0, 100) + '...';

  const start = Math.max(0, index - 100);
  const end = Math.min(text.length, index + query.length + 100);
  let excerpt = text.slice(start, end);

  if (start > 0) excerpt = '...' + excerpt;
  if (end < text.length) excerpt = excerpt + '...';

  const highlightedExcerpt = excerpt.replace(
    new RegExp(query, 'gi'),
    match => `<mark>${match}</mark>`
  );

  return highlightedExcerpt;
}