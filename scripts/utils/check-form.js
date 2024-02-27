class CheckForm {

    static displayError(input, message) {
        const elParent = input.closest('div');

        if(message) {
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }

        let errorInput = document.querySelector(`#error-input-${input.id}`)

        if(!errorInput) {
            errorInput = document.createElement('span');
            errorInput.setAttribute('class', 'error-input');
            errorInput.setAttribute('id', `error-input-${input.id}`);
        }

        errorInput.textContent = message;
        elParent.appendChild(errorInput);
    }

    static checkInputTextValidity(input) {
        const regexName = new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$");

        const valueInput = input.value;

        if(valueInput.trim() === '') {
            throw new Error(`Le champ ${input.dataset.name} ne peut etre vide`);
        } else if(valueInput.trim().length < 2) {
            throw new Error(`Le champ ${input.dataset.name} doit faire au moins 2 caractères`);
        } else if(!regexName.test(valueInput)) {
            throw new Error(`Le ${input.dataset.name} ne peut contenir de caractères sépciales`);
        }
    }

    static checkInputEmailValidity(input) {
        const regexEmail = new RegExp("[a-zA0-9_.\-]+@[a-zA-Z0-9]+\.[a-z0-9.]+")

        if(!regexEmail.test(input.value)) {
            throw new Error(`Veuillez renseigner une adresse mail valide`);
        }
    }

    static checkTextAreaValidity(textArea) {
        const value = textArea.value;

        if(value.trim() === '') {
            throw new Error(`Le champ ${textArea.dataset.name} ne peut etre vide`);
        }
    }
}