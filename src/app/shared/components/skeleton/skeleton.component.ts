import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  public lines = input(1);

  public linesArray = computed(() => {
    let arr = [0];
    arr.length = this.lines();
    arr.fill(0);
    return arr;
  });
}
