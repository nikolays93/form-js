class FormFieldTypeList
{
	#fieldTypes = {}
	args = {}
	selectors = {}

	constructor(args) {
		this.args = {
            field: 'label',
            error: '.message',
            ...args
        }
	}

	registerType(type, className, selector = '') {
		this.#fieldTypes[type] = className
		this.selectors[type] = selector || className.defaultSelector

		return this;
	}

	fieldByType(type, inputEl) {
        if (!this.#fieldTypes.hasOwnProperty(type)) {
            throw new Error("Not defined field type.");
        }

        const fieldEl = inputEl.closest(this.args.field)
        const errorEl = fieldEl ? fieldEl.querySelector(this.args.error) : null

        return new this.#fieldTypes[type](inputEl, fieldEl, errorEl)
    }
}

export default FormFieldTypeList