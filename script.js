// Game State
let currentString = 'MI';
let history = ['MI'];
let stringsGeneratedCount = 1;

// DOM Elements
let currentStringDisplay;
let historyList;
let stringsCountDisplay;
let rule1Button, rule2Button, rule3Button, rule4Button;
let resetButton;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements after the document is fully loaded
    currentStringDisplay = document.getElementById('currentStringDisplay');
    historyList = document.getElementById('historyList');
    stringsCountDisplay = document.getElementById('stringsCountDisplay');
    rule1Button = document.getElementById('rule1Button');
    rule2Button = document.getElementById('rule2Button');
    rule3Button = document.getElementById('rule3Button');
    rule4Button = document.getElementById('rule4Button');
    resetButton = document.getElementById('resetButton');

    // Initial setup
    updateDisplay(); // Call initially to set up the page
    updateButtonStates(); // Call initially to set button states

    // Event Listeners
    if (rule1Button) {
        rule1Button.addEventListener('click', () => {
            const newString = applyRule1(currentString);
            if (newString !== currentString) {
                currentString = newString;
                history.push(currentString);
                stringsGeneratedCount = history.length; // Correctly update count
                updateDisplay();
                updateButtonStates();
            }
        });
    }
    if (rule2Button) {
        rule2Button.addEventListener('click', () => {
            const newString = applyRule2(currentString);
            if (newString !== currentString) {
                currentString = newString;
                history.push(currentString);
                stringsGeneratedCount = history.length; // Correctly update count
                updateDisplay();
                updateButtonStates();
            }
        });
    }
    if (rule3Button) {
        rule3Button.addEventListener('click', () => {
            const newString = applyRule3(currentString);
            if (newString !== currentString) {
                currentString = newString;
                history.push(currentString);
                stringsGeneratedCount = history.length; // Correctly update count
                updateDisplay();
                updateButtonStates();
            }
        });
    }
    if (rule4Button) {
        rule4Button.addEventListener('click', () => {
            const newString = applyRule4(currentString);
            if (newString !== currentString) {
                currentString = newString;
                history.push(currentString);
                stringsGeneratedCount = history.length; // Correctly update count
                updateDisplay();
                updateButtonStates();
            }
        });
    }
    if (resetButton) {
        resetButton.addEventListener('click', resetGame);
    }
});

// Rule Implementations
function applyRule1(s) {
    if (s.endsWith('I')) {
        return s + 'U';
    }
    return s;
}

function applyRule2(s) {
    if (s.startsWith('M')) {
        return 'M' + s.substring(1) + s.substring(1);
    }
    return s;
}

function applyRule3(s) {
    // Replace only the first occurrence of 'III'
    const index = s.indexOf('III');
    if (index !== -1) {
        return s.substring(0, index) + 'U' + s.substring(index + 3);
    }
    return s;
}

function applyRule4(s) {
    // Replace only the first occurrence of 'UU'
    const index = s.indexOf('UU');
    if (index !== -1) {
        return s.substring(0, index) + '' + s.substring(index + 2);
    }
    return s;
}

// Placeholder for function to update the display (will be expanded later)
function updateDisplay() {
    if (currentStringDisplay) {
        currentStringDisplay.textContent = currentString;
    }
    if (stringsCountDisplay) {
        stringsCountDisplay.textContent = 'Strings Generated: ' + stringsGeneratedCount;
    }
    if (historyList) {
        historyList.innerHTML = ''; // Clear previous history
        history.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            historyList.appendChild(li);
        });
        // Scroll to the bottom of the history list
        historyList.scrollTop = historyList.scrollHeight;
    }
}

function resetGame() {
    currentString = 'MI';
    history = ['MI'];
    stringsGeneratedCount = 1;
    updateDisplay();
    updateButtonStates(); // Will be fully implemented in the next step
}

// Placeholder for function to update button states (will be expanded later)
function updateButtonStates() {
    if (!currentStringDisplay) return; // Ensure DOM elements are loaded

    // Rule 1: Ends with 'I'
    if (rule1Button) rule1Button.disabled = !currentString.endsWith('I');

    // Rule 2: Starts with 'M' (x can be empty)
    if (rule2Button) rule2Button.disabled = !currentString.startsWith('M');

    // Rule 3: Contains 'III'
    if (rule3Button) rule3Button.disabled = currentString.indexOf('III') === -1;

    // Rule 4: Contains 'UU'
    if (rule4Button) rule4Button.disabled = currentString.indexOf('UU') === -1;
}

// Note: Event listeners and DOM manipulation will be added in the next plan step.
// Removed initial calls from here as they are now in DOMContentLoaded
