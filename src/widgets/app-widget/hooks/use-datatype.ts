export type DataType = 'number' | 'int' | 'decimal' | 'string';

function dataType(type: string): DataType {
	if (type.includes('int')) return 'int';
	if (type === 'number') return type;
	if (type === 'float') return 'decimal';
	if (type === 'double') return 'decimal';
	return 'string';
}

export function useDatatype(type: string): DataType {
	return dataType(type);
}
