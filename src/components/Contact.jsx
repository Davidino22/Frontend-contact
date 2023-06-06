import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiEdit2, FiSave } from "react-icons/fi";



export function Contact(props) {
  const [contact, setContact] = useState()
  const [showForm, setShowform] = useState(false)
  const [message, setMessage] = useState("")

  let { id } = useParams();


  useEffect(() => {
    fetch(`http://localhost:3000/api/contact/${id}`)
      .then((response) => response.json())

      .then((data) => {

        setContact(data.contact);
        setMessage(data.contact.message);
      });
  }, [id]);


  function changeValue(e) {

    setMessage(e.target.value)

  }


  async function submitValue(event) {
    event.preventDefault();

    console.log(
      contact.name, message, contact.email, id
    )
    const response = await fetch(`http://localhost:3000/api/contact/${id}`, {
      mode: "cors",

      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: contact.name,
        email: contact.email,
        message
      }),

    })
    const data = await response.json()
    console.log(data);
  }





  return (
    <>
      <Link to='/'>Back Home</Link>
      {contact && <div>

        <p>{contact.name}</p>
        {showForm ? <form onSubmit={submitValue} >

          <input type='text' value={message} onChange={changeValue} />
          <button type="submit"> <FiSave /> </button>
        </form> : <p>{contact.message}</p>}

        <button onClick={() => setShowform(!showForm)}> <FiEdit2 /></button>


        <p>{contact.email}</p>
      </div>}


    </>
  )
}