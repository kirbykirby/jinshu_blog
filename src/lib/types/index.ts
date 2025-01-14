export interface TextPart {
  type: 'text' | 'annotation';
  content: string;
  note?: string;
}

export interface TranslationText {
  text: TextPart[] | string;
  ref: string;
}

export interface Section {
  chinese: TranslationText;
  english: TranslationText;
}

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

export interface BlogPost {
  title: string;
  pubDate: string | Date;
  author?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  englishTitle: string;
  category: string;
  excerpt: string;
  url: string;
}