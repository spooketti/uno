
let colorDict = {
    "R": "RedCard",
    "B": "BlueCard",
    "G": "GreenCard",
    "Y": "YellowCard",
    "Bl": "BlackCard"
}

let CardDict = ["RedCard","BlueCard","YellowCard","GreenCard"]

let symbolDict = {
    "S": "block",
    "R": "cached"
}

function genDeck() {
    fetch(startGameEndpoint,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Network response failed")
        }).then(data => {
            for (let i = 0; i < data["cards"].length; i++) {
                let cardData = data["cards"][i].split(".")
                let color = colorDict[cardData[0]]
                let value = cardData[1]
                symbolClass = "material-symbols-outlined"
                let card = document.createElement("div")
                card.classList.add("Card")
                card.classList.add(color)
                let topSym = document.createElement("span")
                topSym.classList.add("TopSymbol")
                topSym.innerText = value
                let center = document.createElement("div")
                center.classList.add("CardCenter")
                let centerSym = document.createElement("span")
                centerSym.innerText = value
                let botSym = document.createElement("span")
                botSym.innerText = value
                botSym.classList.add("BottomSymbol")
                if (value in symbolDict) {
                    value = symbolDict[value]
                    topSym.innerText = value
                    centerSym.innerText = value
                    botSym.innerText = value
                    topSym.classList.add(symbolClass)
                    centerSym.classList.add(symbolClass)
                    botSym.classList.add(symbolClass)
                }
                
              
                
                currentHand.appendChild(card)
                card.appendChild(topSym)
                card.appendChild(center)
                center.appendChild(centerSym)
                card.appendChild(botSym)
                card.classList.add("PlayingCard")
                card.onclick = function(){
                    let cardClone = card.cloneNode(true)
                    depositPile.appendChild(cardClone)
                    cardClone.style.transform = `rotateX(65deg) rotateZ(${Math.random() * 360}deg)`
                    cardClone.classList.add("DepositCard")
                    cardClone.classList.remove("PlayingCard")
                    card.remove()
                    calcCardRot()
                }
                if(value == "W")
                    {
                        center.innerHTML = null
                        center.classList.add("WildCenter")
                        for(let i=0;i<4;i++)
                        {
                            let wildCorner = document.createElement("div")
                            wildCorner.classList.add("WildCenterCorner")
                            wildCorner.classList.add(CardDict[i])
                            center.appendChild(wildCorner)
                        }
                    }
            }
        })
        .catch(error => {
            console.error("There was a problem with the fetch", error);
        });
}