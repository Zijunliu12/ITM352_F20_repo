var fs = require('fs');

var filename = 'user_data.json';

if (fs.existsSync(filename)){

fileStats = fs.statSync(filename);
console.log("File: " + filename + " has " + fileStats.size + " characters");

data = fs.readFileSync(filename, 'utf-8');
console.log("success! We got: " + data);

user_data = JSON.parse(data);
console.log("User_data = ", user_data);

} else {
    console.log("sorry cant read file" + filename)
}