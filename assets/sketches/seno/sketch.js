let graficoIstruzioniY = 40;

function setup() {
  // Tela responsive basata sulla finestra del browser - Dimensioni invariate
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  // Adatta la tela alle nuove dimensioni della finestra
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255,0,0);

  // --- 1. ISTRUZIONI INTERATTIVE ---
  fill(148, 161, 178);
  noStroke();
  textFont('Helvetica');
  textAlign(LEFT); // Allineamento a sinistra per le istruzioni
  textSize(18);
  text("Esplorazione della Funzione Seno", 5, 40); 
  textSize(13);
  text("• Muovi il MOUSE a destra e sinistra per cambiare l'Angolo (θ)", 5, 65); 

  // --- 2. LOGICA MATEMATICA CORRENTE ---
  let gradi = map(mouseX, 0, width, 0, 360);
  gradi = constrain(gradi, 0, 360); 
  let radianti = radians(gradi);
  let sinVal = sin(radianti);

  // Parametri del grafico piccolo
  let raggio = 70; 
  let asseX_Lunghezza = 400; 
  
  // Posizione dei grafici
  let cerchioX = 140; 
  let cerchioY = 320;
  let graficoXStart = 280; 

  // --- 3. DISEGNO: CERCHIO GONIOMETRICO (A SINISTRA) ---
  stroke(60, 65, 75);
  strokeWeight(1);
  line(cerchioX - raggio - 20, cerchioY, cerchioX + raggio + 20, cerchioY);
  line(cerchioX, cerchioY - raggio - 20, cerchioX, cerchioY + raggio + 20);

  // Circonferenza unitaria
  stroke(100, 110, 125);
  noFill();
  ellipse(cerchioX, cerchioY, raggio * 2);

  // Vettore/Raggio rotante (Ipotenusa)
  let px = cerchioX + cos(radianti) * raggio;
  let py = cerchioY - sinVal * raggio; 
  stroke(255);
  strokeWeight(2);
  line(cerchioX, cerchioY, px, py);

  // Segmento del SENO nel cerchio (Verde verticale)
  stroke(46, 213, 115);
  strokeWeight(3.5);
  line(px, cerchioY, px, py);

  // Punto mobile
  fill(255, 71, 87);
  noStroke();
  ellipse(px, py, 8, 8);


  // --- 4. DISEGNO: DIAGRAMMA CARTESIANO DEL SENO (A DESTRA) ---
  stroke(60, 65, 75);
  strokeWeight(1);
  line(graficoXStart, cerchioY, graficoXStart + asseX_Lunghezza, cerchioY); 
  line(graficoXStart, cerchioY - raggio - 20, graficoXStart, cerchioY + raggio + 20); 

  // Limiti +1 e -1
  fill(100, 110, 125);
  textSize(11);
  text("+1.0", graficoXStart - 30, cerchioY - raggio + 4);
  text("-1.0", graficoXStart - 25, cerchioY + raggio + 4);
  stroke(60, 65, 75, 100);
  line(graficoXStart, cerchioY - raggio, graficoXStart + asseX_Lunghezza, cerchioY - raggio);
  line(graficoXStart, cerchioY + raggio, graficoXStart + asseX_Lunghezza, cerchioY + raggio);

  // --- 5. COSTRUZIONE IN DIRETTA DELLA SINUSOIDE ---
  noFill();
  stroke(46, 213, 115, 150); 
  strokeWeight(2);
  
  beginShape();
  for (let xGradi = 0; xGradi <= gradi; xGradi += 1) {
    let xPos = map(xGradi, 0, 360, graficoXStart, graficoXStart + asseX_Lunghezza);
    let yPos = cerchioY - sin(radians(xGradi)) * raggio;
    vertex(xPos, yPos);
  }
  endShape();

  // --- 6. LINEA DI PROIEZIONE DIRETTISSIMA ---
  let ondaXCorrente = map(gradi, 0, 360, graficoXStart, graficoXStart + asseX_Lunghezza);
  stroke(255, 255, 255, 80);
  strokeWeight(1);
  for (let lx = px; lx < ondaXCorrente; lx += 6) {
    line(lx, py, lx + 3, py);
  }

  // Punto corrente sull'onda cartesiana
  fill(46, 213, 115);
  noStroke();
  ellipse(ondaXCorrente, py, 10, 10);


  // --- 7. TABELLA VALORI (IN ALTO E CENTRATA NEL CANVAS) ---
  let centroX = width / 2; // Calcola il centro esatto del canvas (550px)
  textAlign(CENTER);       // Allinea il testo rispetto al proprio centro
  
  fill(255);
  textSize(16);
  text(`Dati Istantanei:`, centroX, 40); 
  textSize(15);
  fill(255, 215, 0);
  text(`Angolo θ = ${gradi.toFixed(1)}°`, centroX, 65);
  fill(46, 213, 115);
  text(`Seno (y) = ${sinVal.toFixed(4)}`, centroX, 90);
  
  fill(120, 130, 140);
  textSize(12);
  text(`Altezza onda: ${(raggio).toFixed(0)} pixel`, centroX, 115);
}