import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { SettingService } from '../../shared/setting.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  title: string;
  property: string;
  value: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private settingService: SettingService,
    private outlet: IonRouterOutlet,
    private router: Router,
  ) {
    activatedRoute.queryParams.subscribe(queryParms => {
      this.title = queryParms.title;
      this.property = queryParms.property;
    });
  }

  ngOnInit() {
  }

  onSave() {
    if (this.value != null) {
      this.settingService.updateParams(this.value, this.property);
    }
    this.outlet.pop(1);
    // this.router.navigateByUrl('/setting/shop');
  }

}
