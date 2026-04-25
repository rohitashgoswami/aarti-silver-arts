import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  clearAdminToken,
  createAdminProduct,
  deleteAdminProduct,
  getAdminProducts,
  getAdminToken,
  logoutAdmin,
  updateAdminProduct,
} from "../api/client";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { business, productCategories } from "../config/business";

const emptyForm = {
  name: "",
  category: productCategories[0],
  image: "",
  description: "",
  artisanNote: "",
  featured: false,
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const token = getAdminToken();

  async function loadProducts() {
    try {
      const data = await getAdminProducts(token);
      setProducts(data);
    } catch (error) {
      clearAdminToken();
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function startEdit(product) {
    setEditingId(product._id);
    setForm({
      name: product.name,
      category: product.category,
      image: product.image,
      description: product.description,
      artisanNote: product.artisanNote || "",
      featured: product.featured,
    });
    setStatus("");
  }

  function resetForm() {
    setEditingId("");
    setForm(emptyForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    try {
      if (editingId) {
        await updateAdminProduct(token, editingId, form);
        setStatus("Product updated successfully.");
      } else {
        await createAdminProduct(token, form);
        setStatus("Product created successfully.");
      }

      resetForm();
      await loadProducts();
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteAdminProduct(token, id);
      setStatus("Product deleted successfully.");
      await loadProducts();
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleLogout() {
    try {
      await logoutAdmin();
    } catch (error) {
      // Logout can still continue locally.
    }
    clearAdminToken();
    navigate("/admin/login");
  }

  return (
    <>
      <Seo title="Admin Dashboard" description={`Manage ${business.name} products.`} />
      <section className="pt-12 sm:pt-16">
        <div className="container-shell flex flex-col gap-6">
          <Reveal className="panel flex flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <div>
              <p className="eyebrow mb-3">Admin Dashboard</p>
              <h1 className="font-display text-5xl text-silver-900">Manage Product Catalogue</h1>
            </div>
            <button className="btn-secondary" type="button" onClick={handleLogout}>
              Logout
            </button>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal className="panel p-8">
              <h2 className="font-display text-4xl text-silver-900">{editingId ? "Edit Product" : "Add Product"}</h2>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <input className="field" name="name" value={form.name} onChange={handleChange} placeholder="Product name" />
                <select className="field" name="category" value={form.category} onChange={handleChange}>
                  {productCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input className="field" name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
                <textarea
                  className="field min-h-32"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short product description"
                />
                <textarea
                  className="field min-h-28"
                  name="artisanNote"
                  value={form.artisanNote}
                  onChange={handleChange}
                  placeholder="Optional artisan note"
                />
                <label className="flex items-center gap-3 text-sm font-semibold text-silver-700">
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                  Mark as featured
                </label>
                {status ? <p className="text-sm text-silver-600">{status}</p> : null}
                <div className="flex flex-wrap gap-3">
                  <button className="btn-primary" type="submit">
                    {editingId ? "Update Product" : "Create Product"}
                  </button>
                  {editingId ? (
                    <button className="btn-secondary" type="button" onClick={resetForm}>
                      Cancel Edit
                    </button>
                  ) : null}
                </div>
              </form>
            </Reveal>

            <Reveal className="panel p-8">
              <h2 className="font-display text-4xl text-silver-900">Current Products</h2>
              <div className="mt-6 space-y-4">
                {loading ? (
                  <div className="rounded-[1.5rem] bg-silver-100 p-8 text-sm text-silver-600">Loading products...</div>
                ) : (
                  products.map((product) => (
                    <div key={product._id} className="rounded-[1.7rem] border border-silver-200 bg-white/75 p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-silver-500">{product.category}</p>
                          <h3 className="mt-2 font-display text-3xl text-silver-900">{product.name}</h3>
                          <p className="mt-2 text-sm leading-7 text-silver-600">{product.description}</p>
                        </div>
                        <img src={product.image} alt={product.name} className="h-24 w-24 rounded-2xl object-cover" loading="lazy" />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <button className="btn-secondary" type="button" onClick={() => startEdit(product)}>
                          Edit
                        </button>
                        <button className="btn-secondary" type="button" onClick={() => handleDelete(product._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
