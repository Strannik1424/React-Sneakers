import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Drawer from "./components/Drawer";
import Sneakers from './components/CardSneakers';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';



function App() {

  const [cartItem, setCartItem] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [items, setItems] = React.useState([])
  const [searchChange, setSearchChange] = React.useState('')

  const [openCart, setOpenCart] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function addedCart() {
      const Items = await axios.get('https://6357b6abc26aac906f309eb2.mockapi.io/Items')
      const CartItems = await axios.get('https://6357b6abc26aac906f309eb2.mockapi.io/Cart')
      const FavoriteItems = await axios.get('https://6357b6abc26aac906f309eb2.mockapi.io/Favorites')

      setIsLoading(false)


      setCartItem(CartItems.data)
      setFavorites(FavoriteItems.data)
      setItems(Items.data)
    }

    addedCart()
  }, [])

  const onAddtoCart = (obj) => {
    console.log(obj)
    try {
      if (cartItem.find((item) => Number(item.id) == Number(obj.id))) {
        axios.delete(`https://6357b6abc26aac906f309eb2.mockapi.io/Cart/${obj.id}`)
        setCartItem(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        axios.post('https://6357b6abc26aac906f309eb2.mockapi.io/Cart', obj)
        setCartItem(prev => [...prev, obj])

      }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
    }

  }

  const onChangeSearch = (e) => {
    setSearchChange(e.target.value)
  }

  const onRemoveBasket = (id) => {
    axios.delete(`https://6357b6abc26aac906f309eb2.mockapi.io/Cart/${id}`)
    setCartItem(prev => prev.filter(item => item.id !== id))
  }

  const onAddToFavorites = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id == obj.id)) {
        axios.delete(`https://6357b6abc26aac906f309eb2.mockapi.io/Favorites/${obj.id}`)
        setFavorites(val => val.filter(item => item.id !== obj.id))
      } else {
        const { data } = await axios.post('https://6357b6abc26aac906f309eb2.mockapi.io/Favorites', obj)
        setFavorites(prev => [...prev, data])

      }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
    }
  }

  const isItemsAdded = (id)=>{
    return cartItem.some(item => item.id == id)
  }

  return (
    <AppContext.Provider value={{items, cartItem, favorites, isItemsAdded, setOpenCart, setCartItem, setOpenCart}}>
      <div className="wrapper clear">

        {openCart && <Drawer onRemove={onRemoveBasket} item={cartItem}  />}

        <Header onClickKorzina={() => setOpenCart(true)} />

        <Routes>
          <Route path='/' element={<Home
            items={items}
            cartItem={cartItem}
            setSearchChange={setSearchChange}
            onChangeSearch={onChangeSearch}
            Sneakers={Sneakers}
            searchChange={searchChange}
            onAddToFavorites={onAddToFavorites}
            onAddtoCart={onAddtoCart}
            isLoading={isLoading}
          />} />

          <Route path='/favorites' element={<Favorites
            onFavorites={onAddToFavorites}
            onAddtoCart={onAddtoCart} />} />

          <Route path='/orders' element={<Orders/>} />

        </Routes>


      </div>
    </AppContext.Provider>
  );
}

export default App;
