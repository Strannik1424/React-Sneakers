
function Home({
  items,
  cartItem,
  setSearchChange,
  onChangeSearch,
  Sneakers,
  searchChange,
  onAddToFavorites,
  onAddtoCart,
  isLoading,
}) {

  const returnItems = ()=>{
    const filterItems = items.filter(item => item.title.toLowerCase().includes(searchChange.toLowerCase()))
    return(
        (isLoading ? [...Array(8)] : filterItems).map((val, index) => (
            <Sneakers
              
              key={index}
              onFavorites={(obj) => onAddToFavorites(obj)}
              onPlus={(obj) => onAddtoCart(obj)}
              added = {cartItem.some(item => Number(item.id) === Number(val.id))}
              loading={isLoading}
              {...val}
            />
          ))
    )
  }

  return (
    <div className="content p-40">
      <div className="search d-flex justify-between mb-40">
        <h1 className="">{searchChange ? `Поиск по запросу : "${searchChange}"` : 'Все кросовки'}</h1>
        <div className="search-block align-center">
          <img src="/img/search.svg" alt="search" />
          <input value={searchChange} onChange={onChangeSearch} type="text" name="search" placeholder="Поиск..." />
          {searchChange && <img onClick={() => setSearchChange('')} className="clear cartRemove" src="/img/btn-remove.svg" />}

        </div>

      </div>

      <div className="cardSneakers d-flex flex-wrap">{returnItems()}</div>

    </div>
  )
}

export default Home