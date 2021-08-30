import React, { useState, useEffect } from 'react';
import axios from 'axios'

function CategoriesAPI() {
    const [categories, setCategories] = useState([]);
    const [callback, setcallback] = useState(false);

    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get('api/category');
            setCategories(res.data)
        }

        getCategories()
    }, [callback])
    return {
        categories: [categories, setCategories],
        callback: [callback, setcallback]
    }
}

export default CategoriesAPI;