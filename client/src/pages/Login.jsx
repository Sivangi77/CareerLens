import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login, user, isAuthenticated } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        try {
            await login({
                email,
                password,
            });
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    if (isAuthenticated) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold">
                    Welcome, {user.name}
                </h1>

                <p className="mt-2">
                    You are logged in.
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-md p-8">
            <h1 className="text-3xl font-bold">
                Login
            </h1>

            <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-4"
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border p-3"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="w-full rounded-lg border p-3"
                />

                {error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full rounded-lg bg-black px-4 py-3 text-white"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;