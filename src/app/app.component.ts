/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { TokenStorageService } from './authentication/token-storage.service';

const TOKEN_SHARING_CHANNEL = "token-sharing";
const REQUESTING_TOKEN = "requesting-token";

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  //for session storage
  bc = new BroadcastChannel(TOKEN_SHARING_CHANNEL);

  constructor(private analytics: AnalyticsService, private seoService: SeoService, private bnIdle: BnNgIdleService,
    private tokenStorageService: TokenStorageService) {
      this.addBroadcastChannelListener();
    this.bc.postMessage(REQUESTING_TOKEN);
  }

  ngOnInit(): void {
    this.bnIdle.startWatching(6000).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        sessionStorage.clear();
        window.location.href = "http://192.168.222.16/EasyApps/mod_sec/SEC_Login.aspx?returnUrl=http://localhost:4200/lo/&&projectId=P022";
      }
    });
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }

  private addBroadcastChannelListener() {
    this.bc.addEventListener("message", (event) => {
      if (event.data === REQUESTING_TOKEN) {
        new BroadcastChannel(TOKEN_SHARING_CHANNEL).postMessage({
          accessToken: this.tokenStorageService.getAccessToken(),
          projectId: this.tokenStorageService.getProjectId(),
          userId: this.tokenStorageService.getUserId(),
          refreshToken: this.tokenStorageService.getRefreshToken(),
        });
      } else {
        const { accessToken, projectId, userId, refreshToken } = event.data;
        accessToken && this.tokenStorageService.saveAccessToken(accessToken);
        projectId && this.tokenStorageService.saveProjectId(projectId);
        userId && this.tokenStorageService.saveUserId(userId);
        refreshToken && this.tokenStorageService.saveRefreshToken(refreshToken);
      }
    });
  }
}
