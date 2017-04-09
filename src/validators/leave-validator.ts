import { Validators } from '@angular/forms';

export function leaveTypeValidators() {
    return Validators.compose([Validators.pattern('[a-zA-Z ]*'), 
                               Validators.required]);
}

export function leaveValidators() {
    return Validators.compose([Validators.pattern('[a-zA-Z ]*'), 
                               Validators.required]);
}