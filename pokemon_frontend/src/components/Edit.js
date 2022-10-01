import React, {useState } from 'react'

const Edit = (props) => {
  let emptyUser = {name: '', age: '', pokemon: ''}
  const [user, setUser] = useState({...props.user})

  const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleUpdate(user)
  }

  return (
    <>
    <details>
        <summary>Change Info?</summary>
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name: </label>
            <input
            type='text'
            name='name'
            value={user.name}
            onChange={handleChange}
            />

            <br />
            <br />
            
            <label htmlFor='age'>Age: </label>
            <input
            type='number'
            name='age'
            value={user.age}
            onChange={handleChange}
            />

            <br />
            <br />

            <label htmlFor='pokemon'>Choose Pokemon</label>
            <input
            type='text'
            name='pokemon'
            value={user.pokemon}
            onChange={handleChange}
            />
            <input type='submit'/>
        </form>
    </details>
    </>
  )
}

export default Edit