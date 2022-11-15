import axios from 'axios';
import React from 'react'
import Sneakers from "../components/CardSneakers"

function Orders({ onFavorites, onAddtoCart}){

  const [orders, setOrders] = React.useState([])
  
  React.useEffect(()=>{
    (async()=>{
      const {data} = await axios.get('https://6357b6abc26aac906f309eb2.mockapi.io/Orders')
      console.log(data.map(obj=>obj))
    })();
  }, [])

    return(
        <div className="content p-40">
        <div className="search d-flex justify-between mb-40">
           <h1 className="">Мои заказы</h1>
        </div>

        <div className="cardSneakers d-flex flex-wrap">
        {
            []
            .map((val, index) => (
              <Sneakers 
                id={val.id}
                title={val.title} 
                img={val.img} 
                price={val.price} 
                key={index} 
                favorites={true}
                onFavorites={onFavorites}
                onPlus={(val) => onAddtoCart(val)}

                />
            ))  
          }
        </div>
 
      </div>
    )
}

export default Orders