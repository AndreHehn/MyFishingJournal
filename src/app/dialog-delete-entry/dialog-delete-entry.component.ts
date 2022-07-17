import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Fish } from 'src/models/fish.class';

@Component({
  selector: 'app-dialog-delete-entry',
  templateUrl: './dialog-delete-entry.component.html',
  styleUrls: ['./dialog-delete-entry.component.scss']
})
export class DialogDeleteEntryComponent implements OnInit {

  fish: Fish = new Fish();
  loading = false;
  date: Date = new Date();
  catchId: string = '';

  constructor(private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogDeleteEntryComponent>) { }

  ngOnInit(): void {
  }

}
