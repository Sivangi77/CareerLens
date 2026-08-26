import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api/authApi";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await registerUser(formData);
            navigate("/login");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Registration failed"
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
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-[#17243A] hover:text-[#8BAE42]"
                    >
                        Log in
                    </Link>
                </p>
            </header>

            {/* Main */}
            <main className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-16 px-6 py-10 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14">

                {/* LEFT SIDE */}
                <section className="relative">

                    <div className="max-w-2xl">

                        <div className="mb-7 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCE8B9] text-sm">
                                ✦
                            </span>

                            <span className="text-sm font-semibold tracking-wide text-[#667085]">
                                AI-powered career intelligence
                            </span>
                        </div>

                        <h1 className="text-5xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                            Your next
                            <br />
                            career move,
                            <br />
                            <span className="text-[#8BAE42]">
                                made clearer.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-lg text-lg leading-8 text-[#667085]">
                            CareerLens understands your resume, compares
                            your profile with real opportunities, and
                            creates a preparation path built around
                            where you want to go.
                        </p>
                    </div>

                    {/* Career Journey */}
                    <div className="relative mt-16 max-w-xl">

                        {/* Connecting line */}
                        <div className="absolute left-[22px] top-7 h-[calc(100%-55px)] w-px bg-[#CBD2C1]" />

                        <div className="space-y-8">

                            {/* Step 1 */}
                            <div className="relative flex gap-5">
                                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#17243A] text-white">
                                    01
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Understand your profile
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-[#667085]">
                                        Turn your resume into meaningful
                                        skills, experience and strengths.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative flex gap-5">
                                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DCE8B9] font-semibold text-[#17243A]">
                                    02
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Find your fit
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-[#667085]">
                                        See how closely your profile matches
                                        the jobs you're targeting.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative flex gap-5">
                                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#B7D86A] font-semibold text-[#17243A]">
                                    03
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Prepare with purpose
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-[#667085]">
                                        Get a personalized plan focused on
                                        the gaps that actually matter.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* RIGHT SIDE */}
                <section className="w-full lg:justify-self-end lg:max-w-md">

                    <div className="rounded-[28px] bg-white p-7 shadow-[0_20px_60px_rgba(23,36,58,0.08)] sm:p-9">

                        <div className="mb-8">
                            <p className="mb-2 text-sm font-semibold text-[#8BAE42]">
                                Get started
                            </p>

                            <h2 className="text-3xl font-bold tracking-[-0.04em]">
                                Create your account
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[#667085]">
                                Start building your personalized career
                                intelligence profile.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Full name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Sivangi Kashyap"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#E2E3DE] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A1A5A0] focus:border-[#9FBC5C] focus:bg-white focus:ring-4 focus:ring-[#B7D86A]/15"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Email address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#E2E3DE] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A1A5A0] focus:border-[#9FBC5C] focus:bg-white focus:ring-4 focus:ring-[#B7D86A]/15"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#E2E3DE] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A1A5A0] focus:border-[#9FBC5C] focus:bg-white focus:ring-4 focus:ring-[#B7D86A]/15"
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group mt-2 flex w-full items-center justify-between rounded-xl bg-[#17243A] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#243650] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span>
                                    {loading
                                        ? "Creating account..."
                                        : "Create my account"}
                                </span>

                                <span className="text-lg transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </button>
                        </form>

                        {/* Bottom */}
                        <div className="mt-7 border-t border-[#ECEDE8] pt-6 text-center">
                            <p className="text-sm text-[#667085]">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-semibold text-[#17243A] hover:text-[#8BAE42]"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>

                    <p className="mt-5 text-center text-xs leading-5 text-[#8A8F88]">
                        CareerLens helps you understand your strengths,
                        identify gaps, and prepare smarter.
                    </p>

                </section>
            </main>
        </div>
    );
}

export default Signup;