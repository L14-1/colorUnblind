import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { StatsComponent } from './routes/stats/stats.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stats', component: StatsComponent },
  { path: '**', redirectTo: '' },
];
