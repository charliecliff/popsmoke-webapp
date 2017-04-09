import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

export function leaveTypeValidators() {
    return Validators.compose([Validators.pattern('[a-zA-Z ]*'), 
                               Validators.required]);
}

export function leaveValidatorsForCurrentSum(sum) {
    return Validators.compose([CustomValidators.min(sum), 
                               Validators.required]);
}