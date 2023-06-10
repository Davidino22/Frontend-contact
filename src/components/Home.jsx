import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Table from './table';

function Home() {
  const [errors, setErrors] = useState({})
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate()



  useEffect(() => {
    getcontacts();
  }, []);

  async function getcontacts() {
    const contacts = await fetch(`${import.meta.env.VITE_URL}api/contact`)
    const jsonData = await contacts.json();
    console.log(jsonData.contacts)
    setList(jsonData.contacts)

  }

  async function handlesubmit(event) {
    event.preventDefault()

    if (!validateContact()) {
      return
    }



    console.log({
      name, email, message
    })
    const response = await fetch(`${import.meta.env.VITE_URL}api/contact`, {

      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name, email, message
      }),

    })
    const data = await response.json()
    console.log(data);
    setName("")
    setEmail("")
    setMessage("")



    navigate(0)
  }


  function validateContact() {

    let obj = {}
    if (!name) {
      console.log(name, 'hello');
      obj = { name: "you need to type in a name" }


    }

    if (!message) {
      obj = { message: "you need tot ype in a massage", ...obj }
    }


    if (!email) {
      obj = { email: 'you need to type in a email', ...obj }
    }
    console.log(obj);
    setErrors(obj)
    if (Object.keys(obj).length === 0) {
      return true
    }
    else {
      return false
    }

  }



  return (
    <>
      <form onSubmit={handlesubmit}>
        <div>

          <label htmlFor='name'>Name :</label><input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <p style={{ color: "red", fontSize: "12px" }}> {errors.name}</p>
        </div>
        <div>
          <label htmlFor='email'>Email:</label>  <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <p style={{ color: "red", fontSize: "12px" }}> {errors.email}</p>
        </div>
        <div>
          <label htmlFor='message'> Your Message: </label> <textarea id="message" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
          <p style={{ color: "red", fontSize: "12px" }}> {errors.message}</p>
        </div>
        <button type="submit">sent </button>
      </form>





      <div className='container'>
        <Table list={list} />
      </div>
    </>
  )
}

export default Home