import React, { useState } from 'react'

export default function FilterableProductTable() {
    const [filterText, setFilerText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    function inStockChange(checked) {
        setInStockOnly(checked);
    }
    function filterTextChange(text) {
        setFilerText(text);
    }
    return (
        <>
            <div><SearchBar filterText={filterText} inStockOnly={inStockOnly} filterTextChange={filterTextChange} inStockChange={inStockChange} /></div>
            <div>
                <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
            </div>
        </>
    )
}


function ProductCategory({ category }) {
    return (
        <tr>
            <td>{category}</td>
        </tr>
    );
}
function ProductRow({ product }) {
    return (
        <tr key={product.name} >
            <td>{product.name}</td>
            <td>{product.price}</td>
        </tr>
    );
}

function ProductTable({ products, filterText, inStockOnly }) {
    //console.log('inStockOnly', inStockOnly);
    /*  const res = products.reduce((group, product) => {
         const { category } = product;
         group[category] = group[category] || [];
 
         group[category].push(product)
         return group;
         //console.log(product)
     }, {});
 
    */
    let rows = [];
    let lastCategory = null;
    /*   products.map(product => {
          if (product.name.toUpperCase().indexOf(filterText.toUpperCase()) < 0) {
              return
          }
          if (inStockOnly && product.stocked === !inStockOnly) return;
          if (product.category !== lastCategory) {
              rows.push(<ProductCategory category={product.category} />)
          }
          rows.push(<ProductRow product={product} key={product.name} />);
          lastCategory = product.category;
      
      }); */

    products.forEach(product => {
        if (product.name.toUpperCase().indexOf(filterText.toUpperCase()) < 0) {
            return
        }
        if (inStockOnly && product.stocked === !inStockOnly) return;
        if (product.category !== lastCategory) {
            rows.push(<ProductCategory category={product.category} />)
        }
        rows.push(<ProductRow product={product} key={product.name} />);
        lastCategory = product.category;
    });

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {/*   {rows.map((row) => <ProductRow product={row} />)} */}
                    {rows}
                </tbody>
            </table>
        </div>
    );
}
function SearchBar({ filterText, inStockOnly, filterTextChange, inStockChange }) {

    function inStock(event) {
        return inStockChange(event.target.checked);
    }
    return (
        <div>
            <input type='text' placeholder='Search...' value={filterText} onChange={(event) => { filterTextChange(event.target.value) }} />
            <br />
            <input type='checkbox' checked={inStockOnly} onChange={inStock} />Only show products in stock
        </div>
    );
}


const products = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];