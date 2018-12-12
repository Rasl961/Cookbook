import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { of, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private auth: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.auth.isAthenticated()) {
            return of(true);
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return of(false);
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }
}
