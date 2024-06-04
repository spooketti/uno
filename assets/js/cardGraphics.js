function calcCardRot() {
    let cardCount = currentHand.childElementCount
    let center = Math.floor(cardCount / 2)
    let sideCount = Math.ceil(cardCount - center) //13/2 = 6.5 round up to 7;  13 - 7 = 6 cards on each side of the center
    let moveSum = 0
    let rotSum = 0
    let moveInterval = 150 / sideCount
    let rotInterval = 45 / sideCount

    if (cardCount % 2 == 0) {
        center = cardCount / 2
        sideCount = cardCount / 2
        moveInterval = 150 / (1.25 * sideCount)
        rotInterval = 45 / sideCount
    
        for (let i = center; i < 2 * sideCount; i++) {
            moveSum += moveInterval
            rotSum += rotInterval
            currentHand.children.item(i).style.transform = `translateX(${moveSum}px) rotate(${rotSum}deg) `
            currentHand.children.item(center - (i - center + 1)).style.transform = `translateX(${-moveSum}px) rotate(${-rotSum}deg)`
        }
        return
    }

    currentHand.children.item(center).style.transform = "translateX(0px) rotate(0deg)"
    for (let i = center + 1; i < sideCount + center; i++) {
        moveSum += moveInterval
        rotSum += rotInterval
        currentHand.children.item(i).style.transform = `translateX(${moveSum}px) rotate(${rotSum}deg) `
        currentHand.children.item(center - (i - center)).style.transform = `translateX(${-moveSum}px) rotate(${-rotSum}deg)`
    }
}