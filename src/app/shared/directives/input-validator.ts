import { Injectable } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';

export class InputValidators extends Validators {

    /*E-mail*/
    static email = (control: AbstractControl) => {
        return InputValidators.validatorsByPattern('email', control, '^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$');
    }

    /*手机号码*/
    static phone = (control: AbstractControl) => {
        return InputValidators.validatorsByPattern('phone', control, '^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3,5-9]))\d{8}$');
    }

    /*密码*/
    static password = (control: AbstractControl) => {
        return InputValidators.validatorsByPattern('password', control, '^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$');
    }

    /*中文*/
    static chinese = (control: AbstractControl) => {
        return InputValidators.validatorsByPattern('chinese', control, '[(\u4e00-\u9fa5)]+');
    }

    /*英文、数字包括下划线*/
    static legallyNamed = (control: AbstractControl) => {
        return InputValidators.validatorsByPattern('legallyNamed', control, '[A-Za-z0-9_]+');
    }

    private static validatorsByPattern = (name: string, control: AbstractControl, pattern: string) => {
        const validatorFn = Validators.pattern(pattern)(control);
        if (validatorFn != null) {
            validatorFn[name] = validatorFn['pattern'];
        }
        return validatorFn;
    }
}
