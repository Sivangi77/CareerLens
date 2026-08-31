import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createApplication } from "../services/api/applicationApi";

function AddApplication() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        company: "",
        role: "",
        jobUrl: "",
        jobDescription: "",
        deadline: "",
        status: "Applied",
        notes: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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

        if (!formData.company.trim() || !formData.role.trim()) {
            setError("Company and role are required.");
            return;
        }

        try {
            setLoading(true);

            await createApplication(formData);

            navigate("/applications");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create application."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F3EE] text-[#17243A]">
            <main className="mx-auto max-w-4xl px-6 py-10 md:px-10 lg:px-14">

                {/* Header */}
                <div className="border-b border-[#DCDDD7] pb-8">
                    <p className="text-sm font-semibold text-[#8BAE42]">
                        CareerLens Applications
                    </p>

                    <h1 className="mt-2 text-4xl font-bold tracking-[-0.05em]">
                        Add an application.
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#667085]">
                        Save a job you're interested in and start tracking
                        your application journey.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-10 rounded-[28px] bg-white p-7 shadow-[0_16px_50px_rgba(23,36,58,0.06)] sm:p-9"
                >
                    {error && (
                        <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="grid gap-6 sm:grid-cols-2">

                        {/* Company */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                Company *
                            </label>

                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-xl border border-[#DCDDD7] px-4 py-3 text-sm outline-none focus:border-[#8BAE42]"
                                placeholder="e.g. Google"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                Role *
                            </label>

                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-xl border border-[#DCDDD7] px-4 py-3 text-sm outline-none focus:border-[#8BAE42]"
                                placeholder="e.g. Software Engineer"
                            />
                        </div>

                        {/* Job URL */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                Job URL
                            </label>

                            <input
                                type="url"
                                name="jobUrl"
                                value={formData.jobUrl}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-xl border border-[#DCDDD7] px-4 py-3 text-sm outline-none focus:border-[#8BAE42]"
                                placeholder="https://..."
                            />
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                Deadline
                            </label>

                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-xl border border-[#DCDDD7] px-4 py-3 text-sm outline-none focus:border-[#8BAE42]"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-xl border border-[#DCDDD7] bg-white px-4 py-3 text-sm outline-none focus:border-[#8BAE42]"
                            >
                                <option value="Applied">Applied</option>
                                <option value="Assessment">Assessment</option>
                                <option value="Interview">Interview</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Withdrawn">Withdrawn</option>
                            </select>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                Notes
                            </label>

                            <input
                                type="text"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-xl border border-[#DCDDD7] px-4 py-3 text-sm outline-none focus:border-[#8BAE42]"
                                placeholder="Optional notes"
                            />
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="mt-6">
                        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Job Description
                        </label>

                        <textarea
                            name="jobDescription"
                            value={formData.jobDescription}
                            onChange={handleChange}
                            rows={8}
                            className="mt-2 w-full resize-none rounded-xl border border-[#DCDDD7] px-4 py-3 text-sm outline-none focus:border-[#8BAE42]"
                            placeholder="Paste the job description here..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() => navigate("/applications")}
                            className="rounded-full border border-[#DCDDD7] px-5 py-3 text-sm font-semibold"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-full bg-[#17243A] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Application"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AddApplication;