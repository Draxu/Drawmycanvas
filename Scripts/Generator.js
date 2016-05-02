//Instance variable
var wW = window.innerWidth;
var wh = window.innerHeight;
var points = 0;
var grow = 10;
var c = document.getElementById("myCanvas");
//Input variable from the user input
var updateInput = 0;
var inputHeight = 0;
var inputWidth = 0;
var inputGrow = 250;
var inputGrowReset = 100;
var stop = false;
var contentState = 4;
var drawRandom = false;
var id = 0;
// Content style

//Sets the screen hight to something
c.width = wW;
c.height = wh;

var ctx = c.getContext("2d");

//Arrays
var storeUserInputs = [];
var circleList = [];
var jsonList = { position: [] };
var drawingOptions = { values : [] };
//All the colors that will be drawn on the screen.

// circle object might not need this
var circle = function (x, y, radius, sAngle, eAngle, clockwise) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sAngle = sAngle;
    this.eAngle = eAngle;
    this.clockwise = clockwise;

}

//The array that holds the colors
var colorList = [];

/*
addColorsToColorList();
addColorsToDdl();
*/
function getColorList(){
  return colorList;
}

function getCtx(){
  return ctx;
}
// calculate a random number based on the width
function randomNumber() {
    return Math.floor((Math.random() * window.innerWidth) -1);
}
function randomNumberHight(){
    return Math.floor((Math.random() * window.innerHeight) -1);
}

// Function that draws the symbols on the screen by calling the other functions
function addRandomStuff() {
    var myInterval = setInterval(function(){
    if(stop){
        clearInterval(myInterval);
        return null;
    }

    var ccCount = 10;
    var xxCount = 0;
    var whatToDraw = Math.floor(Math.random() * storeUserInputs.length);
    var numb = storeUserInputs[whatToDraw];
        switch (numb.type) {
            case "Circle":
                drawCircle();
                break;
            case "Triangle":
                drawTriangel();
                break;
            case "Box":
                drawRect();
                break;
            case "Gradient":
                drawGradiant();
                break;
            case "CircleLine":
                drawRandomCircleLine();
                break;
            case "Image":
                drawImageOnCanvas(numb.img, randomNumber(),randomNumberHight());
              break;
            default :
                stopDraw();
                break;
    }



    if (points > inputGrow) {
        points = 0;
        grow += 2;

    }

    if (grow > inputGrowReset) {
        grow = 20;
    }


    //

    })
}

function incrementPoint() {
    points++;
}

function update() {
    if(stop){
        stop = false;
    }


    addRandomStuff();
}

function randomColor() {
    return Math.floor((Math.random() * colorList.length));
}

// -- Random Draws --
// Make it so the random is just places in the user input storage and print. it that way and remove the 3 functions under
// Draw the Random Triangel


function randomTen(){
    return Math.floor((Math.random() * 2))
}
// Random number based on user Input array
function randomInputNumber() {
    return Math.floor(((Math.random() * storeUserInputs.length) + 1) - 1);
}
//
function pushStoreUserInputs(item){
    storeUserInputs.push(item);
}

function getStoreUserInputs(){
    return storeUserInputs;
}



function drawRandomCircleLine(){
    var color = randomColor();
    var myRadius = Math.floor((Math.random() * 50) +1);
    ctx.beginPath();

    if(circleList.length === 0){
        var circle1 = new circle(randomNumber(),randomNumberHight(),myRadius,0,2 * Math.PI);
        ctx.arc(circle1.x, circle1.y, circle1.radius, circle1.sAngle, circle1.eAngle);
        circleList.push(circle1);
        makeJson(circle1.x, circle1.y);
    }
    else {
        var test = circleList[circleList.length -1];
        var testX = circleList[circleList.length -1].x;
        var testY = circleList[circleList.length -1].y;
        var test1 = randomTen();
        var test2 = randomTen();
        if(test1 === 1){
            test1 = myRadius;
            if((testX + test1) > wW){
                test1 = -myRadius;
            }
        }
        else {
            test1 = -myRadius;
            if((testX - test1) < 0){
                test1 = myRadius;
            }
        }
        if(test2 === 1){
            test2 = myRadius;
            if((testY + test2) > wh){
                test2 = -myRadius;
            }
        }
        else {

            test2 = -myRadius;
            if((testY - test2) < 0){
                test2 = myRadius;
            }
        }

        var circle2 = new circle(testX + test1, testY + test2, test.radius, test.sAngle, test.eAngle);
        ctx.arc(circle2.x, circle2.y, circle2.radius, circle2.sAngle, circle2.eAngle);
        circleList.push(circle2);
        //makeJson
    }

    ctx.lineWidth =5;
    ctx.fillStyle = colorList[color].color;
    ctx.fill();
}

