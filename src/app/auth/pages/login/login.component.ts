import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/interfaces';
import { SharedService } from '../../../protected/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  blocked = false;
  mostrarDialog = false;
  msgErr: String = '';
  usuario!: Usuario;

  /**
   * La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito,
   * al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.
   */
  //patronPassword: string = "^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16}$";


  formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.sharedService.emailPattern) ] ],
    password: ['', [Validators.required]]


  })

  /**
   * Obtenemos un mensaje para la validación del email
   */
  get emailErrorsMsg(): string {

    const errors = this.formLogin.get('email')?.errors;

    if ( errors?.['required'] ){
      return 'El email es obligatorio';
    } else if (errors?.['pattern']) {
      return 'El formato de correo no es correcto';
    }

    return '';

  }

  get userErrorMsg(): string {

    const errors = this.formLogin.get('usuario')?.errors;

    if (errors?.['required']){
      return 'El usuario es obligatorio';
    } else if (errors?.['!userExiste']) {
      return 'El usuario no existe';
    }

    return '';


  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private sharedService: SharedService ) { }

  ngOnInit(): void {

  }

  /**
   * Método que comprueba si un campo es válido
   *
   * @param campo
   * @returns
   */
  campoNoValido(campo: string){
    return this.formLogin.get(campo)?.invalid
           && this.formLogin.get(campo)?.touched;
  }

  /**
   * Método que comprueba si el formulario ha sido tocado al enviarlo, si es así
   * dispara las validaciones.
   */
  submitLogin(){

    // Variable que bloquea mientras espera respuesta del login
    this.blocked = true;

    this.formLogin.markAllAsTouched();

    const {email, password} = this.formLogin.value;

    this.authService.login(email, password)
      .subscribe(
        res => {
          this.usuario = res.usuario;

          this.blocked = false;
//          // Borramos el token que pudiera existir de un usuario que no se pudo eliminar
//          localStorage.removeItem('token');
//          sessionStorage.clear();
//          // Guardamos el token que viene del servicio
//          //localStorage.setItem('token',res.jwtToken);
//          // Guardamos los datos del usuario que viene del servicio en la sesión
          sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
          sessionStorage.setItem('cusuario', JSON.stringify(this.usuario.cusuario));

          this.router.navigateByUrl('/dashboard');
        },
        err => {
          this.blocked = false;
          this.mostrarDialog = true;
          if (err.status == '400'){
            this.msgErr = 'Email o contraseña incorrecta';
          } else if (err.status == '500') {
            this.msgErr = 'Error al consultar el servicio de Login';
          } else {
            this.msgErr = 'No se ha podido conectar con la base de datos.';
          }

        }

      );
  }

}
