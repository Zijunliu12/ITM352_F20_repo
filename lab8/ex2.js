var age = 20;
var count = 0;



while (count <= 20){

    

    if (count >= age/2 && count <= age * 3/4){
        
        
        console.log("no age zone");
        count++;
        continue;
    }
    
    console.log(count);
    count++;
    
}
console.log("I'm old!");
