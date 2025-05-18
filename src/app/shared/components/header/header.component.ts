import { Location } from '@angular/common';
import {
  booleanAttribute,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import {
  IconAdjustmentsCog,
  IconChevronLeft,
  IconHeartCog,
  IconHeartSpark,
} from 'angular-tabler-icons/icons';
import { ButtonModule } from 'primeng/button';
import { BetaComponent } from '../beta/beta.component';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, TablerIconComponent, RouterLink, BetaComponent],
  providers: [
    provideTablerIcons({
      IconChevronLeft,
      IconHeartSpark,
      IconAdjustmentsCog,
      IconHeartCog,
    }),
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public readonly notForHome = input(false, { transform: booleanAttribute });
  public readonly customButton = input(false, { transform: booleanAttribute });
  public readonly hideShadow = input(false, { transform: booleanAttribute });
  public readonly disabled = input(false, { transform: booleanAttribute });

  public location = inject(Location);
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);

  @HostListener('window:scroll') onScroll() {
    if (this.hideShadow()) return;
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      window.scrollY > 0
        ? 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
        : 'rgba(0, 0, 0, 0) 0px 0px 0px',
    );
  }
}
