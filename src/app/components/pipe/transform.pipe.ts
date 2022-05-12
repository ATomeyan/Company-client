import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'transform'
})
export class TransformPipe implements PipeTransform {

  transform(gender: string): string {

    if (gender == "M")
      return "Male";
    else if(gender == "F")
      return "Female";
    else if (gender == "Male")
      return "M";
    else
      return "F";
  }
}
