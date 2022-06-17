import {
	Header as TCHeader,
	AppLogo,
	NavBar,
	DashboardPicker,
	ConnectionIndicator,
	Actions,
	NotificationAction,
	ColorSchemeAction,
	FullscreenAction,
	AccountControls,
	useBreakpoints
} from '@wuespace/telestion-client-common';

export function Header() {
	const {isBase, isSm} = useBreakpoints();

	return (
		<TCHeader
			left={
				isBase || isSm ? <AppLogo/> : <><AppLogo/><NavBar/></>
			}
			center={<DashboardPicker/>}
			right={
				<>
					<ConnectionIndicator/>
					<Actions>
						<NotificationAction/>
						<ColorSchemeAction/>
						<FullscreenAction/>
					</Actions>
					<AccountControls/>
				</>
			}
		/>
	);
}
