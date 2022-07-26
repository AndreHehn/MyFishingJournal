import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  loading;
  user;
  Users = [];
  editedUser: User = new User();
  userId: string = '';
  name;
  saved = false;
  
  constructor(private firestore: AngularFirestore, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userId = (this.user) ? this.user.uid : '';
    this.firestore.collection('users').valueChanges({ idField: 'customId' }).subscribe((changes: any) => {
      this.Users = changes;
      this.filterForUser();
      this.name = this.Users[0]['name'];
    });
  }


  saveName() {
    this.loading = true;
    this.editedUser.name = this.name;
    this.editedUser.uid = this.userId;
    this.firestore
      .collection('users')
      .doc(this.userId)
      .update(this.editedUser.toJson())
      .then(() => {
        this.loading = false;
        alert('Your changes have been saved!')
      });
  }


  filterForUser() {
    let userArray = [];
    for (let i = 0; i < this.Users.length; i++)  if (this.Users[i]['uid'] == this.userId) userArray.push(this.Users[i]);
    this.Users = userArray;
  }
}
