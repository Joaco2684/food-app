import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
const waMe = require("wa-me-generator");



const initialState = {
    name: '',
    adress: '',
    phone: '',
    payment: '',
    observations: '',
    
}

function Payment() {

    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;

    const [user, setUser] = useState(initialState);

    let cartText = '';
    let total = 0;
    let space = '********************************************\n';
    
    let linkWhatsap=``;

    function openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
      }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const infoUser = `   *name*: ${user.name}\n   *Address*: ${user.adress}\n   *Phone*: ${user.phone}\n   *Payment Method*: ${user.payment}\n   *Observations*: ${user.observations}\n`;

        cart.map((item, index) => {
            cartText = cartText + `   *title*: ${item.title}\n   *quantity*: ${item.quantity}\n   *price*: ${item.price}\n\n`
            total = total + (item.price * item.quantity);
        });


        linkWhatsap = waMe.createFromNumberWithMessage("+5492216797209",`*INFO*\n\n${infoUser}\n${space}*CART*\n${cartText}${space}*Total:* $${total}`);

        openInNewTab(linkWhatsap)
        
    }



    return (
        <div className="payment">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" required
                        value={user.name} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="adress">Adress:</label>
                    <input type="text" name="adress" id="adress" required
                        value={user.adress} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" name="phone" id="phone" required
                        value={user.phone} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="payment">Payment Method:</label>
                    <input type="text" name="payment" id="payment" required
                        value={user.payment} onChange={handleChangeInput}  />
                </div>

                <div className="row">
                    <label htmlFor="observations">Observations:</label>
                    <textarea type="text" name="observations" id="observations" required
                        value={user.observations} rows="5" onChange={handleChangeInput} />
                </div>

                <button type="submit">Send Whatsapp</button>
            </form>
        </div>
    );
}

export default Payment;