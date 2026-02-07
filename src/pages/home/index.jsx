import { useEffect, useState, useRef } from 'react' // React Hooks
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {

  // const users = [{

  //   id: '32465dsfsdf',
  //   name: 'João',
  //   age: 30,
  //   email: 'manox@email.com'
  // }, {
  //   id: '32445dsfsdf',
  //   name: 'Maria',
  //   age: 25,
  //   email: 'maria@email.com'

  // }]
  const [users, setUser] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUser() {
    const usersFromApi = await api.get('/users')

    setUser(usersFromApi.data)    
  }

   async function createUser() {
    await api.post('/users', {
      name: inputName.current.value,
      age: parseInt(inputAge.current.value, 10),
      email: inputEmail.current.value
    })

    getUser()   

  }

  async function deleteUser(id) {
    await api.delete(`/users/${id}`)

    getUser()
  }

useEffect(() => {
  async function fetchUsers() {
    const usersFromApi = await api.get('/users')
    setUser(usersFromApi.data)
  }

  fetchUsers()
}, [])


  return (

    <div className='container'>
      <form>
        <h1>Cadastro de usuários</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName}/>
        <input placeholder='Idade' name='idade' type='number' ref={inputAge}/>
        <input placeholder='Email' name="email" type="email" ref={inputEmail}/>
        <button type='button' onClick={createUser}>Cadastrar</button>
      </form>

      {users.map(user => (
        
          <div key={user.id} className='card'>
            <div>
              <p>Nome:<span>{user.name}</span></p>
              <p>Idade:<span>{user.age}</span></p>
              <p>Email:<span>{user.email}</span></p>
              </div>
              <button onClick={() => deleteUser(user.id)}>
                <img src={Trash} />
              </button>      
          </div>
      ))}

    </div>

  )
}

export default Home
