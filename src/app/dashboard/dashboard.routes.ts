import { Routes } from '@angular/router';
import { StatisticComponent } from '../entry/statistic/statistic.component';
import { EntryComponent } from '../entry/entry.component';
import { DetailComponent } from '../entry/detail/detail.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticComponent },
  { path: 'entry', component: EntryComponent },
  { path: 'detail', component: DetailComponent }
];
