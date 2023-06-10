import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiEdit2, FiSave, FiTrash } from "react-icons/fi";




export function Contact(props) {
  const [contact, setContact] = useState()
  const [showForm, setShowform] = useState(false)
  const [message, setMessage] = useState("")
  const [erorr, setErorr] = useState(null)

  let { id } = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}api/contact/${id}`)
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
    if (checkMessage()) {



      console.log(
        contact.name, message, contact.email, id
      )
      const response = await fetch(`${import.meta.env.VITE_URL}api/contact/${id}`, {
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
      navigate(0);
    }
  }


  function checkMessage() {
    if (!message) {
      setErorr("you need a message")
      return false

    }
    else {
      return true
    }
  }

  async function deleteItem() {
    console.log('deleted')

    const response = await fetch(`${import.meta.env.VITE_URL}api/contact/${id}`, {
      mode: "cors",

      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      },


    })
    const data = await response.json()
    console.log(data);
    navigate('/');
  }





  return (
    <>
      <Link to='/'>Back Home</Link>
      {contact && <div>

        <p>{contact.name}</p>
        {showForm ? <form onSubmit={submitValue} >

          <input type='text' value={message} onChange={changeValue} />
          <p style={
            { color: "red", fontSize: "24px" }
          }> {erorr}</p>
          <button type="submit"> <FiSave /> </button>
        </form> : <p>{contact.message}</p>}

        <button onClick={() => setShowform(!showForm)}> <FiEdit2 /></button>
        <button onClick={deleteItem}> <FiTrash /></button>


        <p>{contact.email}</p>
      </div>}


    </>
  )
}