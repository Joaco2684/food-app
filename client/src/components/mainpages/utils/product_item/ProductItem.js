import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import BtnRender from './BtnRender';
import { useAlert } from 'react-alert';





function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {

    const state = useContext(GlobalState)
    const alert = useAlert();


    const addCart = state.userAPI.addCart
    const [isLogged] = state.userAPI.isLogged;

    const [loading, setLoading] = useState(false);

    return (
        <div className="general">

            {
                isAdmin
                    ?

                    <div className="product_card">
                        <input type="checkbox" checked={product.checked}
                            onChange={() => handleCheck(product._id)} />
                        <div className="product_box">
                            <div className="product-img">
                                <img src={product.images.url} alt="" />
                            </div>

                            <div className="product-text">
                                <h2 title={product.title}>{product.title}</h2>
                                <span>${product.price}</span>
                                <p>{product.description}</p>
                            </div>

                        </div>



                        <div className="buttons">
                            <BtnRender product={product} deleteProduct={deleteProduct} />
                        </div>
                    </div>


                    :
                    <div className="product_ui">
                        <div className="container">

                            <main className="grid">
                                <article>
                                    <img src={product.images.url} alt="" />
                                    <div className="text">
                                        <Link id="btn_view" to={`/detail/${product._id}`}>
                                            <h3>{product.title}</h3>
                                        </Link>
                                        <p>{product.description}</p>
                                        <div className="row_btn">
                                            <span>${product.price}</span>
                                            {
                                                isLogged ?
                                                    <>
                                                        <Link id="btn_buy" to="/cart" onClick={() => addCart(product)}>
                                                            <button>Buy</button>
                                                        </Link>
                                                    </>
                                                    :
                                                    
                                                    <>
                                                        <Link id="btn_buy" to="/login" >
                                                            <button>Buy</button>
                                                        </Link>
                                                    </>
                                            }

                                        </div>

                                    </div>
                                </article>

                            </main>
                        </div>


                    </div>

            }






        </div>


    )

}

export default ProductItem