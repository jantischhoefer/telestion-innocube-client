import {Flex, View, Form, Text, Button, IllustratedMessage, Content} from '@adobe/react-spectrum';
import Send from '@spectrum-icons/workflow/Send';
import {Telecommand} from '../model';
import useTelecommand, {TelecommandMessage} from "../hooks/use-telecommand";
import {useState} from "react";
import {useBreakpoints} from "@wuespace/telestion-client-common";
import Unavailable from '@spectrum-icons/illustrations/Unavailable';
import {TelecommandDialog} from "./telecommand-dialog";

interface SimpleTelecommandProps {
	appId: string;
	nodeId: string;
	telecommand: Telecommand;
}

export function SimpleTelecommand({appId, nodeId, telecommand}: SimpleTelecommandProps) {
	const {isBase, isSm, isMd} = useBreakpoints();
	const [tc, setTc] = useState<Telecommand>(telecommand);
	const [msg, setMsg] = useState<TelecommandMessage>(
		{
			tcId: telecommand.id,
			appId: appId,
			nodeId: nodeId,
			fields: {
				timeToExecute: 0
			}
		});

	const updateTelecommand = (fieldName: string, cmd: number | string) => {
		const newTc = {...tc};
		if (newTc.fields) {
			const field = newTc.fields.find(f => f.name === fieldName);
			if (field) field.value = cmd;
		}
		setTc(newTc);
	};

	return (
		<Flex direction="column" height="100%" alignItems="center">
			<View flex={1} overflow="auto" width="100%" height="100%">
				<Flex width="100%" height="100%" alignItems="center" justifyContent="center">
					<Text>No fields to set.</Text>
				</Flex>
			</View>
			<TelecommandDialog telecommand={tc} msg={msg} updateTelecommand={updateTelecommand}/>
		</Flex>
	);
}
