export type DataType = 'number' | 'int' | 'decimal' | 'string' | 'boolean';

export function getDataType(type: string): DataType {
	if (type.includes('int')) return 'int';
	if (type === 'number') return 'number';
	if (type === 'float') return 'decimal';
	if (type === 'double') return 'decimal';
	if (type.includes('bool')) return 'boolean';
	return 'string';
}
