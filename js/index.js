

/**vragen aantal vakjes**/
let aantalVakjes = Number(prompt("Hoeveel vakjes wil je? Geef een even getal in"));
let controleEindeSpel = aantalVakjes/2
for (let i = 1; i < 9999999999999999999; i++) {
    if (aantalVakjes % 2 === 0) {
        break
    } else {
        aantalVakjes = Number(prompt("Geef een EVEN getal in."));
    }
}

/**array opvullen met de aangegeven nummers**/
let array = [];
let x = 1;
for (let i = 1; i <= aantalVakjes / 2; i++) {
    array.push(x);
    array.push(x);
    x += 1;
}

let arrayRandomNumber = array.sort(function () {
    return Math.random() - 0.5;
});
var counterClick = 0;
var guessResults = "";
var idGuess1 = "";

/**vakjes genereren**/
let plaatsVakjes = document.getElementById("plaatsVakjes");
for (let z = 1; z <= aantalVakjes; z++) {
    let kaart = document.createElement("div");
    kaart.innerHTML = `
    <div onclick="tonen(${z})" id="${z}" class="card bg-primary m-3" style="width: 5rem; height: 5rem">
        <div class="card-body ">
            <p id="nummerP${z}" class="w-100 h-100 card-text text-white d-flex align-items-center justify-content-center bg-danger nummer${arrayRandomNumber[z-1]} d-none">${arrayRandomNumber[z-1]}</p>
        </div>
    </div>`
    plaatsVakjes.appendChild(kaart);
}


function tonen(id) {
    counterClick++
    let card = document.getElementById(id);
    let pTag = card.querySelector("p");
    pTag.classList.remove("d-none");


    if (!idGuess1) {
        idGuess1 = id;
    } else {

    }

    if (compareGuesses(pTag)) {
        //true
        // onclick event weg
        card.removeAttribute("onclick");
        document.getElementById(idGuess1).removeAttribute("onclick");
        idGuess1 = "";
        controleEindeSpel--;
        if (controleEindeSpel===0){
            alert("proficiat u heeft gewonnen in " + counterClick/2 + " zetten")
        }


    } else {
        //false
        //stylen weer naar dnone
        if (counterClick % 2 === 0) {//2 click
            setTimeout(add_d_none, 200, pTag);//huidig click
            console.log(idGuess1, "idguess1")
            let divTagGuess1 = document.getElementById(idGuess1);
            console.log(divTagGuess1, "divTagGuess1");
            let pTagGuess1 = divTagGuess1.querySelector("p");
            console.log(pTagGuess1, "pTagGuess1");
            add_d_none(pTagGuess1);//eerste click
            idGuess1 = "";

        } else {//1click
        }
    }

}

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

function add_d_none(pTag) {
    pTag.classList.add("d-none");
}

//click event zetten op de card
//in de functie van de click event moet je de p tag aanspreken

