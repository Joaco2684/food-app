import React, {useState, useEffect} from 'react';
import { useAlert } from 'react-alert';
import axios from 'axios';

function UserAPI(token) {

    const alert = useAlert();

    const [isLogged, setIsLogged] =  useState(false);
    const [isAdmin, setIsAdmin] =  useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    
                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])
    
    const addCart = async (product, size) => {
        if(!isLogged) return alert.show("please login to continue buying");

        const check = cart.every(item => {
            return item._id !==product._id
        });

        if(check) {
            setCart([...cart, {...product, quantity: 1, size}]);

            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1, size}]}, {
                headers: {Authorization: token}
            })

        } else {
            alert.show("This product has been added to cart.")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart
    }

}

export default UserAPI