class FormFieldTypeList
{
	#fieldTypes = {}
	selectors = {}

	registerType(type, className) {
		this.#fieldTypes[type] = className
		this.selectors[type] = className.defaultSelector

		return this;
	}

	fieldByType(type, inputEl, fieldEl, errorEl) {
        if (!this.#fieldTypes.hasOwnProperty(type)) {
            throw new Error("Not defined field type.");
        }

        return new this.#fieldTypes[type](inputEl, fieldEl, errorEl)
    }
}

export default FormFieldTypeList