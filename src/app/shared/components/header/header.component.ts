import { booleanAttribute, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import {
  IconChartHistogram,
  IconChevronLeft,
  IconInfoSquareRounded,
} from 'angular-tabler-icons/icons';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, TablerIconComponent, RouterLink],
  providers: [
    provideTablerIcons({
      IconChevronLeft,
      IconChartHistogram,
      IconInfoSquareRounded,
    }),
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public readonly notForHome = input(false, { transform: booleanAttribute });
}
