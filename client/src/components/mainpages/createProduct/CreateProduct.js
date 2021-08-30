import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import { useAlert } from 'react-alert';
import { useHistory, useParams } from 'react-router-dom';
import CheckBox from '../utils/Checkbox'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    size: [],
    _id: ''
}

function CreateProduct() {


    const alert = useAlert();

    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [categories] = state.categoriesAPI.categories;
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;

    const history = useHistory();
    const param = useParams();

    const [products, setProducts] = state.productsAPI.products;
    const [onEdit, setOnEdit] = useState(false);
    const [callback, setCallback] = state.productsAPI.callback;

    const [size, setSize] = useState({
        sizes: [
            { id: 1, value: "1", isChecked: false },
            { id: 2, value: "2", isChecked: false },
            { id: 3, value: "3", isChecked: false },
            { id: 4, value: "4", isChecked: false },
            { id: 5, value: "5", isChecked: false },
            { id: 6, value: "6", isChecked: false },
            { id: 7, value: "7", isChecked: false },
            { id: 8, value: "XS", isChecked: false },
            { id: 9, value: "S", isChecked: false },
            { id: 10, value: "M", isChecked: false },
            { id: 11, value: "L", isChecked: false },
            { id: 12, value: "XL", isChecked: false },
            { id: 13, value: "XXL", isChecked: false },
            { id: 15, value: "40", isChecked: false },
            { id: 16, value: "42", isChecked: false },
            { id: 17, value: "44", isChecked: false },
            { id: 18, value: "46", isChecked: false },
            { id: 19, value: "48", isChecked: false },
            { id: 20, value: "10", isChecked: false },
            { id: 21, value: "12", isChecked: false },
        ]
    });

    let finalSize = [];



    useEffect(() => {



        if (param.id) {
            setOnEdit(true);
            products.forEach(product => {
                if (product._id === param.id) {
                    setProduct(product);
                    setImages(product.images);
                }
            })
        } else {
            setOnEdit(false);
            setProduct(initialState);
            setImages(false);
        }
    }, [param.id, products])

    const handleUpload = async e => {
        e.preventDefault();
        try {
            if (!isAdmin) return alert.show("You´re not an admin");
            const file = e.target.files[0];

            if (!file) return alert.show("File not exists.");

            if (file.size > 1024 * 1024) //1mb
                return alert.show("Size too large!");


            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert.show("File format is incorrect.");

            let formData = new FormData();
            formData.append('file', file);

            setLoading(true);
            const res = await axios.post('/api/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            });

            setLoading(false);
            setImages(res.data);

        } catch (err) {
            alert.show(err.response.data.msg);
        }
    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert.show("You´re not an admin");
            setLoading(true);
            await axios.post('/api/destroy', { public_id: images.public_id }, {
                headers: { Authorization: token }
            });
            setLoading(false);
            setImages(false);
        } catch (err) {
            alert.show(err.response.data.msg);
        }
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }


    const handleCheckChieldElement = (event) => {
        let sizes = size.sizes;
        sizes.forEach(size => {
            if (size.value === event.target.value)
                size.isChecked = event.target.checked
        })
        setSize({ sizes: sizes })


    }

    const handleSubmit = async e => {
        e.preventDefault();

        size.sizes.map((size, index) => {
            if (size.isChecked === true) {
                finalSize.push({ "id": size.id, "value": size.value, "isChecked": size.isChecked });
            }
        })

        console.log(finalSize);

        try {
            if (!isAdmin) return alert.show("You´re not an admin");
            if (!images) return alert.show("No Image Upload");

            if (onEdit) {
                await axios.put(`/api/products/${product._id}`, { ...product, images, size: finalSize }, {
                    headers: { Authorization: token }
                });
            } else {
                await axios.post('/api/products', { ...product, images, size: finalSize }, {
                    headers: { Authorization: token }
                });
            }

            setCallback(!callback)
            setImages(false);
            setProduct(initialState);
            history.push('/');

        } catch (err) {
            alert.show(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    const styleCheck = {
        marginBottom: "50px"
    }
    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                {
                    loading ? <div id="file_img"><Loading /></div>
                        : <div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt="" />
                            <span onClick={handleDestroy}>X</span>
                        </div>
                }

            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                        value={product.product_id} onChange={handleChangeInput} disabled={product._id} />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                        value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                        value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                        value={product.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                        value={product.content} rows="7" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="row">
                <label htmlFor="sizes" >Sizes: </label>
                    <div className="check">
                        <ul>
                            {
                                size.sizes.map((size, index) => {
                                    return (<CheckBox key={index} handleCheckChieldElement={handleCheckChieldElement}  {...size} />)
                                })
                            }
                        </ul>
                    </div>
                </div>

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    );
}

export default CreateProduct;