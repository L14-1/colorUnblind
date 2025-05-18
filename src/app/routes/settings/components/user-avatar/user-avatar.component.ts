import { Component, computed, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-user-avatar',
  imports: [AvatarModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent {
  public authService = inject(AuthService);

  public label = computed(() => {
    if (this.authService.userDetail()) {
      return this.authService
        .userDetail()
        ?.name.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
    } else {
      return '';
    }
  });
}
