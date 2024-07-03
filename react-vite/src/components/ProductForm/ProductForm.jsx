import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreateNewProduct, thunkAddProductImage } from '../../redux/products'
import './ProductForm.css'

const ProductForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(()=> {
        const errorArr = [];
        if (!name) errorArr.push('Name is required')
        if (name.length > 50) errorArr.push('Name can not be more than 50 characters')
        if (!description) errorArr.push('Description is required')
        if (description.length > 255) errorArr.push('Description can not be more than 255 characters')
        if (!price) errorArr.push('Price is required')
        if (price <= 0) errorArr.push('Price must be positive number')
        if (!stock) errorArr.push('Stock is required')
        if (stock <= 0) errorArr.push('Stock must be positive number')
    
    
    
    })

}