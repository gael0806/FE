import { Component } from '@angular/core';

@Component({
  selector: 'app-globaldata',
  templateUrl: './globalData.html',
  styleUrls: ['./globalData.scss']
})

export class GlobalDataComponent {
  title = '';

  private maClass = '';



  constructor() {
    this.title = 'zone global data';
    // this.changeColor();

  }

}

