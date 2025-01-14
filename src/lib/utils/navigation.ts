export class NavigationManager {
  private categoryToggles: NodeListOf<Element>;
  
  constructor() {
    this.categoryToggles = document.querySelectorAll('.category-toggle');
    this.init();
  }

  private init() {
    this.setupCategoryToggles();
    this.expandActiveCategory();
  }

  private setupCategoryToggles() {
    this.categoryToggles.forEach(toggle => {
      toggle.addEventListener('click', () => this.handleToggleClick(toggle));
    });
  }

  private handleToggleClick(toggle: Element) {
    const category = toggle.closest('.category');
    const wasExpanded = category?.classList.contains('expanded');
    
    this.closeAllCategories();
    
    if (!wasExpanded) {
      category?.classList.add('expanded');
    }
  }

  private closeAllCategories() {
    document.querySelectorAll('.category').forEach(category => {
      category.classList.remove('expanded');
    });
  }

  private expandActiveCategory() {
    const activeChapter = document.querySelector('.chapter-link.active');
    if (activeChapter) {
      const category = activeChapter.closest('.category');
      category?.classList.add('expanded');
    }
  }
}