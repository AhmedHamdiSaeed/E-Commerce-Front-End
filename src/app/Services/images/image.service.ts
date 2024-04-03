import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { baseURL } from '../../../../env';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor( private sanitizer: DomSanitizer) { }

  getImageUrl(imagePath: string) :SafeUrl {
    // return `../../../assets${imagePath}`;
    let safeurl = baseURL + '/' + imagePath ;

    // console.log(safeurl);

    return  this.sanitizer.bypassSecurityTrustUrl(safeurl) ;

  }


}
