import { Component, OnInit } from '@angular/core';
import { AuraService } from '../../aura.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aura-menu',
  templateUrl: './aura-menu.component.html',
  styleUrls: ['./aura-menu.component.scss']
})
export class AuraMenuComponent implements OnInit {

  isLoading = true;
  auraData: AuraModel;
  auraSubscription: Subscription;

  constructor(private auraService: AuraService) {
  }

  ngOnInit() {
    this.auraService.fetchUserAura();
    this.auraSubscription = this.auraService.auraChanged.subscribe(aura => {
      this.auraData = aura;
      this.isLoading = false;
    });
  }
}
