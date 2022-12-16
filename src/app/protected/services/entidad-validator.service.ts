import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Centidad } from '../../auth/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EntidadValidatorService implements AsyncValidator {

  // Cogemos la URL base de la zona protegida.
  private urlProtected: string = environment.urlProtected;

  // Variable entidad del tipo Entidad.
  entidad: Centidad = {};

  // Inyectamos el servicio HttpCLient
  constructor(private http: HttpClient) { }

  /**
   * Método que conprueba si una entidad existe.
   *
   * @param control
   * @returns
   */
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    // Valor de entrada
    this.entidad.centidad = control.value;
    // Endpoint de la API para consulta
    const url = `${this.urlProtected}/entidad`;
    // Retornamos el resultado de la llamada al servicio
    return this.http.post<any[]>(url, this.entidad)
      .pipe(
        map( resp => {
          return (resp === null)? { NoExisteEntidad: true } : null
        })
      );

  }


}
