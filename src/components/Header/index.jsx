import React from 'react'
import styles from './Header.module.scss'
import {Link } from 'react-router-dom';
import {useCart} from '../../Hooks/useCart'


const Header = (props) => {

    const {totalPrice} =  useCart()
    

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to={'/'}>
            <div className={styles.headerLeft}>
                <img src="../img/logo.png" className="mr-10" />
                <div className={styles.headerInfo}>
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p>Магазин лучших кросовок</p>
                </div>
            </div>
            </Link>
            <div>
                <ul className="d-flex">
                    <li className="mr-30 cu-p " onClick={props.onClickKorzina}>
                        <img className="mr-10" width={18} height={18} src="/img/cart.svg" />
                        <span>{totalPrice} руб.</span>
                    </li>
                    <li className='mr-20 cu-p'>
                        <Link to={'/favorites'}>
                            <img src="/img/heart.svg" alt="" />
                        </Link>
                    </li>
                    <li>
                        <Link to={"/orders"}>
                            <img width={18} height={18} src="/img/user.svg" />
                        </Link>

                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header