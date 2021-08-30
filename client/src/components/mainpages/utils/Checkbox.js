import React from 'react'

export const CheckBox = props => {
    return (
      <li>
        <p>{props.value}</p>
       <input  key={props.id} onChange={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> 
      </li>
    )
}


export default CheckBox