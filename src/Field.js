// Abstract
class Field
{
    inputEl = null
    fieldEl = null
    errorEl = null

    builtInValue = '';

    errors = [];

    constructor(inputEl, fieldEl, errorEl) {
        if (this.constructor == Field) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        if (!inputEl) {
            throw new Error("Input element is required.");
        }

        this.inputEl = inputEl
        this.fieldEl = fieldEl
        this.errorEl = errorEl
        this.builtInValue = inputEl.value
    }

    getFieldName()
    {
        const labelKeeper = this.inputEl.closest('[aria-label]')
        return labelKeeper ? labelKeeper.getAttribute('aria-label') : ''
    }

    notEmpty() {
        return this.inputEl.value.length > 0;
    }

    isDisabled() {
        return this.inputEl.hasAttribute('disabled') && 'false' !== this.inputEl.getAttribute('disabled');
    }

    isRequired() {
        return this.inputEl.hasAttribute('required') && 'false' !== this.inputEl.getAttribute('required');
    }

    validateRequired() {
        return !this.isRequired() || this.notEmpty()
    }

    validate() {
        this.errors = [];

        if (this.isRequired() && !this.notEmpty()) {
            this.errors.push('required')
        }

        return !this.errors.length
    }

    getErrors() {
        return this.errors;
    }

    showErrors(text) {
        if (this.fieldEl) this.fieldEl.classList.add('error');

        if (Array.isArray(text)) text = text.map(oneText => `<span>${oneText}</span>`).join('\n')
        if (!text) text = '';
        if (text && this.errorEl) this.errorEl.innerHTML = text;
    }

    clearErrors() {
        if (this.fieldEl) this.fieldEl.classList.remove('error');
        if (this.errorEl) this.errorEl.innerHTML = '';
    }

    clearValue() {
        this.inputEl.value = this.builtInValue
    }
}

export default Field