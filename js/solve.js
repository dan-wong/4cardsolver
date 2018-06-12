function solve() {
    var one = document.getElementById("valueOne").value;
    var two = document.getElementById("valueTwo").value;
    var three = document.getElementById("valueThree").value;
    var four = document.getElementById("valueFour").value;

    var values = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
    for (var i=0; i<4; i++) {
        if (!checkValidValue(values[i])) {
            alert("Values must be greater than 0 and less than 14!");
            return;
        }
    }

    document.getElementById('answer').innerHTML = "Computing...";
    FOUND = false;
    recursiveNumberGeneration(new Array(), values);
    if (!FOUND) {
        document.getElementById('answer').innerHTML = "Unsolvable :/";
    }
}

function recursiveNumberGeneration(existing, remaining) {
    if (remaining.length == 0) {
        var tempExisting = existing.slice();
        recursiveMath('', tempExisting);
    } else {
        for (var i=0; i<remaining.length; i++) {
            var tempRemaining = remaining.slice();
            tempRemaining.splice(i, 1);
            
            var tempExisting = existing.slice();
            tempExisting.push(remaining[i]);

            recursiveNumberGeneration(tempExisting, tempRemaining);
        }
    }
}

var target = 24;
var FOUND = false;
var mathOperators = ['+', '-', '*', '/'];
function recursiveMath(existing, remaining) {
    if (remaining.length == 0) {
        console.log(existing + ", " + math.eval(existing));
        if (math.eval(existing) == 24) {
            document.getElementById('answer').innerHTML = existing + " = 24";
            FOUND = true;
        }
    } else {
        if (FOUND) { //If found, don't look for any further answers
            return;
        }

        for (var i=0; i<mathOperators.length; i++) {
            for (var j=0; j<remaining.length; j++) {
                var tempRemaining = remaining.slice();
                tempRemaining.splice(j, 1);
                
                var newExisting;
                if (existing.length == 0) {
                    newExisting = existing.concat(remaining[j]);
                } else {
                    newExisting = existing.concat(mathOperators[i]).concat(remaining[j]);
                }

                recursiveMath(newExisting, tempRemaining);
            }
        }
    }
}

function checkValidValue(value) {
    return (value > 0) && (value <= 13);
}