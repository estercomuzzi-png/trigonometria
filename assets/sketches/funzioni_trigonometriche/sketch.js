// Coordinate del vertice mobile del triangolo
let vertX = 650;
let vertY = 150;

// Coordinate dell'angolo retto (fisso in basso a destra rispetto al vertice)
let originX = 650;
let originY = 400;

// Coordinate del punto a sinistra (fisso)
let baseX = 450;
let baseY = 400;

let trascina = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  // Adatta la tela alle nuove dimensioni della finestra
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // --- 1. CALCOLI GEOMETRICI E MATEMATICI ---
  // Cateto adiacenteall'angolo (orizzontale)
  let adj = originX - baseX;
  // Cateto opposto all'angolo (verticale)
  let opp = originY - vertY;
  // Ipotenusa (teorema di Pitagora)
  let hyp = sqrt(adj * adj + opp * opp);
  
  // Calcolo dell'angolo theta in gradi
  let angolo = degrees(atan2(opp, adj));

  // Rapporti trigonometrici
  let sinVal = opp / hyp;
  let cosVal = adj / hyp;
  let tanVal = opp / adj;

  // --- 2. INTERFACCIA TESTUALE (A SINISTRA) ---
  fill(255);
  noStroke();
  textFont('Helvetica');
  
  textSize(20);
  text("Rapporti Trigonometrici nel Triangolo", 40, 50);
  
  textSize(13);
  fill(140, 145, 160);
  text("Trascina il punto ROSSO in alto per modificare i cateti", 40, 75);

  // Pannello dei valori dei lati
  fill(240);
  textSize(16);
  text("Misure dei Lati:", 40, 130);
  textSize(15);
  fill(180, 185, 200);
  text(`• Angolo (θ) = ${angolo.toFixed(1)}°`, 40, 160);
  text(`• Cateto Opposto (a) = ${opp.toFixed(1)}`, 40, 185);
  text(`• Cateto Adiacente (b) = ${adj.toFixed(1)}`, 40, 210);
  text(`• Ipotenusa (c) = ${hyp.toFixed(1)}`, 40, 235);

  // TABELLA DELLE FORMULE UNIFICATE
  fill(240);
  textSize(16);
  text("Formule e Rapporti:", 40, 290);
  
  textSize(15);
  // Seno (Verde)
  fill(46, 213, 115);
  text(`Seno: sin(θ) = a / c  ➔  ${opp.toFixed(1)} / ${hyp.toFixed(1)} = ${sinVal.toFixed(3)}`, 40, 325);
  
  // Coseno (Azzurro)
  fill(52, 152, 219);
  text(`Coseno: cos(θ) = b / c  ➔  ${adj.toFixed(1)} / ${hyp.toFixed(1)} = ${cosVal.toFixed(3)}`, 40, 365);
  
  // Tangente (Giallo)
  fill(255, 215, 0);
  text(`Tangente: tan(θ) = a / b  ➔  ${opp.toFixed(1)} / ${adj.toFixed(1)} = ${tanVal.toFixed(3)}`, 40, 405);


  // --- 3. DISEGNO DEL TRIANGOLO RETTANGOLO (A DESTRA) ---
  // Aggiorna la posizione dell'angolo retto in base a dove si sposta la X del vertice
  originX = vertX; 

  // Riempimento interno del triangolo
  fill(255, 255, 255, 8);
  stroke(100, 110, 130);
  strokeWeight(2);
  triangle(baseX, baseY, originX, originY, vertX, vertY);

  // Quadratino dell'angolo retto (90°)
  strokeWeight(1);
  noFill();
  rect(originX - 15, originY - 15, 15, 15);

  // Arco dell'angolo Theta (θ)
  stroke(255, 215, 0);
  strokeWeight(1.5);
  arc(baseX, baseY, 45, 45, -radians(angolo), 0);

  // Etichette dei Lati sulla figura
  noStroke();
  textSize(16);
  
  fill(46, 213, 115); // Verde per lato opposto 'a'
  textAlign(LEFT, CENTER);
  text("a", originX + 15, (originY + vertY) / 2);

  fill(52, 152, 219); // Azzurro per lato adiacente 'b'
  textAlign(CENTER, TOP);
  text("b", (baseX + originX) / 2, originY + 15);

  fill(255); // Bianco per ipotenusa 'c'
  textAlign(RIGHT, BOTTOM);
  text("c", (baseX + vertX) / 2 - 10, (baseY + vertY) / 2 - 10);

  // Lettera dell'angolo θ
  fill(255, 215, 0);
  textAlign(LEFT, BOTTOM);
  text("θ", baseX + 30, baseY - 5);

  // VERTICE INTERATTIVO (Punto rosso trascinabile)
  if (trascina) {
    // Vincoliamo i movimenti del mouse per non distruggere il triangolo rettangolo
    vertX = constrain(mouseX, baseX + 50, width - 50);
    vertY = constrain(mouseY, 50, baseY - 50);
  }

  // Cambia colore al punto se il mouse ci passa sopra per far capire che è interattivo
  let d = dist(mouseX, mouseY, vertX, vertY);
  if (d < 15 || trascina) {
    fill(255, 71, 87); // Rosso acceso
    cursor(HAND);
  } else {
    fill(255, 71, 87, 180); // Rosso semi-trasparente
    cursor(ARROW);
  }
  noStroke();
  ellipse(vertX, vertY, 16, 16);
}

// --- GESTIONE DEL CLICK PER TRASCINARE IL VERTICE ---
function mousePressed() {
  let d = dist(mouseX, mouseY, vertX, vertY);
  if (d < 15) {
    trascina = true;
  }
}

function mouseReleased() {
  trascina = false;
}