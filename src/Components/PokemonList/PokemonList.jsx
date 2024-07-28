import { useEffect, useState } from "react"
import axios from "axios"
import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){
    const [pokemonList,setPokemonList]=useState([])
    const [isLoading,setIsLoading]=useState(true);
    const [pokedexUrl,setPokedexUrl]=useState("https://pokeapi.co/api/v2/pokemon")
    const [nextUrl,setNextUrl]=useState("")
    const [prevUrl,setPrevUrl]=useState("")
    async function downloadPokemons(){
        const response=await axios.get( pokedexUrl)
        console.log(response)
        const pokemonResults=response.data.results
        const pokemonResultsPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url))
        const pokemonData=await axios.all(pokemonResultsPromise)
        console.log(pokemonData)
        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)
        const res=pokemonData.map((pokeData)=>{
            const pokemon=pokeData.data;
            return{
                id:pokemon.id,
                name:pokemon.name,
                image:pokemon.sprites.other.dream_world.front_default,
                types:pokemon.types
            }})
            console.log(res)
        setPokemonList(res)
        setIsLoading(false)
    }
    
    useEffect(()=>{
        downloadPokemons()
         
    },[pokedexUrl])
   
    return (
        <div className="pokemon-list-wrapper">
           <div class="pokemon-list">
           pokemonlist
           </div>
            <div className="pokemon-wrapper">
            {(isLoading)?"Loading...":
                pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id}/> )
                
                }
            </div>
            <div className="controls">
                 <button disabled={prevUrl==null} onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
                 <button disabled={nextUrl==null} onClick={()=>setPokedexUrl(nextUrl)}>Next</button>
            </div>
       
        </div>
    )

}
export default PokemonList