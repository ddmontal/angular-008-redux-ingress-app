import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Entry } from '../entry.model';
import { Label } from 'ng2-charts';
import { AppState } from '../entry.reducer';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styles: []
})
export class StatisticComponent implements OnInit, OnDestroy {
  entryIngress: number;
  entryEgress: number;
  entryIngressCount: number;
  entryEgressCount: number;

  entrySub: Subscription = new Subscription();
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.entrySub = this.store.select('entry').subscribe(entry => {
      this.countEntries(entry.items);
    });
  }

  ngOnDestroy(): void {}

  countEntries(items: Entry[]) {
    this.entryIngress = 0;
    this.entryEgress = 0;

    this.entryIngressCount = 0;
    this.entryEgressCount = 0;

    items.forEach(item => {
      if (item.type === 'ingress') {
        this.entryIngressCount++;
        this.entryIngress += item.quantity;
      } else {
        this.entryEgressCount++;
        this.entryEgress += item.quantity;
      }

      this.doughnutChartData = [this.entryIngress, this.entryEgress];
    });
  }
}
