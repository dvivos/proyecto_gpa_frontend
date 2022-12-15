import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntidadValidatorService } from '../../../services/entidad-validator.service';
import { Pago, Documento } from '../../../../auth/interfaces/interfaces';
import { ProcesosService } from '../../../services/procesos.service';
import { UsuariosService } from 'src/app/protected/services/usuarios.service';
import { SharedService } from '../../../services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-quitar-apr-orden-pago',
  templateUrl: './quitar-apr-orden-pago.component.html',
  styles: [
  ]
})
export class QuitarAprOrdenPagoComponent implements OnInit {

  msgErrAnio: string = '';
  msgErrNumero: string = '';
  pago: Pago = {};
  documento: Documento = {};
  superUser: boolean = false;

  // Variable que controla si se muestra el cuadro de diálogo
  // emergente en el componente html
  mostrarDialog: boolean = false;
  // Variable para mostrar mensajes generales y de validación
  msgGeneral: string = '';
  infoMensaje: string = 'Info';

  // Variable que controla si el documento es valido
  valido: boolean = false;

  pagoActualizado: boolean = false;

  // pagoTabla: Pago[] = [];

  get msgErrEntidad(): string {

    const errors = this.formulario.get('entidad')?.errors;

    if ( errors?.['required'] ){
      return 'La entidad es obligatoria';
    } else if (errors?.['minlength']) {
      return 'La entidad debe tener 3 caracteres';
    } else if (errors?.['NoExisteEntidad']) {
      return 'La entidad no existe';
    }
    return '';
  }
  msgErrGeneral: string = '';

  cols: any[] = [];
  mostrarDatos: boolean = false;


  formulario: FormGroup = this.fb.group({
    entidad: ['', [Validators.required, Validators.minLength(3) ], [this.entidadValidator] ],
    anio: ['', [Validators.required, this.sharedService.validaEjercicio ] ],
    numDocum: ['', [Validators.required ]]
  })


  constructor(private fb: FormBuilder,
              private sharedService: SharedService,
              private entidadValidator: EntidadValidatorService,
              private procesosService: ProcesosService,
              private usuariosService: UsuariosService) {


  }

  ngOnInit(): void {

    // Comprobamos si el usuario activo tienes permisos de super usuario
    this.superUser = this.usuariosService.getSuperUser();

    // Nos suscribimos a los cambios del formulario
    this.formulario.valueChanges.subscribe( form => {

      // Ocultamos los datos de la orden de pago si hay cambios
      this.mostrarDatos = false;

    })

  }

  buscar(){

    const { entidad, anio, numDocum  } =  this.formulario.value;

    // Marcamos el formulario como 'tocado'
    this.formulario.markAllAsTouched();

    this.pago = {centidad: {centidad: entidad}};
    this.pago.ymandpag = anio;
    this.pago.nmandpag = numDocum;

    this.buscarPago(this.pago);


  }

  buscarPago(pago: Pago){

    this.procesosService.getPago(pago)
      .subscribe( res =>{
        if (res){
          this.msgErrGeneral = '';
          this.mostrarDatos = true;

          this.pago = res;

          console.log(res);

          this.valido = true;

        } else {
          console.log('no hay mp');
          this.msgErrGeneral = 'No se ha encontrado el Mandamiento de Pago';

        }

      }, err => {
        console.log('Respuesta ERROR:', err);

      })

  }

  quitarAprobacion(){

    let validado: boolean = false;

    if (this.pago.documento){
      this.documento = this.pago.documento;
    }

    // VOLVER A HACER LAS COMPROBACIONES EN EL SERVICIO

    // if (this.pago.nrelorpg && this.pago.nrelorpg > 0){
    //   // Mostramos el cuadro de dialogo general
    //   this.mostrarDialog = true;
    //   this.msgGeneral = 'El MP forma parte de una relación. \nDebe sacar el MP de la relación antes de poder quiter la fecha.';
    // } else if (this.pago.fanulacion) {
    //     // Mostramos el cuadro de dialogo general
    //     this.mostrarDialog = true;
    //     this.msgGeneral = 'El MP tiene la fecha de anulación informada.';
    // } else if (this.pago.fordenpago || this.pago.faprobpago) {
    //     this.mostrarDialog = true;
    //     this.msgGeneral = 'El MP está ordenado al pago o tiene pago aprobado.';

    // } else if (this.pago.documento == null) {
    //     this.mostrarDialog = true;
    //     this.msgGeneral = 'No se encuentra el Documento Contable del MP.';

    // } else if (this.pago.documento?.noperdia != null && this.pago.documento?.noperdia > 0){
    //     this.mostrarDialog = true;
    //     this.msgGeneral = 'El documento contable está contabilizado.';

    // } else {
    //   validado = true;
    // }

    // if (!this.pago.fanulacion){
    //   // Mostramos el cuadro de dialogo general
    //   this.mostrarDialog = true;
    //   this.msgGeneral = `El MP va a anularse (informada fecha anulación)`;
    // }

    /***
     *  Las comprobaciones anteriores las dejamos en el servicio ya que desde que se hacen las
     * comprobaciones en el cliente hasta que se envía la petición, puede cambiar el registro
     */
    validado = true;


    if (validado){
      // llamar servicio
       this.actualizaPago();
    }
  }

  async actualizaPago() {
    try {
      let respuesta = await this.procesosService.actualizaPago(this.pago).toPromise();

      if (respuesta){
        this.pagoActualizado = true;
        this.mostrarDialog = true;
        this.infoMensaje = 'Info';
        this.msgGeneral = 'Se ha eliminado la fecha de aprobación del MP y del DC.';

        this.buscarPago(this.pago);

        this.borrarDocumento();
      }

    } catch (error) {

        if (error instanceof HttpErrorResponse) {
          console.log(Object.values(error.error));
        }
    }
  }

  async borrarDocumento(){

    console.log('antes del doc, el pago está ', this.pagoActualizado);
    console.log('el doc es ', this.documento);


    try {
        let respuesta = await this.procesosService.borrarDocumento(this.documento).toPromise();

        if (respuesta){
          this.mostrarDialog = true;
          this.infoMensaje = 'Info';
          this.msgGeneral = 'Se ha eliminado la fecha de aprobación y eliminado el Documento P';

        }

    } catch (error) {
        if (error instanceof HttpErrorResponse) {

            console.log(`Código de estado de error DC: ${error.status}`);
            this.mostrarDialog = false;
        }
    }


  }


  campoNoValido(campo: string){
    return this.formulario.get(campo)?.invalid
           && this.formulario.get(campo)?.touched;
  }

}
