
import { CanActivateFn } from "@angular/router";
import { Observable } from "rxjs";
import { inject} from "@angular/core";
import { ServiciosService } from "./servicios.service";
import { ModelLog } from "../modelo/ModelLog";



 export const authGuard : CanActivateFn = () => {


    let userExist$ : Observable<boolean>
    const authService = inject(ServiciosService)


    authService.getLogin
  





    const storageInfo = localStorage.getItem('username');
    return false;


}