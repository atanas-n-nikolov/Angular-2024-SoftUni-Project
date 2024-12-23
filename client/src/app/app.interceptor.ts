import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, of, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';
import { NotificationService } from './shared/notification.service';
const { apiUrl } = environment;

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const API = '/api';
  const userService = inject(UserService);

  if (!userService.isLogged && req.url === `${API}/users/profile`) {
    return of();
  }


  if (req.url.startsWith(API)) {
      req = req.clone({
        url: req.url.replace(API, apiUrl),
        withCredentials: true,
      });
    }

    const router = inject(Router);
    const notificationService = inject(NotificationService);

    return next(req).pipe(catchError((err) => {
      if(err.status === 401) {
        router.navigate(['/users/login'])
      };

      const errorMsg = err.error?.message || 'An unexpected error occurred.';
      ;
      notificationService.showMessage(errorMsg, 'error');

      return throwError(() => err);
    }))
  }
