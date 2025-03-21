import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconEyeSpark } from 'angular-tabler-icons/icons';
import { ORIGINS } from '../../../constants/origins.constant';

@Component({
  selector: 'app-color',
  imports: [RouterLink, TablerIconComponent],
  providers: [provideTablerIcons({ IconEyeSpark })],
  templateUrl: './color.component.html',
  styleUrl: './color.component.scss',
})
export class ColorComponent {
  public hex = input.required<string>();
  public origin = input.required<ORIGINS>();
}
