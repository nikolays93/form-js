import Field from './Field';

class FieldEmail extends Field
{
    static defaultSelector = 'input[type="email"]'

    validate() {
        super.validate()
        // https://stackoverflow.com/a/46181/7425521
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (this.inputEl.value && !re.test(String(this.inputEl.value).toLowerCase())) {
            this.errors.push('email')
        }

        return !this.errors.length
    }
}

export default FieldEmail