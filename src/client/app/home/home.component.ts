import { Component } from '@angular/core';
import { cropLowerHalf, fileToImage } from '../shared/util/Image';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

const Tesseract = require('tesseractjs');

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent {
  public files: File[] = null;
  public processingImage = false;
  public text: string = null;
  public xp: string = null;
  public startDate: string = null;
  srcImageData: any;
  croppedImageData: any;

  processImage(event: any) {
    this.srcImageData = null;
    this.croppedImageData = null;

    const files = event.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.processingImage = true;
      fileToImage(file)
        .do(i => {
          this.srcImageData = i.src;
        })
        .mergeMap(val => cropLowerHalf(val))
        .do(i => {
          this.croppedImageData = i.src;
        })
        .subscribe((i: HTMLImageElement) => {
          Tesseract.recognize(i)
            .progress((message: any) => console.log(message))
            .catch((err: any) => console.error(err))
            .then((result: any) => {
              console.log(result);
              this.extractStats(result.text);
              this.processingImage = false;
              this.files = null;
            });
        });

    }
    return true;
  }

  private extractStats(text: string) {
    text = text.toLowerCase();
    this.text = text;
    this.startDate = null;
    this.xp = null;

    const re_startDate = new RegExp('start *date:(.+)');
    const re_xp = new RegExp('total *xp(.+)');


    const startDateRes = re_startDate.exec(text);
    if (startDateRes) {
      this.startDate = startDateRes[1].trim();
    }

    const xpRes = re_xp.exec(text);
    if (xpRes) {
      this.xp = xpRes[1].trim();
    }

    console.log(text);

  }
}
