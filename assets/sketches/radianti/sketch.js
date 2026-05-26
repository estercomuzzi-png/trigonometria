let raggio = 70; 
let cx = 140; 
let cy = 200;        // Spostato più in alto (da 280 a 200)
let graficoXStart = 280; 

let progresso = 0;   // Variabile di controllo per l'animazione del radiante

function setup() {
  // Tela responsive basata sulla finestra del browser
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  // Adatta la tela alle nuove dimensioni della finestra
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0); // Sfondo nero per uniformare lo stile visivo

  // --- 1. ISTRUZIONI E TESTI ---
  fill(239, 71, 111); // Colore rosso/rosa del radiante per il titolo
  noStroke();
  textFont('Helvetica');
  textAlign(LEFT, BASELINE); 
  
  textSize(18);
  text("Il Radiante", 0, 40); 
  
  textSize(13);
  fill(150);
  text("• Quando l'arco è lungo quanto il raggio, l'angolo al centro è esattamente 1 Radiante (≈57.3°).", 0, 65); 

  // --- 2. ASSI E CIRCONFERENZA DI BASE ---
  stroke(60, 65, 75);
  strokeWeight(1);
  line(cx - raggio - 20, cy, cx + raggio + 20, cy);
  line(cx, cy - raggio - 20, cx, cy + raggio + 20);

  // Circonferenza unitaria di base
  stroke(100, 110, 125);
  noFill();
  strokeWeight(1);
  ellipse(cx, cy, raggio * 2);

  // --- 3. LOGICA ANIMAZIONE VELOCE E CONTINUA ---
  progresso += 0.015; // Velocità dell'animazione
  if (progresso > 1.3) progresso = 0; // Reset rapido dopo una breve pausa

  let angoloMax = 57.3; // 1 Radiante in gradi
  let angoloCorrente = min(progresso, 1) * angoloMax;

  // Spicchio d'angolo che si colora sotto l'arco
  noStroke(); 
  fill(239, 71, 111, 40); 
  arc(cx, cy, raggio * 2, raggio * 2, -radians(angoloCorrente), 0, PIE);

  // Raggi fissi di riferimento (Base e Chiusura)
  stroke(255, 150); 
  strokeWeight(2);
  line(cx, cy, cx + raggio, cy); // Raggio Base

  if (progresso >= 1) {
    // Raggio di chiusura a 1 Radiante
    let radMax = radians(angoloMax);
    line(cx, cy, cx + raggio * cos(radMax), cy - raggio * sin(radMax));
    
    // Testo "1 rad" posizionato dinamicamente vicino al raggio finale
    fill(239, 71, 111); 
    noStroke(); 
    textSize(14); 
    textAlign(CENTER, CENTER);
    text("1 rad", cx + cos(radMax) * (raggio + 25), cy - sin(radMax) * (raggio + 25));
  }

  // --- 4. IL FILO ROSSO (ARCO COSTRUITO DINAMICAMENTE) ---
  stroke(239, 71, 111); 
  strokeWeight(3.5); 
  noFill();
  
  if (progresso <= 1) {
    arc(cx, cy, raggio * 2, raggio * 2, -radians(angoloCorrente), 0);
  } else {
    arc(cx, cy, raggio * 2, raggio * 2, -radians(angoloMax), 0);
  }

  // --- 5. TABELLA VALORI IN VERTICALE ---
  let datiXStart = cx - raggio;         
  let datiYStart = cy + raggio + 65;    // Segue dinamicamente la nuova altezza del cerchio
  
  textAlign(LEFT, TOP);                    
  noStroke();
  
  // Titolo della sezione dati
  fill(255);
  textSize(14);
  text("DATI ANIMAZIONE:", datiXStart, datiYStart); 
  
  // Voci incolonnate una sotto l'altra con interlinea di 25px
  textSize(13);
  
  // Riga 1: Angolo
  fill(239, 71, 111);
  text(`Angolo corrente: ${angoloCorrente.toFixed(1)}°`, datiXStart, datiYStart + 25);
  
  // Riga 2: Arco
  fill(255, 215, 0);
  text(`Arco rettificato: ${progresso <= 1 ? (progresso).toFixed(2) : "1.00"} R`, datiXStart, datiYStart + 50);
  
  // Riga 3: Ampiezza Raggio
  fill(120, 130, 140);
  text(`Raggio: ${(raggio).toFixed(0)} px`, datiXStart, datiYStart + 75);
}