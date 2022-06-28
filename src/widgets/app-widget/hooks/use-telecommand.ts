import { JsonSerializable } from "@wuespace/telestion-client-types";
import { useRequest } from "@wuespace/telestion-client-core";

export interface TelecommandMessage extends Record<string, JsonSerializable> {
	nodeId: string;
	appId: string;
	tcId: number;
	fields: {
		[key: string]: string | number | boolean;
		timeToExecute: number;
	}
}

export type Request = (message: TelecommandMessage, callback: (response: Response) => void) => void;

export interface Response extends Record<string, JsonSerializable> {
	result: boolean;
}

const TELECOMMAND_ADDRESS = "telecommand";

export default function useTelecommand(): Request {
	return useRequest<Response>(TELECOMMAND_ADDRESS);
}
