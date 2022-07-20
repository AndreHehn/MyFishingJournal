import { Component } from '@angular/core';

import { Router, NavigationStart } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Details of catch';
  showSearch = false;
  connected = false;

  constructor(private router: Router, public authService: AuthService) { }


  public ngOnInit() {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        if (events.url === '/' || events.url === '/journal') {
          this.title = "My fishing journal";
        }
        if (events.url === '/addcatch') {
          this.title = "Add new catch";
        }
        if (events.url === '/analysis') {
          this.title = "Analysis of all catches";
        }
        if (events.url === '/notes') {
          this.title = "Notes";
        }
        if (events.url === '/settings') {
          this.title = "Settings";
        }
        if (events.url === '/legal') {
          this.title = "Legal Notice";
        }
        if (events.url === '/dataprotection') {
          this.title = "Data Protection";
        }
      }
    });

    if (this.authService.isLoggedIn) {
      this.connected = true;
    }
    if (!this.authService.isLoggedIn) {
      this.connected = false;
    }




  }


}
