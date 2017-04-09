import { Holiday } from './Holiday';
import { PersonalInfo } from './PersonalInfo';
import { Station } from './Station';
import { Address } from './Address';

export class Packet {
  public id: string;
  public holiday: Holiday;
  public bio: PersonalInfo;
  public station: Station;
  public destination: Address;

  constructor() {
    this.id = "-1";
    this.holiday = new Holiday();
    this.bio = new PersonalInfo();
    this.station = new Station();
  }
}

export function getCopyOfPacketForID(state: Packet[], id: string) {
  if (state && state.length) {
    for (var i = state.length - 1; i >= 0; i--) {
      let packet = state[i];
      if(packet.id == id) {
        state.splice(i, 1);
        return Object.assign({}, packet);
      }
    }
  }
  return undefined;
}