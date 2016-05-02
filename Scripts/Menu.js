var menuState = false;

// Content style
var circleElement = document.getElementById("Circle").style;
var triangelElement = document.getElementById("Triangel").style;
var rectElement = document.getElementById("Rect").style;
var circleLineElement = document.getElementById("CircleLine").style;
var gradientElement = document.getElementById("Gradient").style;
var imageElement = document.getElementById("Image").style;
//MenuStuff
var myCount = 0;
function menuShow() {
    updateWidthHight();
    var setValue = -50;
    if(getMenuWidth() < 768)
    {
      setValue = -100;
    }
    if (menuState) {

        var setClear = setInterval(function () {
            if (myCount <= 0 && menuState === true) {
                document.getElementById("nav").style.right = myCount + "vw";

                myCount++;
            }
            else {
                menuState = false;
                clearInterval(setClear);
            }
        }, 5);

    }

    else {
        var setClear2 = setInterval(function () {
            if (myCount < setValue) {
                menuState = true;
                clearInterval(setClear2);
            }
            else {
                document.getElementById("nav").style.right = myCount + "vw";

                myCount--;
            }
        }, 5);


    }
}

function getMenuWidth(){
  var element = document.getElementById('nav'),
    style = window.getComputedStyle(element),
    width = style.getPropertyValue('width');
    var regex = /(\d+)/g;
    var numb = width.match(regex)
    return numb;
}






/* Change to content based on the chosen draw option*/
/* Might be a better option for this */

function drawContentChange() {
    switch (contentState) {
        case 1:
            circleElement.display = "none";
            circleElement.visibility = "hidden";
            break;
        case 2:
            triangelElement.display = "none";
            triangelElement.visibility = "hidden";
            break;
        case 3:
            rectElement.display = "none";
            rectElement.visibility = "hidden";
            break;

        case 4:
            gradientElement.display = "none";
            gradientElement.visibility = "hidden";

            break;
        case 5:
            circleLineElement.display = "none";
            circleLineElement.visibility = "hidden";
            break;
        case 6:
            imageElement.display = "none";
            imageElement.visibility = "hidden";
            

    }


}

function changeContent(value) {
    drawContentChange();

    document.getElementById("h2Value").innerHTML = "Values for a: " + value;
    switch (value) {
        case "Circle":
            circleElement.visibility = "visible";
            circleElement.display = "block";
            contentState = 1;
            break;
        case "Triangle":
            triangelElement.visibility = "visible";
            triangelElement.display = "block";
            contentState = 2;
            break;
        case "Box":
            rectElement.visibility = "visible";
            rectElement.display = "block";
            contentState = 3;
            break;
        case "Gradient":

            gradientElement.visibility = "visible";
            gradientElement.display = "block";
            contentState = 4;
            break;
        case "CircleLine":
            circleLineElement.visibility = "visible";
            circleLineElement.display = "block";
            contentState = 5;
            break;
        case "Image":
            imageElement.visibility ="visible";
            imageElement.display = "block";
            contentState = 6;
            break;
    }
}

changeContent("Circle");
