import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { APP_KEY } from '../welcome/welcome.page';

@Injectable({
  providedIn: 'root'
})


export class StartAppGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const appConfig: any = this.localStorageService.get(APP_KEY, { isLaunched: false, version: '1.0.0' });
    if (appConfig.isLaunched === false) {
      appConfig.isLaunched = true;
      this.localStorageService.set(APP_KEY, appConfig);
      return true;
    } else {
      this.router.navigateByUrl('folder/Inbox');
      return false;
    }
  }
  
}
