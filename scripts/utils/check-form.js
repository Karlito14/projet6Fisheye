import { API_KEY_PASTEBIN } from '../../config/config.js';

export class CheckForm {
    static displayError (input, message) {
        const elParent = input.closest('div');

        if (message) {
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }

        let errorInput = document.querySelector(`#error-input-${input.id}`);

        if (!errorInput) {
            errorInput = document.createElement('span');
            errorInput.setAttribute('class', 'error-input');
            errorInput.setAttribute('id', `error-input-${input.id}`);
        }

        errorInput.textContent = message;
        elParent.appendChild(errorInput);
    }

    static checkInputTextValidity (input) {
        const regexName = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;

        const valueInput = input.value;

        if (valueInput.trim() === '') {
            throw new Error(`Le champ ${input.dataset.name} ne peut etre vide`);
        } else if (valueInput.trim().length < 2) {
            throw new Error(`Le champ ${input.dataset.name} doit faire au moins 2 caractères`);
        } else if (!regexName.test(valueInput)) {
            throw new Error(`Le ${input.dataset.name} ne peut contenir de caractères sépciales`);
        }
    }

    static checkInputEmailValidity (input) {
        const regexEmail = /[a-zA0-9_.-]+@[a-zA-Z0-9]+.[a-z0-9.]+/;

        if (!regexEmail.test(input.value)) {
            throw new Error('Veuillez renseigner une adresse mail valide');
        }
    }

    static checkTextAreaValidity (textArea) {
        const regexTextarea = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ?!,.'-]+$/;
        const value = textArea.value;

        if (value.trim() === '') {
            throw new Error(`Le champ ${textArea.dataset.name} ne peut etre vide`);
        } else if (!regexTextarea.test(value)) {
            throw new Error(`Le ${textArea.dataset.name} ne peut contenir de caractères sépciales`);
        }
    }

    static async sendDataToPastebin (formData) {
        const object = {};

        formData.forEach((value, key) => {
            object[key] = value;
        });

        const apiKey = API_KEY_PASTEBIN;
        const url = 'https://pastebin.com/api/api_post.php';

        const data = {
            api_dev_key: apiKey,
            api_option: 'paste',
            api_paste_code: JSON.stringify(object),
            api_paste_name: 'formulaire',
            api_paste_format: 'javascript'
        };

        const requestOptions = {
            method: 'POST',
            body: new URLSearchParams(data)
        };

        // Requete fetch pour envoyer le formulaire
        try {
            const reponse = await fetch(url, requestOptions);
            const resultat = await reponse.text();
            console.log(resultat);
        } catch (error) {
            console.error('Erreur :', error);
        }
    }
}