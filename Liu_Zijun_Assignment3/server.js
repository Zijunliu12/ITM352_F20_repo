/* 
Author: ZIjun Liu
Class: ITM 352
Assignment 2: This is a server that hosts the E-Store...
 * It uses POST method to communicate data between products page and invoice page

Credits: Kazman Rick, Labs, Wods. w3school
some code was borrowed, modified, and used for reference from ITM 352 Wods, Labs, and from Author Kazman Rick.
*/

var express = require('express');
var app = express();
var myParser = require("body-parser");
var fs = require('fs');
const { exit } = require('process');
var cookieParser = require('cookie-parser');
var session = require('express-session');


app.use(cookieParser());
app.use(session({secret: "ITM352 rocks!", saveUninitialized: false, resave: false}));
app.use(myParser.urlencoded({ extended: true }));



app.get("/use_session", function (request, response) {
    //Print the value of the session ID
    response.send(`Welcome. Your session ID is ${request.session.id}`);
});

//Taken from lab14 (reads user_data.json)
var filename = "user_data.json";

if (fs.existsSync(filename)) {
    data = fs.readFileSync(filename, 'utf-8');
    //console.log("Success! We got: " + data);

    user_data = JSON.parse(data);
    console.log("User_data=", user_data);
} else {
    console.log("Sorry can't read file " + filename);
    exit();
}


//This is used if files were to be stored in different locations. Useful for larger websites with many moving parts and everyting cannot be in the main directory. Would be too confusing. 
app.use(express.static('.'));
app.use(myParser.urlencoded({ extended: true }));


//Takes the request from browser and displays the appropriate page, if not, it displays what were trying to reach if the page doesnt exist
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.get("/shop", function (request, response){
    sessionStorage.setItem('test', [1]);
    response.send(request.session.test);
});

//Used to display products and allow purchasing after successful login (code is taken from lab 14 and modified)
app.post("/Login", function (request, response){
    POST = request.body;
    user_name_from_form = POST["username"];
    password_from_form = POST["password"];

    //My work around to figuring out how to compare username case in-sensitive
    user_name_from_form =  user_name_from_form.toUpperCase();

if (user_data[user_name_from_form] != undefined && password_from_form == user_data[user_name_from_form].password){
    
    function delay(){
        return new Promise(Uname => {
            setTimeout(()=> {
                Uname(user_name_from_form);
            }, 2000);
        });
        
    }

    async function CookieGiver(){
        response.cookie('Account', user_name_from_form);
        const result = await delay();
        console.log(result);

    }
    
    CookieGiver();
    response.redirect('back');


} else {
    response.send('Failed log in! Wrong Username/Password. Please go back and try again')
}

});


//registering new user, writing information to user_data.json to allow for future logins (code taken/modified from lab14)
app.post("/process_register", function (request, response) {
    POST = request.body;
    user_name_from_form = POST["username"];

    //2nd part to my workaround with case in-sensitive (Just make everything uppercase, Will need revisiting for true proper case in-sensitive)
    user_name_from_form = user_name_from_form.toUpperCase();

    if (user_data[user_name_from_form] == undefined && POST['password'] != undefined) { // Validate user input

        if(POST['password'] == POST['repeat_password']){
        user_data[user_name_from_form] = {};
        user_data[user_name_from_form].name = user_name_from_form;
        user_data[user_name_from_form].password = POST['password'];
        user_data[user_name_from_form].email = POST['email'];

        data = JSON.stringify(user_data);
        fs.writeFileSync(filename, data, "utf-8");

        var contents = fs.readFileSync('./Logged_In_Display.view', 'utf8');
        response.send(eval('`' + contents + '`')); // render template string
        function write_products(){
            
            write = '';
            for(i = 0; i<products.length; i++){
                      
                write += `
                <section>
                    <div class="w3-container w3-dark-grey	">
                    <h2>${products[i].name}-$${products[i].price}</h2></div>
                    <h5><label id="quantity${i}_label">Quantity</label></h5>
                    <input type="text" value=0 name="quantity${i}" onkeyup="checkQuantityTextbox(this);">
                    <img src="./images/${products[i].image}">
                </section>
                
                `;
                }
                return write;
                
        }
        //used to display logged in user
        function Personalize(){
            User = `<p>Logged in as ${user_name_from_form}</p>`;
                return User;
            }

        }else{
            response.send('Password did not match! Please go back and try again!');
        }

    }else{
        response.send('Username already taken! Please go back and register again!');
    }
});


