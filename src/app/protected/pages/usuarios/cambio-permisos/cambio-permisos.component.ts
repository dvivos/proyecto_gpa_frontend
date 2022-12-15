import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Centidad, Cutramit, Permiso, Usuario } from 'src/app/auth/interfaces/interfaces';
import { UsuariosService } from 'src/app/protected/services/usuarios.service';


@Component({
  selector: 'app-cambio-permisos',
  templateUrl: './cambio-permisos.component.html',
  styles: [
  ],
  providers: [UsuariosService, DialogService]
})
export class CambioPermisosComponent implements OnInit {

  // Variable que controla si se muestra el cuadro de diálogo
  // emergente en el componente html
  mostrarDialog: boolean = false;

  // Variable que controla si se muestra la tabla de permisos
  mostrarTabla: boolean = false;

  // Variables para mostrar mensajes generales y de error:
  // general y de usuarios que se intruducen en los input del formulario
  msgGeneral: string = '';
  msgErrOrigen: string = '';
  msgErrCopia: string = '';

  // Variables para los usuarios:
  // - Usuario Activo (usuario que maneja la aplicación)
  // - Usuario Origen (usuario del que se van a obtener los permisos)
  // - Usuario Copia (usuario al que se le van a copiar los permisos)
  usuarioActivo!: Usuario;
  usuarioCambiar: Usuario;
  usuarioReferencia: Usuario;


  // Variables para los permisos:
  // - Permisos seleccionados
  // - Permisos a aplicar
  selectedPermisos!: Permiso[];
  permisosAplicar!: Permiso[];

  superUser: boolean = false;

  // Variable de la clase DynamicDialogRef usada para pasar datos al
  // componente de diálogo que mostrará la tabla de permisos
  ref!: DynamicDialogRef;

