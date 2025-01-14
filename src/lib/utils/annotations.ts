export class AnnotationManager {
  private tooltips: Map<HTMLElement, HTMLElement> = new Map();

  constructor() {
    this.init();
  }

  private init() {
    this.setupAnnotations();
    this.setupFootnotes();
  }

  private setupAnnotations() {
    const annotations = document.querySelectorAll('.annotation');
    annotations.forEach(annotation => this.setupAnnotation(annotation as HTMLElement));
  }

  private setupFootnotes() {
    const footnotes = document.querySelectorAll('.footnote-ref');
    footnotes.forEach(footnote => this.setupFootnote(footnote as HTMLElement));
  }

  private setupAnnotation(annotation: HTMLElement) {
    const note = annotation.getAttribute('data-note');
    if (!note) return;

    const tooltip = this.createTooltip(note);
    annotation.appendChild(tooltip);
    this.tooltips.set(annotation, tooltip);

    annotation.addEventListener('mouseenter', () => this.showTooltip(annotation));
    annotation.addEventListener('mouseleave', () => this.hideTooltip(annotation));
  }

  private setupFootnote(footnote: HTMLElement) {
    const href = footnote.getAttribute('href');
    if (!href) return;

    // 获取脚注内容
    const footnoteId = href.replace('#', '');
    const footnoteContent = document.getElementById(footnoteId);
    if (!footnoteContent) return;

    // 移除引用标记，只保留实际内容
    const content = footnoteContent.textContent?.replace(/^\[\^ref\d+\]:\s*/, '') || '';

    const tooltip = this.createTooltip(content);
    footnote.appendChild(tooltip);
    this.tooltips.set(footnote, tooltip);

    footnote.addEventListener('mouseenter', () => this.showTooltip(footnote));
    footnote.addEventListener('mouseleave', () => this.hideTooltip(footnote));
  }

  private createTooltip(content: string): HTMLElement {
    const tooltip = document.createElement('div');
    tooltip.className = 'footnote-tooltip';
    tooltip.textContent = content;
    return tooltip;
  }

  private showTooltip(element: HTMLElement) {
    const tooltip = this.tooltips.get(element);
    if (!tooltip) return;

    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let top = -tooltipRect.height - 10;
    let left = (rect.width - tooltipRect.width) / 2;

    if (rect.left + left < 10) {
      left = -rect.left + 10;
    } else if (rect.left + left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - rect.left - tooltipRect.width - 10;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'visible';
  }

  private hideTooltip(element: HTMLElement) {
    const tooltip = this.tooltips.get(element);
    if (!tooltip) return;

    tooltip.style.opacity = '0';
    tooltip.style.visibility = 'hidden';
  }
}