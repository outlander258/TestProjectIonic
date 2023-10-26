import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModelInfo } from '../modelo/ModelPersoInfo';
import { Observable } from 'rxjs';
import { models } from '../modelo/Models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://hywzxuuckytgisgxkwfb.supabase.co/rest/v1/';

  constructor(private http: HttpClient) { }

  supaheaders = new HttpHeaders()
    .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5d3p4dXVja3l0Z2lzZ3hrd2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyOTUyODYsImV4cCI6MjAxMjg3MTI4Nn0.BTFHAM472zl70QSBjrM3ydugS9W7g7hmoUfI9VKP2BY')

  getUserListSupaBase(): Observable<models[]> {
    console.log(this.supaheaders);
    return this.http.get<ModelInfo[]>(this.apiUrl, { headers: this.supaheaders, responseType: 'json' });
  }




}
