const dice = {
    sides: 8,
    roll() {
        return Math.floor(Math.random() * this.sides) + 1;
    },
    rollSlow(){ 
        setTimeout(() =>{
            return Math.floor(Math.random() * this.sides) + 1;
        }, 3000);
    }
}

console.log("Boutta roll me a die bruh");

const promise = new Promise(
    (resolve, reject) => {
        const numberRolled = dice.roll();
        console.log("Aight we rolled, waiting for it to settle down");
        setTimeout(() => {
            (numberRolled === 2) ? reject(numberRolled) : resolve(numberRolled);
        }, 2000);
    }
)
.then(numberRolled => {
    console.log(`YEEHAW IT'S A ${numberRolled} BOY HOWDY`);
}, numberRolled => {
    console.log(`ah frick you rolled a frickin ${numberRolled} what'd ya go doin that fer`);
})

.then(() => {
    // new kind of promising!
    rollDice(dice);
})


.catch(error => {
    console.log(`something went wrong but idk what\nanyway it looks like this\n${error}`);
});



async function rollDice(dice) {
    try {
        console.log("finna roll a new dice bruhhh");
        const value = await dice.rollSlow();
        console.log(`Copped me a ${value} noice`);
    } catch (error) {
        console.log(`something went wrong but idk what\nanyway it looks like this\n${error}`);
    }
}


function* diceRollerNonRepeating(dieSides){
    let usedValues = [];
    while(true){
        const potentialValue = Math.floor(Math.random() * dieSides) + 1;
        if (! usedValues.includes(potentialValue)) {
            usedValues.push(potentialValue);
            yield potentialValue;
        }
    }
}

const dieSides = 6;
let die = diceRollerNonRepeating(dieSides);

// for (let side of die){
//     console.log(`Non-repeating die rolled a ${side}`);
// }

for (let i = 0; i < dieSides ; i++) {
    console.log(die.next().value);
}