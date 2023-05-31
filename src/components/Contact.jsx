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


  function submitValue(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/api/contact/${id}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: contact.name,
        message: message,
        email: contact.email
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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