import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
export { CustomValidators } from 'ng2-validation';

export function dateValidators() {
    return Validators.compose([Validators.required]);
}

export function startDateValidators() {
    return Validators.compose([Validators.pattern('[a-zA-Z ]*'), 
                               Validators.required]);
}

export function endDateValidators() {
    return Validators.compose([Validators.pattern('[a-zA-Z ]*'), 
                               Validators.required]);
}
