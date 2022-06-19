import { UserConfig } from '@wuespace/telestion-client-types';
// @ts-ignore
import { corfuDashboards } from 'corfu-config';

export const userConfig: UserConfig = {
	admin: {
		dashboards: [
			...corfuDashboards
		]
	}
};
