import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cutramit, Usuario } from 'src/app/auth/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlProtected: string = environment.urlProtected;

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private authService: AuthService) { }


  getUsuarioPorCodigo(usuario: Usuario): Observable<Usuario> {

    const url = `${this.urlProtected}/usuario`;
    const body = usuario;

    return this.http.post<any>(url, body);

  }



  getUsuarios() {
    const url = `${this.urlProtected}/usuarios`;

    return this.http.get<any>(url);
  }

  getUsuariosNoActivos() {
    const url = `${this.urlProtected}/inactivos`;

    return this.http.get<any>(url);
  }



  getUnidadesTramitadoras(): Observable<Cutramit[]>{
    const url = `${this.urlProtected}/unidades`;

    return this.http.get<Cutramit[]>(url);
  }

  getUsuariosFilter() {
    const url = `${this.urlProtected}/usuarios`;

    return this.http.get<any>(url)
      .toPromise()
      .then((res) => <any> res)
      .then((res) => {


        return res;
      });
  }

  actualizarPermisos(usuario: Usuario): Observable<Usuario>{
    const url = `${this.urlProtected}/usuario/actualizar`;
    return this.http.put<Usuario>(url, usuario);
  }

  actualizarUsuario(usuario: Usuario): Observable<any>{

    const url = `${this.urlProtected}/usuario/actualizar`;
    let body = usuario;

    return this.http.put<Usuario>(url, body);

  }

  borrarUsuario(usuario: Usuario): Observable<any>{

    const url = `${this.urlProtected}/usuario/baja`;
    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: usuario,
    };


    return this.http.delete<Usuario>(url, options);

  }

  getUsuarioActivo(): Usuario{

    // Variable local para almacenar los datos del usuario activo del tipo Usuario
    let usuarioActivo: Usuario = {};

    // Variable local para almacenar los datos del usuario activo.
    // Recuperamos estos datos de la sesión, guardada cuando el usuario se logueó
    let userSession: string | null = sessionStorage.getItem('usuario');

    // Si existen los datos de sesión del usuario guardamos el usario. Para esto
    // usamos JSON.parse para transformar una cadena JSON en un objeto
    if (userSession){
      usuarioActivo = JSON.parse(userSession!);
	  } else {
      // Si no hay sesión del usuario, salimos de la aplicación
		  this.authService.logout();
	  }

    // Devolvemos el usuario activo
    return usuarioActivo;

  }

  /**
   * Método que comprueba si el usuario activo tiene permisos de super usuario
   *
   * @returns boolean
   */
  getSuperUser(): boolean {

    const user = this.getUsuarioActivo();
    let superUser: boolean = false;

    if (user.permisos != null){
      for (const [key, value] of Object.entries(user.permisos)) {
        if (key.length && value.cpermiso === '0000'){
          superUser = true;
        }
      }

    }

    return superUser;

  }


}
