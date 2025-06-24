function getQuote() {
    return fetch("https://api.breakingbadquotes.xyz/v1/quotes")
        .then(response => response.json())
        .then(data => document
            .getElementById("quoteBox").innerHTML = data[0].quote + "<br><i>-" + data[0].author + "</i>");
}