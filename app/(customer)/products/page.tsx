import { getAllProducts } from '@/app/admin/_actions/product';
import ProductList from '@/components/ProductList';
import React from 'react'

const ProductsPage = async () => {
    const products = await getAllProducts();
  return (
    <div className='container mx-auto px-4 py-8'>
        <ProductList  label='All Products' products={products.documents} />
    </div>
  )
}

export default ProductsPage
