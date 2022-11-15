import React from 'react'
import ContentLoader from "react-content-loader"

import styles from './CardSneakers.module.scss'
import AppContext from '../../context'


const Sneakers = ({ 
    id, 
    img, 
    title, 
    price, 
    onPlus, 
    onFavorites, 
    favorites = false, 
    added = false ,
    loading = false

}) => {

    const {isItemsAdded} = React.useContext(AppContext)

    const [isAdded, setIsAdded] = React.useState(added)

    const [isZakladki, setIsZakadki] = React.useState(favorites)

    const onClickFavorites = () => {
        onFavorites({ id, img, title, price })
        setIsZakadki(!isZakladki)
    }

    const onClickPlus = () => {
        onPlus({ id, img, title, price })
        setIsAdded(!isAdded)
    };

    return (
        <div className={styles.card}>
            { loading ? <ContentLoader
                width={160}
                height={250}
                backgroundColor="#dbd6d6"
            >
                <rect x="0" y="0" rx="10" ry="10" width="160" height="155" />
                <rect x="0" y="167" rx="5" ry="5" width="160" height="15" />
                <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                <rect x="124" y="230" rx="5" ry="5" width="32" height="32" />
            </ContentLoader> : <>
            <div className={styles.likes}>
                <img onClick={onClickFavorites} src={isZakladki ? '/img/liked.svg' : '/img/unliked.svg'} />
            </div>
            <img width={"100%"} height={135} src={img} />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                <span>Цена :</span>
                <b>{price} руб.</b>
                </div>
                <img onClick={onClickPlus} src={isItemsAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} />
            </div>
            </>
            }
            

            
        </div>
    )
}

export default Sneakers