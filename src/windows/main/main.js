const fs = require('fs');

document.querySelector('#userForm').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    let success = false;
    fs.readFile(`${__dirname}../../../../db/users.json`, (err, data) => {
        data = JSON.parse(data.toString())
        data.forEach(elm => {
            if (username === elm.user && password === elm.password) {
                success = true;
                window.location = `../password/password.html?user=${elm.user}`;
            }
        });

        if (!success) {
            alert('Worng username or password');
        }
    });
})