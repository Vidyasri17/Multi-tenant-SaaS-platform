import { useState } from "react";
import { registerTenant } from "../auth/authService";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        companyName: "",
        subdomain: "",
        adminEmail: "",
        adminFullName: "",
        adminPassword: "",
        confirmPassword: "",
        plan: "free", // Default plan
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (form.adminPassword !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            // Exclude confirmPassword from API payload
            const { confirmPassword, ...payload } = form;
            await registerTenant(payload);
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: "50px auto", padding: "20px" }}>
            <h2>Register Organization</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                {/* Organization Name */}
                <div>
                    <label>Organization Name:</label>
                    <input
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                {/* Subdomain */}
                <div>
                    <label>Subdomain:</label>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                            name="subdomain"
                            value={form.subdomain}
                            onChange={handleChange}
                            required
                            style={{ flex: 1, padding: "8px" }}
                        />
                        <span style={{ marginLeft: "5px" }}>.yourapp.com</span>
                    </div>
                </div>

                {/* Admin Email */}
                <div>
                    <label>Admin Email:</label>
                    <input
                        type="email"
                        name="adminEmail"
                        value={form.adminEmail}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                {/* Admin Full Name */}
                <div>
                    <label>Admin Full Name:</label>
                    <input
                        name="adminFullName"
                        value={form.adminFullName}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                {/* Plan Selection */}
                <div>
                    <label>Subscription Plan:</label>
                    <select
                        name="plan"
                        value={form.plan}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px" }}
                    >
                        <option value="free">Free (5 Users, 3 Projects)</option>
                        <option value="pro">Pro (25 Users, 15 Projects)</option>
                        <option value="enterprise">Enterprise (100 Users, 50 Projects)</option>
                    </select>
                </div>

                {/* Password */}
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="adminPassword"
                        value={form.adminPassword}
                        onChange={handleChange}
                        required
                        minLength={8}
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        minLength={8}
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <button type="submit" disabled={loading} style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <p style={{ marginTop: "15px" }}>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
