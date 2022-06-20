import {useDatatype} from "../hooks/use-datatype";
import {NumberField, TextField} from "@adobe/react-spectrum";


interface InputFieldProps {
	field: { name: string, type: string };
	updateTelecommand: (fieldName: string, cmd: string | number) => void;
}

export function InputField({field, updateTelecommand}: InputFieldProps) {
	function change(value: string | number) {
		updateTelecommand(field.name, value);
	}

	if (useDatatype(field.type) === 'int' || useDatatype(field.type) === 'number') {
		return (
			<NumberField
				label={field.name}
				formatOptions={{
					useGrouping: false
				}}
				onChange={change}
				defaultValue={0}
				width="100%"
				maxWidth="100%"
			/>
		);
	} else if (useDatatype(field.type) === 'decimal') {
		return (

			<NumberField
				label={field.name}
				formatOptions={{
					useGrouping: false,
					signDisplay: 'exceptZero',
					minimumFractionDigits: 1,
					maximumFractionDigits: 10
				}}
				onChange={change}
				defaultValue={0}
				width="100%"
				maxWidth="100%"
			/>

		);
	} else {
		return <TextField label={field.name} onChange={change} maxWidth="100%"></TextField>;
	}
}

