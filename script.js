/*Acceder al elemento canvas para acceder al  contexto
  que permite manipular los atributos de canvas*/
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

 //funciones de color y grosor de línea
let color = "#000000"; // color por defecto es negro
let lineWidth = 1; // grosor de línea por defecto es 1

const colorPicker = document.getElementById("color-picker");
colorPicker.addEventListener("change", function() {
color = colorPicker.value;
});

const lineWidthPicker = document.getElementById("line-width");
lineWidthPicker.addEventListener("change", function() {
lineWidth = lineWidthPicker.value;
});


var radiopoligono = 100;
let x1, y1, x2, y2;

let dibujarlinea = false;
let dibujarCuadrado = false;
let dibujarcirculo = false;
let dibujarRectangulo = false;
let dibujarPoligono = false;
let dibujarpincel = false;

function seleccionarLinea() {
  dibujarlinea = true;
  dibujarCuadrado = false;
  dibujarcirculo = false;
  dibujarRectangulo = false;
  dibujarPoligono = false;
  dibujarpincel = false;
}

function seleccionarCuadrado() {
  dibujarlinea = false;
  dibujarCuadrado = true;
  dibujarcirculo = false;
  dibujarRectangulo = false;
  dibujarPoligono = false;
  dibujarpincel = false;
}

function seleccionarCirculo() {
  dibujarlinea = false;
  dibujarCuadrado = false;
  dibujarcirculo = true;
  dibujarRectangulo = false;
  dibujarPoligono = false;
  dibujarpincel = false;
}

function seleccionarRectangulo() {
  dibujarlinea = false;
  dibujarCuadrado = false;
  dibujarcirculo = false;
  dibujarRectangulo = true;
  dibujarPoligono = false;
  dibujarpincel = false;
}

function seleccionarPoligono() {
  dibujarlinea = false;
  dibujarCuadrado = false;
  dibujarcirculo = false;
  dibujarRectangulo = false;
  dibujarPoligono = true;
  dibujarpincel = false;
  canvas.addEventListener("click", function(event) {
    dibujarpoligono(canvas, document.getElementById("lados").value, radiopoligono, event.offsetX, event.offsetY);
  });
}

function seleccionarLapiz(){
  dibujarlinea = false;
  dibujarCuadrado = false;
  dibujarcirculo = false;
  dibujarRectangulo = false;
  dibujarPoligono = false;
  dibujarpincel = true;
}



//función para comenzar y terminar el dibujo, la mandaré llamar cada que se realice uno con los algoritmos
canvas.onmousedown = function(e) {
  x1 = e.clientX - canvas.offsetLeft;
  y1 = e.clientY - canvas.offsetTop;
}
canvas.onmouseup = function(e) {
  canvas.onmouseup = function(e) {
    x2 = e.clientX - canvas.offsetLeft;
    y2 = e.clientY - canvas.offsetTop;
    
    if(dibujarlinea) {
      bresenhamlinea(x1, y1, x2, y2);
    } else if (dibujarCuadrado) {
      dibujarcuadrado(x1, y1, x2, y2);
    } else if (dibujarcirculo) {
      var x0 = (x1 + x2) / 2;
      var y0 = (y1 + y2) / 2;
      var radio = Math.sqrt(Math.pow(x2 - x0, 2) + Math.pow(y2 - y0, 2));
      bresenhamcirculo(x0, y0, radio, color, lineWidth);
    } else if (dibujarRectangulo) {
      dibujarrectangulo(x1, y1, x2, y2);
    } else if (dibujarPoligono) {
      var x0 = (x1 + x2) / 2;
      var y0 = (y1 + y2) / 2;
      var radiopoligono = Math.sqrt(Math.pow(x2 - x0, 2) + Math.pow(y2 - y0, 2));
      dibujarpoligono(canvas, document.getElementById("lados").value, radiopoligono, x2, y2);
    }else if(dibujarpincel){
      dibujarPincel(canvas, context, color, lineWidth)
    }
  
  }
}
//funcion para borrar
function seleccionarBorrador() {
  color = "#ffffff"; // Establecer el color del lápiz a blanco
  lineWidth = 20; // Establecer el ancho de línea a 20
}

