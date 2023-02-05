import React, { useState } from "react";
import ProductContext from "../context/ProductContext";
import { BASE_URL } from "../../constants";

const ProductState = (props) => {

    const [products, setProducts] = useState([]);

    // get products
    const getProducts = async () => {
        const url = `${BASE_URL}/api/product/getProducts`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })

        const json = await response.json();
        setProducts(json);
    }

    // create product
    const addProduct = async (title, description, category, imageUrl) => {
        const url = `${BASE_URL}/api/product/addProduct`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, category, imageUrl })
        });

        const newProduct = await response.json();
        setProducts(products.concat(newProduct));
    }


    // update product
    const updateProduct = async (id, title, description, category, imageUrl) => {
        const url = `${BASE_URL}/api/product/updateProduct/${id}`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, category, imageUrl })
        });

        const json = await response.json();
        console.log(`Update response: ${json}`)

        let newProducts = JSON.parse(JSON.stringify(products));
        for (let product in newProducts) {
            if (product._id === id) {
                if (title) product.title = title;
                if (description) product.description = description;
                if (category) product.category = category;
                if (imageUrl) product.imageUrl = imageUrl;
                break;
            }

        }

        setProducts(newProducts);

    }


    // delete product
    const deleteProduct = async (id) => {
        const url = `${BASE_URL}/api/product/deleteProduct/${id}`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        console.log(`Deleted response: ${json}`)

        const newProducts = products.filter((product) => { return product._id !== id })
        setProducts(newProducts);
    }


    return (
        <ProductContext.Provider value={{ getProducts, addProduct, updateProduct, deleteProduct }}>
            {props.children}
        </ProductContext.Provider>
    )
}


export default ProductState;