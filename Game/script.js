let randomNumber;
let attempts = 0;
const maxAttempts = 6;

function startGame() {
    randomNumber = Math.floor(Math.random() * 40) + 1;
    console.log(randomNumber);
    
    attempts = 0;
    document.getElementById('result').textContent = '';
    document.getElementById('restart').style.display = 'none';
    const circles = document.getElementsByClassName('circle');
    for (let i = 0; i < circles.length; i++) {
        circles[i].classList.remove('yellow', 'red', 'green');
        circles[i].style.pointerEvents = 'auto'; 
    }
}

function checkGuess(guess) {
    attempts++;
    const button = document.getElementById(`btn-${guess}`);

    if (guess < randomNumber) {
        button.classList.add('yellow');
        disableButtons(guess, 'lower');
    } else if (guess > randomNumber) {
        button.classList.add('red');
        disableButtons(guess, 'higher');
    } else {
        button.classList.add('green');
        document.getElementById('result').textContent = `Correct! It took you ${attempts} attempts. The number is ${randomNumber}.`;
        disableAllButtons(); 
        document.getElementById('restart').style.display = 'inline';
        document.getElementById('restart').addEventListener('click', function() {
            location.reload();
        });
    }

    if (attempts >= maxAttempts) {
        document.getElementById('result').textContent = `Game Over! The number was ${randomNumber}.`;
        disableAllButtons(); 
        document.getElementById('restart').style.display = 'inline';
        document.getElementById('restart').addEventListener('click', function() {
            location.reload();
        });
        
    }
}

function disableButtons(guess = 0, direction = '') {
    const circles = document.getElementsByClassName('circle');

    if (direction === 'lower') {
        for (let i = 1; i < guess; i++) {
            const button = document.getElementById(`btn-${i}`);
            if (button) {
                button.classList.add('disabled'); 
                button.style.pointerEvents = 'none';
            }
        }
    } else if (direction === 'higher') {
        for (let i = guess + 1; i <= 40; i++) {
            const button = document.getElementById(`btn-${i}`);
            if (button) {
                button.classList.add('disabled'); 
                button.style.pointerEvents = 'none'; 
            }
        }
    }
}

function disableAllButtons() {
    const circles = document.getElementsByClassName('circle');
    for (let i = 0; i < circles.length; i++) {
        const button = circles[i];
        button.classList.add('disabled');
        button.style.pointerEvents = 'none'; 
    }
}

function showRules() {
    const rules = `
        Welcome to the Ball Game!
        
        Rules:
        1. You have to guess a number between 1 and 40.
        2. You have a maximum of 6 attempts to guess the correct number.
        3. After each guess, you will receive a hint:
        - If your guess is lower than the target number, the button will turn yellow.
        - If your guess is higher than the target number, the button will turn red.
        - If you guess correctly, the button will turn green and you win!
        4. If you exceed the maximum attempts without guessing correctly, you lose.
        
        Good luck!
    `;
    alert(rules);
}

document.addEventListener('DOMContentLoaded', function() {
    const buttonsContainer = document.getElementById('buttons');
    for (let i = 1; i <= 40; i++) {
        const button = document.createElement('div'); 
        button.id = `btn-${i}`;
        button.classList.add('circle', 'btn', 'btn-light');
        button.textContent = i;
        button.addEventListener('click', function() {
            checkGuess(i);
        });
        buttonsContainer.appendChild(button);
    }
    
    startGame();

    document.getElementById('restart').addEventListener('click', function() {
       startGame();
   });

   document.getElementById('rulesButton').addEventListener('click', showRules);
});