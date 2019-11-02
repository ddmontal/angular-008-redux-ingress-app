import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry/entry.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(public entryService: EntryService, public authService: AuthService) { }

  ngOnInit() {
    this.entryService.initEntriesListener();
  }

}
