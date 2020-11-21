import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor( private http: HttpClient) { }

  getSiteList(offset: number, size: number) {
    const param = { "offset": offset, "size": size };
    return this.http.get('api/site?' + this.format(param));
  }

  format (data: any) {
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
