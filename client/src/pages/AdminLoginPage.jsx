import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAdmin, setAdminToken } from "../api/client";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await loginAdmin(credentials);
      setAdminToken(response.token);
      navigate(location.state?.redirectTo || "/admin");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Secure product management access"
        description="Use the environment-configured admin login to manage the product catalogue."
      />

      <section className="section-pad">
        <div className="container-shell">
          <Reveal className="panel mx-auto max-w-xl p-8 sm:p-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-silver-700">Username</label>
                <input className="field" name="username" value={credentials.username} onChange={handleChange} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-silver-700">Password</label>
                <input
                  className="field"
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button className="btn-primary" type="submit" disabled={submitting}>
                {submitting ? "Signing in..." : "Login"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

