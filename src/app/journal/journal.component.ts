import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Fish } from 'src/models/fish.class';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {

  fish: Fish;
  allFishes = [];
  date: Date;
  renderArray = [];


  sortingBy = [
    {
      "name": "fish",
      "sortedUp": "0",
      "sortedDown": "0"
    },
    {
      "name": "length",
      "sortedUp": "0",
      "sortedDown": "0"
    },
    {
      "name": "place",
      "sortedUp": "0",
      "sortedDown": "0"
    },
    {
      "name": "date",
      "sortedUp": "0",
      "sortedDown": "0"
    }
  ];



  constructor(private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.firestore
      .collection('fishes')
      .valueChanges({ idField: 'customId' })
      .subscribe((changes: any) => {
        this.allFishes = changes;
        this.renderArray = this.allFishes;
      });

  }


  sortBy(name) {
    for (let i = 0; i < 4; i++) {
      const element = this.sortingBy[i]["name"];
      this.sorting(name, i, element);
    }
  }


  sorting(name, i, element) {
    if (name == element && this.sortingBy[i]['sortedUp'] == '0' && this.sortingBy[i]['sortedDown'] == '0')  this.sortingDown(i)
    else if (name == element && this.sortingBy[i]['sortedUp'] == '1') this.sortingUp(i)
    else if (name == element && this.sortingBy[i]['sortedDown'] == '1') this.sortingDefault()
  }


  sortingDown(i) {
    this.unsetListDirection();
    this.sortingBy[i]['sortedUp'] = '1';
    this.renderArray = this.allFishes.sort((a, b) => (a as any).finished - (b as any).finished).reverse();
  }


  sortingUp(i) {
    this.unsetListDirection();
    this.sortingBy[i]['sortedDown'] = '1';
    this.renderArray = this.allFishes.sort((a, b) => (a as any).finished - (b as any).finished).reverse();
  }


  sortingDefault() {
    this.unsetListDirection();
    this.renderArray = this.allFishes;
  }


  unsetListDirection() {
    for (let j = 0; j < 4; j++) {
      this.sortingBy[j]['sortedUp'] = '0';
      this.sortingBy[j]['sortedDown'] = '0';
    }
  }

  
}
