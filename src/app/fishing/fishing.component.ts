import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { ApiKey } from 'src/models/apikey.class';
import { Fish } from 'src/models/fish.class';
import { BigFishComponent } from '../big-fish/big-fish.component';
import { DialogDeleteEntryComponent } from '../dialog-delete-entry/dialog-delete-entry.component';
import { DialogEditEntryComponent } from '../dialog-edit-entry/dialog-edit-entry.component';

@Component({
  selector: 'app-fishing',
  templateUrl: './fishing.component.html',
  styleUrls: ['./fishing.component.scss']
})
export class FishingComponent implements OnInit {

  catchId = '';
  fish: Fish = new Fish();
  userId;
  user;
  reloadCount: number = 0;
  ownFish = false;
  map;
  apikey: ApiKey = new ApiKey();


  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private firestore: AngularFirestore) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.catchId = paramMap.get('id');
      this.getFish();
    });
    this.googleMapsOnInit();
    // to show title:
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
  }


  googleMapsOnInit() {
    let loader = new Loader({ apiKey: this.apikey.apikey });
    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.137154, lng: 11.576124 },
        zoom: 10
      })
    })
  }


  getFish() {
    this.firestore.collection('fishes')
      .doc(this.catchId).valueChanges()
      .subscribe((fish: any) => {
        this.fish = new Fish(fish);
        this.user = JSON.parse(localStorage.getItem('user'));
        this.userId = (this.user) ? this.user.uid : '';
        this.ownFish = (this.fish.userId == this.userId) ? true : false;
        if (this.fish.lat !=null) {
          let coordinates = { 'lat': this.fish.lat, 'lng': this.fish.lng };
          new google.maps.Marker({ position: coordinates, map: this.map });
          this.map.panTo(coordinates);
        }
      })
  }


  editEntry() {
    const dialog = this.dialog.open(DialogEditEntryComponent);
    dialog.componentInstance.fish = new Fish(this.fish.toJson());
    dialog.componentInstance.catchId = this.catchId;
  }


  deleteEntry() {
    const dialog = this.dialog.open(DialogDeleteEntryComponent);
    dialog.componentInstance.fish = new Fish(this.fish.toJson());
    dialog.componentInstance.catchId = this.catchId;
    dialog.componentInstance.imagePath = this.fish.picUrl;
  }


  bigPicture() {
    const dialog = this.dialog.open(BigFishComponent);
    dialog.componentInstance.fish = new Fish(this.fish.toJson());
    dialog.componentInstance.imagePath = this.fish.picUrl;
    dialog.componentInstance.catchId = this.catchId;
  }

}




