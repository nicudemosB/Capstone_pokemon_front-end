import React, { useState, useEffect } from 'react'

const Add = (props) => {
  let emptyUser = {name: '', age: '', pokemon: ''}
  const [user, setUser] = useState(emptyUser)

  const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleCreate(user)
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name: </label>
        <input type='text' name='name' value={user.name} onChange={handleChange} />
        <br />
        <br />
        <label htmlFor='age'>Age: </label>
        <input type='number' name='age' value={user.age} onChange={handleChange} />
        <br />
        <br />
        <label htmlFor='pokemon'>Choose Pokemon: </label>
        <input type='text' name='pokemon' value={user.pokemon} onChange={handleChange} />
        <input type='submit' />
    </form>
    </>
  )
}

export default Add