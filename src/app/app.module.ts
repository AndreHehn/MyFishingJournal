import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatSelectModule} from '@angular/material/select'; 

import { FormsModule } from '@angular/forms';
import { JournalComponent } from './journal/journal.component';
import { AddCatchComponent } from './add-catch/add-catch.component';
import { FishingComponent } from './fishing/fishing.component';
import { NotesComponent } from './notes/notes.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { SettingsComponent } from './settings/settings.component';
import { LegalComponent } from './legal/legal.component';
import { DataprotectComponent } from './dataprotect/dataprotect.component';
import { DialogDeleteEntryComponent } from './dialog-delete-entry/dialog-delete-entry.component';
import { DialogEditEntryComponent } from './dialog-edit-entry/dialog-edit-entry.component';
import { BigFishComponent } from './big-fish/big-fish.component';



@NgModule({
  declarations: [
    AppComponent,
    JournalComponent,
    AddCatchComponent,
    FishingComponent,
    NotesComponent,
    AnalysisComponent,
    SettingsComponent,
    LegalComponent,
    DataprotectComponent,
    DialogDeleteEntryComponent,
    DialogEditEntryComponent,
    BigFishComponent
  ],
  imports: [

    MatToolbarModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
