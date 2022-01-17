import "bootstrap/dist/css/bootstrap.min.css";
import { Products } from "./Products";
import { useState } from "react";
import { Card } from "../../common/Card";
import { SelectComponent } from "../Home/components/SelectComponent";
import { productsArray } from "../../pages/catalogpage/Products";

export function CatalogPage() {
  const [products, setProducts] = useState(newArray(10).fill({isPlaceholder:true}));
  const [searchValue, setSearchValue] = useState("");
  const [nationFilter, setNationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  function filterBySearchValue(list, value) {
    return list.filter((product) => {
      return product.name.toLowerCase().includes(value.toLowerCase());
    });
  }

  function filterByNation(list, nation) {
    return list.filter((product) => {
      return product.origin === nation;
    });
  }

  function filterByPrice(list, price) {
    return list.filter((product) => {
      switch (price) {
        case "0-10":
          if (product.price > 10) {
            return false;
          }
          return true;
        case "10-20":
            if ( product.price > 10 && product.price <= 20  ) {
                return true;
              }
              return false;
         
        case "20+":
            if (product.price > 20) {
                return true;
              }
              return false;
          
      }
    });
  }

  function getFilteredProducts(searchValue, nationFilter, priceFilter) {
    let filteredList = [...products];

    if (searchValue) {
      filteredList = filterBySearchValue(filteredList, searchValue);
    }

    if (nationFilter) {
      filteredList = filterByNation(filteredList, nationFilter);
      console.log(nationFilter);
    }

    if (priceFilter) {
      filteredList = filterByPrice(filteredList, priceFilter);
    }

    return filteredList;
  }

  return (
    <div>
      <nav className="navbar fixed-top navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Products</a>
          <SelectComponent
            title="Select product origin"
            onChange={(value) => setNationFilter(value)}
          />
          <select
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
            defaultValue="Select price range"
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option>Select price range</option>
            <option value="0-10"> 0-10</option>
            <option value="10-20">10-20</option>
            <option value="20+">20+</option>
          </select>

          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onInput={(e) => setSearchValue(e.target.value)}
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

      {getFilteredProducts(searchValue, nationFilter, priceFilter).map(
        (product, index) => {
          return (
            <Card
              className={"list-group-item" + (product.isPlaceholder ? " placeholder" :  "")}
              key={index}
              theme="dark mb-2 "
              title={!product.isPlaceholder ? product.name : "..."}
            >
              <div>Origin: {!product.isPlaceholder ? product.origin : "..."}}</div>
              <div>Price: {!product.isPlaceholder ? product.price : "..."}€</div>
            </Card>
          );
        }
      )}
    </div>
  );
}
