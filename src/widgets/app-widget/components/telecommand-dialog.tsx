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

export interface TCDialogProps {
	telecommand: Telecommand;
	msg: TelecommandMessage;
	onResult: (result: boolean) => void;
}

interface TableItem extends Record<string, string | number | boolean> {
	name: string;
	value: string | number | boolean;
}

const columns = [
	{name: 'Name', uid: 'name'},
	{name: 'Value', uid: 'value'},
];

function renderCell(value: string | number | boolean) {
	switch (typeof value) {
		case 'boolean': return value ? 'true' : 'false';
		default: return value;
	}
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
						<TableView>
							<TableHeader columns={columns}>
								{column => <Column key={column.uid}>{column.name}</Column>}
							</TableHeader>
							<TableBody items={items}>
								{item => (
									<Row>
										{columnKey => <Cell>{renderCell(item[columnKey])}</Cell>}
									</Row>
								)}
							</TableBody>
						</TableView>
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
						<Button variant="secondary" onPress={close}>
							Cancel
						</Button>
					</ButtonGroup>
				</Dialog>
			)}
		</DialogTrigger>
	);
}
