const fs = require('fs');
const ul = document.querySelector('ul');
const { clipboard } = require('electron');

const name = searchFor('user');

document.querySelector('#name').innerHTML = name;

fs.readFile(`${__dirname}../../../../db/passwords.json`, (err, data) => {
    if (err) {
        console.log(`Error: ${err}`);
        return;
    }
    data = JSON.parse(data.toString())[name];

    data.forEach(elm => {
        ul.innerHTML += `
                <li class="list-item">
                    <p>${elm.website} :</p><button class="passBtn" id="${elm.password}">Copy</button>
                </li>
                `
    });

    document.querySelectorAll('.passBtn').forEach(elm => {
        elm.addEventListener('click', (e) => {
            const text = e.target.id;
            clipboard.writeText(text);
            alert('Text copied');
        })
    });
})


function searchFor(name) {
    let string = window.location.search.substring(name.length + 2);
    return string;
}