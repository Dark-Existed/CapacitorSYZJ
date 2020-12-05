import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ) {
    activatedRoute.queryParams.subscribe(queryParms => {
      this.title = queryParms.title;
      this.property = queryParms.property;
    });
  }

  ngOnInit() {
  }

  onSave() {
    this.settingService.updateParams(this.value, this.property);
  }

}
