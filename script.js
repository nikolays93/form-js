import Form from "./src/Form";
import FieldTypeList from "./src/FormFieldTypeList";

import FieldText from './src/FieldText';
import FieldPhone from './src/FieldPhone';
import FieldEmail from './src/FieldEmail';
import FieldFile from './src/FieldFile';

(() => {
    // Already exists
    if (window.FormConstructor) return;

    window.FormConstructor = {
        Form,
        FieldTypeList,
        FieldText,
        FieldPhone,
        FieldEmail,
        FieldFile,
    }
})();

/** // Use example

const formEl = document.querySelector('[data-area="<?= $arResult['WEB_FORM_AREA_ID'] ?>"]')
const FieldTypeList = new FormConstructor.FieldTypeList({
    field: '.form-group', // input wrapper
    error: '.form-group-error' // message inner field
})

FieldTypeList
    .registerType('text', FormConstructor.FieldText)
    .registerType('phone', FormConstructor.FieldPhone)
    .registerType('email', FormConstructor.FieldEmail)

new FormConstructor.Form(formEl, FieldTypeList, {
    success: function(response) {
        if ('Y' === response.SUCCESS) {
            console.log('Success message');
            return true;
        }

        return false;
    }
})

 */