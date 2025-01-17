import { codeList } from './codeList';

function validate() {
    for (const code of codeList) {
        if (code.length !== 64) {
            throw new Error('Invalid code length ' + code);
        }
        if (!/^[0-9a-f]+$/.test(code)) {
            throw new Error('Invalid code format ' + code);
        }
    }
}

validate();
