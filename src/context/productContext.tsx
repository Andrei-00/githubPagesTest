import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Product, { Props } from "../components/Product";


interface ProductContextType {
    fetchedProducts: Props[];
    filterProducts: (searchTerm: string) => void;
  }




  const ProductContext = createContext<ProductContextType | undefined>(undefined);

  export const ProductProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    
    const [fetchedProducts, setFetchedProducts] = useState<Props[]>([]);

    useEffect(() => {
        console.log('use efect');
        axios.get('data.json')
          .then((res) => {
            setFetchedProducts(res.data["products"])
          })
      }, []);
    
    const filterProducts = (searchTerm: string) => {
        setFetchedProducts((products) => {
            const filteredProducts = products.filter((product) =>
            product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
            return filteredProducts;
        });
    }

    return (
        <ProductContext.Provider value={{fetchedProducts, filterProducts}}>
            {children}
        </ProductContext.Provider>
    )
  };

  export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
  }