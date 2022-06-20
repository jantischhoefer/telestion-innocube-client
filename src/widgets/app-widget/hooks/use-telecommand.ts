import {useBroadcast} from "@wuespace/telestion-client-core";
import {JsonSerializable} from "@wuespace/telestion-client-types";

export interface TelecommandMessage {
	nodeId: string;
	appId: string;
	tcId: number;
	fields: {
		[key: string]: string | number;
		timeToExecute: number;
	}
}

export default function useTelecommand(msg: TelecommandMessage): void {
	console.log(msg);
	useBroadcast("telecommand")({
		nodeId: msg.nodeId,
		appId: msg.appId,
		tcId: msg.tcId,
		fields: msg.fields
	});
}
