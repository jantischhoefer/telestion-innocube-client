import {
	ActionButton,
	AlertDialog,
	Dialog,
	DialogTrigger,
	Flex,
	View,
	Form,
	Text,
	Button,
	TextField,
	NumberField,
	Heading,
	Header,
	Divider,
	Content,
	ButtonGroup
} from '@adobe/react-spectrum';
import Send from '@spectrum-icons/workflow/Send';
import {Telecommand} from '../model';
import useTelecommand, {TelecommandMessage} from "../hooks/use-telecommand";
import {useState} from "react";
import {useDatatype} from "../hooks/use-datatype";
import {useBreakpoints} from "@wuespace/telestion-client-common";
import {TelecommandDialog} from "./telecommand-dialog";
import {InputField} from "./input-field";

export interface FullTelecommand extends Telecommand {
	fields: {
		name: string;
		type: string;
		value: string | number;
	}[];
}

interface MultiTelecommandProps {
	appId: string;
	nodeId: string;
	telecommand: FullTelecommand;
}

export function MultiTelecommand({appId, nodeId, telecommand}: MultiTelecommandProps) {
	const {isMobile} = useBreakpoints();
	const [msg, setMsg] = useState<TelecommandMessage>(
		{
			tcId: telecommand.id,
			appId: appId,
			nodeId: nodeId,
			cmd: {
				name: telecommand.name
			},
			timeToExecute: 0
		});

	const updateMsgField = (fieldName: string, value: string | number) => {
		let tcMsg = {...msg};
		if (fieldName === 'ttx') {
			tcMsg.timeToExecute = typeof value === 'number' ? value : parseInt(value);
			setMsg(tcMsg);
		} else {
			Object.entries(tcMsg.cmd).forEach(([key, val]) => {
				if (key === fieldName) {
					val = value.toString()
				}
			});
			setMsg(tcMsg);
		}
		console.log(msg);
	};

	const send = () => {
		if (msg) {
			useTelecommand(msg);
		} else {
			console.log("Please fill out the fields required for the telecommand!");
		}
	};

	return (
		<Flex direction="column" height="100%" alignItems="center" width="100%">
			<View flex={1} overflow="auto" width="100%" marginY="size-50">
				<Flex direction="column" gap="size-50">
					{telecommand.fields.map(f => (
						<InputField field={f} updateMsgField={updateMsgField} />
					))}
				</Flex>
			</View>
			<TelecommandDialog telecommand={telecommand} msg={msg} updateMsgField={updateMsgField} />
		</Flex>
	);
}
