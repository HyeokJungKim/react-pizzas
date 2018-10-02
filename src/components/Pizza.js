import React from "react"

const Pizza = (props) => {
  const {pizza, handleEdit} = props
  return(
    <tr>
      <td>{pizza.topping}</td>
      <td>{pizza.size}</td>
      <td>{pizza.vegetarian ? "Vegetarian" : "Not Vegetarian"}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => handleEdit(pizza)}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
