import React from 'react'
import AppContext from '../context'

const Info = ({img, title, text}) => {

  const {setOpenCart} = React.useContext(AppContext)

  return (
    <div className="cartEmpty">
          <img src={img} alt="..." />
          <h2>{title}</h2>
          <div><p>{text}</p></div>
          <div className="greenBtn">
            <button onClick={()=>setOpenCart(false)} ><img src="/img/arrow.svg" />Вернуться назад </button>

          </div>
      </div>
  )   
}

export default Info