//funcion para dibujar 
  function dibujarPincel(canvas, context, color, lineWidth) {
      let X1, Y1;
      let dibujandoBorrador = false; // Bandera para saber si se está dibujando con el borrador
    
      // Función para dibujar
      const dibujar = (cursorX, cursorY) => {
        context.beginPath(); // Permite dibujar en otro lado del lienzo
        context.strokeStyle = dibujandoBorrador ? "#ffffff" : color; // Usar el color adecuado
        context.lineWidth = dibujandoBorrador ? 20 : lineWidth; // Usar el ancho de línea adecuado
        context.lineCap = "round";
        context.moveTo(X1, Y1);
        context.lineTo(cursorX, cursorY);
        context.stroke();
    
        X1 = cursorX;
        Y1 = cursorY;
      }
    
      // Obtener las variables con el mouse
      const mouseClick = (evt) => {
        X1 = evt.offsetX;
        Y1 = evt.offsetY;
        dibujandoBorrador = (color === "#ffffff"); // Si el color es blanco, se está dibujando con el borrador
        dibujar(X1, Y1);
        canvas.addEventListener("mousemove", mouseMoving);
      }
    
      // Que se mueva el trazo con el mouse
      const mouseMoving = (evt) => {
        dibujar(evt.offsetX, evt.offsetY);
      }
    
      // Función para cuando se suelta el click
      const mouseUp = (evt) => {
        canvas.removeEventListener("mousemove", mouseMoving);
      }
    
      // Escucha el evento del mouse
      canvas.addEventListener("mousedown", mouseClick);
      canvas.addEventListener("mouseup", mouseUp);
    }
  



  //algoritmo DDA
  /*function DDAlinea(x1, y1, x2, y2) {

    var dx = x2 - x1;
    var dy = y2 - y1; 
    var aux = Math.max(Math.abs(dx), Math.abs(dy)); //toma el numero mayor
    var incX = dx / aux; //calcula el incremento de x según se va moviendo el numero de veces que itera (aux)
    var incY = dy / aux;

    var x = x1;
    var y = y1;
    context.moveTo(x1, y1); //aquí se define el punto inicial desde donde se comenzará a trazar la línea 
    for (var i = 0; i < aux; i++) { //con este ciclo voy realizando el incremento de X y Y
      x += incX;
      y += incY;
      context.lineTo(x, y);
    }
    context.stroke();
  }*/

//algoritmo de bresenham
function bresenhamlinea(x1, y1, x2, y2){

    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.lineCap = "round";
    context.moveTo(x1, y1);
    var deltaX = Math.abs(x2 - x1);
    var deltaY = Math.abs(y2 - y1); //pendiente
    if (x1 < x2) { //con estas condiciones se da la dirección en que se va a dibujar la línea (der o izq)
      var auxX = 1;
    } else {
      var auxX = -1;
    }

    if (y1 < y2) {
      var auxY = 1;
    } else {
      var auxY = -1;
    }
    var dif = deltaX - deltaY; //inicializar la variable de diferencia entre las coordenadas de la línea actual y la línea ideal
    while (true) {
      context.lineTo(x1, y1); //dibujo un pixel en la posicion actual del cursor según la iteración
      if (x1 == x2 && y1 == y2) break; //con esta condición verifico si ya llegó a la posición final y si sí, termina de dibujar la línea
      var acum = 2 * dif; //medida de la pendiente de la línea 
      if (acum > -deltaY) { //detemino si se debe mover el cursor en X o Y
        dif -= deltaY;
        x1 += auxX;
      }
      if (acum < deltaX) { //determino la dirección en que se va mover el cursor (si ya llegó al final)
        dif += deltaX;
        y1 += auxY;
      }
    }
    context.stroke();
  }




  //algoritmo de punto medio 
