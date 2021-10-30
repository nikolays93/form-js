import Field from './Field';

class FieldText extends Field
{
	static defaultSelector = 'input[type="text"], input:not([type])'
}

export default FieldText