import { fetchPokemon } from "./functions/fetchPokemons.js";

const divPokemons = document.getElementById('div-pokemons');        //Pega a div no html;
const btnPrevious = document.getElementById('btn-previous');        //Pega o botão de previous;
const btnNext = document.getElementById('btn-next');        //Pega o botão de next;
const inputNamePokemon = document.getElementById('name-pokemon')     //Pega o input e o valor que está inserido nele;
const researchPokemon = document.getElementById('research-pokemon');        //Pega o input submit;
const pokemonTrue = document.getElementById('pokemon-true');
const previous = document.getElementById('previous');

let data = null;

window.addEventListener('DOMContentLoaded', async () => {       //
    data = await fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=1');       //Armazena o aguardo da api; 
    const { results } = data;
    const [pokemon] = results;
    const { name, url } = pokemon;

    const details = await fetchPokemon(url);
    console.log(details.sprites.front_default)

    //Cria uma div com o nome para cada pokemon;
    divPokemons.innerHTML += `
            <div>
                <img src="${details.sprites.front_default}" />
                <h4>${name}</h4>
            </div>
        `
});

btnNext.addEventListener('click', async () => {
    const { next } = data;
    data = await fetchPokemon(next);

    const { results } = data;
    const [pokemon] = results;
    const { name, url } = pokemon;
    const details = await fetchPokemon(url);

    divPokemons.innerHTML = "";
    divPokemons.innerHTML += `
    <div>
        <img src="${details.sprites.front_default}" />
        <h4>${name}</h4>
    </div>
`
});

researchPokemon.addEventListener('click', async () => {     //Função que vai renderizar nome do pokemon pesquisado na tela;

    const name = inputNamePokemon.value

    if (name === "") {
        return alert('Digite algum nome de Pokemon válido!');
    }

    try {
        const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const res = await req.json();

        console.log('estou aqui', res);
        const arrAbilities = res.abilities;

        //retirei o "+" antes do sinal de igualdade, pq ao apertar o botão mais de uma vez o pokemon estava se repetindo.
        pokemonTrue.innerHTML = `       
            ${pokemonTrue.classList.add('branco-gelo')}
            <h3>${res.name}</h3>
            <img class="thumb" src="${res.sprites.front_default}" />
            <h5>Habilidades:</h5>
            <ul id="div-abilities"></ul>
        `
        const divAbilities = document.getElementById('div-abilities');
        arrAbilities.forEach((e, i) => {        //Cria uma lista para cada habilidade;
            divAbilities.innerHTML += `
                <li>${e.ability.name}</li>
            `
        })

        divPokemons.innerHTML = ""
        console.log(res)
    } catch (error) {
        alert('a')
    }
});

//previous
btnPrevious.addEventListener('click', async () => {
    const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const res = await req.json();

    const name = inputNamePokemon.value

    previous.innerHTML = `
        <h3>${res.name}</h3>
        <img class="thumb" src="${res.sprites.front_default}" />
        <h5>Habilidades:</h5>
        <ul id="div-abilities"></ul>
    `
})