let sliderA_Pito, sliderB_Pito;
const SCALE_PITO = 7; 

function setup() {
  createCanvas(windowWidth, windowHeight); 
  
  // MODIFICATO: Posizione X impostata a 0 per attaccarlo al margine sinistro
  sliderA_Pito = createSlider(3, 18, 12, 0.1);
  sliderA_Pito.position(0, 40);
  sliderA_Pito.size(130); 

  // MODIFICATO: Avvicinato di conseguenza per mantenere l'allineamento
  sliderB_Pito = createSlider(3, 18, 12, 0.1);
  sliderB_Pito.position(145, 40);
  sliderB_Pito.size(130);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0); 
  textFont('Helvetica'); 

  // --- 1. LETTURA VALORI E CALCOLI ---
  let valA = sliderA_Pito.value();
  let valB = sliderB_Pito.value();
  
  let aPx = valA * SCALE_PITO;
  let bPx = valB * SCALE_PITO;

  // Calcoli geometrici reali per la spiegazione
  let areaA = valA * valA;
  let areaB = valB * valB;
  let valIpo = sqrt(areaA + areaB);
  let areaIpo = valIpo * valIpo;

  // --- 2. DESCRIZIONI SLIDER COLORATE ---
  noStroke();
  textSize(13); 
  textStyle(NORMAL); 
  textAlign(LEFT, TOP);
  
  // MODIFICATO: Testo A allineato a X = 0 sopra il rispettivo slider
  fill(46, 213, 115); 
  text(`Cateto A = ${valA.toFixed(1)}`, 0, 20);
  
  // MODIFICATO: Testo B allineato a X = 145 sopra il rispettivo slider
  fill(255, 71, 87); 
  text(`Cateto B = ${valB.toFixed(1)}`, 145, 20);

  // --- 3. INTERFACCIA GRAFICA (CENTRATA VERTICALMENTE) ---
  let ax = 180; 
  let ay = 360; 
  
  let bx = ax,   by = ay - bPx; 
  let cx = ax + aPx, cy = ay;   

  // 1. Quadrati sui lati
  stroke(50, 55, 65); strokeWeight(1.5); noFill();
  rect(ax - bPx, by, bPx, bPx); 
  rect(ax, ay, aPx, aPx);       

  // Quadrato sull'ipotenusa
  beginShape();
  vertex(bx, by);
  vertex(cx, cy);
  vertex(cx + bPx, cy - aPx);
  vertex(bx + bPx, by - aPx);
  endShape(CLOSE);

  // 2. Triangolo Rettangolo centrale
  stroke(120, 190, 255); strokeWeight(3); fill(120, 190, 255, 30);
  triangle(ax, ay, bx, by, cx, cy);

  // 3. Quadratino Angolo Retto
  stroke(80, 85, 95); strokeWeight(1.5); noFill();
  rect(ax, ay - 12, 12, 12);

  // --- 4. PICCOLE ETICHETTE SUI LATI (INTEGRATE) ---
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  
  fill(46, 213, 115); // Verde per Cateto A
  text("a", ax + aPx/2, ay + 15);
  
  fill(255, 71, 87);  // Rosso per Cateto B
  text("b", ax - 15, ay - bPx/2);
  
  fill(255, 215, 0);  // Oro per Ipotenusa
  text("c", (bx + cx)/2 + 15, (by + cy)/2 - 15);


  // --- 5. SCRITTE COLORATE STATICHE A DESTRA ---
  let infoX = 550; 
  let infoY = 220; 
  
  textAlign(LEFT, TOP);
  textStyle(NORMAL);
  textSize(14);
  
  // Cateto A (Verde)
  fill(46, 213, 115);
  text(`Cateto (a) = ${valA.toFixed(1)}  ──►  Area Quadrato (a²) = ${areaA.toFixed(1)}`, infoX, infoY);
  
  // Cateto B (Rosso)
  fill(255, 71, 87);
  text(`Cateto (b) = ${valB.toFixed(1)}  ──►  Area Quadrato (b²) = ${areaB.toFixed(1)}`, infoX, infoY + 30);
  
  // Ipotenusa C (Giallo/Oro)
  fill(255, 215, 0);
  text(`Ipotenusa (c) = ${valIpo.toFixed(1)} ──►  Area Quadrato (c²) = ${areaIpo.toFixed(1)}`, infoX, infoY + 65);
}