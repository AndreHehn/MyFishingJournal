import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Fish } from 'src/models/fish.class';



@Component({
  selector: 'app-dialog-edit-entry',
  templateUrl: './dialog-edit-entry.component.html',
  styleUrls: ['./dialog-edit-entry.component.scss']
})
export class DialogEditEntryComponent implements OnInit {

  fish: Fish = new Fish();
  loading = false;
  date: Date = new Date();
  catchId: string = '';
  valueChanged = false;

  constructor(private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogEditEntryComponent>) { }

  ngOnInit(): void {
  }

  saveEntry() {
    this.fish.date = this.date.getTime();
    this.loading = true;
    this.firestore
      .collection('fishes')
      .doc(this.catchId)
      .update(this.fish.toJson())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      });
  };

  pushClass() {
    this.valueChanged = true;
  }

}
