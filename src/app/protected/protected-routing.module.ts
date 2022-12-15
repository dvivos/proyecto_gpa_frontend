import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { DocsComponent } from './pages/docs/docs.component';
import { ProcesosComponent } from './pages/procesos/procesos.component';
import { CambioPermisosComponent } from './pages/usuarios/cambio-permisos/cambio-permisos.component';
import { PermisosUtComponent } from './pages/usuarios/permisos-ut/permisos-ut.component';
import { CambioUtComponent } from './pages/usuarios/cambio-ut/cambio-ut.component';
import { QuitarAprOrdenPagoComponent } from './pages/geco/quitar-apr-orden-pago/quitar-apr-orden-pago.component';
import { QuitarFirmaComponent } from './pages/documentos/quitar-firma/quitar-firma.component';
import { QuitarFirmaRelComponent } from './pages/documentos/quitar-firma-rel/quitar-firma-rel.component';
import { BorrarDocComponent } from './pages/documentos/borrar-doc/borrar-doc.component';
import { AsocGasFacComponent } from './pages/geco/asoc-gas-fac/asoc-gas-fac.component';
import { IrpfAyudasComponent } from './pages/geco/irpf-ayudas/irpf-ayudas.component';
import { BuscarMpRelComponent } from './pages/geco/buscar-mp-rel/buscar-mp-rel.component';
import { CheckFiscComponent } from './pages/inte/check-fisc/check-fisc.component';
import { PermisosFiscComponent } from './pages/inte/permisos-fisc/permisos-fisc.component';
import { BorarFirmaInteComponent } from './pages/inte/borar-firma-inte/borar-firma-inte.component';
import { LenlocComponent } from './pages/inte/lenloc/lenloc.component';
import { PenlocComponent } from './pages/inte/penloc/penloc.component';
import { BorrarAprPagoComponent } from './pages/teso/borrar-apr-pago/borrar-apr-pago.component';
import { ActNoPrepComponent } from './pages/teso/act-no-prep/act-no-prep.component';
import { ModOrdAdComponent } from './pages/teso/mod-ord-ad/mod-ord-ad.component';
import { CheckOperacionesComponent } from './pages/terceros/check-operaciones/check-operaciones.component';
import { ReqSubComponent } from './pages/sub/req-sub/req-sub.component';

const routes: Routes = [
  {

    path: '', component: DashboardComponent,
    children: [
      { path: 'pages/home', component: HomeComponent},
      { path: 'pages/procesos', component: ProcesosComponent},
      { path: 'pages/docs', component: DocsComponent},
      { path: 'pages/usuarios/cambio-permisos', component: CambioPermisosComponent},
      { path: 'pages/usuarios/permisos-ut', component: PermisosUtComponent},
      { path: 'pages/usuarios/cambio-ut', component: CambioUtComponent},
      { path: 'pages/geco/quitar-apr-orden-pago', component: QuitarAprOrdenPagoComponent},
      { path: 'pages/geco/asoc-gas-fac', component: AsocGasFacComponent},
      { path: 'pages/geco/irpf-ayudas', component: IrpfAyudasComponent},
      { path: 'pages/geco/buscar-mp-rel', component: BuscarMpRelComponent},
      { path: 'pages/documentos/quitar-firma', component: QuitarFirmaComponent},
      { path: 'pages/documentos/quitar-firma-rel', component: QuitarFirmaRelComponent},
      { path: 'pages/documentos/borrar-doc', component: BorrarDocComponent},
      { path: 'pages/inte/check-fisc', component: CheckFiscComponent},
      { path: 'pages/inte/permisos-fisc', component: PermisosFiscComponent},
      { path: 'pages/inte/borar-firma-inte', component: BorarFirmaInteComponent},
      { path: 'pages/inte/lenloc', component: LenlocComponent},
      { path: 'pages/inte/penloc', component: PenlocComponent},
      { path: 'pages/teso/borrar-apr-pago', component: BorrarAprPagoComponent},
      { path: 'pages/teso/act-no-prep', component: ActNoPrepComponent},
      { path: 'pages/teso/mod-ord-ad', component: ModOrdAdComponent},
      { path: 'pages/terceros/check-operaciones', component: CheckOperacionesComponent},
      { path: 'pages/sub/req-sub', component: ReqSubComponent},
      { path: '**', redirectTo: 'pages/home', pathMatch: 'full'}
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
