import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Fish } from 'src/models/fish.class';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: User = new User();
  varUser: User = new User();
  imageNewFish: string;
  imageBestFish: string;
  fish: Fish = new Fish();
  bestFishLength;
  bestDate;


  constructor(private firestore: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

}
