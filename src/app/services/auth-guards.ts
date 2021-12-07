import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService implements CanActivate {
    constructor(
        private router: Router,
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.isAuth()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
        }
    }
    isAuth() {
        try {
            if (localStorage.token) {
                return true;
            }
        }
        catch (err) {
            return false;

        }

    }

}