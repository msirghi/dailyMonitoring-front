import { Component, OnInit } from '@angular/core';
import { ColorSchemeService } from '../color-scheme.service';

@Component({
  selector: 'app-theme-change-settings',
  templateUrl: './theme-change-settings.component.html',
  styleUrls: ['./theme-change-settings.component.scss']
})
export class ThemeChangeSettingsComponent {

  public themes = [
    {
      name: 'dark',
      icon: 'brightness_3'
    },
    {
      name: 'light',
      icon: 'wb_sunny'
    }
  ];

  constructor(public colorSchemeService: ColorSchemeService) {
  }

  setTheme(theme: string) {
    this.colorSchemeService.update(theme);
  }


}
