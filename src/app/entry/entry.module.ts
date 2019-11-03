import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { StatisticComponent } from './statistic/statistic.component';
import { SortEntriesPipe } from './sort-entries.pipe';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EntryComponent } from './entry.component';
import { StoreModule } from '@ngrx/store';
import { entryReducer } from './entry.reducer';

@NgModule({
  declarations: [DetailComponent, StatisticComponent, SortEntriesPipe, DashboardComponent, EntryComponent],
  imports: [
    CommonModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('entry', entryReducer)
  ]
})
export class EntryModule {}
