import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// Pipes personalizadas
import { TrimPipe } from './pipes/trim.pipe';
import { ActivoPipe } from './pipes/activo.pipe';

import { ProtectedRoutingModule } from './protected-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

// Manejador de la parte protegida
import { DashboardComponent } from './dashboard/dashboard.component';
// Menú de navegación
import { MenuComponent } from './shared/menu/menu.component';
// Componentes del menú de navegación
import { HomeComponent } from './pages/home/home.component';
import { DocsComponent } from './pages/docs/docs.component';
import { ProcesosComponent } from './pages/procesos/procesos.component';

// Menú lateral
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';
// Componentes del menú lateral
//// Usuarios
import { CambioPermisosComponent } from './pages/usuarios/cambio-permisos/cambio-permisos.component';
import { PermisosUtComponent } from './pages/usuarios/permisos-ut/permisos-ut.component';
import { CambioUtComponent } from './pages/usuarios/cambio-ut/cambio-ut.component';
//// Gestión Económica
import { QuitarAprOrdenPagoComponent } from './pages/geco/quitar-apr-orden-pago/quitar-apr-orden-pago.component';
import { AsocGasFacComponent } from './pages/geco/asoc-gas-fac/asoc-gas-fac.component';
import { IrpfAyudasComponent } from './pages/geco/irpf-ayudas/irpf-ayudas.component';
import { BuscarMpRelComponent } from './pages/geco/buscar-mp-rel/buscar-mp-rel.component';

//// Documentos
import { QuitarFirmaComponent } from './pages/documentos/quitar-firma/quitar-firma.component';
import { QuitarFirmaRelComponent } from './pages/documentos/quitar-firma-rel/quitar-firma-rel.component';
import { BorrarDocComponent } from './pages/documentos/borrar-doc/borrar-doc.component';
//// Centro Gestor

//// Intervención
import { CheckFiscComponent } from './pages/inte/check-fisc/check-fisc.component';
import { PermisosFiscComponent } from './pages/inte/permisos-fisc/permisos-fisc.component';
import { BorarFirmaInteComponent } from './pages/inte/borar-firma-inte/borar-firma-inte.component';
import { LenlocComponent } from './pages/inte/lenloc/lenloc.component';
import { PenlocComponent } from './pages/inte/penloc/penloc.component';

//// Tesorería
import { BorrarAprPagoComponent } from './pages/teso/borrar-apr-pago/borrar-apr-pago.component';
import { ActNoPrepComponent } from './pages/teso/act-no-prep/act-no-prep.component';
import { ModOrdAdComponent } from './pages/teso/mod-ord-ad/mod-ord-ad.component';

//// AD´s y Terceros
import { CheckOperacionesComponent } from './pages/terceros/check-operaciones/check-operaciones.component';

//// Subvenciones
import { ReqSubComponent } from './pages/sub/req-sub/req-sub.component';




@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    DocsComponent,
    ProcesosComponent,
    MenuComponent,
    SidemenuComponent,
    PermisosUtComponent,
    CambioPermisosComponent,
    CambioUtComponent,
    QuitarAprOrdenPagoComponent,
    TrimPipe,
    AsocGasFacComponent,
    IrpfAyudasComponent,
    BuscarMpRelComponent,
    QuitarFirmaComponent,
    QuitarFirmaRelComponent,
    BorrarDocComponent,
    CheckFiscComponent,
    PermisosFiscComponent,
    BorarFirmaInteComponent,
    LenlocComponent,
    PenlocComponent,
    BorrarAprPagoComponent,
    ActNoPrepComponent,
    ModOrdAdComponent,
    CheckOperacionesComponent,
    ReqSubComponent,
    ActivoPipe,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProtectedModule { }
