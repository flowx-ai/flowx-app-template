import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {OAuthService} from 'angular-oauth2-oidc';
import {Language, LocalizationService} from '../../services/localization.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public availableLanguages: Language[] = this.localizationService.getAvailableLanges();
  // @ts-ignore
  public selectedLanguage: Language;
  // @ts-ignore
  public languageForm: FormGroup;

  constructor(
    private location: Location,
    private oauthService: OAuthService,
    private localizationService: LocalizationService
  ) {
  }

  ngOnInit(): void {
    this.languageForm = new FormGroup({
      selectedLanguage: new FormControl(this.localizationService.getSelectedLanguage())
    });

    this.languageForm.valueChanges.subscribe((data: any) => {
      this.localizationService.setSelectedLanguage(data.selectedLanguage);
      window.location.reload();
    });
  }

  logout(): void {
    this.oauthService.logOut();
  }
}
