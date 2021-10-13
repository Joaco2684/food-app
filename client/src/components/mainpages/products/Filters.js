import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

function Filters() {

    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;
    const [isAdmin] = state.userAPI.isAdmin;

    const [category, setCategory] = state.productsAPI.category;
    const [sort, setSort] = state.productsAPI.sort;
    const [search, setSearch] = state.productsAPI.search;

    /* const handleCategory = e => {
        setCategory(e.target.value);
        console.log(e.target.value);
        setSearch('');
    } */

    function handleCategory(id) {
        setCategory(id);
        setSearch('');
    }

    return (
        <div className="filter_menu">

            <div className="row sort">

                <input type="text" value={search} placeholder="Enter your search!"
                    onChange={e => setSearch(e.target.value.toLowerCase())} />


                <div className="category">



                    <button onClick={() => handleCategory("")}>All</button>
                    {
                        categories.map(category => (
                            <button onClick={() => handleCategory(`category=${category._id}`)} key={category._id}>{category.name}</button>
                        ))
                    }

                </div>
            </div>
        </div>
    );
}

export default Filters;