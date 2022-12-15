import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quitar-firma',
  templateUrl: './quitar-firma.component.html',
  styles: [
  ]
})
export class QuitarFirmaComponent implements OnInit {

  formulario: FormGroup = this.fb.group({
    entidad: ['', [Validators.required, Validators.minLength(3) ] ],
    ejercicio: ['', [Validators.minLength(4)]],
    anio: ['', [Validators.required, Validators.minLength(4)]],
    numDocum: ['', [Validators.required ]]

  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  enviar(){

  }

}
