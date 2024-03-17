let quote = document.querySelector('.quote');
let quoteAuthor = document.querySelector('.name');
let speech = document.querySelector('.speech');
let copy = document.querySelector('.copy');
let twitter = document.querySelector('.twitters');
let saveAss = document.querySelector('.saveAs');
let generateNew = document.querySelector('.generateNew');

document.addEventListener('DOMContentLoaded', async () => {
   
    // Initial fetch and display
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
            // Notification using browser toolkit
            alert('Quote copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
});

// Event listener for saving quote as image
saveAss.addEventListener('click', () => {
    // Assuming you have a function saveAsImage() defined elsewhere
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
 