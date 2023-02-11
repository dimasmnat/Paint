/*Acceder al elemento canvas para acceder al  contexto
  que permite manipular los atributos de canvas*/
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

  //algoritmo DDA
  function DDAlinea(x1, y1, x2, y2) {

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
  }

//algoritmo de bresenham
function bresenhamlinea(x1, y1, x2, y2) {

  
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
      context.fillRect(x1, y1, 1, 1); //dibujo un pixel en la posicion actual del cursor según la iteración
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
  }

  //algoritmo de punto medio 
function puntomediolinea(x1, y1, x2, y2){

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
  }

function cuadrado(x1, y1, x2, y2){

    context.moveTo(x1, y1);
    context.lineTo(x2, y1);
    context.moveTo(x2, y1);
    context.lineTo(x2, y2);
    context.moveTo(x2, y2);
    context.lineTo(x1, y2);
    context.moveTo(x1, y2);
    context.lineTo(x1, y1);
    context.stroke();

}

/* CIRCULOS */
function puntomediocirculo(context, x0, y0, radio) {
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
}

function bresenhamcirculo(x0, y0, radio) {
  var x = radio;
  var y = 0;
  var puntoinicial = 1 - x;  
  while (y <= x) {
      context.fillRect(x + x0, y + y0, 1, 1);
      context.fillRect(y + x0, x + y0, 1, 1);
      context.fillRect(-x + x0, y + y0, 1, 1);
      context.fillRect(-y + x0, x + y0, 1, 1);
      context.fillRect(-x + x0, -y + y0, 1, 1);
      context.fillRect(-y + x0, -x + y0, 1, 1);
      context.fillRect(x + x0, -y + y0, 1, 1);
      context.fillRect(y + x0, -x + y0, 1, 1);
      y++;
      if (puntoinicial<=0) {
          puntoinicial += 2 * y + 1;
      } else {
          x--;
          puntoinicial += 2 * (y - x) + 1;
      }
  }
}


    //cuadrado(100, 100, 200, 200);
    //DDAlinea(50, 10, 50, 200); //linea recta
    //bresenhamlinea(100, 100, 1000, 1000);
    //puntomediolinea(10, 10, 100, 100);
    puntomediocirculo(context, canvas.width / 2, canvas.height / 2, 90); //dibujo el circulo desde el centro del canvas
    //bresenhamcirculo(250, 250, 100);


  





