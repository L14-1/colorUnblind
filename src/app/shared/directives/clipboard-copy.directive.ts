import { Directive, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appClipboardCopy]',
})
export class ClipboardCopyDirective {
  public readonly contentToCopy = input('', { alias: 'appClipboardCopy' });
  private originalInnerHtml: string | undefined = undefined;

  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (this.originalInnerHtml) return;
    if (!this.contentToCopy()) console.warn('Nothing to copy was provided');
    navigator.clipboard.writeText(this.contentToCopy());
    this.originalInnerHtml = target.innerHTML;
    target.innerHTML =
      "<div style='white-space: nowrap; text-align: center; width: 100%'>Copied ! 🎉</div>";
    setTimeout(() => {
      target.innerHTML = this.originalInnerHtml ?? '';
      this.originalInnerHtml = undefined;
    }, 1000);
  }
}
