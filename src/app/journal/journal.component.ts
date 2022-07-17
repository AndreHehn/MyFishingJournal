import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PageEvent } from '@angular/material/paginator';
import { filter } from 'rxjs';
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
  startIndex = 0;
  endIndex = 10;
  renderArray = [];
  slicedArray = [];
  showSearch = false;
  searchValue: String = '';

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
    this.firestore.collection('fishes').valueChanges({ idField: 'customId' }).subscribe((changes: any) => {
      this.allFishes = changes;
      this.ifChecksForNgOnInit();
      this.slicedArray = this.renderArray;
    });
  }


  ifChecksForNgOnInit() {
    let filteredArray = [];
    if (this.searchValue.length == 0) this.renderArray = this.allFishes;
    if (this.searchValue.length > 0) {
      for (let i = 0; i < this.allFishes.length; i++) {
        if (this.allFishes[i]['fish'].toLowerCase().includes(this.searchValue.toLowerCase()) ||
          this.allFishes[i]['place'].toLowerCase().includes(this.searchValue.toLowerCase())) {
          filteredArray.push(this.allFishes[i]);
        }
      }
      this.renderArray = filteredArray;
    }
  }


  sortBy(name) {
    for (let i = 0; i < 4; i++) {
      const element = this.sortingBy[i]["name"];
      this.sorting(name, i, element);
    }
  }


  sorting(name, i, element) {
    if (name == element && this.sortingBy[i]['sortedUp'] == '0' && this.sortingBy[i]['sortedDown'] == '0') this.sortingDown(i, name)
    else if (name == element && this.sortingBy[i]['sortedUp'] == '1') this.sortingUp(i, name)
    else if (name == element && this.sortingBy[i]['sortedDown'] == '1') this.sortingDefault()
    this.slicedArray = this.renderArray.slice(this.startIndex, this.endIndex);
  }


  sortingDown(i, name) {
    this.unsetListDirection();
    this.sortingBy[i]['sortedUp'] = '1';
    if (name == 'fish') this.renderArray.sort((a, b) => (a.fish > b.fish) ? 1 : -1)
    if (name == 'length') this.renderArray.sort((a, b) => (a.length > b.length) ? 1 : -1)
    if (name == 'place') this.renderArray.sort((a, b) => (a.place > b.place) ? 1 : -1)
    if (name == 'date') this.renderArray.sort((a, b) => (a.date > b.date) ? 1 : -1)
  }


  sortingUp(i, name) {
    this.unsetListDirection();
    this.sortingBy[i]['sortedDown'] = '1';
    if (name == 'fish') this.renderArray.sort((a, b) => (b.fish > a.fish) ? 1 : -1)
    if (name == 'length') this.renderArray.sort((a, b) => (b.length > a.length) ? 1 : -1)
    if (name == 'place') this.renderArray.sort((a, b) => (b.place > a.place) ? 1 : -1)
    if (name == 'date') this.renderArray.sort((a, b) => (b.date > a.date) ? 1 : -1)
  }


  sortingDefault() {
    this.unsetListDirection();
    this.ngOnInit();
  }


  unsetListDirection() {
    for (let j = 0; j < 4; j++) {
      this.sortingBy[j]['sortedUp'] = '0';
      this.sortingBy[j]['sortedDown'] = '0';
    }
  }


  OnPageChange(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if (this.endIndex > this.renderArray.length) {
      this.endIndex = this.renderArray.length;
    }
    this.slicedArray = this.renderArray.slice(this.startIndex, this.endIndex);
  }

  clearSearch() {
    this.searchValue = '';
    this.ngOnInit();
  }
}
