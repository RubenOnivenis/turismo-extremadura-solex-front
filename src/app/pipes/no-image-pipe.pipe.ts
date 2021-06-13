import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImagePipe'
})
export class NoImagePipePipe implements PipeTransform {

  //Comprobación para poner una imagen por defecto en caso de no tener imagen
  transform(
    urlImagen:string | undefined, 
    optionalImage:boolean = false
  ): string {
  if(!urlImagen || urlImagen=="" || urlImagen.substring(0, 11)!="assets/img/"){
    if(optionalImage){
        return "assets/img/perfil.jpg";
      }
      return "assets/img/nofoto.jpeg";
    }
    return urlImagen;
  }
}
