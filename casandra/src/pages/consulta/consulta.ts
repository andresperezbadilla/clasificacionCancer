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
  numero_paciente: AbstractControl;
  grosor_masa: AbstractControl;
  uniformidad_tamaño: AbstractControl;
  uniformidad_forma: AbstractControl;
  adhesion_marginal: AbstractControl;
  tamaño_celula_epitelial: AbstractControl;
  nucleo_celula: AbstractControl;
  cromatina_blanda: AbstractControl;
  nucleoli_normal: AbstractControl;
  mitosis: AbstractControl;

  constructor(private navController: NavController, private movieService: MovieService,
    private fb: FormBuilder, private modal: ModalController) {
    this.authForm = fb.group({
      "numero_paciente": ["1"],
      "grosor_masa": ["1"],
      "uniformidad_tamaño": ["1"],
      "uniformidad_forma": ["1"],
      "adhesion_marginal": ["1"],
      "tamaño_celula_epitelial": ["1"],
      "nucleo_celula": ["1"],
      "cromatina_blanda": ["1"],
      "nucleoli_normal": ["1"],
      "mitosis": ["1"],
      "response": ["1"],
    });
    this.numero_paciente = this.authForm.controls['numero_paciente'];
    this.grosor_masa = this.authForm.controls['grosor_masa'];
    this.uniformidad_tamaño = this.authForm.controls['uniformidad_tamaño'];
    this.uniformidad_forma = this.authForm.controls['uniformidad_forma'];
    this.adhesion_marginal = this.authForm.controls['adhesion_marginal'];
    this.tamaño_celula_epitelial = this.authForm.controls['tamaño_celula_epitelial'];
    this.nucleo_celula = this.authForm.controls['nucleo_celula'];
    this.cromatina_blanda = this.authForm.controls['cromatina_blanda'];
    this.nucleoli_normal = this.authForm.controls['nucleoli_normal'];
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
