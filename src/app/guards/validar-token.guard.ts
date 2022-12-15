import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) {}


  canActivate(): boolean | Observable<boolean> {

    if (this.authService.isLogged()){
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }


  canLoad(): boolean | Observable<boolean> {
    if (this.authService.isLogged()){
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }




}
