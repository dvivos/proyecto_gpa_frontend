import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario, Centidad, Cutramit } from 'src/app/auth/interfaces/interfaces';
import { UsuariosService } from 'src/app/protected/services/usuarios.service';

@Component({
  selector: 'app-cambio-ut',
  templateUrl: './cambio-ut.component.html',
  styles: [
  ]
})
export class CambioUtComponent implements OnInit {

  // Variables para mostrar mensajes generales y de error
  msgGeneral: string = '';
  msgErr: string = '';

  // Variable que controla si se muestra el cuadro de diálogo
  // emergente en el componente html
  mostrarDialog: boolean = false;

  // Variable que controla si se muestra la tabla con los datos del usuario
  mostrarDatos: boolean = false;

  // Variables para los usuarios:
  // - Usuario Activo (usuario que maneja la aplicación)
  // - Usuario Input (usuario del que se van a obtener los datos)
  usuarioActivo: Usuario = {};
  usuarioInput: Usuario = {};

  unidades: Cutramit[] = [];

  // ut: Cutramit = {}

  unidadSelected!: Cutramit;

  superUser: boolean = false;

  // Variable formUser del tipo FormGroup, que es un conjunto de FormControls,
  // un objeto que se usa en formularios reactivos para tener un control sobre su valor
  //  y su estado
  // Ref: https://angular.io/api/forms/FormGroup
  // En el FormGroup definimos los campos del formulario e indicamos las validaciones requeridas
  formUser: FormGroup = this.fb.group({
    usuarioInput: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8) ] ]
  })

  // Inyectamos los servicios necesarios
  constructor(private fb: FormBuilder,
              private usuariosService: UsuariosService) {

      // Inicializamos los datos del usuario
      this.usuarioInput = this.inicializaUsuario();

  }

  ngOnInit(): void {

      // Obtenemos las unidades tramitadoras con el método getUnidadesTramitadoras() del servicio de usuarios
      this.usuariosService.getUnidadesTramitadoras().subscribe(respuesta =>{
        this.unidades = respuesta as Cutramit[]
      },err => {
          console.log('error obteniendo UTs: ',err);
      })

      // Obtenemos el usuario activo del servicio de usuarios
      this.usuarioActivo = this.usuariosService.getUsuarioActivo();
      this.usuariosService.getUsuarioPorCodigo(this.usuarioActivo);


      // Comprobamos si el usuario activo tiene perfil de super usuario
      this.superUser = this.usuariosService.getSuperUser();

      // Nos suscribimos a los cambios del input usuarioInput del formulario
      this.formUser.controls['usuarioInput'].valueChanges.subscribe(datosInput =>{
        // Inicializamos los datos del usuario
        this.usuarioInput = this.inicializaUsuario();
        // Ocualtamos el panel de datos
        this.mostrarDatos = false;

        if (datosInput){

          if (datosInput.length === 8){

            this.usuarioInput.cusuario = datosInput.toUpperCase().trim();
            this.msgErr = '';

            this.usuariosService.getUsuarioPorCodigo(this.usuarioInput).subscribe(respuesta =>{


              if(respuesta != null){
                this.usuarioInput = respuesta;
                this.mostrarDatos = true;
              } else {
                this.msgErr = 'No se ha encontrado el usuario';
                this.formUser.controls['usuarioInput'].setErrors({'required': true});
                // Ocualtamos el panel de datos
                this.mostrarDatos = false;

              }
            }, err => {
              this.msgErr = err.error.mensaje;
              this.formUser.controls['usuarioInput'].setErrors({'required': true});
              // Ocualtamos el panel de datos
              this.mostrarDatos = false;
            });
          } else {
            this.msgErr = 'El usuario debe tener 8 caracteres!!';
            // Ocualtamos el panel de datos
            this.mostrarDatos = false;
          }
        }
      });


  }

  /**
   * Acción del botón submit del formulario
   */
   accionForm(){

    this.usuarioInput.cutramit = this.unidadSelected;


    // Pasar usuarioDestino al servicio de actualizar permisos actualizarPermisos
    this.usuariosService.actualizarPermisos(this.usuarioInput).subscribe(respuesta =>{

      if (respuesta != null){
        // Mostramos el cuadro de dialogo general
        this.mostrarDialog = true;
        this.msgGeneral = 'La Unidad Tramitadora se ha cambiado correctamente';
      } else {

      }

    }, err => {
      console.log(err);
      // Mostramos el cuadro de dialogo general
      this.mostrarDialog = true;
      this.msgGeneral = 'Ha ocurrido un error al actualizar la UT.';

    })

    // Limpiamos la Unidad Tramitadora seleccionada
    this.unidadSelected = {
      id: 0,
      cutramit: '',
      descorta: '',
      descripcion: ''
    };

   }



   /**
   * Método que inicializa un usuario
   *
   * @returns usuario inicializado
   */
  inicializaUsuario(): Usuario{

    let usuario: Usuario;
    let centidadIn: Centidad = {
      id: 0,
      centidad: '',
      xentidad: ''
    };
    let cutramitIn: Cutramit = {
      id: 0,
      cutramit: '',
      descorta: '',
      descripcion: ''
    };

    usuario = {
      id: 0,
      cusuario: '',
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
      activo: false,
      permisos: [],
      centidad: centidadIn,
      cutramit: cutramitIn
    };

    return usuario;
  }

}
