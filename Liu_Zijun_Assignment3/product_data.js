//"stock : " + Math.floor(Math.random() * 10) + 5)
Green =
[
    {
        "name" : "Fruity Green",
        "price" : "5.00",
        "image" : "Fruity_Green.jpg"
        
    },

    {
        "name" : "Grape Green",
        "price" : "8.00",
        "image" : "Grape_GreenTea.jpg"
    },

    {
        "name" : "Kyobancha",
        "price" : "12.00",
        "image" : "Kyobancha.jpg"
    },

    {
        "name" : "Sencha",
        "price" : "19.00",
        "image" : "Sencha.jpg"
    },

    {
        "name" : "Strawberry Vanilla",
        "price" : "8.00",
        "image" : "Strawberry_Vanilla.jpg"
    }


];
Black =
[
    {
        "name" : "Cookie",
        "price" : "4.00",
        "image" : "Cookie.jpg"
    },

    {
        "name" : "Japanese Cherry",
        "price" : "7.00",
        "image" : "Japanese_Cherry.jpg"
    },

    {
        "name" : "Peach",
        "price" : "6.00",
        "image" : "Peach.jpg"
    },

    {
        "name" : "Rose",
        "price" : "13.00",
        "image" : "Rose.jpg"
    },

    {
        "name" : "Strawberry",
        "price" : "10.50",
        "image" : "Strawberry.jpg"
    }


];
Oolong =
[
    {
        "name" : "Golden Osmanthus",
        "price" : "15.00",
        "image" : "Golden_Osmanthus.jpg"
    },

    {
        "name" : "Mango Oolong",
        "price" : "13.00",
        "image" : "Mango_Oolong.jpg"
    },

    {
        "name" : "Melon Oolong",
        "price" : "14.00",
        "image" : "Melon_Oolong.jpg"
    },

    {
        "name" : "Peach Oolong",
        "price" : "9.00",
        "image" : "Peach_Oolong.jpg"
    },

    {
        "name" : "Taiwan Oolong",
        "price" : "7.00",
        "image" : "Taiwan_Oolong.jpg"
    }


];
White =
[
    {
        "name" : "Kotobuki",
        "price" : "25.00",
        "image" : "Kotobuki.jpg"
    },

    {
        "name" : "Lavender White",
        "price" : "22.00",
        "image" : "Lavender_White.jpg"
    },

    {
        "name" : "Melon White",
        "price" : "15.00",
        "image" : "Melon_White.jpg"
    },

    {
        "name" : "Mint White",
        "price" : "10.00",
        "image" : "Mint_White.jpg"
    },

    {
        "name" : "White Peony",
        "price" : "17.00",
        "image" : "White_Peony.jpg"
    }


];
Teas = {
    "Green": Green,
    "Black": Black,
    "Oolong": Oolong,
    "White": White
}
//Borrowed code from the lab13, This is for the server.js to read this array
if(typeof module != 'undefined') {
    module.exports.products = products;
  }