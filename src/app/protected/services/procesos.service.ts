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

  private urlProtected: string = environment.urlProtected;


  constructor(private http: HttpClient) { }

  getPago(pago: Pago): Observable<any> {

    const headers = { 'content-type': 'application/json'}
    const url = `${ this.urlProtected }/pago`;
    const body=JSON.stringify(pago);

    return this.http.post(url, body, {'headers':headers});

  }

  actualizaPago(pago: Pago): Observable<any>{

    const headers = { 'content-type': 'application/json'}
    const url = `${ this.urlProtected }/pago/actualizar`;
    let body = pago;

    return this.http.put(url, body, {'headers':headers});

  }

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
