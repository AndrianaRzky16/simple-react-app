import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [{ id: 1, name: "", price: 0, quantity: 1, total: 0 }],
    };
  }

  addProduct = () => {
    const { products } = this.state;
    const newProduct = {
      id: products.length + 1,
      name: "",
      price: 0,
      quantity: 1,
      total: 0,
    };
    this.setState({ products: [...products, newProduct] });
  };

  deleteProduct = (id) => {
    const { products } = this.state;
    const updatedProducts = products.filter((product) => product.id !== id);
    this.setState({ products: updatedProducts });
  };

  handleInputChange = (id, name, value) => {
    const { products } = this.state;
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, [name]: value };
      }
      return product;
    });
    this.setState({ products: updatedProducts }, () => this.updateTotal(id));
  };

  updateTotal = (id) => {
    const { products } = this.state;
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, total: product.price * product.quantity };
      }
      return product;
    });
    this.setState({ products: updatedProducts });
  };

  render() {
    const { products } = this.state;
    const grandTotal = products.reduce(
      (total, product) => total + product.total,
      0
    );

    return (
      <div className="App">
        <h1>Product List</h1>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      this.handleInputChange(product.id, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      this.handleInputChange(
                        product.id,
                        "price",
                        e.target.value
                      )
                    }
                    min="0"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      this.handleInputChange(
                        product.id,
                        "quantity",
                        e.target.value
                      )
                    }
                    min="1"
                  />
                </td>
                <td>{product.total}</td>
                <td>
                  {products.length > 1 && (
                    <button onClick={() => this.deleteProduct(product.id)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={this.addProduct}>New</button>
        <div>Grand Total: {grandTotal}</div>
      </div>
    );
  }
}

export default App;
