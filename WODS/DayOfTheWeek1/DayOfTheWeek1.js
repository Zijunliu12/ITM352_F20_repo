var Year = 2013;
var Month = 8;
var Day = 3;
var step4;
var Millennial_check;
var Leap_year = false;


var step1 = Year - 2000;
var step2 = step1/4;
step2 = parseInt(step2);

var step3 = step2 + step1;

if (Month == 1){
    var step5 = step3 + Day;
}else{

    switch(Month){
        case 2:
        step4 = 3;
        break;

        case 3:
        step4 = 3;
        break;

        case 4:
        step4 = 6;
        break;

        case 5:
        step4 = 1;
        break;

        case 6:
        step4 = 4;
        break;

        case 7:
        step4 = 6;
        break;

        case 8:
        step4 = 2;
        break;

        case 9:
        step4 = 5;
        break;

        case 10:
        step4 = 0;
        break;

        case 11:
        step4 = 3;
        break;

        case 12:
        step4 = 5;
        break;
    }

    var step6 = step3 + step4;
    var step7 = step6 + Day;
    var step8 = step7;


}

//Checks for 2000 or 1900
Millennial_check = String(Year).charAt(0);
Millennial_check = parseInt(Millennial_check);

//checks if leap year
if(Number.isInteger(Year/4)){
    if(Number.isInteger(Year/100)){
        if(Number.isInteger(Year/400)){
            Leap_year = true;
        }
    }
}

if (Millennial_check == 2){
    if(Leap_year){
        if(Month == 1 || Month == 2){
            step8 = step8 - 2;
        }else{
            step8 = step8 - 1;
        }
    }else{
        step8 = step8 - 1;
    }
}else if (Millennial_check == 1){
    if(Leap_year){
        if(Month == 1 || Month == 2){
            step8 = step8 - 1;
        }
    }
}

if (step8>7){
    step8 = step8%7;
}

switch (step8){

    case 0:
        console.log("Sunday");
        break
    case 1:
        console.log("Monday");
        break
    case 2:
        console.log("Tuesday");
        break
    case 3:
        console.log("Wednesday");
        break
    case 4:
        console.log("Thursday");
        break
    case 5:
        console.log("Friday");
        break
    case 6:
        console.log("Saturday");
        break

}