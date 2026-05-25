function setup() {
  createCanvas(1100, 500);
}

function draw() {
  background(0);

  // 1. TESTO ESSENZIALE
  fill(255); noStroke(); textFont('Helvetica');
  textSize(22); text("Il Radiante", 50, 60);
  textSize(14); fill(150); text("Quando l'arco è lungo quanto\nil raggio, l'angolo al centro\nè esattamente 1 Radiante (≈57.3°).", 50, 95);

  // 2. ASSI E CIRCONFERENZA DI SCONTO
  stroke(50); strokeWeight(1);
  line(cx - raggio - 20, cy, cx + raggio + 20, cy);
  line(cx, cy - raggio - 20, cx, cy + raggio + 20);
  stroke(80); noFill(); strokeWeight(2);
  ellipse(cx, cy, raggio * 2);

  // 3. LOGICA ANIMAZIONE VELOCE E CONTINUA
  progresso += 0.015; // Velocità dell'animazione
  if (progresso > 1.3) progresso = 0; // Reset rapido dopo una breve pausa

  let angoloMax = 57.3; // 1 Radiante in gradi
  let angoloCorrente = min(progresso, 1) * angoloMax;

  // Spicchio d'angolo che si colora sotto l'arco
  noStroke(); fill(239, 71, 111, 30);
  arc(cx, cy, raggio * 2, raggio * 2, -radians(angoloCorrente), 0);

  // Raggi fissi di riferimento (Base e Chiusura)
  stroke(255, 150); strokeWeight(2);
  line(cx, cy, cx + raggio, cy); // Base
  if (progresso >= 1) {
    line(cx, cy, cx + raggio * cos(radians(angoloMax)), cy - raggio * sin(radians(angoloMax)));
    fill(259, 71, 111); noStroke(); textSize(16); text("1 rad", cx + 40, cy - 20);
  }

  // 4. IL FILO ROSSO CHE SI "RIBALTA" E SI CURVA
  stroke(239, 71, 111); strokeWeight(4); noFill();
  if (progresso <= 1) {
    // L'arco si sviluppa sul bordo del cerchio
    arc(cx, cy, raggio * 2, raggio * 2, -radians(angoloCorrente), 0);
  } else {
    // Quando ha finito resta visualizzato l'arco completo lungo R
    arc(cx, cy, raggio * 2, raggio * 2, -radians(angoloMax), 0);
  }
}
