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
      background(0); // Sfondo nero fisso coerente con lo stile del sito

      // Parametri grafici adattati (Invariati)
      let raggio = 70;             
      let centroX = 140;     
      let centroY = 280;     
      let graficoX = 280;    

      // Calcolo dinamico per il margine destro dello schermo
      let asseX_Lunghezza = width - graficoX - 40;   

      // --- 1. ISTRUZIONI INTERATTIVE (Riorganizzate per il Radiante) ---
      fill(255, 215, 0); // Colore Oro (tema del radiante/arco)
      noStroke();
      textFont('Helvetica');
      textAlign(LEFT, BASELINE);
      
      textSize(18);
      text("Dimostrazione Geometrica del Radiante", 0, 40);
      
      textSize(13);
      fill(200);
      text("• Gira il MOUSE in cerchio attorno al centro per stendere l'arco sulla circonferenza.", 0, 65);
      text("• Quando la lunghezza dell'Arco (Oro) è uguale al Raggio (Bianco), l'angolo è esattamente di 1 Radiante (~57.3°).", 0, 85);

      // --- 2. LOGICA MATEMATICA ROTATORIA FLUIDA ---
      let rad = 0;
      
      if (mouseX !== 0 || mouseY !== 0) {
        rad = atan2(centroY - mouseY, mouseX - centroX);
        if (rad < 0) {
          rad += TWO_PI;
        }
      }
             
      let angoloDeg = degrees(rad);
      // Lunghezza dell'arco corrente: s = r * theta
      let lunghezzaArco = raggio * rad; 
      // Lunghezza massima dell'arco (tutta la circonferenza)
      let circonferenza = TWO_PI * raggio; 

      // --- 3. DISEGNO: CERCHIO TRIGONOMETRICO (A SINISTRA) ---
      stroke(60, 65, 75);
      strokeWeight(1);
      line(centroX - raggio - 20, centroY, centroX + raggio + 20, centroY);
      line(centroX, centroY - raggio - 20, centroX, centroY + raggio + 20);

      // Circonferenza di riferimento
      stroke(100, 110, 125);
      noFill();
      ellipse(centroX, centroY, raggio * 2);

      // Valori fissi in radianti sui quattro quadranti
      fill(80, 90, 100);
      noStroke();
      textSize(10);
      textAlign(CENTER, CENTER);
      text("0 rad", centroX + raggio + 22, centroY);
      text("π/2", centroX, centroY - raggio - 12);
      text("π rad", centroX - raggio - 22, centroY);
      text("3/2π", centroX, centroY + raggio + 12);

      // Raggio iniziale fisso (Base di partenza sull'asse X)
      stroke(150, 150, 150, 150);
      strokeWeight(2);
      line(centroX, centroY, centroX + raggio, centroY);

      // --- DISEGNO DELL'ARCO SULLA CIRCONFERENZA (ORO) ---
      if (rad > 0) {
        noFill();
        stroke(255, 215, 0); // Oro lucido per l'arco
        strokeWeight(3.5);   // Evidenziato perché è il protagonista del grafico
        arc(centroX, centroY, raggio * 2, raggio * 2, -rad, 0);
        
        // Indicatore dell'angolo interno theta
        fill(255, 215, 0, 30);
        stroke(255, 215, 0);
        strokeWeight(1);
        arc(centroX, centroY, 35, 35, -rad, 0, PIE);

        // Lettera greca "θ"
        push();
        noStroke();
        fill(255, 215, 0);
        textSize(12);
        textAlign(CENTER, CENTER);
        let metaAngolo = rad / 2;
        let tx = centroX + cos(metaAngolo) * 25;
        let ty = centroY - sin(metaAngolo) * 25;
        text("θ", tx, ty);
        pop();
      }

      // Posizione del punto P mobile
      let px = centroX + cos(rad) * raggio;
      let py = centroY - sin(rad) * raggio; 

      // Raggio vettore mobile (Linea bianca)
      stroke(255);
      strokeWeight(2);
      line(centroX, centroY, px, py);

      // Testo dinamico sul raggio mobile
      noStroke();
      fill(255);
      textSize(11);
      textAlign(CENTER, BOTTOM);
      push();
      translate((centroX + px) / 2, (centroY + py) / 2);
      rotate(-rad);
      text("r", 0, -3);
      pop();

      // Pallino verde sul punto P
      fill(46, 213, 115);
      noStroke();
      ellipse(px, py, 8, 8);


      // --- 4. DISEGNO: GRAFICO DI RETTIFICAZIONE DELL'ARCO (A DESTRA) ---
      stroke(60, 65, 75);
      strokeWeight(1);
      // Asse X (Rappresenta lo srotolamento della circonferenza da 0 a 2π)
      line(graficoX, centroY, graficoX + asseX_Lunghezza, centroY); 
      // Asse Y (Rappresenta l'altezza/lunghezza dell'arco accumulata)
      line(graficoX, centroY - raggio - 20, graficoX, centroY + raggio + 20); 

      // Linea di riferimento tratteggiata per la misura di "1 Raggio" sull'asse Y grafico
      stroke(255, 255, 255, 50);
      line(graficoX, centroY - raggio, graficoX + asseX_Lunghezza, centroY - raggio);
      
      fill(100, 110, 125);
      textSize(11);
      textAlign(LEFT, CENTER);
      text("Lungh. = 1 Raggio", graficoX - 105, centroY - raggio);
      text("0", graficoX - 15, centroY);


      // --- 5. COSTRUZIONE IN DIRETTA DELLO SVILUPPO DELL'ARCO ---
      stroke(255, 215, 0, 150); 
      strokeWeight(2.5);
      noFill();
      
      beginShape();
      for (let a = 0; a <= angoloDeg; a++) {
        let xCurva = map(a, 0, 360, graficoX, graficoX + asseX_Lunghezza);
        let currentRad = radians(a);
        let yCurva = centroY - (currentRad * raggio); 
        vertex(xCurva, yCurva);
      }
      endShape();


      // --- 6. LINEE DI PROIEZIONE ASSIALI ---
      let ondaX = map(angoloDeg, 0, 360, graficoX, graficoX + asseX_Lunghezza);
      let ondaY = centroY - (rad * raggio);

      stroke(255, 255, 255, 80);
      strokeWeight(1);
      
      // Proiezione verticale dall'asse X del grafico fino al punto della retta
      for (let ly = centroY; ly > ondaY; ly -= 6) {
        line(ondaX, ly, ondaX, ly - 3);
      }
      
      // Indicatore visivo sull'asse X del grafico per vedere l'avanzamento dei radianti
      fill(255, 215, 0);
      noStroke();
      ellipse(ondaX, centroY, 5, 5);

      // Pallino rosso sul grafico sul punto corrente dello sviluppo dell'arco
      fill(255, 107, 107);
      ellipse(ondaX, ondaY, 10, 10);


      // --- 7. TABELLA VALORI (SOTTO IL GRAFICO, STRUTTURA IDENTICA) ---
      let datiYStart = centroY + raggio + 50; 
      textAlign(LEFT, TOP);                    
      noStroke();
      
      // Titolo della sezione dati
      fill(255);
      textSize(15);
      text("DATI GEOMETRICI:", graficoX, datiYStart); 
      
      // Angolo espresso direttamente in Radianti
      textSize(14);
      fill(255, 215, 0);
      text(`Angolo θ = ${rad.toFixed(2)} rad`, graficoX + 160, datiYStart);
      
      // Rapporto Arco / Raggio
      fill(46, 213, 115);
      let rapporto = rad; 
      text(`Arco / Raggio = ${rapporto.toFixed(2)}`, graficoX + 340, datiYStart);
      
      // Dati fissi di conversione e pixel
      fill(120, 130, 140);
      textSize(12);
      text(`Arco: ${(lunghezzaArco).toFixed(0)} px | Raggio: ${raggio} px`, graficoX + 510, datiYStart + 2);
    }