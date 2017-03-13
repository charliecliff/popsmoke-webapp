import { Injectable } from '@angular/core';  
import { Action } from '@ngrx/store';
import { Da31Form } from '../models/Da31Form';
import { PersonalInfo } from '../models/PersonalInfo';
import { Station } from '../models/Station';
import { Address } from '../models/Address';

@Injectable()
export class Da31BuilderActions {

    static ADD_PERSONAL_INFO_TO_DA_31 = 'ADD_PERSONAL_INFO_TO_DA_31';
    addPersonalInfo(personalInfo: PersonalInfo): Action {
        return {
            type: Da31BuilderActions.ADD_PERSONAL_INFO_TO_DA_31,
            payload: personalInfo
        }
    }

    static ADD_STATION_TO_DA_31 = 'ADD_STATION_TO_DA_31';
    addStation(station: Station): Action {
        return {
            type: Da31BuilderActions.ADD_STATION_TO_DA_31,
            payload: station
        }
    }

    static ADD_DESTINATION_TO_DA_31 = 'ADD_DESTINATION_TO_DA_31';
    addDestination(destination: Address): Action {
        return {
            type: Da31BuilderActions.ADD_DESTINATION_TO_DA_31,
            payload: destination
        }
    }

    static ADD_LEAVE_DATA_TO_DA_31 = 'ADD_LEAVE_DATA_TO_DA_31';

}