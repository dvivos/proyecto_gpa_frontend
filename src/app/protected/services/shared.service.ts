import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(private http: HttpClient) { }

  /**
   * Método que obtiene los elementos del menú lateral
   *
   * @returns json con los elementos del menú lateral
   */
  getItemsMenu() {
    return this.http.get<any>('assets/sidemenu.json')
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
  }

  validaEjercicio( control: FormControl ): ValidationErrors | null {

    const valor: number = control.value;

    let anio = new Date().getFullYear();

    if (valor !== anio){
      return {
        noStrider: true
      }
    }
    return null;
  }


  /**
   *
   * @param campo1 Primer campo a comprar
   * @param campo2 Segundo campo a comparar
   * @returns
   */
  camposIguales( campo1: string, campo2: string ){

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if (pass1 !== pass2){
        formGroup.get(campo2)?.setErrors({ noIguales: true })
        return { noIguales: true }
      }

      formGroup.get(campo2)?.setErrors( null )

      return null

    }
  }

  /**
   * Función para comprobar si un objeto está vacio.
   *
   * @param obj
   * @returns boolean
   */
  isEmpty(obj: Object): boolean {

    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
    }

    return true;
  }

}
