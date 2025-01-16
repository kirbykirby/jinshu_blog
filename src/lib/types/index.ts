// Translation types
export interface TextPart {
  type: 'text' | 'annotation';
  content: string;
  note?: string;
}

export interface TranslationText {
  text: TextPart[];  // 移除 string 类型，强制使用 TextPart 数组
  ref?: string;
}

export interface Section {
  chinese: TranslationText;
  english: TranslationText;
}

// Navigation types
export interface Category {
  title: string;
  chapters: Chapter[];
}

export interface Chapter {
  number: string;
  title: string;
  href: string;
}

export interface KeyFigure {
  name: string;
  href: string;
}

// Blog types
export interface BlogPost {
  title: string;
  pubDate: string | Date;
  author?: string;
}

// Search types
export interface SearchResult {
  id: string;
  title: string;
  englishTitle: string;
  category: string;
  excerpt: string;
  url: string;
}

// MDX Frontmatter types
export interface TranslationFrontmatter {
  layout: string;
  title: string;
  chineseTitle: string;
  englishTitle: string;
  status?: 'complete' | 'incomplete' | 'needs-improvement';
  sections: Section[];
  references: Reference[];
}

export interface Reference {
  id: string;
  text: string;
}