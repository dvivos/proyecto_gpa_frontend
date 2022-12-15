import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from '../../../auth/interfaces/interfaces';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
    .activo{
        color: white;
    }
    .noActivo{
        color: white;
        background-color: gray;
    }
    `
    ]
})
export class MenuComponent implements OnInit {


  items: MenuItem[] = [];
  mensaje: string = '';
  datosUsuario: string = '';

  usuario: Usuario = {};

  superUser: boolean = false;
  activo: boolean = false;

  constructor(private authService: AuthService,
              private usuariosService: UsuariosService) { }

  ngOnInit(): void {

    // Obtenemos el usuario activo del servicio de usuarios
    this.usuario = this.usuariosService.getUsuarioActivo();

    if(this.usuario.activo){
        this.activo = true;
    }

    // Comprobamos si el usuario activo tiene perfil de super usuario
    this.superUser = this.usuariosService.getSuperUser();

    if (this.superUser){

      this.items = [
        {
          label: 'Procesos',
          icon: 'pi pi-desktop',
          routerLink: 'dashboard'
        },
        {
          label: 'Documentación',
          icon: 'pi pi-book',
          routerLink: 'pages/docs'
        },
        {
          label: 'Panel Administración',
          icon: 'pi pi-cog',
          routerLink: 'pages/procesos'

        }
      ];

    } else {

      this.items = [
        {
          label: 'Procesos',
          icon: 'pi pi-desktop',
          routerLink: 'dashboard'
        },
        {
          label: 'Documentación',
          icon: 'pi pi-book',
          routerLink: 'pages/docs'
        }
      ];

    }

  }


  logout(){
    this.authService.logout();
  }

}
