export const fetchPokemons = async () => {      //Função responsável por buscar todos os pokemons
    const url = "https://pokeapi.co/api/v2/pokemon/";

    const req = await fetch(url);
    const res = await req.json();

    return res;
};
