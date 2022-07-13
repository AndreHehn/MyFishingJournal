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
  constructor(private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.firestore
      .collection('fishes')
      .valueChanges({ idField: 'customId' })
      .subscribe((changes: any) => {
        this.allFishes = changes;
      })
  }

}