//Recieves the POST information sent from products page and loads the invoice page
app.post("/process_form", function (request, response) {
    let POST = request.body;

var contents = fs.readFileSync('./invoice.view', 'utf8');
response.send(eval('`' + contents + '`')); // render template string


//Function to check for valid values 
function isNonNegInt(stringToCheck, returnErrors = false) {
    errors = []; // assume no errors at first
    if(stringToCheck == "") stringToCheck = 0; //Blank inputs are treated as 0s
    if (Number(stringToCheck) != stringToCheck) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
    if (stringToCheck < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
    if (parseInt(stringToCheck) != stringToCheck) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
    if (stringToCheck == 0) errors.push('<font color="red">You did not buy anything!</font>');
    return returnErrors ? errors : (errors.length == 0);
}


//once invoice page is generated from the POST data being recieved, this function prints out the products alongside the POST information is used to calculate everything such as shipping, cost, total, tax..
function generate_invoice(){
    table = '';
    subtotal = 0;
    Counter = 0;

    //for loop used to generate and caluate each products within array
    for (i = 0; i<products.length; i++) {
        quantity_holder = 0;

        //can be further expanded on in the future. For now the purpose is to set any bad values POST data to 0 so the invoice page generates 0 for items users messed up on inputting a value
        if (isNonNegInt(POST[`quantity${i}`])){
            quantity_holder = POST[`quantity${i}`];
        }else{
            quantity_holder = 0;

        }

        //If the POST data is valid, not undefined then it goes through using the quantity inputted to calculate everything and generate the product row. This is in the for loop so it does this for every product
        if(quantity_holder>0){

    
            extended_price = products[i].price * quantity_holder;
            extended_price = extended_price.toFixed(2);
            extended_price = parseFloat(extended_price);
            subtotal += extended_price;
            table +=(`<tr>
            <td width="43%" style="text-align: center;">${products[i].name} </td>
            <td align="center" width="11%" style="text-align: center;">${quantity_holder}</td>
            <td width="13%" style="text-align: center;">\$${products[i].price}</td>
            <td width="54%" style="text-align: center;">\$${extended_price}</td>
          </tr>
          `);
        }else{
            Counter++;
            if (Counter == 5){
                response.send('It looks like you did not buy anything... Go back and buy something!');
            }
        }
    }


    //compute tax

    tax = subtotal * 0.0575;
    tax = tax.toFixed(2);
    tax = parseFloat(tax);

    //Pre-shipping total
    pre_total = subtotal + tax;
    pre_total = pre_total.toFixed(2);
    pre_total = parseFloat(pre_total);

    //compute shipping

    shipping = 0;
    if(pre_total == 0){
        shipping = 0;
    }else if (pre_total<50){
      shipping = 2;
    }else if (pre_total<=100 && pre_total>=50){
      shipping = 5;
    }else{
      shipping = pre_total * 0.05;
      shipping = shipping.toFixed(2);
      shipping = parseFloat(shipping);

    }

     //compute total

    total = subtotal + tax + shipping;
    total = total.toFixed(2);
    total = parseFloat(total);

    return table;
}


//personlize the invoice page by displaying username
function PersonalizeInvoice(){
    User = `<h1>Thank you ${user_name_from_form} for your purchase!</h1>`;
    return User;
}
});

//Taken from lab 14 redirects simple log in form
app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
    Log in to make your purchase!
    <body>
    <form action="/process_products" method="POST">
    <input type="text" name="username" size="40" placeholder="enter username" ><br />
    <input type="password" name="password" size="40" placeholder="enter password"><br />
    <input type="submit" value="Submit">
    </form>

    New user? Register with us!
    <form action="/register" method="GET">
    <input type="submit" value="Register Page">
    </form>
  </body>
    `;
    response.send(str);
});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
    <body>
    Register an Account with Kalm Tea!
    <form action="/process_register" method="POST">
    <input type="text" name="username" size="40" placeholder="enter username" minlength="4" maxlength="10" required><br />
    <input type="password" name="password" size="40" placeholder="enter password" minlength="6" required><br />
    <input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
    <input type="email" name="email" size="40" placeholder="enter email" required><br />
    <input type="submit" value="Submit">
    </form>
  </body>
    `;
    response.send(str);
});

//console log saying its hosting server on port 8080, This is useful to see if the server is hosted at the very end. Similar to Ping! and Pong! to know if it went through everything.
app.listen(8080, () => console.log(`Store online on port 8080`));