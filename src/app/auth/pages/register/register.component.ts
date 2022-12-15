import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { SharedService } from '../../../protected/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  errores: string[] = [];
  msgDialog: String = '';
  mostrarDialog = false;

  formRegistro: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15) ] ],
    apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40) ] ],
    email: ['', [Validators.required, Validators.pattern(this.sharedService.emailPattern) ]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
    activo: false,
    cusuario: null,
    cutramit: {
      cutramit: '150100'
    },
    centidad: {
      centidad: 'DIP'
    }
  }, {
    validators: [ this.sharedService.camposIguales('password', 'password2') ]
  })

  /**
   *
   */
  get emailErrorsMsg(): string {

    const errors = this.formRegistro.get('email')?.errors;

    if ( errors?.['required'] ){
      return 'El email es obligatorio';
    } else if (errors?.['pattern']) {
      return 'El formato de correo no es correcto';
    }

    return '';

  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private sharedService: SharedService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * Función que marca un campo como no válido y tocado
   *
   * @param campo
   * @returns
   */
  campoNoValido(campo: string){
    return this.formRegistro.get(campo)?.invalid
           && this.formRegistro.get(campo)?.touched;
  }

  submitRegistro(){

      this.formRegistro.markAllAsTouched();

      this.mostrarDialog = true;

      this.authService.register(this.formRegistro.value)
        .subscribe( respRegistro => {

            this.formRegistro.reset();

            Swal.fire('Usuario Registrado', `Usuario ${respRegistro.nombre} ${respRegistro.apellidos} registrado. Haga clic en OK para loguearse`, 'success');

            this.router.navigateByUrl('login');


        },err => {

            if (err.error.msgError === 1062){
                Swal.fire(`Error: ${err.error.mensaje}`, `Detalle: Registro duplicado`, 'error');
            } else {
                Swal.fire(`Error: ${err.error.mensaje}`, `Código error SQL: ${err.error.msgError}`, 'error');
            }

        })



  }

}
