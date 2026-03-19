const quote = document.getElementById("quote");
const author = document.getElementById("author");

const newQuoteBtn = document.getElementById("newQuote");
const copyBtn = document.getElementById("copyQuote");

const shareBtn = document.getElementById("shareQuote");
const saveBtn = document.getElementById("saveQuote");

const loader = document.getElementById("loader");

const backgrounds = [
  "https://picsum.photos/1600/900?random=1",
  "https://picsum.photos/1600/900?random=2",
  "https://picsum.photos/1600/900?random=3",
  "https://picsum.photos/1600/900?random=4",
  "https://picsum.photos/1600/900?random=5",
];

async function getQuote(){

quote.classList.remove("show");   // hide before loading
author.classList.remove("show");

changeBackground();

try{

const res = await fetch("https://dummyjson.com/quotes/random");
const data = await res.json();

quote.innerText = data.quote;
author.innerText = "- " + data.author;

// show with animation
setTimeout(()=>{
quote.classList.add("show");
author.classList.add("show");
},100);

}

catch(error){

quote.innerText = "Unable to load quote.";

}

}

function changeBackground(){

const random = Math.floor(Math.random()*backgrounds.length);

document.body.style.backgroundImage = `url(${backgrounds[random]})`;

}

newQuoteBtn.addEventListener("click", getQuote);

copyBtn.addEventListener("click", () => {
  const text = quote.innerText + " " + author.innerText;

  navigator.clipboard.writeText(text);

  copyBtn.innerText = "✓ Copied";

  setTimeout(() => {
    copyBtn.innerText = "Copy";
  }, 1500);
});

shareBtn.addEventListener("click", () => {
  const text = quote.innerText + " " + author.innerText;

  if (navigator.share) {
    navigator.share({
      title: "Quote",
      text: text,
    });
  } else {
    alert("Sharing not supported on this browser");
  }
});

saveBtn.addEventListener("click", () => {
  let favorites = JSON.parse(localStorage.getItem("quotes")) || [];

  favorites.push({
    quote: quote.innerText,
    author: author.innerText,
  });

  localStorage.setItem("quotes", JSON.stringify(favorites));

  alert("Quote saved!");
});

getQuote();
