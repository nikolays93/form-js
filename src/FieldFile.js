import Field from './Field';

class FieldFile extends Field
{
    static defaultSelector = 'input[type="file"]';

    allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingm',
        'application/pdf'
    ]
    size = 10485760

    validate() {
        if (this.inputEl.files.length) {
            for (file in this.inputEl.files) {
                if (!this.#validateSize(file)) this.errors.push('fileSize')
                if (!this.#validateType(file)) this.errors.push('fileType')
            }
        }

        return !this.errors.length;
    }

    #validateSize(file) {
        return file.size <= this.size;
    }

    #validateType(file) {
        return !!this.allowedTypes.filter(type => type === file.type).length;
    }
}

export default FieldFile