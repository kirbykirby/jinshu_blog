import { searchContent } from './search';

export class SearchUI {
  private input: HTMLInputElement;
  private button: HTMLButtonElement;
  private resultsContainer: HTMLDivElement;
  private searchTimeout: number | null = null;

  constructor() {
    this.input = document.getElementById('search-input') as HTMLInputElement;
    this.button = document.getElementById('search-button') as HTMLButtonElement;
    this.resultsContainer = document.getElementById('search-results') as HTMLDivElement;
    
    this.init();
  }

  private init() {
    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.input.addEventListener('input', () => this.handleInput());
    this.button.addEventListener('click', () => this.performSearch());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.performSearch();
      }
    });

    // 点击搜索结果外部关闭搜索结果
    document.addEventListener('click', (e) => {
      if (!this.resultsContainer.contains(e.target as Node) && 
          !this.input.contains(e.target as Node) &&
          !this.button.contains(e.target as Node)) {
        this.hideResults();
      }
    });

    // ESC 键关闭搜索结果
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideResults();
      }
    });
  }

  private handleInput() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.performSearch();
    }, 2000) as unknown as number;
  }

  private async performSearch() {
    const query = this.input.value.trim();
    
    if (!query) {
      this.hideResults();
      return;
    }

    try {
      const results = await searchContent(query);
      this.displayResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      this.displayError();
    }
  }

  private displayResults(results: any[]) {
    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="search-result-item">
          <p class="result-title">
            <span class="result-title-chinese">未找到相关内容</span>
            <span class="result-title-english">No results found</span>
          </p>
        </div>
      `;
    } else {
      this.resultsContainer.innerHTML = results.map(result => `
        <a href="${result.url}" class="search-result-item">
          <div class="result-header">
            <span class="result-category">${result.category}</span>
            <div class="result-title">
              <span class="result-title-chinese">${result.title}</span>
              <span class="result-title-english">${result.englishTitle}</span>
            </div>
          </div>
          ${result.excerpt ? `<p class="result-excerpt">${result.excerpt}</p>` : ''}
        </a>
      `).join('');
    }

    this.showResults();
  }

  private displayError() {
    this.resultsContainer.innerHTML = `
      <div class="search-result-item">
        <p class="result-title">
          <span class="result-title-chinese">搜索出错</span>
          <span class="result-title-english">An error occurred</span>
        </p>
      </div>
    `;
    this.showResults();
  }

  private showResults() {
    this.resultsContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  private hideResults() {
    this.resultsContainer.classList.remove('active');
    document.body.style.overflow = '';
  }
}