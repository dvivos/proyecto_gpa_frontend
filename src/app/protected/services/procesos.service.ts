import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pago } from 'src/app/auth/interfaces/interfaces';
import { Observable } from 'rxjs';
import { Documento } from '../../auth/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  // URL base de la parte protegida.
  private urlProtected: string = environment.urlProtected;
  // Inyectamos la clase HttpCLient
  constructor(private http: HttpClient) { }

  /**
   * Método para obtener un Pago.
   *
   * @param pago
   * @returns
   */
  getPago(pago: Pago): Observable<any> {


    const headers = { 'content-type': 'application/json'}
    const url = `${ this.urlProtected }/pago`;
    const body=JSON.stringify(pago);

    return this.http.post(url, body, {'headers':headers});

  }

  /**
   * Método para actualizar un pago.
   *
   * @param pago
   * @returns
   */
  actualizaPago(pago: Pago): Observable<any>{

    const headers = { 'content-type': 'application/json'}
    const url = `${ this.urlProtected }/pago/actualizar`;
    const body = pago;

    return this.http.put(url, body, {'headers':headers});

  }

  /**
   * Métdodo para borrar un Documento.
   *
   * @param documento
   * @returns
   */
  borrarDocumento(documento: Documento): Observable<any>{

    const url = `${ this.urlProtected }/documento/baja`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: documento,
    };

    return this.http.delete(url, options);

  }

}
