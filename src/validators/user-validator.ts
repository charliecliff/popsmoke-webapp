import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
export { CustomValidators } from 'ng2-validation';

export function firstNameValidators() {
    return Validators.compose([Validators.pattern('[a-zA-Z ]*'), 
                               Validators.required]);
}

export function lastNameValidators() {
    return Validators.compose([Validators.pattern('[a-zA-Z ]*'), 
                               Validators.required]);
}

export function middleInitialValidators() {
    return Validators.compose([CustomValidators.rangeLength([0, 1]), 
                               Validators.required]);
}

export function ssnValidators() {
    return Validators.compose([CustomValidators.rangeLength([3, 5]), 
                               Validators.required]);
}

export function rankValidators() {
    return Validators.compose([Validators.pattern('[a-zA-Z ]*'), 
                               Validators.required]);
}

export function phoneNumberValidators() {
    return Validators.compose([Validators.required]);
}

export function stringValidators() {
    return Validators.compose([Validators.required]);
}