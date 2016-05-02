//first set upload image into canvas
var ctx = getCtx();

// Hold color objects
var holdStoreImages = [];
var holdFormatColors =  [];
//Get the width and hight of the current canvas
var canvasWidth =  getCanvasWidth();
var canvasHeight = getCanvasHeight();

//Upload an image that the user choose
function uploadImage(){

  var imgUp = document.getElementById("imgUp");

  var reader = new FileReader();
  reader.onload = function(){
    var dataURL = reader.result;
    var sliceString = imgUp.value;
    var number = sliceString.lastIndexOf("\\") + 1;
    var testString = sliceString.slice(number,sliceString.length);
    var img = new Image;
    img.src = dataURL;
    var imgStore = {
      type : "Image",
      id : returnId(),
      imgName : testString,
      img : img

    }
    storeDrawingValues(imgStore);
    update();
  };
  reader.readAsDataURL(imgUp.files[0]);
}

//this function draws the image on the canvas with img, x and y cordinates
function drawImageOnCanvas(img, x, y){
    ctx.drawImage(img,x ,y);
}


//
function storeImage(){
  var x = 0;
  var y = 0;
  var colorsArray;
  colorsArray = ctx.getImageData(0,0,canvasWidth,canvasHeight).data;
  for(i = 0; i < colorsArray.length; i++){

      var color1 = new color(colorsArray[i],colorsArray[i+1],colorsArray[i+2],colorsArray[i+3], x , y)
      holdFormatColors.push(color1);
      y++;
      if(y >= canvasWidth){
        x++;
        y = 0;
      }
    }
    alert("image has been stored to draw again click \"Redraw\"")
}



var color = function(R, G, B, A, X, Y){
  this.R = R;
  this.G = G;
  this.B = B;
  this.A = A;
  this.X = X;
  this.Y = Y;
}


var testArray = [];

function drawEveryThingAgain(){
  var imgData=ctx.createImageData(canvasWidth,canvasHeight);
  for(var i = 0; i < holdFormatColors.length; i+=4){
     imgData.data[i] = holdFormatColors[i].R;
     imgData.data[i+1] = holdFormatColors[i].G;
     imgData.data[i+2] = holdFormatColors[i].B;
     imgData.data[i+3] = holdFormatColors[i].A;
}
  holdFormatColors = [];
  return imgData;
}

function drawStoreImage(){
  canvasWidth = getCanvasWidth();
  canvasHeight  = getCanvasHeight();
  var imageData = drawEveryThingAgain();
  var newImg = new ImageData(imageData.data,canvasWidth,canvasHeight);

  ctx.putImageData(newImg,0,0);
  alert("the image has been redrawn");
}

var can = document.getElementById("myCanvas");
var btnDownload = document.getElementById("saveImg");

var imgNumber = 1;
btnDownload.addEventListener('click', function(){
  var image = can.toDataURL("image/png");
  btnDownload.href=image;
  btnDownload.download = "Image" + imgNumber + ".png";
  imgNumber++;
},false);
