import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Fish } from 'src/models/fish.class';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-big-fish',
  templateUrl: './big-fish.component.html',
  styleUrls: ['./big-fish.component.scss']
})
export class BigFishComponent implements OnInit {

  imagePath;
  uploaded = false;
  fish: Fish = new Fish();
  date: Date = new Date();
  user;
  pictureUrl;
  uploadPercent: Observable<number>;
  currentFile;
  catchId = '';

  constructor(
    public dialogRef: MatDialogRef<BigFishComponent>,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage) { dialogRef.disableClose = true; }

  ngOnInit(): void { }


  deleteLastUpload() {
    if (this.currentFile) {
      const storageRef = this.currentFile;
      storageRef.delete();
    }
  }


  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'fish_images' + Math.floor(Math.random() * 1000000000);
    const fileRef = this.storage.ref(filePath);
    this.currentFile = fileRef;
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();    // observe percentage changes
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => { this.pictureUrl = url; this.imagePath = url; }); // saves url of image to a variable
      })
    ).subscribe();
    this.uploaded = true;
    console.log(this.catchId);
  }


  saveEntry() {
    this.fish.picUrl = this.pictureUrl;
    this.firestore
      .collection('fishes')
      .doc(this.catchId)
      .update(this.fish.toJson())
      .then(() => {
        this.dialogRef.close();
      });
  }
}