/*function puntomediolinea(x1, y1, x2, y2){

    var dx = x2 - x1;
    var dy = y2 - y1; 

    var aux = Math.max(Math.abs(dx), Math.abs(dy));

    var IncX = dx / aux; //calculo los incrementos 
    var IncY = dy / aux;

    var x = x1;
    var y = y1;

    for (var i = 0; i < aux; i++) { //aqui dibujo los puntos según la iteración y el incremento hasta que encuentre el final 
    context.fillRect(x, y, 1, 1);
    x += IncX;
    y += IncY;
    }
  }*/

  function dibujarcuadrado(x1, y1, x2, y2){
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.lineCap = "round";
        var tamaño = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
        context.moveTo(x1, y1);
        context.lineTo(x1 + tamaño, y1);
        context.lineTo(x1 + tamaño, y1 + tamaño);
        context.lineTo(x1, y1 + tamaño);
        context.lineTo(x1, y1);
        context.stroke();

    }

  function dibujarrectangulo(x1, y1, x2, y2) {
   context.beginPath();
   context.strokeStyle = color;
   context.lineWidth = lineWidth;
   context.lineCap = "round";

    var width = Math.abs(x1 - x2);
    var height = Math.abs(y1 - y2); //de esta forma se obtiene la altura y la base del rectangulo
    context.moveTo(x1, y1);
    context.lineTo(x1 + width, y1);
    context.lineTo(x1 + width, y1 + height);
    context.lineTo(x1, y1 + height);
    context.lineTo(x1, y1);
    context.stroke();
    }
    
    function dibujarpoligono(canvas, numLados, radiopoligono, x, y) {
      var angulo = 360 / numLados; //calcular el ángulo de cada lado
      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.moveTo(x, y);
      for (var i = 1; i <= numLados; i++) {
        var x2 = x + radiopoligono * Math.cos((angulo * i) * Math.PI / 180); //calcula la coordenada x
        var y2 = y + radiopoligono * Math.sin((angulo * i) * Math.PI / 180); //calcula la coordenada y
        context.lineTo(x2, y2);
        x = x2;
        y = y2;
      }
      context.closePath();
      context.stroke();
    }
    
    
    



/* CIRCULOS */
/*function puntomediocirculo(context, x0, y0, radio) {
  var x = radio;
  var y = 0;
  var puntoactual = 1 - x; //define donde comienza el punto desde el centro del circulo y si debe cambiarse 

  while (y <= x) {
    context.fillRect(x0 + x, y0 + y, 1, 1);
    context.fillRect(x0 + y, y0 + x, 1, 1);
    context.fillRect(x0 - x, y0 + y, 1, 1);
    context.fillRect(x0 - y, y0 + x, 1, 1);
    context.fillRect(x0 - x, y0 - y, 1, 1);
    context.fillRect(x0 - y, y0 - x, 1, 1);
    context.fillRect(x0 + x, y0 - y, 1, 1);
    context.fillRect(x0 + y, y0 - x, 1, 1);
    y++;
    if (puntoactual <= 0) { //se encuentra dentro del circulo y se mueve a la derecha
      puntoactual += 2 * y + 1;
    } else {
      x--;
      puntoactual += 2 * (y - x) + 1;
    }
  }
}*/

function bresenhamcirculo(x, y, radio, color, lineWidth) {
    // Iniciar la ruta de dibujo
    context.beginPath();

    // Dibujar el círculo utilizando el método trigonométrico
    for (let i = 0; i < Math.PI * 2; i += 0.01) {
      const xPos = x + radio * Math.cos(i);
      const yPos = y + radio * Math.sin(i);
  
      if (i === 0) {
        context.moveTo(xPos, yPos);
      } else {
        context.lineTo(xPos, yPos);
      }
    }
  
    // Establecer el grosor y el color del trazo
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
  
    // Dibujar el círculo
    context.stroke();
  }






    //dibujarPincel(canvas, context);

   // dibujarpoligono(canvas, 5, 50);




    
    //dibujarlinea(canvas);
    //dibujarcuadrado();
   
    
    //DDAlinea(x1, y1, x2, y2); //linea recta
    //bresenhamlinea(canvas, context);
    //puntomediolinea(10, 10, 100, 100);
    //puntomediocirculo(context, canvas.width / 2, canvas.height / 2, 90); //dibujo el circulo desde el centro del canvas
    //bresenhamcirculo(250, 250, 100);










