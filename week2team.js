//this function gets a value and returns it to the output id
function parrot() {
    let input = parseInt(document.getElementById("input").value);
    document.getElementById("output").innerHTML = input;
}


function sumUp() {
    let integer = parseInt(document.getElementById("integer").value);
    //console.log(integer);

    //verify the input is a number, not letters or nothing
    if (isNaN(integer)) {
        document.getElementById("sumOutput").innerHTML = "Please enter a number.";
    }
    else {
    let sum = 0;
        for (i = 1; i <= integer; i += 1) {
            sum = sum + i;
        let result = sum;
        document.getElementById("sumOutput").innerHTML = result;
        }
    }
    }

    function calculate () {
        //use parseFloat to accept decimal numbers
        let integer1 = parseFloat(document.getElementById("integer1").value);
        let integer2 = parseFloat(document.getElementById("integer2").value);

        //verify there is a number in each box
        if (isNaN(integer1) || (isNaN(integer2))) {
            document.getElementById("calcOutput").innerHTML = "Please enter a number for each box.";
        }
        else {
            document.getElementById("calcOutput").innerHTML = integer1 + integer2;
        }
        
        
    }