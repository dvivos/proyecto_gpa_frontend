import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Centidad, Cutramit, Usuario } from 'src/app/auth/interfaces/interfaces';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styles: [`
    :host ::ng-deep .p-cell-editing {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }`]
})
export class ProcesosComponent implements OnInit {

    // Flag para idenfiticar si se tiene permisos de superUser
    superUser: boolean = false;
    // Variable para el usuario activo
    usuarioActivo: Usuario = {};
    // Variable para el listado de usuarios
    usuarios: Usuario[] = [];

    unidades: Cutramit[] = [];

    // Usuario a editar
    usuario: Usuario = {};

    // Usuario seleccionado
    usuarioSelected: Usuario = {};

    // Tipo de mensaje para el cuadro de dialogo
    infoMensaje: string = 'Detalle Usuario';

    estadoActivo = [{
      label: '',
      value: false
    }];

    // Variables para mostrar mensajes generales y de error
    msgGeneral: string = '';
    msgErr: string = '';

    // Variable que controla si se muestra el cuadro de diálogo
    // emergente en el componente html
    usuarioDialog: boolean = false;

    submitted: boolean = false;

    // Variable que controla si se muestra la tabla con los datos del usuario
    mostrarDatos: boolean = false;



  items: MenuItem[] = [];

    constructor(private fb: FormBuilder,
                private usuariosService: UsuariosService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {}

  ngOnInit(): void {

    this.estadoActivo = [
      {label: 'Activo', value: true},
      {label: 'No Activo', value: false},
    ]

    // Obtenemos el usuario activo del servicio de usuarios
    this.usuarioActivo = this.usuariosService.getUsuarioActivo();
    this.usuariosService.getUsuarioPorCodigo(this.usuarioActivo);

    // Comprobamos si el usuario activo tiene perfil de super usuario
    this.superUser = this.usuariosService.getSuperUser();

    // Cargamos listado de usuarios
    this.getListadoUsuarios();

  }

  editUsuario(usuario: Usuario){
    this.usuario = {...usuario};
    this.usuarioDialog = true;
  }

  saveUsuario(){
    this.submitted = true;
    this.usuarioDialog = false;
    this.usuario.cusuario = this.usuario.cusuario?.toUpperCase();

    this.usuariosService.actualizarUsuario(this.usuario).subscribe(respuesta =>{
        if (respuesta != null){
            this.messageService.add({severity:'success', summary: 'Info', detail: `Usuario ${this.usuario.cusuario} actualizado`, life: 3000});
            this.getListadoUsuarios();
        } else {

        }
      }, err => {
        if (err.error.msgError === 1062){
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Registro duplicado', life: 3000});
        } else {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Registro duplicado', life: 3000});
        }
    });


  }

  ocultarDialog(){
    this.usuarioDialog = false;
    this.submitted = false;
  }

  deleteUsuario(usuario: Usuario){

    this.confirmationService.confirm({
        message: '¿Borrar el usuario ' + usuario.cusuario + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.usuariosService.borrarUsuario(usuario).subscribe(resp =>{
                this.usuario = {};
                this.messageService.add({severity:'success', summary: resp.OK, detail: `Usuario ${usuario.cusuario} Borrado`, life: 3000});
                this.getListadoUsuarios();
            }, err =>{
                this.messageService.add({severity:'error', summary: err.error.error, detail: 'Error en el servicio', life: 3000});
            });

        }, reject: () => {
            this.messageService.add({severity:'info', summary: 'Cancelado', detail: 'Borrado cancelado', life: 3000});

        }
    });



  }

  actualizaUsuario(usuario: Usuario){
    this.usuariosService.actualizarUsuario(usuario).subscribe(respuesta =>{
        if (respuesta != null){
            // Mostramos el cuadro de dialogo general
            this.usuarioDialog = true;
            this.msgGeneral = 'El usuario se ha actualizado correctamente';
            //this.mostrarDatos = true;
        } else {
        }
      }, err => {
        console.log(err);
        // Mostramos el cuadro de dialogo general
        this.usuarioDialog = true;
        this.msgGeneral = 'Ha ocurrido un error al actualizar el usuario.';
    });
  }


  getListadoUsuarios(){

    this.usuariosService.getUsuarios().subscribe( resp =>{
    	  this.usuarios = resp;
    }, err => {
    		console.log(err);
    });
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
