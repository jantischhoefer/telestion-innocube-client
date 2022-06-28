import { JsonSerializable } from "@wuespace/telestion-client-types";
import { useRequest } from "@wuespace/telestion-client-core";

export interface TelecommandMessage {
	nodeId: string;
	appId: string;
	tcId: number;
	fields: {
		[key: string]: string | number;
		timeToExecute: number;
	}
}

const TELECOMMAND_ADDRESS = "telecommand";

export default function useTelecommand(): Request {
	return useRequest<Response>(TELECOMMAND_ADDRESS);
}
