products =
[
    {
        "name" : "Jasmine Tea",
        "price" : "5.00",
        "image" : "jasmine.jpg"
    },

    {
        "name" : "Oolong Tea",
        "price" : "8.00",
        "image" : "oolong.jpg"
    },

    {
        "name" : "Matcha",
        "price" : "15.00",
        "image" : "matcha.jpg"
    },

    {
        "name" : "White Tea",
        "price" : "9.00",
        "image" : "white.jpg"
    },

    {
        "name" : "Rosemary Green tea",
        "price" : "9.00",
        "image" : "rosemary.jpg"
    }


];
//Borrowed code from the lab13, This is for the server.js to read this array
if(typeof module != 'undefined') {
    module.exports.products = products;
  }