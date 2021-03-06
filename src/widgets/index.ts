/*
This file gets manipulated automatically using the tc-cli.

Please do not remove the // XXX_IMPORT_MARK comments or you will loose the ability to generate widgets automatically
using the tc-cli generate widget command.
 */

import {Widget} from '@wuespace/telestion-client-types';
import {widget as sampleWidget} from './sample-widget';
import {widget as appWidget} from './app-widget';
// IMPORT_INSERT_MARK

export const projectWidgets: Widget[] = [
	// ARRAY_FIRST_ELEMENT_INSERT_MARK
	sampleWidget as Widget,
	appWidget as Widget,
];
