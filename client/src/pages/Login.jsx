import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login({
                email,
                password,
            });

            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F3EE] text-[#17243A]">

            {/* Header */}
            <header className="flex items-center justify-between px-6 py-6 md:px-10 lg:px-14">
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-[-0.04em]"
                >
                    Career<span className="text-[#8BAE42]">Lens</span>
                </Link>

                <p className="hidden text-sm text-[#667085] sm:block">
                    New to CareerLens?{" "}
                    <Link
                        to="/signup"
                        className="font-semibold text-[#17243A] hover:text-[#8BAE42]"
                    >
                        Create account
                    </Link>
                </p>
            </header>

            {/* Main */}
            <main className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-16 px-6 py-10 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-14">

                {/* LEFT — LOGIN FORM */}
                <section className="w-full lg:max-w-md">

                    <div className="rounded-[28px] bg-white p-7 shadow-[0_20px_60px_rgba(23,36,58,0.08)] sm:p-9">

                        <div className="mb-9">
                            <p className="mb-2 text-sm font-semibold text-[#8BAE42]">
                                Welcome back
                            </p>

                            <h1 className="text-3xl font-bold tracking-[-0.04em]">
                                Continue your journey.
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-[#667085]">
                                Sign in to see your career insights,
                                job matches, and personalized preparation
                                plan.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Email address
                                </label>

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    className="w-full rounded-xl border border-[#E2E3DE] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A1A5A0] focus:border-[#9FBC5C] focus:bg-white focus:ring-4 focus:ring-[#B7D86A]/15"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-sm font-medium">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-xs font-medium text-[#8BAE42] hover:text-[#6F8F2F]"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    className="w-full rounded-xl border border-[#E2E3DE] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A1A5A0] focus:border-[#9FBC5C] focus:bg-white focus:ring-4 focus:ring-[#B7D86A]/15"
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            {/* Login */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group mt-2 flex w-full items-center justify-between rounded-xl bg-[#17243A] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#243650] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span>
                                    {loading
                                        ? "Signing you in..."
                                        : "Continue to CareerLens"}
                                </span>

                                <span className="text-lg transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </button>
                        </form>

                        {/* Signup */}
                        <div className="mt-7 border-t border-[#ECEDE8] pt-6 text-center">
                            <p className="text-sm text-[#667085]">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-semibold text-[#17243A] hover:text-[#8BAE42]"
                                >
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </div>

                    <p className="mt-5 text-center text-xs leading-5 text-[#8A8F88]">
                        Your career data stays connected to your
                        personalized CareerLens workspace.
                    </p>
                </section>

                {/* RIGHT — CAREERLENS MESSAGE */}
                <section className="relative hidden lg:block">

                    <div className="max-w-2xl">

                        <div className="mb-7 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCE8B9] text-sm">
                                ✦
                            </span>

                            <span className="text-sm font-semibold tracking-wide text-[#667085]">
                                Your career intelligence
                            </span>
                        </div>

                        <h2 className="text-6xl font-bold leading-[0.98] tracking-[-0.055em] xl:text-7xl">
                            Pick up
                            <br />
                            <span className="text-[#8BAE42]">
                                where you left off.
                            </span>
                        </h2>

                        <p className="mt-7 max-w-lg text-lg leading-8 text-[#667085]">
                            Your resume insights, job matches and preparation
                            plan are waiting for you. CareerLens keeps
                            everything in one place so you can focus on
                            moving forward.
                        </p>
                    </div>

                    {/* Insight Preview */}
                    <div className="relative mt-16 max-w-xl">

                        <div className="absolute -left-6 top-8 h-32 w-32 rounded-full bg-[#DCE8B9] blur-3xl" />

                        <div className="relative rounded-[24px] border border-[#DFE3D7] bg-[#FAFAF7] p-6">

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8A8F88]">
                                        Career snapshot
                                    </p>

                                    <p className="mt-2 text-lg font-semibold">
                                        Your profile is evolving
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#B7D86A] text-[#17243A]">
                                    ↗
                                </div>
                            </div>

                            <div className="mt-7 space-y-4">

                                <div>
                                    <div className="mb-2 flex justify-between text-xs">
                                        <span className="text-[#667085]">
                                            Resume strength
                                        </span>

                                        <span className="font-semibold">
                                            Strong
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-[#E5E8DE]">
                                        <div className="h-full w-[78%] rounded-full bg-[#8BAE42]" />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex justify-between text-xs">
                                        <span className="text-[#667085]">
                                            Target role fit
                                        </span>

                                        <span className="font-semibold">
                                            Improving
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-[#E5E8DE]">
                                        <div className="h-full w-[64%] rounded-full bg-[#17243A]" />
                                    </div>
                                </div>

                            </div>

                            <div className="mt-6 border-t border-[#E1E4DB] pt-5">
                                <p className="text-sm leading-6 text-[#667085]">
                                    <span className="font-semibold text-[#17243A]">
                                        Next:
                                    </span>{" "}
                                    Review your recommended preparation
                                    areas and keep building your edge.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Login;