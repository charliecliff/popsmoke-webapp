import { Holiday } from './Holiday';
import { PersonalInfo } from './PersonalInfo';
import { Station } from './Station';
import { Address } from './Address';
import { DA31Leave } from './DA31Leave';

export class Packet {
  public packetID: string;
  public holiday: Holiday;
  public bio: PersonalInfo;
  public station: Station;
  public destination: Address;
  public leave: DA31Leave;

  constructor() {
    this.packetID = "-1";
    this.holiday = new Holiday();
    this.bio = new PersonalInfo();
    this.station = new Station();
    this.destination = new Address();
    this.leave = new DA31Leave();
  }
}