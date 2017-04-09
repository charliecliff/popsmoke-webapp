import { Validators } from '@angular/forms';

export function startDateValidators() {
    return Validators.compose([Validators.pattern('[a-zA-Z ]*'), 
                               Validators.required]);
}

export function endDateValidators() {
    return Validators.compose([Validators.pattern('[a-zA-Z ]*'), 
                               Validators.required]);
}
