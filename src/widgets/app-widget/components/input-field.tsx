import {useMemo} from "react";
import {NumberField, TextField, Switch} from "@adobe/react-spectrum";
import {Field} from '../model';
import {getDataType} from '../lib';

interface InputFieldProps {
	field: { name: string, type: string };
	updateTelecommand: (fieldName: string, cmd: string | number) => void;
}

export function InputField({field, updateTelecommand}: InputFieldProps) {
	function change(value: string | number) {
		updateTelecommand(field.name, value);
	}
}

