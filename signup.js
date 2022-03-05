const getLogo = function() {
    const logo = document.createElement('img');
    logo.classList = "mb-2";
    logo.src = "./icon.png";
    logo.width = 100;
    return logo;
}

const createInput = function(inputType, inputClass, inputId, inputPlaceholder, addonText=null) {
    input = document.createElement('input');
    input.type = inputType;
    input.classList = inputClass;
    input.id = inputId;
    input.placeholder = inputPlaceholder;
    const divWrapper1 = document.createElement('div');
    divWrapper1.classList = "col";
    const divWrapper2 = document.createElement('div');
    divWrapper2.classList = "row mb-2";
    if (addonText != null) {
        const inputGroup = document.createElement('div');
        inputGroup.classList = 'input-group p-0';
        inputGroup.appendChild(input);
        const addon = document.createElement('span');
        addon.classList = "input-group-text";
        addon.innerText = addonText;
        inputGroup.appendChild(addon);
        input = inputGroup;
    }
    divWrapper2.appendChild(input);
    divWrapper1.appendChild(divWrapper2);
    return divWrapper2;
}

const createButtonGrid = function(buttonConfig) {
    const grid = document.createElement('div');
    grid.classList = "d-grid gap-2";
    
    Object
    .values(buttonConfig)
    .map(({bTag, bClass, bType, bText}) => {
        button = document.createElement(bTag);
        button.classList = 'btn ' + bClass;
        if (bTag == 'input') {
            button.value = bText;
        }
        else {
            button.textContent = bText;
        }
        button.type = bType;
        grid.appendChild(button);
    });

    return grid;
}

const createSignupForm = function() {
    form = document.createElement('form');
    form.action = 'signup';
    form.method = 'post';
    form.classList = "col shadow align-self-center bg-white border border-2 border-white text-center rounded-3 p-5 justify-content-center position-absolute top-50 start-50 translate-middle";
    form.style="width: 30%; min-width: 300px;"

    logo = getLogo();
    firstName = createInput("text", "form-control", "inputFirstName", "Имя");
    lastName = createInput("text", "form-control", "inputLastName", "Фамилия");
    email = createInput("text", "form-control", "inputEmail", "Почта", "@over.ru");
    password = createInput("password", "form-control", "inputPassword", "Пароль");
    passwordRepeat = createInput("password", "form-control", "inputPasswordRepeat", "Повторить пароль");

    grid = createButtonGrid([
        {
            'bTag': 'input',
            'bClass': 'btn-primary',
            'bType': 'submit',
            'bText': 'Создать',
        },
        {
            'bTag': 'button',
            'bClass': 'btn-secondary',
            'bType': 'button',
            'bText': 'Назад',
        },
    ])
    grid.classList.add('mt-4');

    form.appendChild(logo);
    form.appendChild(firstName);
    form.appendChild(lastName);
    form.appendChild(email);
    form.appendChild(password);
    form.appendChild(passwordRepeat);
    form.appendChild(grid);
    return form;
}

document.getElementById('siteTitle').textContent = 'Регистрация';
root = document.getElementById('root');
form = createSignupForm();
root.appendChild(form);