// -- Non Random drawings this is based on user inputs
// Draw the Triangel
function drawTriangel() {
    ctx.beginPath();
    ctx.moveTo(randomNumber(), randomNumberHight());
    ctx.lineTo(randomNumber(), randomNumberHight());
    ctx.lineTo(randomNumber(), randomNumberHight());
    //ctx.fillStyle = colorList[randomColor()];
    //ctx.fill();

    ctx.strokeStyle = colorList[randomColor()].color;
    ctx.stroke();
    incrementPoint();
}

function drawGradiant(){
    var myRadius = Math.floor((Math.random() * 50) +1);
    var storeNumber = randomInputNumber();
    var holdNumbers = [];
    var userInputs = storeUserInputs[storeNumber];

    //Might be a better way to do this
    if(userInputs.x === "" && !isNaN(userInputs.x)){
        holdNumbers.push(randomNumber());
    }
    else {
        holdNumbers.push(userInputs.x)
    }

    if(userInputs.y === "" && !isNaN(userInputs.y)){
        holdNumbers.push(randomNumberHight());
    }
    else {
        holdNumbers.push(userInputs.y)
    }

    if(userInputs.r === "" && !isNaN(userInputs.r)){
        holdNumbers.push( randomNumberHight() +1);
    }
    else {
        holdNumbers.push(40)
    }

    if(userInputs.x1 === "" && !isNaN(userInputs.x1)){
        holdNumbers.push(randomNumber());
    }
    else {
        holdNumbers.push(userInputs.x1)
    }

    if(userInputs.y1 === "" && !isNaN(userInputs.y1)){
        holdNumbers.push( randomNumberHight());
    }
    else {
        holdNumbers.push(userInputs.y1)
    }

    if(userInputs.r1 === "" && !isNaN(userInputs.r1)){
        holdNumbers.push(40);
    }
    else {
        holdNumbers.push(userInputs.r1)
    }
    var randomColor1 = randomColor();
    var randomColor2 = randomColor();
    var randomColor3 = randomColor();

    var grad = ctx.createRadialGradient(holdNumbers[0],holdNumbers[1], holdNumbers[2],holdNumbers[3],holdNumbers[4],holdNumbers[5]);

    grad.addColorStop(0, colorList[randomColor1].color);
    grad.addColorStop(0.5, colorList[randomColor2].color);
    grad.addColorStop(1, colorList[randomColor3].color);

    ctx.fillStyle = grad;
    ctx.fillRect(holdNumbers[0], holdNumbers[1], 400, 400);
}

// Draw the Random Rect
function drawRect() {
    var storeNumber = randomInputNumber();
    var holdNumbers = [];
    var userInputs = storeUserInputs[storeNumber];

    if(userInputs.x === "" && !isNaN(userInputs.x)){
        holdNumbers.push(randomNumber());
    }
    else {
        holdNumbers.push(userInputs.x);
    }

    if(userInputs.y === "" && !isNaN(userInputs.y)){
        holdNumbers.push(randomNumberHight());
    }
    else {
     holdNumbers.push(userInputs.y);
    }

    if(userInputs.width === "" && !isNaN(userInputs.width)){
        holdNumbers.push(randomNumber() / 20);
    }
    else {
        holdNumbers.push(userInputs.width);
    }

    if(userInputs.height === "" && !isNaN(userInputs.height)){
        holdNumbers.push( randomNumberHight() / 20);
    }
    else {
        holdNumbers.push(userInputs.height);

    }
    ctx.strokeStyle = colorList[randomColor()].color;
    ctx.fillStyle = colorList[randomColor()].color;
    ctx.fillRect(holdNumbers[0],holdNumbers[1],holdNumbers[2],holdNumbers[3]);

    //ctx.strokeStyle = colorList[randomColor()];
    ctx.stroke();

}

