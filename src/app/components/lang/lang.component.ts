import {Component, OnInit} from '@angular/core';
import {DefaultLangChangeEvent, LangChangeEvent, TranslateService, TranslationChangeEvent} from "@ngx-translate/core";

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.css']
})
export class LangComponent implements OnInit {

  constructor(public translate: TranslateService) {
    this.translate.onLangChange
      .subscribe((event: LangChangeEvent) => {
        console.log('onLangChange', event);
      });

    this.translate.onTranslationChange
      .subscribe((event: TranslationChangeEvent) => {
        console.log('onTranslationChange', event);
      });

    this.translate.onDefaultLangChange
      .subscribe((event: DefaultLangChangeEvent) => {
        console.log('onDefaultLangChange', event);
      });
  }

  ngOnInit(): void {
  }

  siteLanguage = '';
  languageList = [
    {code: 'en', label: 'English'},
    {code: 'ru', label: 'Руский'},
    {code: 'hy', label: 'Հայերեն'}
  ];

  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList
      .find((language) => language.code === localeCode)
      ?.label.toString();

    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage;
      this.translate.use(localeCode);
    }

    const currentLanguage = this.translate.currentLang;
    console.log('currentLanguage', currentLanguage);
  }
}
