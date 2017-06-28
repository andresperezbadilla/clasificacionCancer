import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  respuestaModelo : String;
  respuesta : String;
  constructor(public navCtrl: NavController, private navParams: NavParams,private view : ViewController) {
    this.respuesta = ""
    this.respuestaModelo = ""
  }

  ionViewWillLoad() {
    var predict = this.navParams.get('predict');
    var porcent = this.navParams.get('porcent');
    this.respuesta = "Su cancer es " + predict;
    this.respuestaModelo="El porcentaje del modelo es de " + porcent;
  }

  close(){
    this.view.dismiss();
  }

}
