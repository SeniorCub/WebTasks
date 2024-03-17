const quoteText = document.querySelector(".quote"),
    authorName = document.querySelector(".name"),
    speechBtn = document.querySelector(".speech"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter"),
    synth = speechSynthesis;

    function randomQuote() {
     fetch("https://quotes.rest/qod?language=en") // They Said So API endpoint for the quote of the day
         .then(response => {
             if (!response.ok) {
                 throw new Error('Network response was not ok');
             }
             return response.json();
         })
         .then(data => {
             const quote = data.contents.quotes[0];
             quoteText.innerText = quote.quote;
             authorName.innerText = quote.author;
         })
         .catch(error => console.error('Error fetching quote:', error));
 }
 

randomQuote(); // Fetch and display a random quote when the page loads

speechBtn.addEventListener("click", () => {
    if (!speechBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(() => {
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quoteText.innerText} by ${authorName.innerText}`)}`;
    window.open(tweetUrl, "_blank");
});