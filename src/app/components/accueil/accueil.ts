import { Component, OnInit } from '@angular/core';
import { PieceService } from 'app/services/piece.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.scss']
})
export class AccueilComponent implements OnInit {
  title = '';
  zones = [];

  constructor(private pieceService: PieceService) {
    this.title = 'liste des zones';
    this.zones = [];
  }

  ngOnInit() {
    this.zones = this.pieceService.pieceGet();
    return this.zones;
  }


  //AddPiece() {
  //this.zones.push(1);
  //}
  //<input type="button" id="" value="AddPiece" (click)="AddPiece()">
}
