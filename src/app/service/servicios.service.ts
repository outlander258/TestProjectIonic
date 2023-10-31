import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { modeloUsuario } from '../modelo/modeloUsuario';
import { ModelLog } from '../modelo/ModelLog';
import { ModeloSeccion } from '../modelo/modeloSeccion';
import { ModeloClaseOUT } from '../modelo/ModeloClaseOUT';
import { ModeloClaseIN } from '../modelo/modeloClaseIN';
import { ModeloAsistencia } from '../modelo/ModeloAsistencia';




@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  URL_API = 'https://hywzxuuckytgisgxkwfb.supabase.co/rest/v1/';

  constructor(private http: HttpClient) { }


  header = new HttpHeaders()
    .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5d3p4dXVja3l0Z2lzZ3hrd2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyOTUyODYsImV4cCI6MjAxMjg3MTI4Nn0.BTFHAM472zl70QSBjrM3ydugS9W7g7hmoUfI9VKP2BY')


  // lista de usuarios via id(arreglo)
  getUser(user_id: string): Observable<modeloUsuario> {
    return this.http.get<modeloUsuario[]>(this.URL_API + 'users?user_id=eq.' + user_id, { headers: this.header, responseType: 'json' }).pipe(
      map((userInfo) => {
        console.log(userInfo)
        return userInfo[0];
      })
    );
  }





  // Consulta a la base de datos, retorna, username, contraseña, nombre, apellido y tipo 

  getLogin(UserLogin: ModelLog): Observable<modeloUsuario> {
    return this.http.get<modeloUsuario[]>(this.URL_API + 'Usuario?select=Username,Password,Nombre,Apellido,id,Tipo&Username=eq.' + UserLogin.username + '&Password=eq.' + UserLogin.password, { headers: this.header, responseType: 'json' }).pipe(
      map((userInfo) => {
        console.log(userInfo);
        return userInfo[0];
      }));
  }

  getSecciones(id_usuario: string | undefined): Observable<ModeloSeccion[]> {
    return this.http.get<ModeloSeccion[]>(this.URL_API + 'Asignacion?select=id_seccion(*)&id_usuario=eq.' + id_usuario, { headers: this.header, responseType: 'json' })
  }


  getDatos(id_usuario: any): Observable<modeloUsuario[]> {
    return this.http.get<modeloUsuario[]>(this.URL_API + 'Usuario?select=*&id=eq.' + id_usuario, { headers: this.header, responseType: 'json' })
}
/*   postClase(id_seccion: string, cod_unico: string): Observable<any> {
    const cuerpo = { id_seccion: id_seccion, cod_unico: cod_unico };
    console.log(cuerpo);
    return this.http.post(this.URL_API + 'Clase', cuerpo, { headers: this.header, responseType: 'json' }).pipe(
      map(
        (user)=>{
          console.log(user);

        }
      ),catchError(
        (
          err 
        ) =>{
          console.log(err,'error 505 not found')
          return err
        }
      )
    );

  }
 */



  postClase(clase:ModeloClaseOUT): Observable<any> {
    // const cuerpo = { id_seccion: id_seccion, cod_unico: cod_unico };
    console.log("clase servicio:"+JSON.stringify( clase))
    console.log("clase seccion:"+clase.id_seccion)
    console.log("clase cod_unico:"+clase.cod_unico)

    return this.http.post(this.URL_API + 'Clase',clase, { headers: this.header })
  }

  getClaseActiva(id_seccion: string): Observable<ModeloClaseIN[]> {
    return this.http.get<ModeloClaseIN[]>(this.URL_API + 'Clase?select=*&id_seccion=eq.' + id_seccion, { headers: this.header, responseType: 'json' })
  }
/*
  postCargaAsistencia(id_clase: string, id_alumno:string): Observable<any> {
    const body = { id_clase: id_clase.toString(), id_alumno: id_alumno};
    console.log("body servicio:", body);
    return this.http.post(this.URL_API + 'Asistencia', body, { headers: this.header, responseType: 'json' });
  }
*/
  
  
  postCargaAsistencia(asistencia: ModeloAsistencia): Observable<any> {
    return this.http.post(this.URL_API + 'Asistencia', asistencia, { headers: this.header, responseType: 'json' })
  }

}
