import {GenericProps, JsonSerializable} from '@wuespace/telestion-client-types';

export interface Field extends Record<string, JsonSerializable>{
	name: string;
	type: string;
}

export interface Telecommand extends GenericProps {
	id: number;
	name: string;
	fields?: Field[];
}

/**
 * WidgetProps for the app widget
 */
export interface WidgetProps extends GenericProps {
	nodeId: string;
	appId: string;
	appName: string;
	telecommands: Telecommand[];
}
