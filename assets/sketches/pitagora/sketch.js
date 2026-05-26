let sliderA_Pito, sliderB_Pito;
const SCALE_PITO = 7; 

function setup() {
  createCanvas(windowWidth, windowHeight); 
  
  // Slider A (In alto a sinistra)
  sliderA_Pito = createSlider(3, 18, 12, 0.1);
  sliderA_Pito.position(20, 40);
  sliderA_Pito.size(180);

  // Slider B (Affiancato a destra di A)
  sliderB_Pito = createSlider(3, 18, 12, 0.1);
  sliderB_Pito.position(220, 40);
  sliderB_Pito.size(180);
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

  // --- 2. DESCRIZIONI SLIDER ---
  noStroke();
  fill(185, 190, 205); 
  textSize(13); 
  textStyle(NORMAL); 
  
  text(`Cateto A = ${valA.toFixed(1)}`, 20, 30);
  text(`Cateto B = ${valB.toFixed(1)}`, 220, 30);

  // --- 3. INTERFACCIA GRAFICA (CENTRATA VERTICALMENTE) ---
  let ax = 180; 
  // Portato a 360 per sollevare il grafico e centrarlo nello spazio disponibile
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
}