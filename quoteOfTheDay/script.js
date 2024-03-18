let quote = document.querySelector('.quote');
let quoteAuthor = document.querySelector('.name');
let speech = document.querySelector('.speech');
let copy = document.querySelector('.copy');
let twitter = document.querySelector('.twitters');
let saveAss = document.querySelector('.saveAs');
let generateNew = document.querySelector('.generateNew');

document.addEventListener('DOMContentLoaded', async () => {
    // Fetch and display a random quote on page load
    const initialQuote = await fetchRandomQuote();
    displayQuote(initialQuote);
});

// Function to fetch a random quote
async function fetchRandomQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://zenquotes.io/api/quotes/';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        return data[0]; // Return the first quote object from the response array
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

// Function to display quote and author
function displayQuote(quoteObj) {
    quote.innerHTML = quoteObj.q;
    quoteAuthor.innerHTML = `- ${quoteObj.a}`;
}

// Function to read out the quote including the author
function readQuote() {
    const textToRead = `${quote.textContent} by ${quoteAuthor.textContent}`;
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    speechSynthesis.speak(utterance);
}

// Event listener for clicking the 'speech' element
speech.addEventListener('click', () => {
    readQuote();
});

// Event listener for generating a new quote
generateNew.addEventListener('click', async () => {
    const newQuote = await fetchRandomQuote();
    displayQuote(newQuote);
});

// Event listener for copying quote to clipboard
copy.addEventListener('click', () => {
    const textToCopy = `${quote.textContent} - ${quoteAuthor.textContent}`;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('Quote copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
});

// Event listener for saving quote as image
saveAss.addEventListener('click', () => {
    saveAsImage();
});

// Event listener for sharing quote on Twitter
twitter.addEventListener('click', () => {
    const textToTweet = `${quote.textContent} - ${quoteAuthor.textContent}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textToTweet)}`;
    window.open(twitterUrl, '_blank');
});

function saveAsImage() {
     // Create a canvas element
     const canvas = document.createElement('canvas');
     const context = canvas.getContext('2d');
 
     // Set canvas dimensions to match the size of the content to be saved
     canvas.width = quote.offsetWidth;
     canvas.height = quote.offsetHeight;
 
     // Draw the quote and author onto the canvas
     context.fillStyle = 'white'; // Set background color
     context.fillRect(0, 0, canvas.width, canvas.height); // Fill with background color
     context.font = '20px Arial'; // Set font size and family
     context.fillStyle = 'black'; // Set text color
     context.fillText(quote.textContent, 10, 30); // Draw quote
     context.fillText(quoteAuthor.textContent, 10, 60); // Draw author
 
     // Convert the canvas content to a data URL representing the image
     const dataURL = canvas.toDataURL('image/png');
 
     // Create a temporary link element
     const link = document.createElement('a');
     link.href = dataURL;
 
     // Set the filename for the downloaded image
     link.download = 'quote.png';
 
     // Append the link to the document body and trigger a click event to initiate download
     document.body.appendChild(link);
     link.click();
 
     // Clean up: remove the link from the document
     document.body.removeChild(link);
 }
 speech.addEventListener('click', () => {
     // Get the text content of the quote and author
     const quoteText = document.querySelector('.quote').textContent;
     const authorText = document.querySelector('.name').textContent;
 
     // Concatenate the quote and author text
     const textToSpeak = `${quoteText} by ${authorText}`;
 
     // Create a new SpeechSynthesisUtterance object with the text to speak
     const speechUtterance = new SpeechSynthesisUtterance(textToSpeak);
 
     // Use the default speech synthesis voice
     const voices = window.speechSynthesis.getVoices();
     speechUtterance.voice = voices[0];
 
     // Speak the text
     window.speechSynthesis.speak(speechUtterance);
 }); 