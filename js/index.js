

/**vragen aantal vakjes**/
let aantalVakjes = Number(prompt("Hoeveel vakjes wil je? Geef een even getal in"));
let controleEindeSpel = aantalVakjes/2
for (let i = 1; i < 2; i--) { //for loop zorgt ervoor dat je geen oneven getallen of andere waarden kan ingeven
    if (aantalVakjes % 2 === 0) {
        break
    }else{
        aantalVakjes = Number(prompt("Geef een EVEN getal in."));
    }
}

/**array opvullen met de aangegeven nummers**/
let array = [];
let x = 1;
for (let i = 1; i <= aantalVakjes / 2; i++) { //array wordt opgevuld met de waarden 1 1 dan 2 2  met de hoeveelheid aan de hand van de input van de gebruiker
    array.push(x);
    array.push(x);
    x += 1;
}
/**array maken waar de aangemaakte nummers willekeurig worden gezet**/
let arrayRandomNumber = array.sort(function () {
    return Math.random() - 0.5;
});
var counterClick = 0;
var guessResults = "";
var idGuess1 = "";

/**vakjes genereren**/
let plaatsVakjes = document.getElementById("plaatsVakjes");
for (var z = 1; z <= aantalVakjes; z++) {
    let kaart = document.createElement("div");
    kaart.innerHTML = `
    <div onclick="tonen(${z})" id="${z}" class="card bg-primary m-3" style="width: 5rem; height: 5rem">
        <div class="card-body ">
            <p id="nummerP${z}" class="w-100 h-100 card-text text-white d-flex align-items-center justify-content-center bg-danger nummer${arrayRandomNumber[z-1]} d-none">${arrayRandomNumber[z-1]}</p>
        </div>
    </div>`
    plaatsVakjes.appendChild(kaart);
}

/**controle van de vakjes**/
function tonen(id) { // in deze functie worden de kaartjes met elkaar vergeleken
    counterClick++ //wordt gebruikt voor de clicks te tellen
    let card = document.getElementById(id);
    let pTag = card.querySelector("p");
    pTag.classList.remove("d-none");


    if (!idGuess1) { //hier wordt gekeken of het id al genomen is geweest zo ja dan doet hij niet zo neen dat zal hij hem gelijk zetten
        idGuess1 = id;
        card.removeAttribute("onclick")//om te zorgen dat de eerste vakje niet opniew kan worden gekozen
    } else {

    }
//hier worden de komt de resultaat uit de andere functie die true of false geeft terug,
    if (compareGuesses(pTag)) { //als de vakjes juist zijn zal hier de onclick event worden weggedaan
        //true
        // onclick event weg
        card.removeAttribute("onclick");
        document.getElementById(idGuess1).removeAttribute("onclick");
        idGuess1 = "";
        //dit zorgt voor de controle als alle vakjes weg zijn dat je ziet dat je gewonnen hebt + het geeft je aantal zetten weer
        controleEindeSpel--;
        if (controleEindeSpel===0){
            alert("proficiat u heeft gewonnen in " + counterClick/2 + " zetten")
        }


    } else {//hier wordt de d-none terug gezet van bijde kaartjes met een kleine delay op het 2 vakje zodat je het resultaatn nog ziet
        //false
        //stylen weer naar dnone
        if (counterClick % 2 === 0) {//2 click
            setTimeout(add_d_none, 200, pTag);//huidig click
            // console.log(idGuess1, "idguess1")
            let divTagGuess1 = document.getElementById(idGuess1);
            // console.log(divTagGuess1, "divTagGuess1");
            let pTagGuess1 = divTagGuess1.querySelector("p");
            // console.log(pTagGuess1, "pTagGuess1");
            add_d_none(pTagGuess1);//eerste click
            pTagGuess1.parentElement.parentElement.setAttribute("onclick",`tonen(${pTagGuess1.parentElement.parentElement.id.valueOf()})`)// om het onclick event terug te zetten
            idGuess1 = "";

        } else {//1click
        }
    }

}
//deze functie controleert of op je 1 click zit dan geeft hij fals terug en vult hij de guessResult, zit je op de 2 click dan geeft hij true terug als de cijfers van de p tag overeenkomen zoniet dan geeft hij false terug
function compareGuesses(pTag) {
    pTagValue = pTag.innerHTML;
    if (guessResults) {
        if (guessResults == pTagValue) {
            guessResults = "";
            return true;
        } else {
            guessResults = "";
            return false;


        }
    } else {
        guessResults = pTagValue;
        return false;
    }
}

function add_d_none(pTag) { //hier wordt de class d-none weggedaan zodat je de nummer kan zien
    pTag.classList.add("d-none");
}

