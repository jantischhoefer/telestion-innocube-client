import {useMemo, useState} from "react";
import { View, Flex, Divider, Heading, Picker, Item } from '@adobe/react-spectrum';
import { OverflowFix } from "@wuespace/telestion-client-common";

import { WidgetProps } from './model';
import { Telecommand } from './components/telecommand';

/**
 * Renders a dynamic app widget containing the configured telecommands.
 */
export function Widget({nodeId, appId, appName, telecommands}: WidgetProps) {
	const [tcId, setTcId] = useState(telecommands[0].id);
	const telecommand = useMemo(() => telecommands.filter(t => t.id === tcId)[0], [telecommands, tcId]);

	return (
		<View width="100%" height="100%" padding="size-200">
			<Flex height="100%" direction="column" gap="size-50">
				<Flex flex={0} gap="size-50" alignItems="center">
					<Heading
						level={4}
						margin={0}
						marginEnd="size-100"
					>{appName.toUpperCase().replace(
						"-", ""
					)}</Heading>
					<Divider marginY="size-100" orientation="vertical" size="M"/>
					<Picker
						flex={1}
						items={telecommands}
						selectedKey={`${tcId}`}
						onSelectionChange={key => setTcId(typeof key === 'number' ? key : parseInt(key))}
						marginStart="size-100"
						isQuiet>
						{item => <Item key={item.id}>{item.name}</Item>}
					</Picker>
				</Flex>
				<Divider size="S"/>
				<View flex={1}>
					<OverflowFix>
						<Telecommand appId={appId} nodeId={nodeId} telecommand={telecommand}/>
					</OverflowFix>
				</View>
			</Flex>
		</View>
	);
}
