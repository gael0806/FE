
import { Routes } from '@angular/router';
import { UtilisateurConfigComponent } from 'app/components/configuration/utilisateur/utilisateurConfig';
import { ZoneConfigComponent } from 'app/components/configuration/zoneConfig/zoneConfig';
import { MaterielComponent } from 'app/components/configuration/materiel/materiel';
import { ConfigurationComponent } from 'app/components/configuration/configuration';
import { AccueilComponent } from 'app/components/accueil/accueil'
import { JardinComponent } from 'app/components/jardin/jardin';
import { LoginComponent } from 'app/components/login/login';
import { PieceComponent } from 'app/components/piece/piece';



export const ROUTES: Routes = [
    {   path: 'configuration', component: ConfigurationComponent,
        children: [
            {path: 'utilisateur', component: UtilisateurConfigComponent},
            {path: 'zone', component: ZoneConfigComponent},
            {path: 'materiel', component: MaterielComponent}
        ],
    },
    { path: 'config-zone', component: ZoneConfigComponent },
    { path: 'accueil', component: AccueilComponent },
    { path: 'jardin', component: JardinComponent },
    { path: '', component: LoginComponent },
    { path: 'piece/:id', component: PieceComponent }
];