// Draw the Circle
function drawCircle() {
    var storeNumber = randomInputNumber();
    var userInputs = storeUserInputs[storeNumber];
    var color = randomColor();
    var holdNumbers = [];
    var myRadius = Math.floor((Math.random() * grow) + 1);

    ctx.beginPath();

    if(storeUserInputs[storeNumber].x ===  "" && !isNaN(userInputs.x)){
        holdNumbers.push(randomNumber());
    }
    else {
        holdNumbers.push(userInputs.x);
    }

    if(storeUserInputs[storeNumber].y ===  "" && !isNaN(userInputs.y)){
        holdNumbers.push(randomNumberHight());
    }
    else {
        holdNumbers.push(userInputs.y);
    }

    if(storeUserInputs[storeNumber].radius ===  "" && !isNaN(userInputs.radius)){
        holdNumbers.push(myRadius);
    }
    else {
        holdNumbers.push(userInputs.radius);
    }

    if(storeUserInputs[storeNumber].sAngle ===  "" && !isNaN(userInputs.sAngle)){
        holdNumbers.push(randomNumber());
    }
    else {
        holdNumbers.push(userInputs.sAngle);
    }

    if(storeUserInputs[storeNumber].eAngle ===  "" && !isNaN(userInputs.eAngle)){
        holdNumbers.push(randomNumber());
    }
    else {
        holdNumbers.push(userInputs.eAngle);
    }

    ctx.arc(holdNumbers[0],holdNumbers[1],holdNumbers[2],holdNumbers[3],holdNumbers[4]);

    ctx.lineWidth = 5;
    ctx.fillStyle = colorList[color].color;
    ctx.fill();
    ctx.strokeStyle = colorList[randomColor()].color;
    ctx.stroke();

    incrementPoint();

    //makeJson(circle1.x, circle1.y);

}

/*Json Stuff*/
function makeJson(x, y) {
    jsonList.position.push({
        "x": x,
        "y": y

    })

}


function stopDraw() {
    stop = true;
}


/* adds all the colors to the drop down list so the user can choose */
function addColorsToDdl() {
    var ddl = document.getElementById("ddlColor");
    var myColors = getColors();
    for (var i = 0; i < myColors.length; i++) {
        var option = document.createElement("option");
        option.text = myColors[i];
        option.value = myColors[i];
        ddl.add(option);
    }
}




function getCurrentDdlItem(){
  var e = document.getElementById("ddlDrawOptions");
  var strUser = e.options[e.selectedIndex].value;
  return strUser;
}


/* Gets the User inputs and ands them to a instance variable */
/* this might be a bad way but w/e */

//Circle User inputs
function getCircleLineInputs() {
    var circleInput = {
        id : id,
        type: "CircleLine",
        x: document.getElementById("txtRectX").value,
        y: document.getElementById("txtRectY").value,
        height: document.getElementById("txtRectHeight").value,
        width: document.getElementById("txtRectWidth").value,
        randomRange: document.getElementById("txtCircleLineRandom").value
    }
    storeDrawingValues(circleInput);
    update();
}

//Rename to line?
function getTriangleInputs() {
    var triangelInput = {
    id : id,
    type : "Triangle",
    x : document.getElementById("txtRectX").value,
    y : document.getElementById("txtRectY").value,
    height : document.getElementById("txtRectHeight").value,
    width : document.getElementById("txtRectWidth").value,
    randomRange : document.getElementById("txtTriangelRandom").value
    }
    storeDrawingValues(triangelInput);
    update();
}

//Rect User inputs
function getRectInputs() {
    var rectInput = {
        id : id,
        type: "Box",
        x: document.getElementById("txtRectX").value,
        y: document.getElementById("txtRectY").value,
        height: document.getElementById("txtRectHeight").value,
        width: document.getElementById("txtRectWidth").value,
        randomRange: document.getElementById("txtBoxRandom").value
    }
    storeDrawingValues(rectInput);

    update();
}

function getCircleInputs() {
    var rectInput = {
        id : id,
        type: "Circle",
        x: document.getElementById("txtCircleX").value,
        y: document.getElementById("txtCircleY").value,
        radius: document.getElementById("txtCircleRadius").value,
        sAngle: document.getElementById("txtCircleStartAngle").value,
        eAngle: document.getElementById("txtCircleEndAngle").value,
        randomRange: document.getElementById("txtCircleRandom").value
    }
    storeDrawingValues(rectInput);

    update();
}
function getGradintInput(){
    var gradInput = {
        id : id,
        type : "Gradient",
        x : document.getElementById("txtGradX").value,
        y : document.getElementById("txtGradY").value,
        r : document.getElementById("txtGradR").value,
        x1 : document.getElementById("txtGradX1").value,
        y1 : document.getElementById("txtGradY1").value,
        r1 : document.getElementById("txtGradR1").value,
        randomRange : document.getElementById("txtGradRandom").value,
    }
    storeDrawingValues(gradInput);
    update();
}

function idIncrement(){
    id++;

}
function returnId(){
  return id;
}

// Drawing stored drawing values
function storeDrawingValues(inputObject) {
    idIncrement();
    displayStoreDrawing(inputObject)
    storeUserInputs.push(inputObject);
}

