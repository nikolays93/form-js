import Field from './Field';

class FieldPick extends Field
{
    static defaultSelector = 'input[type="radio"], input[type="checkbox"]'
}

export default FieldPick