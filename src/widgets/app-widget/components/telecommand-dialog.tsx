import useTelecommand, {TelecommandMessage} from "../hooks/use-telecommand";
import {
	Button,
	ButtonGroup,
	Content,
	Dialog,
	DialogTrigger,
	Divider,
	Header,
	Heading,
	Text,
	TableView,
	TableHeader,
	TableBody,
	Column,
	Row,
	Cell
} from "@adobe/react-spectrum";

import Send from "@spectrum-icons/workflow/Send";

import useTelecommand, {TelecommandMessage} from "../hooks/use-telecommand";
import {Telecommand} from "../model";

interface TCDialogProps {
	telecommand: Telecommand;
	msg: TelecommandMessage;
	updateTelecommand: (fieldName: string, cmd: string | number) => void;
}

export function TelecommandDialog({telecommand, msg, onResult}: TCDialogProps) {
	const items: TableItem[] = Object.keys(msg.fields)
		.map((key, index) => ({id: index, name: key, value: msg.fields[key]}));

	const request = useTelecommand();

	return (
		<DialogTrigger>
			<Button
				variant="cta"
				width="100%"
				maxWidth="minmax(size-1200, 1fr)"
			>
				<Send/>
				<Text>Send</Text>
			</Button>
			{(close) => (
				<Dialog height="100%">
					<Heading>
						Confirmation
					</Heading>
					<Header>
						{telecommand.name.toUpperCase()}
					</Header>
					<Divider/>
					<Content>
						<InputField field={{name: 'timeToExecute', type: 'number'}}
									updateTelecommand={updateTelecommand}/>
						<Flex direction="column">
							{telecommand.fields ?
								telecommand.fields.map(f => (
									<Flex id={f.name}>
										<Text>{f.name}</Text>
										<Text>{f.value}</Text>
									</Flex>
								)) : <></>
							}
						</Flex>
					</Content>
					<ButtonGroup>
						<Button
							variant="cta"
							onPress={() => {
								console.log(msg);
								onResult(true);
								request(msg, response => {
									onResult(response.result)
								});
								close();
							}}
						>
							<Send/>
							<Text>Confirm</Text>
						</Button>
						<Button
							variant="secondary"
							onPress={close}
						>
							Cancel
						</Button>
					</ButtonGroup>
				</Dialog>
			)

			}

		</DialogTrigger>
	);
}
