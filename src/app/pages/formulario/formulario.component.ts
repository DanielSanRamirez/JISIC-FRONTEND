import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: [
  ]
})
export class FormularioComponent implements OnInit {

  public title = "Registration System for JISIC2021";
  public selectedLanguages = 'formulario-es';
  public step = [];
  public isLinear = false;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;


  constructor(
    private _translateService: TranslateService,
    private _formBuilder: FormBuilder
  ) {
    this._translateService.setDefaultLang(this.selectedLanguages);
    this._translateService.use(this.selectedLanguages);
    this._translateService.get('HOME.STEP').subscribe(
      res => this.step = res
    )

  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  selectLanguage(lang: string) {
    this._translateService.use(lang);
    this._translateService.get('HOME.STEP').subscribe(
      res => this.step = res
    )
  }

}
