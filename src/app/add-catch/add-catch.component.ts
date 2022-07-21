import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Fish } from 'src/models/fish.class';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-catch',
  templateUrl: './add-catch.component.html',
  styleUrls: ['./add-catch.component.scss']
})
export class AddCatchComponent implements OnInit {

  fish: Fish = new Fish();
  date: Date = new Date();
  loading = false;
  valueChanged = false;
  user;
  pictureUrl: string;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  currentFile;

  constructor(private firestore: AngularFirestore, private router: Router, private storage: AngularFireStorage) { }

  ngOnInit(): void {

  }


  saveUser() {
    this.fish.date = Number(new Date(this.date));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.fish.userId = this.user.uid;
    this.loading = true;
    this.fish.picUrl = this.pictureUrl;
    this.firestore
      .collection('fishes')
      .add(this.fish.toJson())
      .then((ref) => {
        this.loading = false;
        let myID = ref.id;
        this.router.navigate(['/details/' + myID]);
      });
  }


  cancelAdd() {
    this.router.navigate(['/journal']);
    this.deleteLastUpload();
  }


  deleteLastUpload(){

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
    this.pictureUrl = 'gs://my-fishing-journal.appspot.com/' + filePath + ".jpg";

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    )
      .subscribe()
  }

}


