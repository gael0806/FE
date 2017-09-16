import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// import { Bouton } from 'lib/Bouton';

@Component({
  selector: 'app-bouton-on-off',
  templateUrl: './bouton-on-off.html',
  styleUrls: ['./bouton-on-off.scss']
})
export class BoutonOnOffComponent implements OnInit {

  id;
  checkValue = false;
  @Output() valueChange = new EventEmitter();

  constructor() {
    this.id =  Math.random().toString(36).substr(2, 10);
   }

  ngOnInit() {
  }

  changeValue() {
    if (this.checkValue === false) {
      this.checkValue = true;
    } else {
      this.checkValue = false;
    }
    this.valueChange.emit({value: this.checkValue});
  }

}
