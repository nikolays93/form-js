class Form
{
    // Double click protected
    isFormProcessed = false
    element = null
    fields = {}
    args = {}

    constructor(element, FieldTypeList, args = {})
    {
        this.args = {
            field: 'label',
            error: '.message',
            ...args
        }

        this.element = element
        for (const [type, selector] of Object.entries(FieldTypeList.selectors)) {
            this.fields[type] = Array.from(element.querySelectorAll(selector)).map(el => {
                const fieldEl = el.closest(this.args.field)
                const errorEl = fieldEl ? fieldEl.querySelector(this.args.error) : null;

                return FieldTypeList.fieldByType(type, el, fieldEl, errorEl);
            });
        }

        element.addEventListener('submit', this.submit.bind(this))
    }

    validate()
    {
        const fields = this.fetch()
        const incorrectFields = fields.filter(field => {
            if (!field.validate()) {
                let fieldName = field.getFieldName().toLowerCase()
                if (fieldName) fieldName+= ' '

                field.showErrors(field.errors.map(err => {
                    switch (err) {
                        case 'required': return `Поле ${fieldName}обязательно`;
                        case 'email': return `Эл. адрес введен не верно`;
                        case 'phone': return `Номер телефона введен не верно`;
                        default: return err;
                    }
                }))

                return true
            }

            field.clearErrors()
            return false
        });

        return incorrectFields.length === 0;
    }

    beforeSubmit()
    {
        console.log('@todo start preloader')
        this.isFormProcessed = true;
    }

    afterSubmit(call)
    {
        console.log('@todo stop preloader')
        this.isFormProcessed = false;
        return call();
    }

    submit(e)
    {
        e.preventDefault();
        if (this.isFormProcessed) return false;

        if (this.validate()) {
            this.beforeSubmit();

            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (4 === xhr.readyState) {
                    const response = JSON.parse(xhr.response);
                    if (200 === xhr.status) {
                        if ('Y' === response.SUCCESS) {
                            return this.afterSubmit(() => this.success(response.SUCCESS_MESSAGE));
                        }
                    }

                    return this.afterSubmit(() => this.error(response.ERRORS));
                }
            }
            
            xhr.open('POST', this.element.getAttribute('action') || './');
            xhr.send(new FormData(this.element));
        }
    }

    success(message)
    {
        this.fetch().map(field => field.clearValue());
        console.log(message);
    }

    error(errors)
    {
        console.log(errors);
    }

    fetch(type)
    {
        // Get all fields map
        if (!type) return Object.values(this.fields).flat();
        // Get by type
        return this.fields.hasOwnProperty(type) ? this.fields[type] : [];
    }
}

export default Form