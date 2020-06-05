import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../../../modules/auth/auth.service';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material';
import { ColorSchemeService } from '../../../modules/settings/color-scheme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input('isButtonDisplayed') isButtonDisplayed: boolean;
  @ViewChild('toggleElement', { static: true }) ref: ElementRef;

  checked = false;

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

  constructor(private authService: AuthService,
              private router: Router,
              private colorSchemeService: ColorSchemeService) {
  }

  ngOnInit() {
    this.colorSchemeService.load();
    this.checked = this.colorSchemeService.currentActive() === 'dark';
  }

  toggleSideBar() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateHome() {
    this.router.navigate(['/dashboard']);
  }

  navigateAccountPage() {
    this.router.navigate(['/account']);
  }

  toggleNightMode($event: MatSlideToggleChange) {
    if ($event.checked) {
      (this.ref as any).checked = true;
      this.colorSchemeService.update(this.themes[0].name);
    } else {
      this.colorSchemeService.update(this.themes[1].name);
    }
  }
}
