import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { modeloUsuario } from '../modelo/modeloUsuario';	



@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  URL_API = 'https://hywzxuuckytgisgxkwfb.supabase.co/rest/v1/';

  constructor(private http: HttpClient) { }


  header = new HttpHeaders()
    .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5d3p4dXVja3l0Z2lzZ3hrd2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyOTUyODYsImV4cCI6MjAxMjg3MTI4Nn0.BTFHAM472zl70QSBjrM3ydugS9W7g7hmoUfI9VKP2BY')

  getLogin(username:string): Observable<modeloUsuario> {
    return this.http.get<modeloUsuario[]>(this.URL_API + 'Usuario?Username=eq.'+username, { headers: this.header, responseType: 'json' }).pipe(
      map((userInfo) => {
        console.log(userInfo);
        return userInfo[0];
      }));
    }


  




  }

//
