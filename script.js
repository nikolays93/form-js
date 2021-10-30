import Form from "./src/Form";
import FormFieldTypeList from "./src/FormFieldTypeList";

import FieldText from './src/FieldText';
import FieldPhone from './src/FieldPhone';
import FieldEmail from './src/FieldEmail';
import FieldFile from './src/FieldFile';

(() => {
    // Class already exists
    if (window.FormResultNew) return;

    window.FieldTypeList = new FormFieldTypeList()
    window.FieldTypeList
        .registerType('text', FieldText)
        .registerType('phone', FieldPhone)
        .registerType('email', FieldEmail)
        .registerType('file', FieldFile)

    window.FormResultNew = Form
})();
