import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCatchComponent } from './add-catch/add-catch.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataprotectComponent } from './dataprotect/dataprotect.component';
import { FishingComponent } from './fishing/fishing.component';
import { JournalComponent } from './journal/journal.component';
import { LegalComponent } from './legal/legal.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', title: 'Dashboard', component: DashboardComponent },
  { path: 'journal', title: 'My fishing journal', component: JournalComponent },
  { path: 'details/:id', title: 'Details of catch', component: FishingComponent },
  { path: 'addcatch', title: 'Add new catch', component: AddCatchComponent },
  { path: 'legal', title: 'Legal notice', component: LegalComponent },
  { path: 'dataprotection', title: 'Data protection', component: DataprotectComponent },
  { path: 'dashboard', title: 'Dashboard', component: DashboardComponent },
  { path: 'settings', title: 'Settings', component: SettingsComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
