import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  getUserList(offset: number, size: number) {
    const param = { "offset": offset, "size": size };
    return this.http.get('api/user?' + this.format(param));
  }

  format (data: any) {
    const arr = [];
    for (const i in data) {
      if (data[i] !== undefined && data[i] !== '' && data[i] !== null) {
        const s = encodeURIComponent(i) + '=' + encodeURIComponent(data[i]);
        arr.push(s);
      }
    }
    // arr.push('_=' + Date.now());
    return arr.join('&');
  }
}
