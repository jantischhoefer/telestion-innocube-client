import {Telecommand} from "../model";
import {SimpleTelecommand} from "./simple-telecommand";
import {FullTelecommand, MultiTelecommand} from "./multi-telecommand";

export interface TelecommandProps {
	id: number;
	appId: string;
	nodeId: string;
	telecommands: Telecommand[];
}

export function Telecommand({id, appId, nodeId, telecommands}: TelecommandProps) {
	const tc = telecommands.filter(t => t.id === id)[0];

	return tc.fields ? (
		<MultiTelecommand appId={appId} nodeId={nodeId} telecommand={tc as FullTelecommand}/>
	) : (
		<SimpleTelecommand appId={appId} nodeId={nodeId} telecommand={tc}/>
	);
}
