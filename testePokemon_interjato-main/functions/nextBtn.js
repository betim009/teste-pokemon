btnNext.addEventListener('click', async () => {
    const req = await fetch(data.next);
    const res = await req.json();

    pokemonsDisplay = res.results;
    
    divPokemons.innerHTML = "";     //Limpa a tela;
    pokemonsDisplay.forEach((e, i) => {
        divPokemons.innerHTML += `
            <div>
                <h4>${e.name}</h4>
            </div>
        `
    });
});

export default nextBtn;