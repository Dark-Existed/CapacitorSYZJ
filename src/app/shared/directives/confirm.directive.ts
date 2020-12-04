import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appConfirm]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ConfirmDirective, multi: true }
  ]
})
export class ConfirmDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {
    throw new Error('Method not implemented.');
  }
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }


}

export function confirmValidator(confirm: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return { required: true };
    }
    return control.value !== confirm ? { confirm: { value: true } } : null;
  };
}
