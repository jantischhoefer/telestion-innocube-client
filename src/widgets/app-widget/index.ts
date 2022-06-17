import { Widget } from '@wuespace/telestion-client-types';
import { Widget as WidgetRenderer } from './widget';
import {WidgetProps} from "./model";

/**
 * A widget that displays an app and allows the selection and emission
 * of telecommands specified for the app.
 * It is accessible via the `'appWidget'` widget name.
 */
export const widget: Widget<WidgetProps> = {
	name: 'appWidget',
	title: 'App Widget',
	version: '0.1.0',
	Widget: WidgetRenderer
}
