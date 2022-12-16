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

  // URL base de autenticación de usuario de la API
  private urlAuth: string = environment.urlAuth;
  // Variable para guardar la cabecera Content-Type
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  // Variable para el usuario del tipo Usuario
  usuario: Usuario = {};

  // Inyectamos las clases HttpClient y Router
  constructor(private http: HttpClient,
              private router: Router) { }


  /**
   * Método para registrar un nuevo usuario.
   *
   * @param usuario
   * @returns
   */
  register(usuario: Usuario): Observable<Usuario> {

    // URL del endpoint de la API para el registro del usuario
    const url = `${ this.urlAuth }/registro`;

    return this.http.post(url, usuario, {headers: this.httpHeaders}).pipe(

      map((respuesta: any) => respuesta.usuario as Usuario),

      catchError(err => {

        if (err.status == 400){
          return throwError(err);
        }
        return throwError(err);
      })
    )

  }

  /**
   * Método para loguearse en el sistema
   *
   * @param email
   * @param password
   * @returns
   */
  login(email: string, password: string){

    const url = `${ this.urlAuth }/login`;
    const body = { email, password };

    return this.http.post<any>(url, body).pipe(
        map(
          (respuesta => {
              // Borramos el token que pudiera existir de un usuario que no se pudo eliminar
              localStorage.removeItem('token');
              // Limpiamos los datos de la sesión almacenados
              sessionStorage.clear();

              // Guardamos el token que viene del servicio en el almacenamiento local
              localStorage.setItem('token',respuesta.jwtToken);
              // Guardamos los datos del usuario que vienen en la respuesta
              this.usuario = respuesta.usuario;

              return respuesta;
            }
          )
        )
    );
  }

  /**
   * Método para salir del sistema
   */
  logout(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.clear();
    this.router.navigateByUrl('/auth');
  }

  /**
   * Método oque comprueba si el token existe.
   *
   * @returns boolean
   */
  isLogged(){
    // Con !! devuelve true o false dependiendo de si existe o no el token
    return !!localStorage.getItem('token');
  }
}
