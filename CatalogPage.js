import "bootstrap/dist/css/bootstrap.min.css";
import { Products } from "./Products";
import { useState } from "react";
import { Card } from "../../common/Card";
import { SelectComponent } from "../Home/components/SelectComponent";
import {productsArray} from "../../pages/catalogpage/Products";

export function CatalogPage() {

  
  
  
  const [products, setProducts] = useState(productsArray);
  const [filteredProducts, setFilteredProducts] = useState(productsArray);
  const [searchValue, setSearchValue] = useState("");
  const [nationFilter, setNationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

    
  function handleSearchInput(e) {
    setSearchValue(e.target.value);
    computeFilteredProducts();
  }

  function handleNationFilterChange(event) {
    setNationFilter(event.target.value);
    computeFilteredProducts();
  }

  function handlePriceFilterChange(e) {
    setPriceFilter(e.target.value);
    computeFilteredProducts();
  }

  function computeFilteredProducts() {
    let filteredList = [...products];

    if (searchValue) {
        filteredList = filteredList.filter((product) => {
              return product.name.toLowerCase().includes(searchValue.toLowerCase())
          })
        }

    if (nationFilter) {
      switch (nationFilter){
        case "Italy":
            console.log("Italy");
            break;
        case "France":
            console.log("Italy");
            break;
        case "Germany":
            console.log("Italy");
            break;
      }
      
    }

    if (priceFilter) {
       
    }

    setFilteredProducts(filteredList);
  }
  

  return (
    <div>
      <nav className="navbar fixed-top navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Products</a>
          <SelectComponent title="Select product origin" onChange={(e) => handleNationFilterChange(e)}/>
          <select
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
            defaultValue="Select price range"
            onChange={(e) => handlePriceFilterChange(e)}
          >
            <option>Select price range</option>
            <option value="0-10"> 0-10</option>
            <option value="10-20">10-20</option>
            <option value="20-30">20-30</option>
          </select>

          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onInput={(e) => handleSearchInput(e)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <br />
      <br />
      <br />

      {/*productsArray
        .filter((product) => {
          if (searchValue === "") {
            return product;
          } else if (product.name.toLowerCase().includes(searchValue.toLowerCase())) {
            return product;
          } 
        })*/
        filteredProducts
        .map((product, index) => {
          return (
            <Card
              className={"list-group-item"}
              key={index}
              theme="dark mb-2 "
              title={product.name}
            >
              <div>Origin: {product.origin}</div>
              <div>Price: {product.price}€</div>
            </Card>
          );
        })}
    </div>
  );
}
