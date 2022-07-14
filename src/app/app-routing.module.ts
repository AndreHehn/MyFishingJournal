import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCatchComponent } from './add-catch/add-catch.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { FishingComponent } from './fishing/fishing.component';
import { JournalComponent } from './journal/journal.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: '', component: JournalComponent },
  { path: 'journal', component: JournalComponent },
  { path: 'journal/:id', component: FishingComponent },
  { path: 'addcatch', component: AddCatchComponent }
  ,
  { path: 'notes', component: NotesComponent }
  ,
  { path: 'analysis', component: AnalysisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
