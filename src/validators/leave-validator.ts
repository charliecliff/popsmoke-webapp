import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
export { CustomValidators } from 'ng2-validation';

export function leaveTypeValidators() {
    return Validators.required;
}

export function leaveValidators() {
    return Validators.compose([CustomValidators.min(0), 
                               Validators.required]);
}