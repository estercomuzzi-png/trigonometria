// Coordinate dei vertici del triangolo
let xA = 200; // Vertice dell'angolo retto (in basso a sinistra)
let yA = 380;
let xB = 550; // Vertice acuto con l'angolo theta (in basso a destra)
let yB = 380;
let xC = 200; // Vertice superiore (in alto a sinistra)
let yC = 150;

function setup() {
  createCanvas(windowWidth, windowHeight); // Dimensione standard uniformata
}

function windowResized() {
  // Adatta la tela alle nuove dimensioni della finestra
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0); // Sfondo nero fisso puro

  // --- 1. TITOLO E INTRODUZIONE ---
  fill(148, 161, 178);
  noStroke();
  textFont('Helvetica');
  textSize(18);
  text("Le Funzioni Trigonometriche nel Triangolo Rettangolo", 40, 40);
  textSize(13);
  text("Relazioni fondamentali tra l'angolo θ (theta) e i lati del triangolo", 40, 65);

  // --- 2. DISEGNO DEL TRIANGOLO RETTANGOLO ---
  stroke(255);
  strokeWeight(2.5);
  noFill();
  triangle(xA, yA, xB, yB, xC, yC);

  // --- 3. QUADRATINO ANGOLO RETTO (in A) ---
  stroke(60, 65, 75);
  strokeWeight(1.5);
  rect(xA, yA - 20, 20, 20);
  fill(60, 65, 75);
  noStroke();
  ellipse(xA + 10, yA - 10, 3, 3);

  // --- 4. ARCHETTO DELL'ANGOLO THETA (in B) ---
  stroke(255, 215, 0); // Giallo per evidenziare l'angolo di riferimento
  strokeWeight(1.5);
  noFill();
  arc(xB, yB, 60, 60, PI, PI + atan2(yA - yC, xB - xA));

  // Simbolo letterale di Theta vicino all'arco
  fill(255, 215, 0);
  noStroke();
  textSize(16);
  text("θ", xB - 45, yB - 12);

  // --- 5. ETICHETTE DEI LATI (NOMI) ---
  textSize(14);
  
  // IPOTENUSA (lato obliquo BC) - CORRETTA: Sempre dritta e leggibile
  fill(255);
  push();
  // Ci posizioniamo nel punto medio del lato obliquo
  translate((xB + xC) / 2 + 12, (yB + yC) / 2 - 12); 
  let angoloIpotenusa = atan2(yC - yB, xC - xB);
  
  // Se l'angolo punta verso sinistra (testo capovolto), aggiungiamo 180 gradi (PI) per raddrizzarlo
  if (angoloIpotenusa < -PI/2 || angoloIpotenusa > PI/2) {
    angoloIpotenusa += PI;
  }
  
  rotate(angoloIpotenusa);
  textAlign(CENTER);
  text("IPOTENUSA", 0, 0);
  pop();

  // Cateto Opposto a theta (lato verticale AC) - in Verde
  fill(46, 213, 115);
  textAlign(RIGHT);
  text("CATETO OPPOSTO", xA - 15, (yA + yC) / 2 + 5);

  // Cateto Adiacente a theta (lato orizzontale AB) - in Rosso
  fill(255, 107, 107);
  textAlign(CENTER);
  text("CATETO ADIACENTE", (xA + xB) / 2, yA + 25);


  // --- 6. FORMULE TRIGONOMETRICHE (A DESTRA) ---
  let formX = 630; // Posizione X della colonna delle formule
  
  // Intestazione colonna
  fill(255);
  textAlign(LEFT);
  textSize(16);
  text("Formule di Base:", formX, 120);

  // Formula del SENO (Verde)
  fill(46, 213, 115);
  textSize(15);
  text("sin(θ) =", formX, 180);
  stroke(46, 213, 115); strokeWeight(1.5);
  line(formX + 55, 175, formX + 195, 175); // Linea di frazione
  noStroke();
  textSize(12);
  text("CATETO OPPOSTO", formX + 65, 168);
  text("IPOTENUSA", formX + 90, 192);

  // Formula del COSENO (Rosso)
  fill(255, 107, 107);
  textSize(15);
  text("cos(θ) =", formX, 260);
  stroke(255, 107, 107); strokeWeight(1.5);
  line(formX + 58, 255, formX + 195, 255); // Linea di frazione
  noStroke();
  textSize(12);
  text("CATETO ADIACENTE", formX + 63, 248);
  text("IPOTENUSA", formX + 93, 272);

  // Formula della TANGENTE (Gialla)
  fill(255, 215, 0);
  textSize(15);
  text("tan(θ) =", formX, 340);
  stroke(255, 215, 0); strokeWeight(1.5);
  line(formX + 55, 335, formX + 195, 335); // Linea di frazione
  noStroke();
  textSize(12);
  text("CATETO OPPOSTO", formX + 65, 328);
  text("CATETO ADIACENTE", formX + 60, 352);
}