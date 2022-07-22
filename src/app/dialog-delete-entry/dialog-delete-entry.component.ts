import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  deleted = false;
  imagePath;

  constructor(private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogDeleteEntryComponent>,
    private router: Router,
    private storage: AngularFireStorage) { }

  ngOnInit(): void { }


  deleteEntry() {
    this.loading = true;
    this.firestore
      .collection('fishes')
      .doc(this.catchId)
      .delete()
      .then(() => {
        this.deleted = true;
        setTimeout(() => {
          this.loading = false;
          this.dialogRef.close();
          this.router.navigate(['/journal']);
        }, 2000);
      });
    if (this.imagePath) this.storage.storage.refFromURL(this.imagePath).delete();
  };
}
