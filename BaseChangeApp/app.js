const element = document.getElementById("convert");
element.addEventListener("click", getInput);

function getInput (){

    var numinput = document.getElementById("numInput");
    var input = parseInt(numinput.value);
    // pahle ye string hi le lerha tha input, isiliye type conversion krna pda
    var baseInput = document.getElementById("base");
    var value = baseInput.options[baseInput.selectedIndex].value;
    // one more way to get the value of options

    // var base = baseInput.value;
    // if(base = 2){
    //     var result = input.toString(2);
    // }
    // else if(base = 8){
    //     var result = input.toString(8);
    // }
    // else if(base = 16){
    //     var result = input.toString(16);
    // }
    // else{
    //     var result = "Invalid Base";
    // }
    // console.log(value);


    // var content = document.getElementById("numInput");
    // content.innerHTML = "";
    numinput.value = null;
    //ah yeahh khud se dimag lagaya ye
    
    var output = document.getElementById("para1");
    output.innerHTML = "Your answer is : " + input.toString(value);

}

