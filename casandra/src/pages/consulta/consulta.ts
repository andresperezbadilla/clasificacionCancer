import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';
import { MovieService } from './consulta_service';
import { ModalPage } from '../modal/modal';

import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';


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

  movies: Array<any>;
  authForm: FormGroup;
  numero_asegurado: AbstractControl;
  grosor_masa: AbstractControl;
  uniformidad_tamano: AbstractControl;
  uniformidad_forma: AbstractControl;
  adhesion_marginal: AbstractControl;
  tamano_celula_epitelial: AbstractControl;
  nucleo_celula: AbstractControl;
  cromatina_blanda: AbstractControl;
  nucleoli: AbstractControl;
  mitosis: AbstractControl;

  constructor(private navController: NavController, private movieService: MovieService,
    private fb: FormBuilder, private modal: ModalController) {
    this.authForm = fb.group({
      "numero_asegurado": [""],
      "grosor_masa": [""],
      "uniformidad_tamano": [""],
      "uniformidad_forma": [""],
      "adhesion_marginal": [""],
      "tamano_celula_epitelial": [""],
      "nucleo_celula": [""],
      "cromatina_blanda": [""],
      "nucleoli": [""],
      "mitosis": [""],
      "response": [""],
    });
    this.numero_asegurado = this.authForm.controls['numero_asegurado'];
    this.grosor_masa = this.authForm.controls['grosor_masa'];
    this.uniformidad_tamano = this.authForm.controls['uniformidad_tamano'];
    this.uniformidad_forma = this.authForm.controls['uniformidad_forma'];
    this.adhesion_marginal = this.authForm.controls['adhesion_marginal'];
    this.tamano_celula_epitelial = this.authForm.controls['tamano_celula_epitelial'];
    this.nucleo_celula = this.authForm.controls['nucleo_celula'];
    this.cromatina_blanda = this.authForm.controls['cromatina_blanda'];
    this.nucleoli = this.authForm.controls['nucleoli'];
    this.mitosis = this.authForm.controls['mitosis'];
  }

  onSubmit(event, value: string): void {
    console.log('Submitted value: ', value);

    this.movieService.postvalues(value).subscribe(
      data => {
        var myData = {
          predict: data.text(),
          porcent: ''
        }

        this.movieService.getvalues(value).subscribe(
          datos => {
            myData.porcent = datos.text().replace("num ", "");
            console.log("dsdsd"+myData.porcent);
            const myModal: Modal = this.modal.create('ModalPage', myData);
            myModal.present();
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  searchMovieDB(event, key) {
    if (event.target.value.length > 2) {
      this.movieService.searchMovies(event.target.value).subscribe(
        data => {
          this.movies = data.results;
          console.log(data);
        },
        err => {
          console.log(err);
        },
        () => console.log('Movie Search Complete')
      );
    }
  }


}
