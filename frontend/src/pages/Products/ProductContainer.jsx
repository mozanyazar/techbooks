import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getProducts, getProductsStatus } from '../../store/productSlice'
import ProductCard from '../../components/UI/ProductCard'
import ArticleCardSkeleton from '../../components/ArticleCardSkeleton/ArticleCardSkeleton'
const ProductContainer = () => {
  const products = useSelector(getProducts)
  const productsStatus = useSelector(getProductsStatus)

  if (productsStatus === 'pending') {
    return (
      <>
        {Array(6)
          .fill(null)
          .map((el, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
      </>
    )
  }

  return (
    <>
      {products?.map((product) => (
        <ProductCard
          key={product._id}
          {...product}
        />
      ))}
    </>
  )
}

export default ProductContainer
