import {
	LoginPage as TCLoginPage,
	LoginTitle,
	LoginLogo,
	LoginDescription,
	LoginForm
} from '@wuespace/telestion-client-common';
import {useBreakpoints} from '@wuespace/telestion-client-common'

export function LoginPage() {
	const {isBase, isSm} = useBreakpoints();
	return (
		<TCLoginPage>
			{ isBase || isSm ? <></> : <LoginLogo/> }
			<LoginTitle/>
			<LoginDescription/>
			<LoginForm initialServerURL="http://localhost:9870/bridge"/>
		</TCLoginPage>
	);
}

LoginPage.routing = TCLoginPage.routing;
