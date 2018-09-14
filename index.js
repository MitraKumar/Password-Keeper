const bcrypt = require('bcryptjs');
const fs = require('fs')
const saltRounds = 5;
const myPlaintextPassword = "Secret Password";
const someOtherPlaintextPassword = "Not a Secret Password";

bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        fs.readFile('password.json', function (err, data) {
            if (err) {
                concole.log(`Error: ${err}`);
                return
            }

            if (data.toString().length === 0) {
                const data = [{
                    'hash': hash
                }]
                fs.writeFile('password.json', JSON.stringify(data), function (err) {
                    if (!err) {
                        console.log("File Saved");
                    }
                })
                return
            }
            data = JSON.parse(data);
            data.push({
                'hash': hash
            })
            fs.writeFile('password.json', JSON.stringify(data), function (err) {
                if (!err) {
                    console.log("File Saved");
                }
            })
        })
    });
});

// fs.readFile('password.json', function (err, data) {
//     if (!err) {
//         data = JSON.parse(data);
//         bcrypt.compare(myPlaintextPassword, data.hash, function (err, res) {
//             console.log(res);
//         })
//         bcrypt.compare(someOtherPlaintextPassword, data.hash, function (err, res) {
//             console.log(res);
//         })
//     }
// })