  // Variable formUser del tipo FormGroup, que es un conjunto de FormControls,
  // un objeto que se usa en formularios reactivos para tener un control sobre su valor
  //  y su estado
  // Ref: https://angular.io/api/forms/FormGroup
  // En el FormGroup definimos los campos del formulario e indicamos las validaciones requeridas
  formUser: FormGroup = this.fb.group({
    usuarioCambiar: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8) ] ],
    usuarioReferencia: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
  })


  constructor(private fb: FormBuilder,
              private usuariosService: UsuariosService,
              public dialogService: DialogService,
              private confirmationService: ConfirmationService) {

    // Inicializamos los datos del usuario
    this.usuarioCambiar = this.inicializaUsuario();
    this.usuarioReferencia = this.inicializaUsuario();



  }



  ngOnInit(): void {


    // Obtenemos el usuario activo del servicio de usuarios
    this.usuarioActivo = this.usuariosService.getUsuarioActivo();

    // Comprobamos si el usuario activo tiene perfil de super usuario
    this.superUser = this.usuariosService.getSuperUser();

    console.log(this.formUser.valid);



    // Inicializamos el formulario
    this.formUser.reset();






    // Nos suscribimos al campo usuario para validar los cambios en el input
    /////////// Validaciones del input del usuario origen
    this.formUser.controls['usuarioCambiar'].valueChanges.subscribe(datosInput => {

      // Inicializamos los datos del usuario
      this.usuarioCambiar = this.inicializaUsuario();
      // Ocualtamos la tabla de permisos
      this.mostrarTabla = false;

      // Comprobamos que tengamos datos en la suscripción del input
      if (datosInput){
              // Si la longitud del campo del input es igual a 8 procedemos a consultar el servicio de usuarios
              if (datosInput.length === 8){
                // Guardamos el código de usuario
                this.usuarioCambiar.cusuario = datosInput.toUpperCase().trim();
                // Inicilizamos el mensaje de error del input
                this.msgErrOrigen = '';
                // Consultamos al servicio suscribiéndonos
                this.usuariosService.getUsuarioPorCodigo(this.usuarioCambiar).subscribe(respuesta =>{
                  // Si la respuesta no es nula
                  if (respuesta != null) {
                    // Copiamos la respuesta del servidor en el usuario origen
                    this.usuarioCambiar = respuesta;
                    // El usuario que va a heredar no puede estar desactivado
                    if (!this.usuarioCambiar.activo){
                      this.msgErrOrigen = 'El usuario ' + this.usuarioCambiar.cusuario + ' no está activo';
                      this.formUser.controls['usuarioCambiar'].setErrors({'required': true});
                    } else {
                      this.msgErrOrigen = ''
                    }

                  } else {
                    this.msgErrOrigen = 'No se ha encontrado el usuario';
                    this.formUser.controls['usuarioCambiar'].setErrors({'required': true});
                    // Ocualtamos la tabla de permisos
                    this.mostrarTabla = false;
                  }
                }, err => {
                  this.msgErrOrigen = err.error.mensaje;
                  this.formUser.controls['usuarioCambiar'].setErrors({'required': true});
                  // Ocualtamos la tabla de permisos
                  this.mostrarTabla = false;
                });

              } else {
                this.msgErrOrigen = 'El usuario debe tener 8 caracteres!!';
                // Ocualtamos la tabla de permisos
                this.mostrarTabla = false;

              }
      }
    });

    /////////// Validaciones del input del usuario destino
    this.formUser.controls['usuarioReferencia'].valueChanges.subscribe(datosInput => {

      // Inicializamos los datos del usuario
      this.usuarioReferencia = this.inicializaUsuario();
      // Ocualtamos la tabla de permisos
      this.mostrarTabla = false;
      // Comprobamos que tengamos datos en la suscripción del input
      if (datosInput){
        // Si la longitud del campo del input es igual a 8 procedemos a consultar el servicio de usuarios
        if (datosInput.length === 8){
          // Guardamos el código de usuario
          this.usuarioReferencia.cusuario = datosInput.toUpperCase().trim();
          // Inicilizamos el mensaje de error del input
          this.msgErrCopia = '';
          // Consultamos al servicio suscribiéndonos
          this.usuariosService.getUsuarioPorCodigo(this.usuarioReferencia).subscribe(respuesta =>{
            if (respuesta != null) {
              // Copiamos la respuesta del servidor en el usuario origen
              this.usuarioReferencia = respuesta;
              // El usuario que va a heredar no puede estar desactivado
              if (!respuesta.activo){
                this.msgErrCopia = 'El usuario ' + respuesta.cusuario + ' no está activo';
                this.formUser.controls['usuarioReferencia'].setErrors({'required': true});
              } else {
                this.msgErrCopia = ''
              }
            } else {
              this.msgErrCopia = 'No se ha encontrado el usuario';
              this.formUser.controls['usuarioReferencia'].setErrors({'required': true});
              // Ocualtamos la tabla de permisos
              this.mostrarTabla = false;
            }

          }, err => {
            this.msgErrCopia = err.error.mensaje;
            this.formUser.controls['usuarioReferencia'].setErrors({'required': true});
            // Ocualtamos la tabla de permisos
            this.mostrarTabla = false;
          });


        } else {
          this.msgErrCopia = 'El usuario debe tener 8 caracteres!!'
          // Ocualtamos la tabla de permisos
          this.mostrarTabla = false;
        }
      }

    });


  } // Fin del ngOnInit

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

  /**
   * Método que obtiene los permisos del usuario de referencia
   */
  obtenerPermisosUsuarioRef(){
    // Marcamos el formulario como 'tocado'
    this.formUser.markAllAsTouched();
    // Si el formulario es válido
    if (this.formUser.valid){
      // Comprobamos si los usuarios son iguales
      if (this.formUser.value.usuarioCambiar === this.formUser.value.usuarioReferencia) {

        // Mostramos el cuadro de dialogo general
        this.mostrarDialog = true;
        this.msgGeneral = 'Los usuarios no pueden ser iguales';
        // Ocualtamos la tabla de permisos
        this.mostrarTabla = false;

      } else if (this.usuarioCambiar.cutramit?.cutramit !== this.usuarioReferencia.cutramit?.cutramit) {

        // Mostramos el cuadro de dialogo general
        this.mostrarDialog = true;
        this.msgGeneral = 'Los usuarios no tienen la misma Unidad Tramitadora';
        // Ocualtamos la tabla de permisos
        this.mostrarTabla = false;


      } else if (this.usuarioReferencia.permisos?.length === 0) {

        // Mostramos el cuadro de dialogo general
        this.mostrarDialog = true;
        this.msgGeneral = `El usuario ${this.usuarioReferencia.cusuario} no tiene permisos asignados`;
        // Ocualtamos la tabla de permisos
        this.mostrarTabla = false;

      } else {
        // Ocultamos el cuadro de dialogo general
        this.mostrarDialog = false;
        // Asignamos los permisos del usuario origen a los permisos a aplicar
        this.permisosAplicar = this.usuarioReferencia.permisos!;
        // Mostramos la tabla de permisos
        this.mostrarTabla = true;
      }
    }
  }

  eliminaPermisos(){
    console.log('elimina permisos');
    this.confirmationService.confirm({
        message: `¿Eliminar permisos del usuario ${this.usuarioCambiar.cusuario}?`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          // Eliminamos los permisos al usuario a cambiar
          this.usuarioCambiar.permisos = [];

          // Pasar usuarioCambiar al servicio de actualizar permisos actualizarPermisos
          this.usuariosService.actualizarPermisos(this.usuarioCambiar).subscribe(respuesta =>{
            // Mostramos el cuadro de dialogo general
            this.mostrarDialog = true;
            this.msgGeneral = 'Los permisos se han eliminado correctamente';
            // Limpiamos los input del formulario
            this.formUser.reset();
          }, err => {
            // Mostramos el cuadro de dialogo general
            this.mostrarDialog = true;
            this.msgGeneral = err.mensaje;
          })

          // Ocualtamos la tabla de permisos
          this.mostrarTabla = false;
          // Limpiamos los permisos a aplicar y los seleccionados
          this.permisosAplicar = [];
          this.selectedPermisos = [];


        },reject: () => {
          // Limpiamos los permisos seleccionados
          this.selectedPermisos = [];

        }
      })

  }


  actualizar(){
    this.confirmationService.confirm({
      message: 'Copiar permisos?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        // Guardamos los permisos seleccionados
        this.permisosAplicar = this.permisosAplicar.filter(val => this.selectedPermisos.includes(val));

        // Aplicamos los permisos al usuario a cambiar
        this.usuarioCambiar.permisos = this.permisosAplicar;

        // Pasar usuarioCambiar al servicio de actualizar permisos actualizarPermisos
        this.usuariosService.actualizarPermisos(this.usuarioCambiar).subscribe(respuesta =>{
          // Mostramos el cuadro de dialogo general
          this.mostrarDialog = true;
          this.msgGeneral = 'Los permisos se han copiado correctamente';
          // Limpiamos los input del formulario
          this.formUser.reset();
        }, err => {
          // Mostramos el cuadro de dialogo general
          this.mostrarDialog = true;
          this.msgGeneral = err.mensaje;
        })

        // Ocualtamos la tabla de permisos
        this.mostrarTabla = false;
        // Limpiamos los permisos a aplicar y los seleccionados
        this.permisosAplicar = [];
        this.selectedPermisos = [];


      },reject: () => {
        // Limpiamos los permisos seleccionados
        this.selectedPermisos = [];

      }
    })
  }

  /**
   * Acción para cancelar la aplicación de permisos
   */
  cancelar(){
    // Ocualtamos la tabla de permisos
    this.mostrarTabla = false;
  }


}
