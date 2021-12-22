import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-flowx-app';

  baseApiUrl = 'https://public.qa.flowxai.dev';
  processApiPath = '/onboarding';
  processName = 'custom-component-demo';
  processStartData = {};
  debugLogs = true;
  keepState = false;
  language = 'ro-RO';
  isDraft = false;

  ngOnInit(): void {
    // YOU HAVE TO PUT THE AUTH JWT TOKEN HERE (IN THE LOCAL STORAGE)
    // THIS IS WHERE THE RENDERER WILL LOOK FOR IT
    localStorage.setItem('access_token', '');
  }
}
