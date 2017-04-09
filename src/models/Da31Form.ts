import { PersonalInfo } from './PersonalInfo';
import { Station } from './Station';
import { Address } from './Address';

export class Da31Form {
    destination: Address;
    
    accruedLeave: Number;
    requestedLeave: Number;
    advancedLeave: Number;
    excessLeave: Number;
    leaveFromDate: Date;
    leaveToDate: Date;
}