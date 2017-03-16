import { PersonalInfo } from './PersonalInfo';
import { Station } from './Station';
import { Address } from './Address';

export interface Da31Form extends PersonalInfo, Station {
    destination: {};
    accruedLeave: Number;
    requestedLeave: Number;
    advancedLeave: Number;
    excessLeave: Number;
    leaveFromDate: Date;
    leaveToDate: Date;
}