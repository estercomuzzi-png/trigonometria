let graficoX = 0;    // MODIFICATO: Incollato perfettamente al margine sinistro assoluto (0px)
let graficoY = 300;  // Spostato più in basso per stare sotto le istruzioni
let raggio = 85;     // Ampiezza/Altezza di riferimento per le onde

function setup() {
  createCanvas(windowWidth, windowHeight); // Stessa dimensione standard uniformata
}

function windowResized() {
  // Adatta la tela alle nuove dimensioni della finestra
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0); // Sfondo nero fisso puro
  textFont('Helvetica');

  // MODIFICATO: Calcolo dinamico basato sul margine 0 per arrivare quasi al margine destro
  let asseX_Lunghezza = width - graficoX - 40; 

  // 1. CALCOLO DELL'ANGOLO IN BASE AL MOUSE
  let angolo = map(mouseX, 0, width, 0, 360);
  angolo = constrain(angolo, 0, 360); 
  let rad = radians(angolo);          
  
  let valSeno = sin(rad);
  let valCoseno = cos(rad);
  let valTangente = tan(rad);

  // --- 6. ISTRUZIONI (AL MARGINE ASSOLUTO E IN BLU) ---
  fill(52, 152, 219); 
  noStroke();
  textAlign(LEFT, BASELINE); 
  textSize(18);
  text("Muovi il mouse da sinistra a destra", 0, 40); // Coordinata X a 0

  // 2. ASSI CARTESIANI DEL DIAGRAMMA (ALLUNGATI DINAMICAMENTE)
  stroke(80);
  strokeWeight(1);
  line(graficoX, graficoY, graficoX + asseX_Lunghezza, graficoY); // Asse X (Angoli)
  line(graficoX, graficoY - 140, graficoX, graficoY + 140); // Asse Y (Valori)

  // Calcolo della coordinata X corrente sul grafico per i pallini mobili
  let ondaX = map(angolo, 0, 360, graficoX, graficoX + asseX_Lunghezza);

  // 3. TRACCIAMENTO DEL SENO (Verde)
  stroke(46, 213, 115, 180);
  noFill();
  beginShape();
  for (let a = 0; a <= angolo; a++) {
    let x = map(a, 0, 360, graficoX, graficoX + asseX_Lunghezza);
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
    let x = map(a, 0, 360, graficoX, graficoX + asseX_Lunghezza);
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
    let x = map(a, 0, 360, graficoX, graficoX + asseX_Lunghezza);
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

  // --- 7. TABELLA VALORI RIPOSIZIONATA (SOTTO IL GRAFICO, ALLINEATA A SINISTRA) ---
  let datiYStart = graficoY + 140 + 40; // Calcola lo spazio esatto sotto il limite inferiore del grafico
  textAlign(LEFT, TOP);                 
  noStroke();
  
  // Titolo della sezione dati
  fill(255);
  textSize(15);
  text("DATI ISTANTANEI:", graficoX, datiYStart); // Allineato perfettamente a 0px come il grafico
  
  // Sviluppo orizzontale in linea dei quattro parametri numerici
  textSize(14);
  
  fill(255, 215, 0);
  text(`Angolo: ${floor(angolo)}°`, graficoX + 160, datiYStart);
  
  fill(46, 213, 115);
  text(`Seno: ${valSeno.toFixed(3)}`, graficoX + 280, datiYStart);
  
  fill(255, 107, 107);
  text(`Coseno: ${valCoseno.toFixed(3)}`, graficoX + 410, datiYStart);
  
  fill(255, 215, 0);
  if (floor(angolo) === 90 || floor(angolo) === 270) {
    fill(255, 71, 87); // Colore rosso di allerta per l'infinito
    text(`Tangente: ±∞`, graficoX + 540, datiYStart);
  } else {
    text(`Tangente: ${valTangente.toFixed(3)}`, graficoX + 540, datiYStart);
  }
}