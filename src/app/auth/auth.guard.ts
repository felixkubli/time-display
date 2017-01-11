import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        let token = localStorage.getItem('token');
        if (token !== null && token.length > 7) {
            return true;
        }
        this.router.navigate(['/details']);
        return false;
    }
}
