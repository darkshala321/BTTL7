import React, { useState } from 'react';
import { AiFillStar } from "react-icons/ai";
import Button from './Button';
import { product } from './data'



const Product = ({ product }) => {
    const discountedPrice = product.price - (product.price * 0.2);
    return (
        <div className='product-single'>
            <div className='product-image'>
                <img src={product.image} alt={product.title} />
            </div>
            <div className='product-detail'>
                <h3 className='product-title'>{product.title}</h3>
                <span className='star'>
                    {Array.from(Array(Math.ceil(product.rating.rate)).keys()).map((star) => (
                        <AiFillStar key={star} />))}
                </span>
                <span className='stock'><p>On store: {product.rating.count}</p></span>
                <p className='product-description'>{product.description}</p>
            </div>
            <div className='product-price'>
                <p className='price'>
                    
                    <span className='discounted-price'>${discountedPrice.toFixed(2)}</span>
                    <span className='original-price'>${product.price.toFixed(2)}</span>

                </p>
                <p className='shipping'> Free shipping</p>
                <div className='button-price'>
                    <Button type="primary" text="Details" />
                </div>
                <div className='button-price'>
                    <Button type="ghost" text="Add to Wishlist" />
                </div>
            </div>
        </div>
    );
};

export default Product;