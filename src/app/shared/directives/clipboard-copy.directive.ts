import { Directive, HostListener, inject, input } from '@angular/core';
import { MessageService } from 'primeng/api';

@Directive({
  selector: '[appClipboardCopy]',
})
export class ClipboardCopyDirective {
  public readonly contentToCopy = input('', { alias: 'appClipboardCopy' });
  private readonly messageService = inject(MessageService);

  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (!this.contentToCopy()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Clipboard',
        detail: `Nothing to copy was provided !`,
        closable: false,
      });
    }
    try {
      navigator.clipboard.writeText(this.contentToCopy());
      this.messageService.add({
        severity: 'success',
        summary: 'Copied to clipboard ! 🎉',
        detail: `'${this.contentToCopy()}' was successfully copied to clipboard !`,
        closable: false,
      });
    } catch (e) {
      this.messageService.add({
        severity: 'Error',
        summary: 'Clipboard',
        detail: `An error occured while trying to copy to clipboard ...`,
        closable: false,
      });
    }
  }
}
