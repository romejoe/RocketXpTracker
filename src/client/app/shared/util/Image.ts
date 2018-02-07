import { Observable } from 'rxjs/Observable';

export function fileToImage(f: File): Observable<HTMLImageElement> {
  return Observable.create((observer: any) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const i = new Image();
      i.onload = (e) => {
        observer.next(i);
      };
      i.src = (<any>readerEvent.target).result;
    };
    reader.readAsDataURL(f);
  });
}

export function cropLowerHalf(i: HTMLImageElement): Observable<HTMLImageElement> {
  return Observable.create((observer: any) => {
    const h: number = i.height;
    const w: number = i.width;

    const canvas = document.createElement('canvas');


    canvas.height = h / 2;
    canvas.width = w;
    canvas.getContext('2d')
      .drawImage(i, 0, h / 2, w, h / 2, 0, 0, w, h / 2);

    const ret: HTMLImageElement = new Image();
    ret.onload = () => {
      observer.next(ret);
    };
    ret.src = canvas.toDataURL();
  });
}
