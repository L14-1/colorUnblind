import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EyedropperService {
  public async openEyedropper(): Promise<string | undefined> {
    if ('EyeDropper' in window) {
      // @ts-ignore
      const eyeDropper = new EyeDropper();
      let picked = await eyeDropper.open();
      console.log(picked);
      return picked.sRGBHex;
    } else {
      return undefined;
    }
  }
}
