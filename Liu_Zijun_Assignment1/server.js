/* 
Author: ZIjun Liu
Class: ITM 352
Assignment 1: This is a server that hosts the E-Store...
 * It uses POST method to communicate data between products page and invoice page

Credits: Kazman Rick, Labs, Wods. w3school
some code was borrowed, modified, and used for reference from ITM 352 Wods, Labs, and from Author Kazman Rick.
*/

var express = require('express');
var app = express();
var myParser = require("body-parser");
var data = require('./product_data.js');
var products = data.products;
var fs = require('fs');

//This is used if files were to be stored in different locations. Useful for larger websites with many moving parts and everyting cannot be in the main directory. Would be too confusing. 
app.use(express.static('.'));
app.use(myParser.urlencoded({ extended: true }));


//Takes the request from browser and displays the appropriate page, if not, it displays what were trying to reach if the page doesnt exist
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

//Recieves the POST information sent from products page and loads the invoice page
app.post("/process_form", function (request, response,) {
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
        if(typeof POST[`quantity${i}`] !='undefined'){

    
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
});

//console log saying its hosting server on port 8080, This is useful to see if the server is hosted at the very end. Similar to Ping! and Pong! to know if it went through everything.
app.listen(8080, () => console.log(`Store online on port 8080`));