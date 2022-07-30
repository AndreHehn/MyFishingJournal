import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Fish } from 'src/models/fish.class';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Loader } from '@googlemaps/js-api-loader';
import { ApiKey } from 'src/models/apikey.class';

@Component({
  selector: 'app-add-catch',
  templateUrl: './add-catch.component.html',
  styleUrls: ['./add-catch.component.scss']
})
export class AddCatchComponent implements OnInit, OnDestroy {

  fish: Fish = new Fish();
  date: Date = new Date();
  loading = false;
  valueChanged = false;
  user;
  weatherArray;
  temperature;
  pictureUrl;
  uploadPercent: Observable<number>;
  currentFile;
  customId;
  map;
  longitude;
  latitude;
  apikey: ApiKey = new ApiKey();
  markers: google.maps.Marker[] = [];
  currentLng;
  currentLat;
  uploaded = false;
  saved = false;

  constructor(private firestore: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage) {
  }


  ngOnDestroy(): void {
    if (this.uploaded && !this.saved) { this.deleteLastUpload(); }
  }


  ngOnInit(): void {
    let pos = { lat: 48.137154, lng: 11.576124 };
    let loader = new Loader({ apiKey: this.apikey.apikey });
    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById('map'), { center: pos, zoom: 15 })
      this.getLocationOfUser(pos);
      this.map.addListener("click", (e) => { this.placeMarkerAndPanTo(e.latLng, this.map); });
    });
  }


  getLocationOfUser(pos) {
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      this.currentLat = position.coords.latitude;
      this.currentLng = position.coords.longitude;
      pos = { lat: position.coords.latitude, lng: position.coords.longitude };
      this.map.setCenter(pos);
      this.getUrlForWeather();
    });
  }

  placeMarkerAndPanTo(latLng: google.maps.LatLng, map: google.maps.Map) {
    for (let i = 0; i < this.markers.length; i++) this.markers[i].setMap(null);
    this.markers = [];
    if (latLng.lat) this.latitude = latLng.lat();
    if (latLng.lng) this.longitude = latLng.lng();
    let coordinates = { 'lat': this.latitude, 'lng': this.longitude };
    let marker = new google.maps.Marker({ position: coordinates, map: map });
    map.panTo(coordinates);
    this.markers.push(marker);
  }


  /**
   * to save the Data @ angular firestore
   */
  addCatch() {
    this.fish.timestamp = Number(new Date());
    this.fish.date = Number(new Date(this.date));
    this.fish.lng = (this.longitude) ? this.longitude: null;
    this.fish.lat = (this.latitude) ? this.latitude: null;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.fish.userId = this.user.uid;
    this.loading = true;
    this.fish.picUrl = (this.pictureUrl) ? this.pictureUrl : 'assets/img/logo.png'
    this.uploadNewCatch();
    this.saved = true;
  }


  uploadNewCatch() {
    this.firestore
      .collection('fishes')
      .add(this.fish.toJson())
      .then((ref) => {
        this.customId = ref.id;
        this.fish.customId = this.customId;
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
    this.uploaded = true;
  }


  async getUrlForWeather() {
    let urlWeather = 'https://api.openweathermap.org/data/2.5/weather?lat=' + this.currentLat + '&lon=' + this.currentLng + '&appid=' + this.apikey.apiWeather;
    let response = await fetch(urlWeather);
    let responseAsJson = await response.json();
    this.weatherArray = responseAsJson;
    let temperatureInKelvin = this.weatherArray['main']['temp'];
    this.temperature = Math.round(temperatureInKelvin - 273.15);
  }






}


