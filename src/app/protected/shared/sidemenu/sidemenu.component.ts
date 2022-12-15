import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styles: [
  ]
})
export class SidemenuComponent implements OnInit {

  selectedElemento: any;

  elementosMenu: any[] = [];

  filteredElemento: any[] = [];

  itemMenu: any[] = [];

  itemsMenu: MenuItem[] = [];

  constructor(private router: Router,
              private sharedService: SharedService) {

    // Nos suscribimos al evento del router para comprobar la url en la que estamos.
    // Está comentada la salida ya que lo usamos para propositos de depuración.
    this.router.events.subscribe( event  => {
      if (event instanceof NavigationStart) {
           //console.log('URL actual: ',event.url);
        }
      });

  }

  ngOnInit(): void {

    this.sharedService.getItemsMenu().then(items => {
      this.elementosMenu = items;
    });


    this.itemsMenu = [
      {
        label: 'Usuarios',
        items: [
        {
          label: 'Cambio Permisos',
          routerLink: './pages/usuarios/cambio-permisos'
        },
        {
          label: 'Permisos en UT',
          routerLink: './pages/usuarios/permisos-ut'
        },
        {
          label: 'Cambio UT a usuario',
          routerLink: './pages/usuarios/cambio-ut'
        }
      ]},{separator: true},
      {
        label: 'Gestión Económica',
        items: [
        {
          label: 'Quitar aprobación Orden Pago',
          routerLink: './pages/geco/quitar-apr-orden-pago'
        },
        {
          label: 'IRPF Ayudas Familiares',
          routerLink: './pages/geco/irpf-ayudas'
        },
        {
          label: 'Asociar GAS a FAC',
          routerLink: './pages/geco/asoc-gas-fac'
        },
        {
          label: 'Buscar MP sin IRPF en Relación',
          routerLink: './pages/geco/buscar-mp-rel'
        }
      ]},{separator: true},
      {
        label: 'Documentos',
        items: [
        {
          label: 'Quitar firma electrónica',
          routerLink: './pages/documentos/quitar-firma'
        },
        {
          label: 'Quitar firma de Relación',
          routerLink: './pages/documentos/quitar-firma-rel'
        },
        {
          label: 'Eliminar Documento',
          routerLink: './pages/documentos/borrar-doc'
        }
      ]},{separator: true},
      {
        label: 'Intervención',
        items: [
        {
          label: 'Comprobar Fiscalización',
          routerLink: './pages/inte/check-fisc'
        },
        {
          label: 'Permisos de Fiscalización',
          routerLink: './pages/inte/permisos-fisc'
        },
        {
          label: 'Quitar firma Interventor',
          routerLink: './pages/inte/borar-firma-inte'
        },
        {
          label: 'LENLOC',
          routerLink: './pages/inte/lenloc'
        },
        {
          label: 'PENLOC',
          routerLink: './pages/inte/penloc'
        }
      ]},{separator: true},
      {
        label: 'Tesorería',
        items: [
        {
          label: 'Quitar aprobación Pago',
          routerLink: './pages/teso/borrar-apr-pago'
        },
        {
          label: 'Actualizar No Presupuestarias',
          routerLink: './pages/teso/act-no-prep'
        },
        {
          label: 'Modificar ordinal de un AD',
          routerLink: './pages/teso/mod-ord-ad'
        }
      ]},{separator: true},
      {
        label: 'ADs y Terceros',
        items: [
        {
          label: 'Comprobar operaciones de un AD',
          routerLink: './pages/terceros/check-operaciones'
        }
      ]},{separator: true},
      {
        label: 'Subvenciones',
        items: [
        {
          label: 'Requisitos Subvención',
          routerLink: './pages/sub/req-sub'
        }
      ]}

    ];

}


  filterItem(event: any){
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.elementosMenu.length; i++) {

      let elemento = this.elementosMenu[i];

      if (elemento.label.toLowerCase().includes(query.toLowerCase())){
        filtered.push(elemento);
      }
    }

    this.filteredElemento = filtered;
  }

  elementoSelect(event: any){
    const url: string = '/dashboard'.concat(event.routerLink);

    this.router.navigateByUrl(url);
    this.selectedElemento = '';
  }

}
