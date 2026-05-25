let sliderA_Pito, sliderB_Pito;
const SCALE_PITO = 12; 

function setup() {
  createCanvas(900, 500); // Tela compatta 900x500
  
  // Nomi delle variabili degli slider modificati per evitare conflitti di dichiarazione
  sliderA_Pito = createSlider(3, 18, 12, 0.1);
  sliderA_Pito.position(40, 145);
  sliderA_Pito.size(200);

  sliderB_Pito = createSlider(3, 18, 12, 0.1);
  sliderB_Pito.position(40, 215);
  sliderB_Pito.size(200);
}

function draw() {
  background(0); 
  textFont('Helvetica'); 

  // --- 1. LETTURA VALORI E CALCOLI ---
  let valA = sliderA_Pito.value();
  let valB = sliderB_Pito.value();
  let valC = sqrt(valA * valA + valB * valB);
  
  let aPx = valA * SCALE_PITO;
  let bPx = valB * SCALE_PITO;

  // --- 2. INTERFACCIA TESTUALE (SINISTRA) ---
  noStroke();
  
  // Intestazione
  fill(120, 190, 255); textSize(13); textStyle(BOLD); text("TEOREMA DI PITAGORA", 40, 60);
  fill(255); textSize(22); text("a² + b² = c²", 40, 90);
  
  // Etichette Slider
  fill(185, 190, 205); textSize(15); textStyle(NORMAL); 
  text(`Cateto a = ${valA.toFixed(2)}`, 40, 130);
  text(`Cateto b = ${valB.toFixed(2)}`, 40, 200);
  
  // Formule e info matematiche 
  fill(110, 115, 130); textSize(13);
  text(`Ipotenusa (c) = √(${valA.toFixed(2)}² + ${valB.toFixed(2)}²) = ${valC.toFixed(2)}`, 40, 290);
  
  fill(185, 190, 205); textSize(14);
  text(`Verifica Aree:`, 40, 330);
  text(`${(valA * valA).toFixed(2)} + ${(valB * valB).toFixed(2)} = ${(valC * valC).toFixed(2)}`, 40, 355);
  
  fill(120, 190, 255); textStyle(BOLD);
  text(`Risultato: ${(valA * valA + valB * valB).toFixed(2)} px²`, 40, 390);

  // --- 3. INTERFACCIA GRAFICA (DESTRA) ---
  // Centro geometrico
  let ax = 530, ay = 270;
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

  // 4. Etichette geometriche (a, b, c)
  noStroke(); fill(255); textSize(13); textStyle(BOLD); textAlign(CENTER, CENTER);
  text("b", ax - 15, (ay + by) / 2);      
  text("a", (ax + cx) / 2, ay + 15);      
  text("c", (bx + cx) / 2 + 15, (by + cy) / 2 - 15); 
  
  textAlign(LEFT); 
}