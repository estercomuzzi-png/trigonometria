let graficoX = 260;  // Spostato a sinistra per dare massima larghezza al grafico
let graficoY = 220;  // Centro verticale del grafico
let raggio = 85;     // Ampiezza/Altezza di riferimento per le onde

function setup() {
  createCanvas(1100, 500); // Stessa dimensione standard uniformata
}

function draw() {
  background(0); // Sfondo nero fisso puro
  textFont('Helvetica');

  // 1. CALCOLO DELL'ANGOLO IN BASE AL MOUSE
  let angolo = map(mouseX, 0, width, 0, 360);
  angolo = constrain(angolo, 0, 360); 
  let rad = radians(angolo);          
  
  let valSeno = sin(rad);
  let valCoseno = cos(rad);
  let valTangente = tan(rad);

  // 2. ASSI CARTESIANI DEL DIAGRAMMA
  stroke(80);
  strokeWeight(1);
  line(graficoX, graficoY, graficoX + 450, graficoY); // Asse X (Angoli)
  line(graficoX, graficoY - 140, graficoX, graficoY + 140); // Asse Y (Valori)

  // Calcolo della coordinata X corrente sul grafico per i pallini mobili
  let ondaX = map(angolo, 0, 360, graficoX, graficoX + 450);

  // 3. TRACCIAMENTO DEL SENO (Verde)
  stroke(46, 213, 115, 180);
  noFill();
  beginShape();
  for (let a = 0; a <= angolo; a++) {
    let x = map(a, 0, 360, graficoX, graficoX + 450);
    let y = graficoY - sin(radians(a)) * raggio;
    vertex(x, y);
  }
  endShape();
  
  // Pallino mobile Seno
  fill(46, 213, 115); noStroke();
  ellipse(ondaX, graficoY - valSeno * raggio, 8, 8);

  // 4. TRACCIAMENTO DEL COSENO (Rosso)
  stroke(255, 107, 107, 180);
  noFill();
  beginShape();
  for (let a = 0; a <= angolo; a++) {
    let x = map(a, 0, 360, graficoX, graficoX + 450);
    let y = graficoY - cos(radians(a)) * raggio;
    vertex(x, y);
  }
  endShape();
  
  // Pallino mobile Coseno
  fill(255, 107, 107); noStroke();
  ellipse(ondaX, graficoY - valCoseno * raggio, 8, 8);

  // 5. TRACCIAMENTO DELLA TANGENTE (Giallo)
  stroke(255, 215, 0, 140);
  noFill();
  beginShape();
  for (let a = 0; a <= angolo; a++) {
    // Interruzione nei punti critici (90° e 270°) per evitare linee verticali errate
    if (floor(a) === 90 || floor(a) === 270) {
      endShape();
      beginShape();
      continue; 
    }
    let x = map(a, 0, 360, graficoX, graficoX + 450);
    let y = graficoY - tan(radians(a)) * raggio;
    
    // Conteniamo la tangente dentro i limiti dello schermo
    if (y > graficoY - 140 && y < graficoY + 140) {
      vertex(x, y);
    }
  }
  endShape();
  
  // Pallino mobile Tangente (visibile solo se non è all'infinito)
  let ondaYTan = graficoY - valTangente * raggio;
  if (ondaYTan > graficoY - 140 && ondaYTan < graficoY + 140) {
    fill(255, 215, 0); noStroke();
    ellipse(ondaX, ondaYTan, 8, 8);
  }

  // 6. TESTI INFORMATIVI E LEGENDA (A SINISTRA)
  fill(255);
  textSize(16);
  text("Muovi il mouse da sinistra a destra", 30, 40); // Testo originale ripristinato
  
  textSize(14);
  fill(255, 215, 0);
  text("Angolo: " + floor(angolo) + "°", 30, 75);
  
  // Voce Seno
  fill(46, 213, 115);
  text("Seno: " + valSeno.toFixed(3), 30, 110);
  
  // Voce Coseno
  fill(255, 107, 107);
  text("Coseno: " + valCoseno.toFixed(3), 30, 135);
  
  // Voce Tangente con gestione dell'infinito
  fill(255, 215, 0);
  if (floor(angolo) === 90 || floor(angolo) === 270) {
    text("Tangente: ±∞", 30, 160);
  } else {
    text("Tangente: " + valTangente.toFixed(3), 30, 160);
  }
}