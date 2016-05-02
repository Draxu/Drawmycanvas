

var colorDraw =  function(id, color){
  this.id = id;
  this.color = color;
}

function colorPickerValue(){
  var testColor = document.getElementById("colorPicker").value;
  storeColorsDisplay(testColor);
}

//Display the stored colors in the div
//Needs id ?

function storeColorsDisplay(color){
  addColorFromPicker(color);
  var div = document.getElementById("storedColors");
  var innerDiv = document.createElement("div");
  var colorBox = document.createElement("input");
  var colorTextBlock = document.createElement("span");
  var imgEdit = document.createElement("img");
  var deleteSpan = document.createElement("span");
  var deleteText = document.createTextNode("[x]");
  var deleteId = "delete"+id;
  var divId = "div"+id;
  colorBox.setAttribute("type","color");
  colorBox.style.cssText  = "height: 20px;width: 20px;background-color:transparent;border:none;display: inline-block;";
  colorBox.className = "colorBox";
  colorBox.setAttribute("value", color);
  colorBox.setAttribute("oninput", "onColorChange(this,this.value)");
  deleteSpan.setAttribute("id",deleteId);
  deleteSpan.appendChild(deleteText);
  deleteSpan.className = "deleteIcon";
  colorTextBlock.textContent = color;
  innerDiv.setAttribute("id", divId);
  innerDiv.appendChild(colorBox);
  innerDiv.appendChild(colorTextBlock);

  innerDiv.appendChild(deleteSpan);
  div.appendChild(innerDiv);
  deleteAddClick(deleteId);
  idIncrement();
}


function addColorFromPicker(color){
  var id = returnId();
  var tempColor = new colorDraw(id,color) ;
  colorList.push(tempColor);
}

var hexArray = ["0", "1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
function generateRandomColors(){
  for (var i = 0; i < 20; i++) {
    var makeColor = makeHex();
    storeColorsDisplay(makeColor);

  }
}
function randomColorNumber(){
  return Math.floor((Math.random() * hexArray.length));
}
function makeHex(){
  return "#" + hexArray[randomColorNumber()]  + hexArray[randomColorNumber()] + hexArray[randomColorNumber()] +
    hexArray[randomColorNumber()]  + hexArray[randomColorNumber()] + hexArray[randomColorNumber()];
}

function deleteColors() {
    colorList = [];
}
function colorPickerSpan(){

}
window.onload = generateRandomColors();
var colorBox = document.getElementsByClassName("colorBox");



function convertRGBToHex(colorString){

  var rgbString = colorString.slice(4,colorString.length-1);
  var rgbArray = rgbString.split(",");
  var hexColor = "#";
  for (var i = 0; i < rgbArray.length; i++) {
    hexColor += hexArray[Math.ceil((rgbArray[i] / 16) -1)];
    hexColor += hexArray[rgbArray[i] % 16];

  }
  return hexColor;

}

function onColorChange(current,value){
  var holdColor = value;
  var divId = current.parentNode.getAttribute("id");
  var getParentNote = document.getElementById(divId);
  var childElements = getParentNote.childNodes;
  var id = parseInt(divId.slice(3,divId.length));
  var test2 = findArrayPosition(id, false);
  var tempColor = new colorDraw(id,holdColor);
  var getArray = getColorList();
  var newColorList = getArray.splice(test2[0], 1, tempColor);

  childElements[1].innerHTML = value;

}
