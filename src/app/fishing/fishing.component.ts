import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Fish } from 'src/models/fish.class';

@Component({
  selector: 'app-fishing',
  templateUrl: './fishing.component.html',
  styleUrls: ['./fishing.component.scss']
})
export class FishingComponent implements OnInit {

  catchId = '';
  fish : Fish = new Fish();

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.catchId = paramMap.get('id');
      this.getFish();
    })
  }
  getFish() {
    this.firestore
      .collection('fishes')
      .doc(this.catchId)
      .valueChanges()
      .subscribe((fish: any) => {
        this.fish = new Fish(fish);
      })
  }


  editCatchMain() {
   /* const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.userId;
  */}


  editCatchMore() {
   /* const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.userId;
  */}
}
