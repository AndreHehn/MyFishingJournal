import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Fish } from 'src/models/fish.class';

@Component({
  selector: 'app-big-fish',
  templateUrl: './big-fish.component.html',
  styleUrls: ['./big-fish.component.scss']
})
export class BigFishComponent implements OnInit {

  imagePath;

  constructor(
    public dialogRef: MatDialogRef<BigFishComponent>) { 
    }

  ngOnInit(): void {
  }

}
