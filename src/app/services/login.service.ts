import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {

  private buffer: Array<any> = [];

  constructor(private http: Http) {
  }

  loginGet(): any {
    const myUrl = `http://192.168.43.10:8080/api`;
    let results = {
      rep: ''
    };
    const that = this;
    let observable = this.http.get(myUrl);
    let reponse = this.getReponse();

    if (reponse) {
      return reponse;
    }

    observable.subscribe(
      (value) => {
        let jsonData = value.json();
        for (let key in jsonData) {
          if (jsonData.hasOwnProperty(key)) {
            results.rep += `<p>${key} ${jsonData[key]} </p>`;
          }
        }
        console.log(results);
        that.buffer.push(results);
      }
    );

    return results;
  }

  getReponse() {
    for (let rep of this.buffer) {
      return rep;
    }
    return null;
  }

  loginPost(login, password): any {
    console.log('loginPost()');
    const myUrl = `http://192.168.43.10:8080/api`;
    return this.http.post(myUrl, { 'login': login, 'password': password });
  }
}
