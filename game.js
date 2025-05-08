const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const nave = { x: 180, y: 550, w: 40, h: 40 };
let meteoritos = [];
let juegoActivo = true;
let velocidad = 2;
let nivel = 1;
let tiempo = 0;

function crearMeteorito() {
  const x = Math.random() * 360;
  meteoritos.push({ x: x, y: 0, w: 30, h: 30 });
}

function moverNave(e) {
  if (e.key === "ArrowLeft" && nave.x > 0) nave.x -= 20;
  if (e.key === "ArrowRight" && nave.x < canvas.width - nave.w) nave.x += 20;
}

function colision(obj1, obj2) {
  return obj1.x < obj2.x + obj2.w &&
         obj1.x + obj1.w > obj2.x &&
         obj1.y < obj2.y + obj2.h &&
         obj1.y + obj1.h > obj2.y;
}

function actualizar() {
  if (!juegoActivo) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar nave
  ctx.fillStyle = "cyan";
  ctx.fillRect(nave.x, nave.y, nave.w, nave.h);

  // Dibujar meteoritos
  for (let i = 0; i < meteoritos.length; i++) {
    let m = meteoritos[i];
    m.y += velocidad;

    ctx.fillStyle = "red";
    ctx.fillRect(m.x, m.y, m.w, m.h);

    if (colision(nave, m)) {
      juegoActivo = false;
      document.getElementById("gameOver").style.display = "block";
    }
  }

  // Aumentar dificultad
  tiempo++;
  if (tiempo % 300 === 0) {
    nivel++;
    velocidad += 1;
    document.getElementById("nivel").textContent = nivel;
  }
}

function reiniciarJuego() {
  juegoActivo = true;
  meteoritos = [];
  nave.x = 180;
  tiempo = 0;
  velocidad = 2;
  nivel = 1;
  document.getElementById("nivel").textContent = nivel;
  document.getElementById("gameOver").style.display = "none";
}

setInterval(crearMeteorito, 1000);
setInterval(actualizar, 30);
document.addEventListener("keydown", moverNave);
