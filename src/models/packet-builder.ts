import { Packet } from './Packet';
import { Holiday } from './Holiday';
import { PersonalInfo } from './PersonalInfo';
import { Station } from './Station';
import { Address } from './Address';

export function packet() {
  var packet = new Packet();
  packet.id = create_UUID();
  return packet;
}

export function packetWithID(id: string) {
  var packet = new Packet();
  packet.id = id;
  return packet;
}

function create_UUID() {  
  var dt = new Date().getTime();  
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
    var r = (dt + Math.random()*16)%16 | 0;  
    dt = Math.floor(dt/16);  
    return (c=='x' ? r :(r&0x3|0x8)).toString(16);  
  });  
  return uuid;  
} 