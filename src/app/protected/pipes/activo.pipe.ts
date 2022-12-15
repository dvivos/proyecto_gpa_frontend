import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activo'
})
export class ActivoPipe implements PipeTransform {

  transform(value: boolean): string | undefined {

    if (value){
        return 'Activo';
    } else {
        return 'No activo';
    }

  }

}
