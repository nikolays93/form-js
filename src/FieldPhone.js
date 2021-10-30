import Field from './Field';

class FieldPhone extends Field
{
    static defaultSelector = 'input[type="tel"]'

    notEmpty() {
        // not '+7 ('
        return this.inputEl.value.length > 4
    }

    validate() {
        super.validate()

        if (this.inputEl.value && !/\+7\s?\({0,1}9[0-9]{2}\){0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}/.test(this.inputEl.value)) {
            this.errors.push('phone')
        }

        return !this.errors.length
    }
}

export default FieldPhone