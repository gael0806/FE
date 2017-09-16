import { Component } from '@angular/core';
import { MenuComponent } from 'app/components/menu/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})

export class HeaderComponent {
  title = '';

  constructor() {
    this.title = 'un titre pas trop mal';

  }




}
