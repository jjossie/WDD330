

// const form = document.forms[0];
// const [input,button] = form.elements;

// input.addEventListener('focus', () => alert("focused"))
// input.addEventListener('blur', () => alert("unfocused"), false)
// input.addEventListener('change', () => alert("unfocused"), false)

const form = document.forms['search'];
const input = form.elements['searchInput'];

// input.value = "Search Here";
// input.addEventListener('focus', () => input.value = "");
// input.addEventListener('blur', () => input.value = "Search Here");



function search(event){
    alert(`You searched for ${input.value}`);
    event.preventDefault();
}

form.addEventListener('submit', search, false);