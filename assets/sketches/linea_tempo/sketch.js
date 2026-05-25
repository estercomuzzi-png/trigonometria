let lineaX = 590; // Spostata ulteriormente a destra per ottimizzare lo spazio

function setup() {
  createCanvas(900, 500); // Larghezza aumentata a 850 per accogliere lo spostamento
}

function draw() {
  background(0); // Sfondo nero fisso puro
  textFont('Helvetica');

  // --- TESTO DI SINISTRA INTERATTIVO ---
  let t = tappe[attiva];
  
  noStroke(); 
  fill(t.col); textSize(13); textStyle(BOLD); text(t.epoca, 40, 110);
  fill(255); textSize(22); text(t.titolo, 40, 140);
  fill(185, 190, 205); textSize(15); textStyle(NORMAL); text(t.txt, 40, 175, 380, 220); // Spazio di lettura esteso a 380px

  // --- TIMELINE GRAFICA (SPOSTATA PIÙ A DESTRA) ---
  stroke(50, 55, 65); strokeWeight(3); 
  line(lineaX, 70, lineaX, 370); // Linea asse allungata
  
  for (let i = 0; i < tappe.length; i++) {
    let ny = map(i, 0, tappe.length - 1, 70, 370); 
    
    // Interazione mouse
    if (dist(mouseX, mouseY, lineaX, ny) < 18) attiva = i;
    
    // Disegno dei nodi
    if (attiva === i) {
      stroke(tappe[i].col[0], tappe[i].col[1], tappe[i].col[2], 50); strokeWeight(9);
      fill(tappe[i].col); ellipse(lineaX, ny, 12, 12);
      fill(255); textStyle(BOLD); textSize(14);
    } else {
      // Lo stroke ora usa lo sfondo nero (0) per garantire un perfetto effetto foro
      stroke(0); strokeWeight(1.5);
      fill(80, 85, 95); ellipse(lineaX, ny, 10, 10);
      fill(110, 115, 130); textStyle(NORMAL); textSize(12);
    }
    
    // Testi della timeline riproporzionati rispetto alla nuova posizione a destra
    noStroke(); text(tappe[i].epoca, lineaX + 20, ny + 4);
    textAlign(RIGHT); text(tappe[i].titolo, lineaX - 20, ny + 4);
    textAlign(LEFT);
  }
}