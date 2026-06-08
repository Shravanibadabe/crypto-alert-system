import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Products() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [editingId, setEditingId] = useState(null);

  const role = localStorage.getItem("role");

  const loadProducts = async () => {
    try {
      const res = await API.get("/api/v1/products/");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async () => {

    try {

      await API.post("/api/v1/products/", {
        name,
        description,
        price: Number(price)
      });

      setName("");
      setDescription("");
      setPrice("");

      loadProducts();

    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Failed"
      );
    }
  };

  const deleteProduct = async (id) => {

    if (!window.confirm("Delete Product?"))
      return;

    try {

      await API.delete(
        `/api/v1/products/${id}`
      );

      loadProducts();

    } catch (err) {

      alert(
        err.response?.data?.detail
      );
    }
  };

  const editProduct = (product) => {

    setEditingId(product.id);

    setName(product.name);

    setDescription(product.description);

    setPrice(product.price);
  };

  const updateProduct = async () => {

    try {

      await API.put(
        `/api/v1/products/${editingId}`,
        {
          name,
          description,
          price: Number(price)
        }
      );

      setEditingId(null);

      setName("");
      setDescription("");
      setPrice("");

      loadProducts();

    } catch (err) {

      alert(
        err.response?.data?.detail
      );
    }
  };

 

    return (

      <div className="layout">

         <Sidebar />

      <div className="content">

      <div className="card shadow p-4">

        <h2>

          {editingId
            ? "Update Product"
            : "Add Product"}

        </h2>

        {role === "admin" && (

          <>
            <input
              className="form-control mb-3"
              placeholder="Product Name"
              value={name}
              onChange={(e)=>
                setName(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Description"
              value={description}
              onChange={(e)=>
                setDescription(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Price"
              value={price}
              onChange={(e)=>
                setPrice(e.target.value)}
            />

            {editingId ? (

              <button
                className="btn btn-warning"
                onClick={updateProduct}
              >
                Update Product
              </button>

            ) : (

              <button
                className="btn btn-success"
                onClick={addProduct}
              >
                Add Product
              </button>

            )}
          </>
        )}

      </div>

      <div className="card shadow mt-4">

        <div className="card-body">

          <table className="table">

            <thead>

              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>

                {role === "admin" &&
                  <th>Actions</th>}
              </tr>

            </thead>

            <tbody>

              {products.map((p) => (

                <tr key={p.id}>

                  <td>{p.id}</td>

                  <td>{p.name}</td>

                  <td>{p.description}</td>

                  <td>₹{p.price}</td>

                  {role === "admin" && (

                    <td>

                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() =>
                          editProduct(p)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteProduct(p.id)}
                      >
                        Delete
                      </button>

                    </td>

                  )}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
      </div>

    </div>
  );
}

export default Products;