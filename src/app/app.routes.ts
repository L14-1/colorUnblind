import { Routes } from '@angular/router';
import { DetailComponent } from './routes/detail/detail.component';
import { HomeComponent } from './routes/home/home.component';
import { InfosComponent } from './routes/infos/infos.component';
import { FavoritesComponent } from './routes/favorites/favorites.component';
import { SettingsComponent } from './routes/settings/settings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'infos', component: InfosComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'detail/:hexvalue', component: DetailComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' },
];
