// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/mesModules/shared/shared.module'
import { JardinModule } from 'app/mesModules/jardin/jardin.module';
import { PieceModule } from 'app/mesModules/piece/piece.module';
import { AccueilModule } from 'app/mesModules/accueil/accueil.module';
import { ConfigurationModule } from 'app/mesModules/configuration/configuration.module';
import { LoginModule } from 'app/mesModules/login/login.module';
import { HttpModule } from '@angular/http';

// composants
import { MainComponent } from 'app/components/main/main';
import { HeaderComponent } from 'app/components/header/header';
import { MenuComponent } from 'app/components/menu/menu';
import { FooterComponent } from 'app/components/footer/footer';

// Pipes

// Routes
import { ROUTES } from 'app/routes/routes';

// Services
import { LoginService } from 'app/services/login.service'
import { JardinService } from 'app/services/jardin.service'
import { ZoneConfigServices } from 'app/services/zone.config.services';
import { ZoneConfigServicesPost } from 'app/services/zone.config.services.post';
import { PieceService } from 'app/services/piece.service';
import { DispositifService } from 'app/services/dispositif.service';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    FormsModule,
    SharedModule,
    JardinModule,
    PieceModule,
    AccueilModule,
    ConfigurationModule,
    LoginModule,
    HttpModule,
  ],
  providers: [
PieceService,
    DispositifService,    
LoginService,
    JardinService,
    ZoneConfigServices,
    ZoneConfigServicesPost
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
