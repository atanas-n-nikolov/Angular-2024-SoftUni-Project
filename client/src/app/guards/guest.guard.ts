import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if(!userService.isLogged) {
    return true
  }else {
    router.navigate(['home']);
    return false;
  }
};
