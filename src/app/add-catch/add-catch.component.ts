import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Fish } from 'src/models/fish.class';

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

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {

  }


  saveUser() {
    this.fish.date = Number(new Date(this.date));
    this.loading = true;
    this.firestore
      .collection('fishes')
      .add(this.fish.toJson())
      .then((ref) => {
        this.loading = false;
        let myID = ref.id;
        this.router.navigate(['/details/' + myID]);
      });
  }

  pushClass(){
    this.valueChanged = true;
  }


  cancelAdd() { }

}
