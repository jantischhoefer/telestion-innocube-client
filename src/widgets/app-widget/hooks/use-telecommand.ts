import {useBroadcast} from "@wuespace/telestion-client-core";
import {JsonSerializable} from "@wuespace/telestion-client-types";

export interface TelecommandMessage {
	nodeId: string;
	appId: string;
	tcId: number;
	cmd: {
		[key: string]: string
	};
	timeToExecute: number;
}

export default function useTelecommand(msg: TelecommandMessage): void {
	console.log(msg);
	useBroadcast("telecommand")(msg.cmd);
}
