var year = 2000;
var month = 4;
var day = 9;

var X;
var Month_number;
var year_position;
var leap_year;
var millennial


if(Number.isInteger(year/4)){
    if(Number.isInteger(year/100)){
        if(Number.isInteger(year/400)){
            leap_year = true;
}else{
    leap_year = false
}
    }else{
        leap_year = false
    }
}else{
    leap_year = false
}

X = year - 2000;
year_position = X/4;
year_position = parseInt(year_position);

X = X + year_position;

if (month == 1){
X = X + day;

}else{

switch (month){

case 2:
    Month_number = 3;
    break;

case 3:
    Month_number = 3;
    break;

case 4:
    Month_number = 6;
    break;

case 5:
    Month_number = 1;
    break;

case 6:
    Month_number = 4;
    break;

case 7:
    Month_number = 6;
    break;

case 8:
    Month_number = 2;
    break;
case 9:
    Month_number = 5;
    break;

case 10:
    Month_number = 0;
    break;

case 11:
    Month_number = 3;
    break;

case 12:
    Month_number = 5;
    break;

}
X = X + Month_number;
X = X + day;
}

millennial = String(year).charAt(0);
millennial = parseInt(millennial);

if (millennial == 2){
    if(leap_year){
        if(month == 1 || month ==2 ){
            X = X - 2;
        }else{
            X = X-1;
        }
    }else{
        X = X-1;
    }

}else if (millennial == 1){
    if(leap_year){
        if(month == 1 || month ==2 ){
            X = X - 1;
    }
}
}

if (X>7){
    X = X%7;
}

switch (X){
    case 0:
        console.log("Sunday");
        break;
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
        console.log("Saturday");
        break;
}