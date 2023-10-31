import { inject } from "@angular/core";
import { CanActivateFn} from "@angular/router";
import { Observable } from "rxjs";
import { ServiciosService } from "../service/servicios.service";
import { Router } from "@angular/router";





export const demonGuard : CanActivateFn = () =>{
    const userStorage =localStorage.getItem('username');

    let userExist$ : Observable<boolean>
    const authService = inject(ServiciosService)
    const redirect = inject(Router)
   
  

    if (userStorage === 'ALUMNO') {
      return true ; // Permite el acceso a la ruta 'user'
    } else if (userStorage === 'DOCENTE') {
      return true; // Permite el acceso a la ruta 'docente'
    } else {
      // Redirige a la página de inicio de sesión si el tipo de usuario no es válido
      return redirect.navigate(['/login']);
    }
  }
   