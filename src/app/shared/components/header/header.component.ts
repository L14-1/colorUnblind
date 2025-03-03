import { Location } from '@angular/common';
import { booleanAttribute, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import {
  IconChevronLeft,
  IconHistory,
  IconInfoSquareRounded,
  IconTrash,
} from 'angular-tabler-icons/icons';
import { ButtonModule } from 'primeng/button';
import { BetaComponent } from '../beta/beta.component';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, TablerIconComponent, RouterLink, BetaComponent],
  providers: [
    provideTablerIcons({
      IconChevronLeft,
      IconHistory,
      IconInfoSquareRounded,
      IconTrash,
    }),
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public readonly notForHome = input(false, { transform: booleanAttribute });
  public readonly customButton = input(false, { transform: booleanAttribute });

  public location = inject(Location);
}
