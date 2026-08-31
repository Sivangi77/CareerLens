import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getApplications } from "../services/api/applicationApi";

function Applications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getApplications();
                setApplications(data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load applications."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const filteredApplications = applications.filter((application) => {
        const matchesSearch =
            application.company
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            application.role
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            application.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-[#F5F3EE] text-[#17243A]">
            <main className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-14">

                {/* Header */}
                <div className="flex flex-col justify-between gap-6 border-b border-[#DCDDD7] pb-8 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCE8B9] text-sm">
                                ✦
                            </span>

                            <span className="text-sm font-semibold text-[#667085]">
                                CareerLens Applications
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
                            Your applications.
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-[#667085]">
                            Keep track of the jobs you're applying to and where
                            each application stands.
                        </p>
                    </div>

                    <Link
                        to="/applications/new"
                        className="rounded-full bg-[#17243A] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                        + Add Application
                    </Link>
                </div>

                {/* Content */}
                <div className="mt-10">

                    {loading && (
                        <div className="rounded-[28px] bg-white p-8 text-sm text-[#667085]">
                            Loading applications...
                        </div>
                    )}

                    {error && (
                        <div className="rounded-[28px] bg-white p-8 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {!loading && !error && applications.length === 0 && (
                        <div className="rounded-[28px] border border-[#DCDDD7] bg-[#FAFAF7] p-10 text-center">
                            <h2 className="text-xl font-bold">
                                No applications yet
                            </h2>

                            <p className="mt-2 text-sm text-[#667085]">
                                Add your first job application to start
                                tracking your career journey.
                            </p>

                            <Link
                                to="/applications/new"
                                className="mt-6 inline-block rounded-full bg-[#17243A] px-5 py-3 text-sm font-semibold text-white"
                            >
                                Add your first application
                            </Link>
                        </div>
                    )}

                    {!loading && !error && applications.length > 0 && (
                        <>
                            {/* Search & Filters */}
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                                <input
                                    type="text"
                                    placeholder="Search by company or role..."
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    className="flex-1 rounded-2xl border border-[#DCDDD7] bg-white px-5 py-3 text-sm outline-none focus:border-[#8BAE42]"
                                />

                                <select
                                    value={statusFilter}
                                    onChange={(event) =>
                                        setStatusFilter(event.target.value)
                                    }
                                    className="rounded-2xl border border-[#DCDDD7] bg-white px-5 py-3 text-sm outline-none focus:border-[#8BAE42]"
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Assessment">
                                        Assessment
                                    </option>
                                    <option value="Interview">
                                        Interview
                                    </option>
                                    <option value="Offer">Offer</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Withdrawn">
                                        Withdrawn
                                    </option>
                                </select>
                            </div>

                            {/* No matching results */}
                            {filteredApplications.length === 0 && (
                                <div className="rounded-[28px] border border-[#DCDDD7] bg-[#FAFAF7] p-10 text-center">
                                    <h2 className="text-xl font-bold">
                                        No matching applications
                                    </h2>

                                    <p className="mt-2 text-sm text-[#667085]">
                                        Try changing your search or status
                                        filter.
                                    </p>
                                </div>
                            )}

                            {/* Application List */}
                            {filteredApplications.length > 0 && (
                                <div className="grid gap-4">
                                    {filteredApplications.map(
                                        (application) => (
                                            <Link
                                                key={application._id}
                                                to={`/applications/${application._id}`}
                                                className="block rounded-[24px] bg-white p-6 shadow-[0_16px_50px_rgba(23,36,58,0.06)] transition hover:-translate-y-0.5"
                                            >
                                                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                                    <div>
                                                        <h2 className="text-xl font-bold">
                                                            {application.role}
                                                        </h2>

                                                        <p className="mt-1 text-sm text-[#667085]">
                                                            {application.company}
                                                        </p>
                                                    </div>

                                                    <span className="w-fit rounded-full bg-[#F0F2EA] px-3 py-1.5 text-xs font-semibold text-[#667085]">
                                                        {application.status}
                                                    </span>
                                                </div>

                                                {application.deadline && (
                                                    <p className="mt-5 text-xs text-[#9A9F97]">
                                                        Deadline:{" "}
                                                        {new Date(
                                                            application.deadline
                                                        ).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </Link>
                                        )
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Applications;