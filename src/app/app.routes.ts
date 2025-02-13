import { Routes } from '@angular/router';
import { DetailComponent } from './routes/detail/detail.component';
import { HomeComponent } from './routes/home/home.component';
import { InfosComponent } from './routes/infos/infos.component';
import { StatsComponent } from './routes/stats/stats.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'infos', component: InfosComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'detail/:hexvalue', component: DetailComponent },
  { path: '**', redirectTo: '' },
];
