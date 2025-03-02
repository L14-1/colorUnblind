import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconEye } from 'angular-tabler-icons/icons';

@Component({
  selector: 'app-color',
  imports: [RouterLink, TablerIconComponent],
  providers: [provideTablerIcons({ IconEye })],
  templateUrl: './color.component.html',
  styleUrl: './color.component.scss',
})
export class ColorComponent {
  public hex = input.required<string>();
}
