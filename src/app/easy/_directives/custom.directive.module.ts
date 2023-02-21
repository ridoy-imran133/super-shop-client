import {ModuleWithProviders, NgModule} from '@angular/core';
import { AlphabetOnlyDirective } from './alphabetsonly/alphabet-only.directive';
import { NumbersOnlyDirective } from './numbersonly/numbers-only.directive';

@NgModule({
  declarations: [
     NumbersOnlyDirective,
     AlphabetOnlyDirective
  ],
  exports: [
     NumbersOnlyDirective,
     AlphabetOnlyDirective
  ]
})
export class CustomDirectiveModule {
  static forRoot(): ModuleWithProviders<CustomDirectiveModule> {
    return{
      ngModule: CustomDirectiveModule,
      providers: []
    };
  }}
