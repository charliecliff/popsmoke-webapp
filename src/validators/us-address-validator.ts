import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
export { CustomValidators } from 'ng2-validation';

export function streetValidators() {
    return Validators.required
}

export function cityValidators() {
    return Validators.required;
}

export function stateValidators() {
    return Validators.required;
}

export function zipCodeValidators() {
    return Validators.required;
}
