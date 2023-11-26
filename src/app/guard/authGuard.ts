import { inject } from "@angular/core";
import { CanActivateFn} from "@angular/router";
import { Router } from "@angular/router";
import { Preferences } from '@capacitor/preferences';





export const demonGuard : CanActivateFn = () =>{
    const userStorage =localStorage.getItem('username');
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
   