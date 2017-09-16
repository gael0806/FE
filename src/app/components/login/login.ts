import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {

  results: any;
  error: String;

  constructor(private loginService: LoginService, private router: Router) {
    this.results = {
      rep: ''
    }

  }

  ngOnInit() {
      this.loginService.loginGet();
  }

  connection(form: any): any {
    const that = this;
    let user = {
      id: '' ,
      name: '' ,
      isAdmin: false,
    }
    const formData = form.value;
    if (formData.login === '' || formData.password === '') {
      that.error = `login / mot de passe : champ(s) vide(s)`;
      console.log('erreur');
    } else {
      const promise = this.loginService.loginPost(formData.login, formData.password);

      promise.subscribe((result) => {
        console.log(result);
        if (result['_body'] === ''){
          that.error = `l'utilisateur n'est pas reconnu`;
        } else {
          const jsonData = result.json();
          console.log(jsonData);
          user.id = jsonData['id'];
          console.log(user.id);
          user.name = jsonData['name'];
          user.isAdmin = jsonData['isAdmin'];
          that.router.navigate(['/accueil']);
        }
      });
    }
  }
}
