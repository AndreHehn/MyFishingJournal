import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCatchComponent } from './add-catch/add-catch.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { FishingComponent } from './fishing/fishing.component';
import { JournalComponent } from './journal/journal.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: '', title: 'My fishing journal', component: JournalComponent },
  { path: 'journal', title: 'My fishing journal', component: JournalComponent },
  { path: 'journal/:id', title: 'Details of catch', component: FishingComponent },
  { path: 'addcatch', title: 'Add new catch', component: AddCatchComponent },
  { path: 'notes', title: 'Notes', component: NotesComponent },
  { path: 'analysis', title: 'Analysis', component: AnalysisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
