import {useState, useCallback, useEffect} from "react";
import { Flex, Text, View } from "@adobe/react-spectrum";

import { Field, Telecommand } from "../model";
import { TelecommandMessage } from "../hooks/use-telecommand";
import { InputField } from "./input-field";
import { TelecommandDialog } from "./telecommand-dialog";
import { DataType, getDataType } from "../lib";

export interface TelecommandProps {
	appId: string;
	nodeId: string;
	telecommand: Telecommand;
}

const defaultValue = (dataType: DataType): string | number | boolean => {
	switch (dataType) {
		case "int":
		case "number":
			return 0;
		case "decimal":
			return 0.0;
		case "boolean":
			return false;
		default:
			return "";
	}
}

const timeToExecute: Field = { name: 'timeToExecute', type: 'number' };

export function Telecommand({ appId, nodeId, telecommand }: TelecommandProps) {
	const [msg, setMsg] = useState<TelecommandMessage>(
		{
			tcId: telecommand.id,
			appId: appId,
			nodeId: nodeId,
			fields: {
				timeToExecute: 0
			}
		}
	);

	// reset message on external input changes (e.g. switching telecommand)
	useEffect(() => {
		setMsg(prevState => ({
			tcId: telecommand.id,
			appId: appId,
			nodeId: nodeId,
			fields: {
				timeToExecute: prevState.fields.timeToExecute
			}
		}));
	}, [appId, nodeId, telecommand])

	const handleResult = (result: boolean) => {
		alert(result);
		setMsg({
			tcId: telecommand.id,
			appId: appId,
			nodeId: nodeId,
			fields: {
				timeToExecute: 0
			}
		});
	}

	const updateValue = useCallback((fieldName: string, value: string | number | boolean) => {
		let newValue: string | number | boolean;
		if (fieldName === timeToExecute.name) {
			switch (typeof value) {
				case "string":
					newValue = parseInt(value);
					break;
				case "boolean":
					newValue = value ? 1 : 0;
					break;
				default:
					newValue = value;
			}
		} else {
			newValue = value;
		}

		setMsg(prevState => ({
			...prevState,
			fields: {
				...prevState.fields,
				// only update field name
				[fieldName]: newValue
			}
		}));
	}, []);

	return (
		<Flex direction="column" height="100%" alignItems="center" width="100%">
			<View flex={1} overflow="auto" width="100%" marginY="size-50">
				{!!telecommand.fields ? (
					<Flex direction="column" gap="size-50">
						{telecommand.fields.map(field => (
							<InputField
								key={field.name}
								field={field}
								value={msg.fields[field.name] ? msg.fields[field.name] : defaultValue(getDataType(field.type))}
								onChange={newValue => updateValue(field.name, newValue)}
							/>
						))}
					</Flex>
				): (
					<Flex width="100%" height="100%" alignItems="center" justifyContent="center">
						<Text>No fields to set.</Text>
					</Flex>
				)}
			</View>
			<Flex alignItems="end" gap="size-100" width="100%">
				<View flex={1}>
					<InputField field={timeToExecute} value={msg.fields.timeToExecute} onChange={newValue => updateValue(timeToExecute.name, newValue)}/>
				</View>
				<View flex={0}>
					<TelecommandDialog telecommand={telecommand} msg={msg} onResult={result => handleResult(result)} />
				</View>
			</Flex>
		</Flex>
	);
}
