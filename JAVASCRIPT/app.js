const pokemonAPI=`https://pokeapi.co/api/v2`;
const cardPokemons=document.querySelector('#card-pokemons');
const limit=8;
const fetchData=async(urlAPI)=>{
    const response=await fetch(urlAPI);
    const data =await response.json();
    return data;
}
/*Mostrar Pokemones*/
const getPokemon=async(urlAPI)=>{
    let sHTMLCardComponent=``;
   try {
        let pokemons=await fetchData(`${urlAPI}/pokemon/?limit=${limit}`);
         for (const item of pokemons.results) {
            const pokemon=await fetchData(item.url);
            sHTMLCardComponent+=getCardComponent(pokemon.name,pokemon.sprites.other.dream_world.front_default);
         }
        cardPokemons.innerHTML=sHTMLCardComponent;
   } catch (error) {
        console.log(error);
   }
}

const getCardComponent=(strName,urlImage)=>`
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card">
                    <img src="${urlImage}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${strName}</h5>
                     
                    </div>
                  </div>
            </div>`;
getPokemon(pokemonAPI);

/*Agregar Pokemones*/
var btnAddPokemon=document.getElementById('btnAddPokemon');
var btnNewPokemon=document.getElementById('btnNewPokemon');

//Generar ID del pokemon
const randomNumber=(min,max)=>Math.floor(Math.random()*(max - min)+min);
//Mostrar un pokemon aleatorio
const viewPokemon=async(urlAPI )=>{
  let viewImgPokemon=document.querySelector('#viewImgPokemon');
  let viewTitlePokemon=document.querySelector('#viewTitlePokemon');
//Generar ID del pokemon
    try {
      const idPokemon=randomNumber(0,500);
      const pokemon=await fetchData(`${urlAPI}/pokemon/${idPokemon}`);
      const optionImg=pokemon.sprites.other.dream_world.front_default;
      console.log(pokemon);
      viewImgPokemon.src=optionImg;
      viewTitlePokemon.innerText=pokemon.name;
    } catch (error) {
      console.log('Error: ',error);
    }
    
    
}
const addPokemon=()=>{
let viewImgPokemon=document.getElementById('viewImgPokemon');
let viewTitlePokemon=document.getElementById('viewTitlePokemon');
    const newComponent=getCardComponent(viewTitlePokemon.innerHTML,viewImgPokemon.src);
    cardPokemons.innerHTML+=newComponent;
    //swal("Good job!", "You clicked the button!", "success");
    swal({
      title: "El pokémon se agregó",
      icon: "success",
      button: "Cerrar",
      timer:1500,
      timerProgressBar:true
    });
}
btnNewPokemon.addEventListener('click',()=>viewPokemon(pokemonAPI));
viewPokemon(pokemonAPI);
