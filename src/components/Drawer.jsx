import React from 'react';
import AppContext from "../context"
import axios from 'axios'
import Info from "./Info"
import { useCart } from '../Hooks/useCart';

const Drawer = ({ onRemove, onClose, item = [] }) => {

  const {cartItem, setCartItem, totalPrice} =  useCart()


  const { setOpenCart } = React.useContext(AppContext)

  const [isOrderNumber, setIsOrderNumber] = React.useState(null);

  const [isOrder, setIsOrder] = React.useState(false);


  const onClickOrder = async ()=>{
    const {data} = await axios.post('https://6357b6abc26aac906f309eb2.mockapi.io/Orders', cartItem)
    setIsOrderNumber(data.id )
    setIsOrder(true)
    setCartItem([])
  }

  console.log(onClickOrder)


  return (
    <div className="overlay">
      <div className="drawer">

        <div className="korzina d-flex justify-between align-center mb-20 ">
          <h2>Корзина</h2>
          <img className="cartRemove" src="/img/btn-remove.svg" onClick={() => setOpenCart(false)} />
        </div>

        {item.length > 0 ? <div className="Item flex">
          <div className="block1">
          {item.map((obj, index) => (
            <div className="cartItem d-flex justify-between align-center mb-20 " key={index}>

              <div className="cartImg" style={{ backgroundImage: `url(${obj.img})` }}></div>

              <div className="cartInfo mr-10 ">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price} руб.</b>
              </div>
              <img onClick={() => onRemove(obj.id)} className="cartRemove" src="/img/btn-remove.svg" />
            </div>
            ))}
          </div>

            <div className="cartTitleBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого :</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{totalPrice / 100 * 5} руб.</b>
                </li>
              </ul>
              <div className="greenBtn">
                <button onClick={onClickOrder} >Оформить заказ<img src="/img/arrow.svg" /> </button>
              </div>
            </div>
        </div>
         : <Info 
         img={isOrder ? "/img/complete-order.jpg" :"/img/empty-cart.jpg"}
         title={isOrder ? 'Заказ оформлен =)' : "Корзина пустая"}
         text={isOrder ? `Ваш заказ под номером #${isOrderNumber} скоро будет доставлено в ваш адрес , для проверки или изменение адреса нажмите сюда` : "Добавьте что нибудь чтобы делать заказ"}
         />}





      </div>
    </div>
  )
}

export default Drawer