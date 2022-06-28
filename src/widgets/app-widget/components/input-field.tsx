import {useMemo} from "react";
import {NumberField, TextField, Switch} from "@adobe/react-spectrum";
import {Field} from '../model';
import {getDataType} from '../lib';

export interface InputFieldProps {
	field: Field;
	value: string | number | boolean;
	onChange: (newValue: string | number | boolean) => void;
}

export function InputField({field, value, onChange}: InputFieldProps) {
	const dataType = useMemo(() => getDataType(field.type), [field]);

	switch (dataType) {
		case "int":
		case "number":
			return (
				<NumberField
					label={field.name}
					formatOptions={{
						useGrouping: false
					}}
					onChange={onChange}
					value={typeof value !== 'string' ? (typeof value === 'boolean' ? (!value ? 0 : 1) : value) : 0}
					width="100%"
					maxWidth="100%"
				/>
			);
		case "decimal":
			return (
				<NumberField
					label={field.name}
					formatOptions={{
						useGrouping: false,
						signDisplay: 'exceptZero',
						minimumFractionDigits: 1,
						maximumFractionDigits: 10
					}}
					onChange={onChange}
					value={typeof value !== 'string' ? (typeof value === 'boolean' ? (!value ? 0 : 1) : value) : 0}
					width="100%"
					maxWidth="100%"
				/>
			);
		case "boolean":
			return (
				<Switch
					onChange={onChange}
					isSelected={typeof value !== 'string' ?
						(typeof value === 'number' ? (value !== 0) : value) :
						(value !== '')
					}
				>
					{field.name}
				</Switch>
			);
		default:
			return (
				<TextField
					label={field.name}
					value={typeof value !== 'string' ? (typeof value === 'boolean' ? '' : value.toString()) : value}
					onChange={onChange}
					maxWidth="100%"/>
			);
	}
}
