const getLogo = function() {
    const logo = document.createElement('img');
    logo.classList = "mb-2";
    logo.src = "./icon.png";
    logo.width = 100;
    return logo;
}

const createInput = function(inputType, inputClass, inputId, inputPlaceholder) {
    const input = document.createElement('input');
    input.type = inputType;
    input.classList = inputClass;
    input.id = inputId;
    input.placeholder = inputPlaceholder;
    const divWrapper1 = document.createElement('div');
    divWrapper1.classList = "col";
    const divWrapper2 = document.createElement('div');
    divWrapper2.classList = "row mb-2";
    divWrapper2.appendChild(input);
    divWrapper1.appendChild(divWrapper2);
    return divWrapper2;
}

const createForgotPassword = function() {
    forgotPassword = document.createElement('a');
    forgotPassword.href = 'resetPassword';
    forgotPassword.textContent = 'Забыл пароль';
    forgotPassword.classList = 'col text-decoration-none text-start';
    
    wrapper = document.createElement('div');
    wrapper.classList = 'mt-4 mb-2 row';
    wrapper.appendChild(forgotPassword);
    return wrapper;
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

const createSigninForm = function() {
    form = document.createElement('form');
    form.action = 'signin';
    form.method = 'post';
    form.classList = "col shadow align-self-center bg-white border border-2 border-white text-center rounded-3 p-5 justify-content-center position-absolute top-50 start-50 translate-middle";
    form.style="width: 30%; min-width: 300px;"

    logo = getLogo();
    username = createInput("text", "form-control", "inputLogin", "Имя пользователя");
    password = createInput("password", "form-control", "inputPassword", "Пароль");

    forgotPassword = createForgotPassword();
    grid = createButtonGrid([
        {
            'bTag': 'input',
            'bClass': 'btn-primary',
            'bType': 'submit',
            'bText': 'Войти',
        },
        {
            'bTag': 'button',
            'bClass': 'btn-secondary',
            'bType': 'button',
            'bText': 'Зарегистрироваться',
        },
    ])

    form.appendChild(logo);
    form.appendChild(username);
    form.appendChild(password);
    form.appendChild(forgotPassword);
    form.appendChild(grid);
    return form;
}

document.getElementById('siteTitle').textContent = 'Вход';
root = document.getElementById('root');
form = createSigninForm();
root.appendChild(form);