import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/mockProducts';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('luxe_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('luxe_products', JSON.stringify(products));
  }, [products]);

  // Admin CRUD operations
  const addProduct = (newProduct) => {
    const productWithDefaults = {
      ...newProduct,
      id: 'prod-' + Date.now(),
      rating: newProduct.rating || 5.0,
      reviewsCount: 0,
      status: Number(newProduct.stock) > 0 ? (Number(newProduct.stock) < 10 ? 'Low Stock' : 'In Stock') : 'Out of Stock',
      gallery: newProduct.gallery && newProduct.gallery.length > 0 ? newProduct.gallery : [newProduct.image]
    };
    setProducts(prev => [productWithDefaults, ...prev]);
    return productWithDefaults;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const stockNum = updatedFields.stock !== undefined ? Number(updatedFields.stock) : p.stock;
        const newStatus = stockNum > 0 ? (stockNum < 10 ? 'Low Stock' : 'In Stock') : 'Out of Stock';
        return {
          ...p,
          ...updatedFields,
          status: newStatus
        };
      }
      return p;
    }));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    updateProduct(id, { stock: Number(newStock) });
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, updateStock }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
