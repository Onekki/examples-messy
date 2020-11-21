import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  param2str (data: any) {
    const arr = [];
    for (const i in data) {
      if (data[i] !== undefined && data[i] !== '' && data[i] !== null) {
        const s = encodeURIComponent(i) + '=' + encodeURIComponent(data[i]);
        arr.push(s);
      }
    }
    return arr.join('&');
  }
}
