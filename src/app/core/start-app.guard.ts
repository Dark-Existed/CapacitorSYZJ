import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { APP_KEY, LocalStorageService } from '../shared/services/local-storage.service';
import { PassportServiceService } from '../shared/services/passport-service.service';

@Injectable({
  providedIn: 'root'
})

export class StartAppGuard implements CanActivate {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private passportService: PassportServiceService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const appConfig: any = this.localStorageService.get(APP_KEY, {
      isLaunched: false,
      version: '1.3.4',
      phone: '13315168184'
    });
    if (appConfig.isLaunched === false) {
      appConfig.isLaunched = true;
      this.localStorageService.set(APP_KEY, appConfig);
      return true;
    } else {
      this.isLogin();
      return false;
    }
  }

  isLogin() {
    const currentUser = this.passportService.getCueerntUser();
    if (currentUser !== null) {
      const loginTime = new Date(currentUser.loginTime);
      const currentTime = new Date();
      const diff = currentTime.getTime() - loginTime.getTime();
      const diffDay = diff / (24 * 60 * 60 * 1000);
      if (diffDay < 5) {
        this.router.navigateByUrl('tabs');
      } else {
        this.passportService.removeCurrentUser();
        this.router.navigateByUrl('/passport/login');
      }
    }
  }


}
