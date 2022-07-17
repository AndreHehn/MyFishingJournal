import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Fish } from 'src/models/fish.class';
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
  reloadCount: number = 0;

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.catchId = paramMap.get('id');
      this.getFish();
    });
    // to show title:
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
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


  editEntry() {
    const dialog = this.dialog.open(DialogEditEntryComponent);
    dialog.componentInstance.fish = new Fish(this.fish.toJson());
    dialog.componentInstance.catchId = this.catchId;
  }


  deleteEntry() {
    const dialog = this.dialog.open(DialogDeleteEntryComponent);
    dialog.componentInstance.fish = new Fish(this.fish.toJson());
    dialog.componentInstance.catchId = this.catchId;
  }
}
