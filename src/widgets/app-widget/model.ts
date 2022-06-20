import { GenericProps } from '@wuespace/telestion-client-types';

export interface Telecommand extends GenericProps {
	id: number;
	name: string;
	fields?: {
		name: string;
		type: string;
		value: string | number;
	}[];
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