function displayStoreDrawing(inputObject){
    var storeOptionBox = document.getElementById("StoredOptions");
    var div = document.createElement("div");
    var span = document.createElement("span");
    var img = document.createElement("img");

    if(inputObject.type === "Image"){
      var divText = document.createTextNode(inputObject.imgName);
    }
    else {
      var divText = document.createTextNode(inputObject.type);
    }
    var spanText = document.createTextNode("[x]");
    var deleteId = "delete" + inputObject.id;
    var editId = "edit" + inputObject.id;
    var divId = "div" +  inputObject.id;
    div.style.width = "33%";
    div.style.cssText = "float:left;width: 33%;";
    storeOptionBox.appendChild(div);

    img.src = "Img/ic_edit_black_48dp.png";
    img.className = "editIcon";
    img.setAttribute("id", editId);
    span.className = "deleteIcon";
    span.appendChild(spanText);
    span.setAttribute("id",deleteId);

    div.setAttribute("id", divId)
    div.appendChild(divText);
    div.appendChild(img);
    div.appendChild(span);
    deleteAddClick(deleteId);
    editAddClick(editId);
}


function findArrayPosition(id, deleteOr){
  var concatArray = storeUserInputs.concat(colorList);
  var A0 = storeUserInputs.length;
  for(i = 0; i < concatArray.length; i++){
    if(id === concatArray[i].id)
    {
      if(i >= A0)
      {
        if(deleteOr){
            colorList.splice(i - A0,1);
        }
        else {
          return [i - A0, "color"];
        }
      }
      else {
        if(deleteOr){
            storeUserInputs.splice(i,1);
        }
        else {
          return [i, "type"];
        }

      }

    }

  }
}

function deleteAddClick(id){
    var getsTheId = document.getElementById(id);
    getsTheId.addEventListener("click", function(){removeStoredDrawingDiv(id);}, false);
}
function editAddClick(id){
    var getsTheId = document.getElementById(id);
    getsTheId.addEventListener("click", function(){editStoredDrawingDiv(id);}, false);
}

// Fix the testTrue boolean right now only 1 menu can be open at a time
//adds the input fields with values etc.
var testTrue = true;
function editStoredDrawingDiv(id){
    var idTest = parseInt(id.slice(4,id.length));
    if(!testTrue){
      deleteEditDiv("editDiv"+idTest);
      return null;
    }
    else {
    testTrue = false;
    var editDiv = document.getElementById("div"+idTest);

    var editDivDiv = document.createElement("div");
    editDivDiv.setAttribute("id","editDiv"+idTest);
    var arrayPosition = findArrayPosition(idTest, false);



    editDiv.appendChild(editDivDiv);
    editDivDiv.appendChild(document.createElement("br"));

    var o = storeUserInputs[arrayPosition[0]];
    for (var p in o) {
        var inputField = document.createElement("input");
        inputField.setAttribute('type', 'text');
        inputField.setAttribute('value', o[p]);
        inputField.setAttribute('id', p);
        inputField.setAttribute('placeholder', p);
        editDivDiv.appendChild(inputField);

    }
    }
}

// Deletes all the input fieldes of the chosen edit element
function deleteEditDiv(id){

   var current = document.getElementById(id);
   while (current.hasChildNodes()){
     current.removeChild(current.lastChild);
   }
   current.remove();
   testTrue = true;

}


//This function deletes all the elements in the stored value div
//it also calls the remove from array function and delete the element
function removeStoredDrawingDiv(id){
    var current = document.getElementById(id);
    var getParent = current.parentNode;
    var getsTheId = document.getElementById(getParent.getAttribute('id'));
    while (getsTheId.firstChild) {
      getsTheId.removeChild(getsTheId.firstChild);
    }
    removeFromStoreArray(id);
}

function removeFromStoreArray(id){
  var idTest = parseInt(id.slice(6,id.length));

  findArrayPosition(idTest,true);
  if(storeUserInputs.length === 0){
    stopDraw();
  }

}


function clearCanvas(){
    ctx.clearRect(0,0,wW,wh);
}

function updateWidthHight(){
    if(wW != window.innerWidth || wh != window.innerHeight){
    wW = window.innerWidth;
    wh = window.innerHeight;

    c.width = window.innerWidth;
    c.height = window.innerHeight;
    }
}

function getCanvasHeight(){
  return window.innerHeight;
}

function getCanvasWidth(){
  return window.innerWidth;
}


function getInputs(){
  switch(getCurrentDdlItem()){
        case "Circle":
            getCircleInputs();
            break;
        case "Triangle":
            getTriangleInputs();
            break;
        case "Box":
            getRectInputs();
            break;
        case "Gradient":
            getGradintInput();
            break;
        case "CircleLine":
            getCircleLineInputs();
            break;
        case "Image":
            uploadImage();
          break;
  }
}




function getId(){
  idIncrement();
  return id;
}
