import { Component } from '@angular/core';
import { ZoneComponent } from 'app/components/jardin/zone/zone';
import { JardinService } from 'app/services/jardin.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-zonelist',
  templateUrl: './zonelist.html',
  styleUrls: ['./zonelist.scss']
})

export class ZoneListComponent {
  title = 'liste de zones';
  zones = [];
  idzone ;

  constructor(private jardinService: JardinService) {
    this.title = 'liste des zones';
    const that = this;
    const callback = function(reponse: any) {
      that.zones = reponse;
    };
    this.jardinService.jardinGet(callback);
  }

}
