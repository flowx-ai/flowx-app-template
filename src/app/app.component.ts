import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-flowx-app';

  baseApiUrl = 'https://admin.qa.flowxai.dev';
  processApiPath = '/onboarding';
  processName = 81301;
  processStartData = {};
  debugLogs = false;
  keepState = false;
  language = 'ro-RO';
  isDraft = true;

  ngOnInit(): void {
    // localStorage.setItem('access_token');
  }
}
