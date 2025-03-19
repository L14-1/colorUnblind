import {
  booleanAttribute,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconEye } from 'angular-tabler-icons/icons';
import { ViewedColorsService } from '../../services/viewed-colors.service';
import { ColorComponent } from '../color/color.component';
import { ORIGINS } from '../../../constants/origins.constant';

@Component({
  selector: 'app-previously-viewed-colors',
  imports: [ColorComponent],
  providers: [provideTablerIcons({ IconEye })],
  templateUrl: './previously-viewed-colors.component.html',
  styleUrl: './previously-viewed-colors.component.scss',
})
export class PreviouslyViewedColorsComponent {
  public showAll = input(false, { transform: booleanAttribute });
  public readonly origins = ORIGINS;

  private readonly colorService = inject(ViewedColorsService);

  private readonly viewedColors = toSignal(this.colorService.getAll());

  public lastColors = computed(() => {
    let sortedColors = this.viewedColors()?.sort((a, b) => b.at[0] - a.at[0]);
    if (!this.showAll()) {
      sortedColors = sortedColors?.slice(0, 10);
    }
    return sortedColors ?? [];
  });
}
