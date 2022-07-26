import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Fish } from 'src/models/fish.class';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Loader } from '@googlemaps/js-api-loader';

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
  pictureUrl;
  uploadPercent: Observable<number>;
  currentFile;
  customId;

  constructor(private firestore: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage) { }


  ngOnInit(): void {

    let loader = new Loader({
      apiKey: 'AIzaSyBUXhxSdgd9_uluxA1sZlbeHZDNOv1IiZQ'
    });
    loader.load().then(() => {
      new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.137154, lng:	11.576124 },
        zoom: 10
      })
    })
  }

  /**
   * to save the Data @ angular firestore
   */
  addCatch() {
    this.fish.timestamp = Number(new Date());
    this.fish.date = Number(new Date(this.date));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.fish.userId = this.user.uid;
    this.loading = true;
    this.fish.picUrl = (this.pictureUrl) ? this.pictureUrl : 'assets/img/logo.png'
    this.uploadNewCatch();
  }


  uploadNewCatch() {
    this.firestore
      .collection('fishes')
      .add(this.fish.toJson())
      .then((ref) => {
        this.customId = ref.id;
        this.fish.customId = this.customId
        this.pushCustomIdToFish();
      });
  }


  pushCustomIdToFish() {
    this.firestore
      .collection('fishes')
      .doc(this.customId)
      .update(this.fish.toJson())
      .then(() => {
        this.loading = false;
        this.router.navigate(['/details/' + this.customId]);
      });
  }

  /**
   * if User doesn't want to store the catch:
   */
  cancelAdd() {
    this.router.navigate(['/journal']);
    this.deleteLastUpload();
  }

  /**
   * deletes the last Upload to save space at backend.
   */
  deleteLastUpload() {
    if (this.currentFile) {
      const storageRef = this.currentFile;
      storageRef.delete();
    }
  }

  /**
   * 
   * Uploads picture to the fire storage.
   */
  uploadFile(event) {
    this.loading = true;
    const file = event.target.files[0];
    const filePath = 'fish_images' + Math.floor(Math.random() * 1000000000);
    const fileRef = this.storage.ref(filePath);
    this.currentFile = fileRef;
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();    // observe percentage changes
    task.snapshotChanges().pipe(
      finalize(() => this.saveUrl(fileRef))
    ).subscribe();
  }

  /**
   *  saves url of image to a variable
   *
   */
  saveUrl(fileRef) {
    fileRef.getDownloadURL().subscribe(url => { this.pictureUrl = url; });
    this.loading = false;
  }
}


