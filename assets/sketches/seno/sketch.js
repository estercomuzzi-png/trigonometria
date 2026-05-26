let graficoIstruzioniY = 40;

function setup() {
  // Tela responsive basata sulla finestra del browser
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  // Adatta la tela alle nuove dimensioni della finestra
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0); // Sfondo nero per risaltare i vettori e i colori

  // Posizione dei grafici e parametri di base
  let raggio = 70; 
  let cerchioX = 140; 
  let cerchioY = 280;        // Alzato leggermente per fare spazio ai dati sotto
  let graficoXStart = 280; 
  
  // MODIFICATO: Calcolo dinamico per far arrivare il grafico quasi al margine destro dello schermo
  let asseX_Lunghezza = width - graficoXStart - 40; 

  // --- 1. ISTRUZIONI INTERATTIVE (AL MARGINE ASSOLUTO) ---
  fill(46, 213, 115);
  noStroke();
  textFont('Helvetica');
  textAlign(LEFT, BASELINE); 
  
  textSize(18);
  text("Esplorazione della Funzione Seno", 0, 40); 
  
  textSize(13);
  text("• Gira il MOUSE in cerchio attorno al centro goniometrico per regolare l'Angolo (θ)", 0, 65); 

  // --- 2. LOGICA MATEMATICA ROTATORIA FLUIDA ---
  let radianti = 0;
  
  // Calcola l'angolo polare basandosi sulla posizione del mouse relativa al centro del cerchio
  if (mouseX !== 0 || mouseY !== 0) {
    // Invertiamo l'asse Y (cerchioY - mouseY) perché nei pixel dello schermo la Y cresce verso il basso
    radianti = atan2(cerchioY - mouseY, mouseX - cerchioX);
    
    // Normalizziamo l'angolo nell'intervallo positivo continuo [0, 2π] invece di [-π, π]
    if (radianti < 0) {
      radianti += TWO_PI;
    }
  }
  
  // Conversione per il calcolo dei gradi e del seno
  let gradi = degrees(radianti);
  let sinVal = sin(radianti);
  let cosVal = cos(radianti);

  // --- 3. DISEGNO: CERCHIO GONIOMETRICO (A SINISTRA) ---
  stroke(60, 65, 75);
  strokeWeight(1);
  line(cerchioX - raggio - 20, cerchioY, cerchioX + raggio + 20, cerchioY);
  line(cerchioX, cerchioY - raggio - 20, cerchioX, cerchioY + raggio + 20);

  // Circonferenza unitaria di base
  stroke(100, 110, 125);
  noFill();
  ellipse(cerchioX, cerchioY, raggio * 2);

  // VALORI FISSI SUI QUATTRO QUADRANTI
  fill(80, 90, 100);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  text("0°", cerchioX + raggio + 15, cerchioY);
  text("90°", cerchioX, cerchioY - raggio - 12);
  text("180°", cerchioX - raggio - 20, cerchioY);
  text("270°", cerchioX, cerchioY + raggio + 12);

  // --- DISEGNO DELL'ARCO DI ROTAZIONE (SETTORE ORO) ---
  if (gradi > 0) {
    fill(255, 215, 0, 40); // Riempimento oro semitrasparente
    stroke(255, 215, 0);   // Linea d'arco oro lucido
    strokeWeight(1.5);
    // Disegnamo l'arco invertendo l'angolo per assecondare la coordinata matematica invertita dello schermo
    arc(cerchioX, cerchioY, 35, 35, -radianti, 0, PIE);
    
    // Posizionamento dinamico della lettera greca "θ" a metà dell'apertura angolare
    push();
    noStroke();
    fill(255, 215, 0);
    textSize(12);
    textAlign(CENTER, CENTER);
    let metaAngolo = radianti / 2;
    let tx = cerchioX + cos(metaAngolo) * 32;
    let ty = cerchioY - sin(metaAngolo) * 32;
    text("θ", tx, ty);
    pop();
  }

  // Vettore/Raggio rotante (Ipotenusa bianca)
  let px = cerchioX + cos(radianti) * raggio;
  let py = cerchioY - sinVal * raggio; 
  stroke(255);
  strokeWeight(2);
  line(cerchioX, cerchioY, px, py);

  // Componente orizzontale di supporto (Coseno in grigio tratteggiato sul cerchio)
  stroke(100, 100, 100, 90);
  strokeWeight(1);
  line(cerchioX, cerchioY, px, cerchioY);

  // Componente verticale del SENO nel cerchio (Verde)
  stroke(46, 213, 115);
  strokeWeight(3.5);
  line(px, cerchioY, px, py);

  // VALORI DINAMICI SUL CERCHIO DURANTE LA ROTAZIONE
  noStroke();
  textSize(11);
  // Testo del valore del Seno accanto alla barra verde
  fill(46, 213, 115);
  textAlign(px > cerchioX ? LEFT : RIGHT, CENTER);
  text("y: " + sinVal.toFixed(2), px > cerchioX ? px + 8 : px - 8, cerchioY - (sinVal * raggio) / 2);

  // Testo del valore del Coseno sotto l'asse orizzontale
  fill(150, 160, 175);
  textAlign(CENTER, TOP);
  text("x: " + cosVal.toFixed(2), cerchioX + (cosVal * raggio) / 2, cerchioY + 6);

  // Nodo mobile arancione/rosso sulla circonferenza
  fill(255, 71, 87);
  noStroke();
  ellipse(px, py, 8, 8);


  // --- 4. DISEGNO: DIAGRAMMA CARTESIANO DEL SENO (A DESTA, DINAMICO) ---
  stroke(60, 65, 75);
  strokeWeight(1);
  line(graficoXStart, cerchioY, graficoXStart + asseX_Lunghezza, cerchioY); 
  line(graficoXStart, cerchioY - raggio - 20, graficoXStart, cerchioY + raggio + 20); 

  // Indicatori di ampiezza +1.0 e -1.0
  fill(100, 110, 125);
  textSize(11);
  textAlign(LEFT, CENTER);
  text("+1.0", graficoXStart - 35, cerchioY - raggio);
  text("-1.0", graficoXStart - 32, cerchioY + raggio);
  stroke(60, 65, 75, 100);
  line(graficoXStart, cerchioY - raggio, graficoXStart + asseX_Lunghezza, cerchioY - raggio);
  line(graficoXStart, cerchioY + raggio, graficoXStart + asseX_Lunghezza, cerchioY + raggio);


  // --- 5. COSTRUZIONE IN DIRETTA DELLA SINUSOIDE (ADATTATA ALLA LUNGHEZZA RESPONSIVE) ---
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


  // --- 6. LINEA DI PROIEZIONE ORIZZONTALE TRATTEGGIATA ---
  let ondaXCorrente = map(gradi, 0, 360, graficoXStart, graficoXStart + asseX_Lunghezza);
  stroke(255, 255, 255, 80);
  strokeWeight(1);
  for (let lx = px; lx < ondaXCorrente; lx += 6) {
    line(lx, py, lx + 3, py);
  }

  // Tracciatore d'onda (Punto verde corrente sulla sinusoide)
  fill(46, 213, 115);
  noStroke();
  ellipse(ondaXCorrente, py, 10, 10);


  // --- 7. TABELLA VALORI RIPOSIZIONATA (SOTTO IL GRAFICO) ---
  let datiYStart = cerchioY + raggio + 50; // Calcola lo spazio sotto il grafico (Y ~ 400)
  textAlign(LEFT, TOP);                    // Allineamento a sinistra per i blocchi di testo
  noStroke();
  
  // Titolo della sezione dati
  fill(255);
  textSize(15);
  text("DATI ISTANTANEI:", graficoXStart, datiYStart); 
  
  // Visualizzazione orizzontale in riga dei tre parametri
  textSize(14);
  
  fill(255, 215, 0);
  text(`Angolo θ = ${gradi.toFixed(1)}°`, graficoXStart + 160, datiYStart);
  
  fill(46, 213, 115);
  text(`Seno (y) = ${sinVal.toFixed(4)}`, graficoXStart + 310, datiYStart);
  
  fill(120, 130, 140);
  textSize(12);
  text(`Ampiezza raggio: ${(raggio).toFixed(0)} px`, graficoXStart + 470, datiYStart + 2);
}