import Edit from './Edit'

const Trainers = (props) => {
  return (
    <>
    <div id='users-div' className='users'>
        {props.users.map((user) => {
          return (
            <div className='trainer' key={user.id}>
              <h4>Name: {user.name}</h4>
              <h5>Age: {user.age}</h5>
              {/* <img src={pokemon.img} /> */}
              <h5>Pokemon: {user.pokemon}</h5>
              <Edit handleUpdate={props.handleUpdate} user={user} />
              <button onClick={props.handleDelete} value={user.id}>Delete Trainer</button>
            </div>
          )
        })}

        </div>
    </>
  )
}

export default Trainers