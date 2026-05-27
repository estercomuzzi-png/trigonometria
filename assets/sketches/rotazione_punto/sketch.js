let angoloRotazione = 0; 
    let inMovimento = true;

    function setup() {
      createCanvas(windowWidth, windowHeight); 
    }

    function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
    }

    function mousePressed() {
      inMovimento = !inMovimento;
    }

    function draw() {
      background(0); 
      textFont('Helvetica');

      if (inMovimento) {
        angoloRotazione -= 0.012; // Rotazione continua in senso antiorario
      }

      // --- PARAMETRICI GEOMETRICI CONDIVISI ---
      let scala = 1.2; 
      let raggio = 70; 
      let angoloIniziale = PI / 6; 

      // Coordinate matematiche di partenza stabili
      let c_X = 60;   let c_Y = 50;  // Centro C
      let p_X = 110;  let p_Y = 80;  // Punto P

      let larghezzaGrafico = width / 3;
      let altezzaAssiY = height * 0.58; 

      // =========================================================================
      // GRAFICO 1: PASSO 1 - ISOLAMENTO (TRASLAZIONE ALL'ORIGINE)
      // =========================================================================
      let o1_X = larghezzaGrafico * 0.35; 
      let o1_Y = altezzaAssiY;

      disegnaAsseCartesiano(o1_X, o1_Y, "GRAFICO 1: ISOLAMENTO", "Spostiamo il sistema portando C in (0,0).\nCalcoliamo Δx = x - cx  e  Δy = y - cy");

      let cx1 = o1_X + c_X * scala;
      let cy1 = o1_Y - c_Y * scala;
      let px1 = o1_X + p_X * scala;
      let py1 = o1_Y - p_Y * scala;

      stroke(255, 100); strokeWeight(1); line(cx1, cy1, px1, py1); 
      disegnaPunto(cx1, cy1, color(255, 255, 100), "C(60, 50)");
      disegnaPunto(px1, py1, color(255), "P(110, 80)");

      let deltaX_pixel = (p_X - c_X) * scala;
      let deltaY_pixel = -(p_Y - c_Y) * scala;
      
      stroke(0, 150, 255, 130); drawingContext.setLineDash([3, 3]);
      line(o1_X, o1_Y, o1_X + deltaX_pixel, o1_Y + deltaY_pixel);
      drawingContext.setLineDash([]);
      disegnaPunto(o1_X, o1_Y, color(255, 255, 100), "C' (0,0)");
      disegnaPunto(o1_X + deltaX_pixel, o1_Y + deltaY_pixel, color(200), "P' (50, 30)");


      // =========================================================================
      // GRAFICO 2: PASSO 2 - TRASFORMAZIONE (ROTAZIONE INTORNO A O)
      // =========================================================================
      let o2_X = larghezzaGrafico * 1.35; 
      let o2_Y = altezzaAssiY;

      disegnaAsseCartesiano(o2_X, o2_Y, "GRAFICO 2: TRASFORMAZIONE", "Ora che il perno è lo zero, applichiamo\nla rotazione standard a P' di un angolo θ");

      let deltaX = (p_X - c_X) * scala;
      let deltaY = -(p_Y - c_Y) * scala; 

      let deltaX_ruotato = deltaX * cos(angoloRotazione) - deltaY * sin(angoloRotazione);
      let deltaY_ruotato = deltaX * sin(angoloRotazione) + deltaY * cos(angoloRotazione);

      stroke(255, 80); strokeWeight(1); line(o2_X, o2_Y, o2_X + deltaX, o2_Y + deltaY); 
      stroke(255, 100, 100); strokeWeight(2); line(o2_X, o2_Y, o2_X + deltaX_ruotato, o2_Y + deltaY_ruotato); 
      
      noFill(); stroke(100, 100, 255); strokeWeight(1.5);
      let angVisualizzato = abs(angoloRotazione % TWO_PI);
      arc(o2_X, o2_Y, raggio, raggio, -angoloIniziale - angVisualizzato, -angoloIniziale);

      disegnaPunto(o2_X, o2_Y, color(255, 255, 100), "C' (0,0)");
      disegnaPunto(o2_X + deltaX, o2_Y + deltaY, color(150), "P'");
      disegnaPunto(o2_X + deltaX_ruotato, o2_Y + deltaY_ruotato, color(255, 100, 100), "P' ruotato");


      // =========================================================================
      // GRAFICO 3: PASSO 3 - RIPOSIZIONAMENTO (TRASLAZIONE INVERSA)
      // =========================================================================
      let o3_X = larghezzaGrafico * 2.35; 
      let o3_Y = altezzaAssiY;

      disegnaAsseCartesiano(o3_X, o3_Y, "GRAFICO 3: RIPOSIZIONAMENTO", "Riportiamo tutto nella posizione iniziale:\nx finale = Δx ruotato + cx  |  y finale = Δy ruotato + cy");

      let cx3 = o3_X + c_X * scala;
      let cy3 = o3_Y - c_Y * scala;
      let px3 = o3_X + p_X * scala;
      let py3 = o3_Y - p_Y * scala;
      
      let px3Ruotato = cx3 + deltaX_ruotato;
      let py3Ruotato = cy3 + deltaY_ruotato;

      let p2Math_X = Math.round((px3Ruotato - o3_X) / scala);
      let p2Math_Y = Math.round(-(py3Ruotato - o3_Y) / scala);

      stroke(255, 80); strokeWeight(1); line(cx3, cy3, px3, py3);
      stroke(255, 100, 100); strokeWeight(2.5); line(cx3, cy3, px3Ruotato, py3Ruotato);
      
      noFill(); stroke(100, 100, 255);
      arc(cx3, cy3, raggio, raggio, -angoloIniziale - angVisualizzato, -angoloIniziale);

      disegnaPunto(cx3, cy3, color(255, 255, 100), "C(60, 50)");
      disegnaPunto(px3, py3, color(255), "P(110, 80)");
      disegnaPunto(px3Ruotato, py3Ruotato, color(255, 100, 100), `P' finale (${p2Math_X}, ${p2Math_Y})`);
      
      textAlign(LEFT, BOTTOM);
      textSize(12);
      if (inMovimento) {
        fill(46, 213, 115); text("● ANIMAZIONE IN CORSO (Clicca per bloccare)", 20, height - 20);
      } else {
        fill(255, 159, 67); text("▮▮ IN PAUSA (Clicca per avviare)", 20, height - 20);
      }
    }

    function disegnaAsseCartesiano(ox, oy, titolo, descrizione) {
      stroke(70); strokeWeight(1);
      line(ox - 100, oy, ox + 180, oy);
      line(ox, oy - 150, ox, oy + 100);
      
      fill(90); noStroke();
      textSize(9); textAlign(RIGHT, TOP);
      text("O(0,0)", ox - 5, oy + 5);

      // MODIFICATO: Il blocco ora è compatto. Titolo a -280 e spiegazione subito sotto a -255 (distanti solo 25px)
      textAlign(CENTER, TOP);
      textSize(14); fill(255); textStyle(BOLD);
      text(titolo, ox, oy - 280);
      
      textSize(11); fill(150); textStyle(NORMAL);
      text(descrizione, ox, oy - 255);
    }

    function disegnaPunto(x, y, colore, etichetta) {
      noStroke(); fill(colore);
      ellipse(x, y, 8, 8);
      textSize(11); textAlign(LEFT, CENTER);
      text(etichetta, x + 8, y - 2);
    }