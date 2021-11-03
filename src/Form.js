class Form
{
    // Double click protected
    isFormProcessed = false
    form = null
    fields = {}
    args = {}

    constructor(form, FieldTypeList, args = {})
    {
        this.args = {
            beforeSubmit: () => { console.log('@todo start preloader') },
            afterSubmit: () => { console.log('@todo stop preloader') },
            success: response => console.log('@todo add success behavior') || true,
            fail: response => {},
            ...args
        }

        this.form = form
        for (const [type, selector] of Object.entries(FieldTypeList.selectors)) {
            this.fields[type] = Array.from(form.querySelectorAll(selector))
                .map(el => FieldTypeList.fieldByType(type, el));
        }

        form.addEventListener('submit', this.submit.bind(this))
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

    submit(e)
    {
        e.preventDefault();
        if (this.isFormProcessed) return false

        if (this.validate()) {
            this.beforeSubmit(this)
            this.isFormProcessed = true

            const xhr = new XMLHttpRequest()

            xhr.onreadystatechange = () => {
                if (4 === xhr.readyState) {
                    this.isFormProcessed = false

                    if (200 === xhr.status && false !== this.success(JSON.parse(xhr.response))) {
                        this.fetch().map(field => field.clearValue())
                    } else {
                        this.fail()
                    }

                    this.afterSubmit(this);
                }
            }

            xhr.open('POST', this.form.getAttribute('action') || './');
            xhr.send(new FormData(this.form));
        }
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