document.addEventListener('DOMContentLoaded', function () {
    const slotMachine = document.querySelector('.slot-machine');
    const slots = document.querySelectorAll('.slot');
    const spinButton = document.getElementById('spinButton');
    const resultDisplay = document.getElementById('result');
    const spinSound = document.getElementById('spinSound');
    const winSound = document.getElementById('win');
    let isSpinning = false;
    let Att=5000
    const columns = [
      [0,6,7],
      [10,6,7],
      [0,1,2],
      [5,6,7],
      [10,11,12],
      [10,6,12],
      [0,6,2],
      [10,6,2],
      [5,1,2],
      [5,11,12],
      [5,1,7],
      [5,11,7],
      [0,1,7],
      [10,11,7],
      [0,11,2],
      [10,1,12],
    ];
  
    const diagonals = [
      [0, 6, 12],
    ];
    
      const emojis = [ '🍒', '🍇', '🍓', '🍍', '🍉', '🍑', '🍋', '🌟'];
  
      const emojiValues = {
        '🍒': 1,
        '🍇': 4,
        '🍓': 10,
        '🍍': 25,
        '🍉': 27,
        '🍑': 41,
        '🍋': 52,
        '🌟': 90,
      };
    
      function playSpinSound() {
        spinSound.currentTime = 0;
        spinSound.play();
      }
    
      function spinColumn(slot) {
        let spins = 10;
        const emojis = Object.keys(emojiValues);
    
        const interval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * emojis.length);
          const randomEmoji = emojis[randomIndex];
          slot.textContent = randomEmoji;
    
          spins--;
          if (spins <= 0) {
            clearInterval(interval);
          }
        }, 100); // Intervallo di "rotazione" in millisecondi
      }
    
      function spin() {
        Att=Att-1;
        document.getElementById('ok').innerHTML=Att+" €"
        playSpinSound();
        if (isSpinning) return;
    
        isSpinning = true;
        spinButton.disabled = true;
    
        resultDisplay.textContent = ''; // Resetta il messaggio di vincita
    
    
        slots.forEach((slot) => {
          slot.classList.remove('winning-column'); // Rimuove la classe di vincita
          spinColumn(slot);
        });
    
        setTimeout(() => {
          isSpinning = false;
          spinButton.disabled = false;
          checkWin();
        }, 2000); // Tempo totale di "rotazione" in millisecondi
      }
    
      function checkWin() {
        for (const column of columns) {
          const symbols = column.map((index) => slots[index].textContent);
          if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
            displayWin(column);
            return;
          }
        }
    
        for (const diagonal of diagonals) {
          const symbols = diagonal.map((index) => slots[index].textContent);
          if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
            displayWin(diagonal);
            return;
          }
        }
      }
    
      function displayWin(winningLine) {
        winSound.currentTime = 0;
        winSound.play();
        let winAmount = calculateWinAmount(winningLine);
        resultDisplay.textContent = `HAI VINTO ${winAmount} €`;
        let R=winAmount
        Att=Att+parseInt(R); 
        document.getElementById('ok').innerHTML=Att+" €"
        console.log(Att)
        highlightWinningColumn(winningLine);
      }
    
      function highlightWinningColumn(winningLine) {
        winningLine.forEach((index) => {
          slots[index].classList.add('winning-column');
        });
      }
    
      function calculateWinAmount(winningLine) {
        const symbol = slots[winningLine[0]].textContent;
        return emojiValues[symbol] || 0;
      }
    
      spinButton.addEventListener('click', spin);
    });