import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../interfaces/interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlAuth: string = environment.urlAuth;

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  usuario?: Usuario;

  constructor(private http: HttpClient,
              private router: Router) { }

  register(usuario: Usuario): Observable<Usuario> {

    const url = `${ this.urlAuth }/registro`;

    return this.http.post(url, usuario, {headers: this.httpHeaders}).pipe(

      map((respuesta: any) => respuesta.usuario as Usuario),

      catchError(err => {
        console.log('1.- ',err);

        if (err.status == 400){
          return throwError(err);
        }
        return throwError(err);
      })
    )

  }

  login(email: string, password: string){

    const url = `${ this.urlAuth }/login`;
    const body = { email, password };

    return this.http.post<any>(url, body).pipe(
        map(
          (respuesta => {
              // Borramos el token que pudiera existir de un usuario que no se pudo eliminar
              localStorage.removeItem('token');
              sessionStorage.clear();

              // Guardamos el token que viene del servicio
              localStorage.setItem('token',respuesta.jwtToken);

              this.usuario = respuesta.usuario;

              return respuesta;
            }
          )
        )
    );
  }

  logout(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.clear();
    this.router.navigateByUrl('/auth');
  }

  isLogged(){
    // con !! devuelve true o false dependiendo de si existe o no el token
    return !!localStorage.getItem('token');
  }
}
