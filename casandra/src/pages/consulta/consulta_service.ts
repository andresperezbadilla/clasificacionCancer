import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  

export class MovieService {  

    users: any;

    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http) {
         this.searchMovies("hola");
    }
  
    searchMovies(movieName) {
        movieName="hola";
        var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        var response = this.http.get(url).map(res => res.json());
        this.users = response;
        return response;
        
    }

    getvalues(params) {
        params="hola";
        var url = 'http://localhost:8080/actulizar_modelo';
        var response = this.http.get(url);
        this.users = response;
        return response;
        
    }

    postvalues(data){
        console.log(data + "datos post");
        var url = 'http://localhost:8080/consulta';
        var response = this.http.post(url,data);
        console.log(response);
        this.users = response;
        return response;
    }
}