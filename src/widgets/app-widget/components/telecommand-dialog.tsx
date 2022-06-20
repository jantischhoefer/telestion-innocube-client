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
	Form, NumberField, Flex
} from "@adobe/react-spectrum";
import Send from "@spectrum-icons/workflow/Send";
import {useBreakpoints} from "@wuespace/telestion-client-common";
import {Telecommand} from "../model";
import {InputField} from "./input-field";

interface TCDialogProps {
	telecommand: Telecommand;
	msg: TelecommandMessage;
	updateTelecommand: (fieldName: string, cmd: string | number) => void;
}

export function TelecommandDialog({telecommand, msg, updateTelecommand}: TCDialogProps) {
	const {isMobile} = useBreakpoints();

	const send = (close: () => void) => {
		useTelecommand(msg);
		close();
	}

	return (
		<DialogTrigger>
			<Button
				variant="cta"
				width="100%"
				maxWidth={(isMobile) ? "100%" : "size-1200"}
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
							onPress={(close) => send}
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
