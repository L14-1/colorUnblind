import { Component, inject, input, signal } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconCopy, IconExternalLink } from 'angular-tabler-icons/icons';
import { HexAlternativeDTO } from '../../../../models/hex-alternative.model';
import { ColorComponent } from '../../../../shared/components/color/color.component';
import { DetailService } from '../../services/detail.service';
import { ClipboardCopyDirective } from '../../../../shared/directives/clipboard-copy.directive';

@Component({
  selector: 'app-alternatives',
  imports: [TablerIconComponent, ColorComponent, ClipboardCopyDirective],
  providers: [provideTablerIcons({ IconExternalLink, IconCopy })],
  templateUrl: './alternatives.component.html',
  styleUrl: './alternatives.component.scss',
})
export class AlternativesComponent {
  public hex = input<string>();
  private readonly detailService = inject(DetailService);

  public alternatives = signal<HexAlternativeDTO[]>([]);

  ngOnChanges(): void {
    if (!this.hex()) return;
    this.detailService.getColorAlternatives(this.hex()!).subscribe({
      next: (alternatives) => {
        this.alternatives.set(alternatives);
      },
    });
  }
}
