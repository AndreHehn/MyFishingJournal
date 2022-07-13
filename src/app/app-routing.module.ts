import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCatchComponent } from './add-catch/add-catch.component';
import { FishingComponent } from './fishing/fishing.component';
import { JournalComponent } from './journal/journal.component';

const routes: Routes = [
  { path: '', component: JournalComponent },
  { path: 'journal', component: JournalComponent },
  { path: 'journal/:id', component: FishingComponent },
  { path: 'addcatch', component: AddCatchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
