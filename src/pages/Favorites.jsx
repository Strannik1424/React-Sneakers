import React from 'react'
import Sneakers from "../components/CardSneakers"
import AppContext from "../context"

function Favorites({ onFavorites, onAddtoCart}){
  const {favorites} = React.useContext(AppContext)
    return(
        <div className="content p-40">
        <div className="search d-flex justify-between mb-40">
           <h1 className="">Мои закладки</h1>
        </div>

        <div className="cardSneakers d-flex flex-wrap">
        {
            favorites
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

export default Favorites