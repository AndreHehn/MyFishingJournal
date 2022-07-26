import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { Fish } from 'src/models/fish.class';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allFishes = [];
  currentUser: User = new User();
  varUser: User = new User();
  fish: Fish = new Fish();
  imageNewFish: string;
  imageBestFish: string;
  bestFishName;
  bestFishLength;
  bestDate;
  bestDateToShow
  fishCounterBestDate;
  favoriteFish;
  currentImageForSlider;
  currentImageForSlider2;
  currentImage: number = 1;
  imagesForSlider = [];
  imagesForSlider2 = [];
  Users = [];
  user;
  userId;
  newCatchUserId;
  name;
  newFishCustomId;
  bestFishCustomId;
  bestDayCustomId;
  favoriteCustomId;

  constructor(private firestore: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userId = (this.user) ? this.user.uid : '';
    this.firestore.collection('fishes').valueChanges({ idField: 'customId' }).subscribe((changes: any) => {
      this.allFishes = changes;
      this.firestore.collection('users').valueChanges({ idField: 'customId' }).subscribe((changes: any) => {
        this.Users = changes;
        this.functionsForOnInit();
      });
    });
  }

  functionsForOnInit(){
    this.filterForNew();
    this.filterForBest();
    this.filterForUser(this.userId);
    this.currentUser.name = this.name;
    this.filterForUser(this.newCatchUserId);
    this.varUser.name = this.name;
    this.mostCaught();
    this.bestDateFilter();
    this.imageSlider();
  }


  filterForUser(uid) {
    let userArray = [];
    for (let i = 0; i < this.Users.length; i++)  if (this.Users[i]['uid'] == uid) userArray.push(this.Users[i]);
    this.name = userArray[0]['name'];
  }


  filterForNew() {
    let filterArray = this.allFishes;
    filterArray.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1);
    this.imageNewFish = filterArray[0]['picUrl'];
    this.newCatchUserId = filterArray[0]['userId'];
    this.newFishCustomId = filterArray[0]['customId'];
  }


  filterForBest() {
    let userFishes = [];
    for (let i = 0; i < this.allFishes.length; i++)
      if (this.allFishes[i]['userId'] == this.userId)
        userFishes.push(this.allFishes[i]);
    this.allFishes = userFishes;
    userFishes.sort((a, b) => (a.length < b.length) ? 1 : -1);
    this.imageBestFish = userFishes[0]['picUrl'];
    this.bestFishLength = userFishes[0]['length'];
    this.bestFishName = userFishes[0]['fish'];
    this.bestFishCustomId = userFishes[0]['customId'] ;
  }


  mostCaught() {
    let mostArray = this.allFishes;
    let names = [];
    var obj = {};
    mostArray.forEach((val) => names.push(val['fish']));
    names.forEach((val) => obj[val] = (!obj[val]) ? 1 : obj[val] + 1);
    this.favoriteFish = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
  }


  imageSlider() {
    this.forLoopForImageSlider();
    this.currentImageForSlider = this.imagesForSlider[0]['picUrl'];
    this.currentImageForSlider2 = this.imagesForSlider2[0]['picUrl'];
    this.favoriteCustomId = this.imagesForSlider[0]['customId'];
    this.bestDayCustomId = this.imagesForSlider2[0]['customId'];
    this.intervalForImageSlider();
  }


  forLoopForImageSlider() {
    for (let i = 0; i < this.allFishes.length; i++) {
      let newDate = new Date(this.allFishes[i]['date']);
      let dateString = '' + newDate.getFullYear() + newDate.getMonth() + newDate.getDate();
      let workableDate = Number(dateString);
      if (this.allFishes[i]['fish'] == this.favoriteFish && this.allFishes[i]['userId'] == this.userId)
        this.imagesForSlider.push(this.allFishes[i]);
      if (workableDate == this.bestDate && this.allFishes[i]['userId'] == this.userId) {
        this.imagesForSlider2.push(this.allFishes[i]);
        this.bestDateToShow = this.allFishes[i]['date'];
      }
    }
  }


  intervalForImageSlider() {
    setInterval(() => {
      let i = this.currentImage % this.imagesForSlider.length;
      let j = this.currentImage % this.imagesForSlider2.length;
      this.currentImageForSlider = this.imagesForSlider[i]['picUrl'];
      this.favoriteCustomId = this.imagesForSlider[i]['customId'];
      this.currentImageForSlider2 = this.imagesForSlider2[j]['picUrl'];
      this.bestDayCustomId = this.imagesForSlider2[j]['customId'];
      this.currentImage++;
    }, 3000);
  }


  bestDateFilter() {
    let mostArray = [];
    for (let i = 0; i < this.allFishes.length; i++)
      if (this.allFishes[i]['userId'] == this.userId) {
        let newDate = new Date(this.allFishes[i]['date']);
        let dateString = '' + newDate.getFullYear() + newDate.getMonth() + newDate.getDate();
        let workableDate = Number(dateString);
        mostArray.push(workableDate);
      }
    this.bestDate = mostArray.sort((a, b) => mostArray.filter(v => v === a).length - mostArray.filter(v => v === b).length).pop();
    this.fishCounterBestDate = mostArray.length + 1;
  }


}
