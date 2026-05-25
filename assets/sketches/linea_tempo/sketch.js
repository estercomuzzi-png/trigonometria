let lineaX = 560; // Spostata ulteriormente a destra (era 490)

function setup() {
  createCanvas(900, 500); 
}

function draw() {
  background(0); 
  textFont('Helvetica');

  // --- TESTO DI SINISTRA INTERATTIVO (SPOSTATO PIÙ A DESTRA) ---
  let t = tappe[attiva];
  
  noStroke(); 
  fill(t.col); textSize(11); textStyle(BOLD); text(t.epoca, 120, 80); // Coordinata X portata a 120
  fill(255); textSize(18); text(t.titolo, 120, 105); // Coordinata X portata a 120
  fill(185, 190, 205); textSize(13); textStyle(NORMAL); text(t.txt, 120, 135, 300, 180); // Spostato a 120, larghezza adattata a 300

  // --- TIMELINE GRAFICA (SPOSTATA PIÙ A DESTRA) ---
  stroke(50, 55, 65); strokeWeight(2.5); 
  line(lineaX, 60, lineaX, 310); 
  
  for (let i = 0; i < tappe.length; i++) {
    let ny = map(i, 0, tappe.length - 1, 60, 310); 
    
    // Interazione mouse
    if (dist(mouseX, mouseY, lineaX, ny) < 14) attiva = i;
    
    // Disegno dei nodi
    if (attiva === i) {
      stroke(tappe[i].col[0], tappe[i].col[1], tappe[i].col[2], 50); strokeWeight(7);
      fill(tappe[i].col); ellipse(lineaX, ny, 9, 9);
      fill(255); textStyle(BOLD); textSize(12);
    } else {
      stroke(0); strokeWeight(1.5);
      fill(80, 85, 95); ellipse(lineaX, ny, 7, 7);
      fill(110, 115, 130); textStyle(NORMAL); textSize(11);
    }
    
    // Testi della timeline riposizionati sulla nuova lineaX
    noStroke(); text(tappe[i].epoca, lineaX + 15, ny + 4);
    textAlign(RIGHT); text(tappe[i].titolo, lineaX - 15, ny + 4);
    textAlign(LEFT);
  }
}