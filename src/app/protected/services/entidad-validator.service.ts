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

  private urlProtected: string = environment.urlProtected;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  entidad: Centidad = {};

  constructor(private http: HttpClient) { }


  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    this.entidad.centidad = control.value;

    const url = `${this.urlProtected}/entidad`;

    return this.http.post<any[]>(url, this.entidad)
      .pipe(
        map( resp => {
          return (resp === null)? { NoExisteEntidad: true } : null
        })
      );

  }


}
