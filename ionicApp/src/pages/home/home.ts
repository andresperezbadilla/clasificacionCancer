import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConsultaPage } from '../consulta/consulta';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Consulta = ConsultaPage

  constructor(public navCtrl: NavController) {

  }

}
