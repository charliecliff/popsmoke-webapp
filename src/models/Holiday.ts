import { Packet } from './Packet';

export interface Holiday {
	id: string;
	name: string;
	startDate: Date;
	endDate: Date;
	packet: Packet;
}