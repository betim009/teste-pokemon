import { fetchPokemon } from "./fetchPokemons.js";

export const handleNext = async (data, divPokemons) => {
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
}