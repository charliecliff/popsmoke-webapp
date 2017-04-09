import { Action } from '@ngrx/store';
import { type } from '../util';
import * as PSModels from '../models';

export const PacketActionTypes = {
  SET_BIO: type('SET_BIO'),
  SET_STATION: type('SET_STATION'),
  SET_DESTINATION: type('SET_DESTINATION'),
  SET_ACCRUED_LEAVE: type('SET_ACCRUED_LEAVE'),
  SET_REQUESTED_LEAVE: type('SET_REQUESTED_LEAVE'),
  SET_ADVANCED_LEAVE: type('SET_ADVANCED_LEAVE'),
  SET_EXCESS_LEAVE: type('SET_EXCESS_LEAVE'),
  SET_DEPARTURE_DATE: type('SET_DEPARTURE_DATE'),
  SET_RETURN_DATE: type('SET_RETURN_DATE'),
};

export class PSAction {
  constructor(public payload: any) { }
}

export class SetBioAction extends PSAction implements Action {
  type = PacketActionTypes.SET_BIO;
  constructor(public id: string, public value: PSModels.PersonalInfo) {
    super({"packetID": id, "value": {"bio": value}});
 }
}

export class SetStationsAction extends PSAction implements Action {
  type = PacketActionTypes.SET_STATION;
  constructor(public id: string, public value: PSModels.Station) {
    super({"packetID": id, "value": {"station": value}});
  }
}

export class SetDestinationAction extends PSAction implements Action {
  type = PacketActionTypes.SET_DESTINATION;
  constructor(public id: string, public value: PSModels.Address) {
    super({"packetID": id, "value": {"destination": value}});
  }
}

export class SetAccruedLeaveAction extends PSAction implements Action {
  type = PacketActionTypes.SET_ACCRUED_LEAVE;
  constructor(public id: string, public value: Number) {
    super({"packetID": id, "value": value});
  }
}

export class SetAdvancedLeaveAction extends PSAction implements Action {
  type = PacketActionTypes.SET_ADVANCED_LEAVE;
  constructor(public id: string, public value: Number) {
    super({"packetID": id, "value": value});
  }
}

export class SetExcessLeaveAction extends PSAction implements Action {
  type = PacketActionTypes.SET_EXCESS_LEAVE;
  constructor(public id: string, public value: Number) {
    super({"packetID": id, "value": value});
  }
}

export class SetRequestedLeaveAction extends PSAction implements Action {
  type = PacketActionTypes.SET_REQUESTED_LEAVE;
  constructor(public id: string, public value: Number) {
    super({"packetID": id, "value": value});
  }
}

export class SetDepartureDateAction extends PSAction implements Action {
  type = PacketActionTypes.SET_DEPARTURE_DATE;
  constructor(public id: string, public value: Date) {
    super({"packetID": id, "value": value});
  }
}

export class SetReturnDateAction extends PSAction implements Action {
  type = PacketActionTypes.SET_RETURN_DATE;
  constructor(public id: string, public value: Date) {
    super({"packetID": id, "value": value});
  }
}

export type PacketActions = SetBioAction | SetStationsAction | 
                            SetDestinationAction | SetAccruedLeaveAction | 
                            SetAdvancedLeaveAction | SetExcessLeaveAction | 
                            SetRequestedLeaveAction | SetDepartureDateAction | 
                            SetReturnDateAction;

export function reducer(state = [], action: PacketActions ): PSModels.Packet[] {
  if( action == undefined || action.payload == undefined ) {
    return state;
  }
  switch (action.type) {
    case PacketActionTypes.SET_BIO:
      return buildPacketArray(state, action);
    case PacketActionTypes.SET_STATION:
      return buildPacketArray(state, action);
    case PacketActionTypes.SET_DESTINATION:
      return buildPacketArray(state, action);
    // case PacketActionTypes.SET_ACCRUED_LEAVE:
    //   return buildPacketArray(state, action);
    // case PacketActionTypes.SET_REQUESTED_LEAVE:
    //   return buildPacketArray(state, action);
    // case PacketActionTypes.SET_ADVANCED_LEAVE:
    //   return buildPacketArray(state, action);
    // case PacketActionTypes.SET_EXCESS_LEAVE:
    //   return buildPacketArray(state, action);
    // case PacketActionTypes.SET_DEPARTURE_DATE:
    //   return buildPacketArray(state, action);
    // case PacketActionTypes.SET_RETURN_DATE:
    //   return buildPacketArray(state, action);
    default:
      return state;
  }
}

export function buildPacketArray(packets: PSModels.Packet[], 
                                 action: PacketActions) {
  let id = action.payload.packetID;
  let value = action.payload.value;
  let newPacketHasBeenCopied = false;
  var outputArray = new Array();
  for (var i = packets.length - 1; i >= 0; i--) {
    let packet = packets[i];
    if(packet.id == id) {
      packet = Object.assign({}, packet, value);
      newPacketHasBeenCopied = true;
    }
    outputArray.push(packet);
  }
  if(!newPacketHasBeenCopied) {
    let packet = Object.assign({}, PSModels.packetWithID(id), value);
    outputArray.push(packet);
  }
  return outputArray;
}
