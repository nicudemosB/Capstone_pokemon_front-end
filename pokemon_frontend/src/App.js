import './App.css';
import { useEffect, useState } from 'react' 
// import Axios from 'axios'
import axios from 'axios';
import Add from './components/Add'
import Edit from './components/Edit'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Trainers from './components/Trainers'
function App() {

  const [pokemonName, setPokemonName] = useState('')
  const [pokemonChosen, setPokemonChosen] = useState(false)
  const [pokemon, setPokemon] = useState ({ 
    name: '', 
    species: '', 
    img: '', 
    hp: '',
    attack: '',
    defense:'',
    type:'' ,
  })
// where users will be 
  let [users, setUsers] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const showAddButton = () => {
    showAdd ? setShowAdd(false) : setShowAdd(true) 
  }
// grabbing an element of users-div
// if this element has a style display attribute = none, change it to flex 
// if its anything else it changes to none(check CSS)
  const showTrainer = () => {
    const x = document.getElementById('users-div')
    if(x.style.display === 'none') {
      x.style.display = 'flex'
    } else {
      x.style.display = 'none'
    }
  }
  
  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
      // contains info on our pokemon
      setPokemon({
        name: pokemonName, 
        species: response.data.species.name, 
        img: response.data.sprites.front_default, 
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      })
      setPokemonChosen(true)
    })
    
  }

  const getUsers = () => {
    axios
    .get('http://localhost:8000/api/users')
    .then(
      (response) => setUsers(response.data),
      (err) => console.error(err)
    )
    .catch((error) => console.error(error))
  }
  
  const handleCreate = (addUser) => {
    axios
    .post('http://localhost:8000/api/users', addUser)
    .then((response) => {
      console.log(response)
      getUsers()
    })
  }

  const handleDelete = (event) => {
    axios
    .delete('http://localhost:8000/api/users/' + event.target.value)
    .then ((response) => {
      getUsers()
    })
  }

  const handleUpdate = (editUser) => {
    console.log(editUser);
    axios
    .put('http://localhost:8000/api/users/' + editUser.id, editUser)
    .then((response) => {
      setUsers(users.map((user) => {
        return user.id !== editUser.id ? user : editUser
      }))
    })
  }

  useEffect(() => {
    getUsers()
  },[])

  return (
    <BrowserRouter>
      <div className='App'>
        <button onClick={showAddButton}>Add a trainer</button>
        <button onClick={showTrainer}>Show Trainers</button>
        {showAdd ? <Add handleCreate={handleCreate} /> : null}
        
        {/* <Nav/> */}
        <Trainers users = {users} handleUpdate = {handleUpdate} handleDelete = {handleDelete} />
        
        <div className='TitleSection'>
        <h1>Pokemon Collection</h1>
        <input type='text' onChange={(event) => {setPokemonName(event.target.value)}} 
        />
        <button onClick={searchPokemon}>Search Pokemon</button>
        </div>
        <div className='DisplaySection'>{!pokemonChosen ? (
        <h1> Please choose a pokemon</h1>
        ) : (
        <>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.img} />
        <h3>Species: {pokemon.species}</h3>
        <h3>Type: {pokemon.type}</h3>
        <h4>Hp: {pokemon.hp}</h4>
        <h4>Attack: {pokemon.attack}</h4>
        <h4>Defense: {pokemon.defense}</h4>
        </>
        )}

        </div>
      </div>
      <Routes>
        <Route exact path = 'api/users'> 
          {/* <Add/> */}
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;
