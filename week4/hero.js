function makeHero(event) {

    event.preventDefault();

    const hero = {};
    hero.name = form.heroName.value;

    // hero.powers = [];
    // powersArray = Array(form.powers);
    // alert(powersArray);
    // powersArray.map((power) => {
    //     alert(power.value)
    //     hero.powers.push(power.value)
    // });

    hero.powers = [];
    for (let i = 0; i < form.powers.length; i++) {
        if (form.powers[i].checked) {
            hero.powers.push(form.powers[i].value);
        }
    }

    alert(JSON.stringify(hero));
    return hero;

}

const form = document.forms[0];
form.addEventListener('submit', makeHero, false);