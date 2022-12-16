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

  // URL base de la parte protegida de la API
  private urlProtected: string = environment.urlProtected;

  // Inyectamos la clase HttpClient y el servicio de autenticación de usuarios
  constructor(private http: HttpClient,
              private authService: AuthService) { }


  /**
   * Método que obtiene un usuario por su código de usuario
   *
   * @param usuario
   * @returns Usuario
   */
  getUsuarioPorCodigo(usuario: Usuario): Observable<Usuario> {

    // URL del endpoint de la API
    const url = `${this.urlProtected}/usuario`;
    const body = usuario;

    return this.http.post<any>(url, body);

  }

  /**
   * Método que obtiene todos los usuarios
   *
   * @returns List<Usuario>
   */
  getUsuarios() {
    // URL del endpoint de la API
    const url = `${this.urlProtected}/usuarios`;

    return this.http.get<any>(url);
  }

  /**
   * Método que obtiene los usuarios que no están activos
   *
   * @returns List<Usuario>
   */
  getUsuariosNoActivos() {
    // URL del endpoint de la API
    const url = `${this.urlProtected}/inactivos`;

    return this.http.get<any>(url);
  }


  /**
   * Método que obtiene las Unidades Tramitadoras
   *
   * @returns List<Cutramit>
   */
  getUnidadesTramitadoras(): Observable<Cutramit[]>{
    // URL del endpoint de la API
    const url = `${this.urlProtected}/unidades`;

    return this.http.get<Cutramit[]>(url);
  }

  /**
   * Método que obtiene un listado de usuarios filtrados por la API
   *
   * @returns List<Usuario>
   */
  getUsuariosFilter() {
    // URL del endpoint de la API
    const url = `${this.urlProtected}/usuarios`;

    return this.http.get<any>(url)
      .toPromise()
      .then((res) => <any> res)
      .then((res) => {


        return res;
      });
  }

  /**
   * Método que actualiza los permisos de un usuario
   *
   * @param usuario Usuario
   * @returns Respuesta del servicio
   */
  actualizarPermisos(usuario: Usuario): Observable<Usuario>{
    // URL del endpoint de la API
    const url = `${this.urlProtected}/usuario/actualizar`;
    return this.http.put<Usuario>(url, usuario);
  }

  /**
   * Método que actualiza un usuario
   *
   * @param usuario Usuario
   * @returns
   */
  actualizarUsuario(usuario: Usuario): Observable<any>{
    // URL del endpoint de la API
    const url = `${this.urlProtected}/usuario/actualizar`;
    let body = usuario;

    return this.http.put<Usuario>(url, body);

  }

  /**
   * Método que elimina un usuario
   *
   * @param usuario Usuario
   * @returns
   */
  borrarUsuario(usuario: Usuario): Observable<any>{
    // URL del endpoint de la API
    const url = `${this.urlProtected}/usuario/baja`;

    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: usuario,
    };


    return this.http.delete<Usuario>(url, options);

  }

  /**
   * Método que obtiene el usuario que está logueado en la aplicación.
   *
   * @returns Usuario
   */
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
