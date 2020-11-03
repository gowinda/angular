import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../constants/global'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(
    private http: HttpClient

  ) { }
  login(email: string, password: string) {
    const data ={
      email: email,
      password: password
    };
    return this.http.post<any>(`${apiUrl}/login/`, data)
      .pipe(map(user => {
        return user;
      }));
  }

}
