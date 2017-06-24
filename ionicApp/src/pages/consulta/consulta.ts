import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ConsultaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-consulta',
  templateUrl: 'consulta.html',
})
export class ConsultaPage {

  
  constructor(private http:Http) {
         
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultaPage');
  }

  getUsers() {
    var apiUrl = 'https://jsonplaceholder.typicode.com';

    var response = this.http.get(apiUrl).map(res => res.json());
        return response;
  }

}
