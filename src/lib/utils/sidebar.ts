export class SidebarManager {
  private container: HTMLElement | null;
  private toggle: HTMLElement | null;
  private overlay: HTMLElement | null;
  private mainContent: HTMLElement | null;
  private isDesktop: boolean;

  constructor() {
    this.container = document.querySelector('.sidebar-container');
    this.toggle = document.querySelector('.menu-toggle');
    this.overlay = document.querySelector('.sidebar-overlay');
    this.mainContent = document.querySelector('main');
    this.isDesktop = window.innerWidth > 768;
    
    this.init();
  }

  private init() {
    this.setupEventListeners();
    this.loadSidebarState();
    window.addEventListener('resize', () => this.handleResize());
  }

  private setupEventListeners() {
    this.toggle?.addEventListener('click', () => this.toggleSidebar());
    this.overlay?.addEventListener('click', () => this.closeSidebar());
  }

  private handleResize() {
    const wasDesktop = this.isDesktop;
    this.isDesktop = window.innerWidth > 768;

    if (wasDesktop !== this.isDesktop) {
      if (this.isDesktop) {
        this.loadSidebarState();
      } else {
        this.closeSidebar();
      }
    }
  }

  private toggleSidebar() {
    const isHidden = this.container?.classList.contains('hidden');
    
    if (isHidden) {
      this.openSidebar();
    } else {
      this.closeSidebar();
    }

    if (this.isDesktop) {
      localStorage.setItem('sidebarHidden', (!isHidden).toString());
    }
  }

  private openSidebar() {
    this.container?.classList.remove('hidden');
    this.overlay?.classList.add('active');
    if (this.isDesktop && this.mainContent) {
      this.mainContent.style.marginLeft = 'var(--sidebar-width)';
    }
    if (!this.isDesktop) {
      this.container?.classList.add('active');
    }
  }

  private closeSidebar() {
    this.container?.classList.add('hidden');
    this.overlay?.classList.remove('active');
    if (this.isDesktop && this.mainContent) {
      this.mainContent.style.marginLeft = '0';
    }
    if (!this.isDesktop) {
      this.container?.classList.remove('active');
    }
  }

  private loadSidebarState() {
    if (this.isDesktop) {
      const isHidden = localStorage.getItem('sidebarHidden') === 'true';
      if (isHidden) {
        this.closeSidebar();
      } else {
        this.openSidebar();
      }
    } else {
      this.closeSidebar();
    }
  }
}