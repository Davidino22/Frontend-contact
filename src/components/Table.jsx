import { Link } from "react-router-dom"

export default function Table (props) {
  const {list} = props
return(

<table>
   <thead>
  <tr>
<th>Name</th>

<th>Message</th>

</tr>
</thead>
<tbody>


{list.map((contact)=>(
  <tr className=""key = {contact.id}>
<td>{contact.name}</td>
<td>{contact.message}</td>
<td><Link to= {`/${contact.id}`}> Details</Link></td>

  </tr>
))}

</tbody>



</table>
)
}