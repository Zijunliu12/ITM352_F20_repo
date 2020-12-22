var fs = require('fs');

var filename = "user_data.json";

data = fs.readFileSync(filename, 'utf-8');
console.log("success! We got: " + data);
user_data = JSON.parse(data);

username = 'newuser2';
user_data[username] = {};
user_data[username].name = "zjan";
user_data[username].password = "123";
user_data[username].email = "zi123@hawaii.edu";

data = JSON.stringify(user_data);
fs.writeFileSync(filename, data, "utf-8");