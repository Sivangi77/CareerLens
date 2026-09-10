import { Link } from "react-router-dom";
import { demoApplications, demoCandidate } from "../data/demoData";
import DemoNav from "../components/demo/DemoNav";

function DemoApplications() {
    return (
        <div className="min-h-screen bg-[#F5F3EE] text-[#17243A]">
            <DemoNav />
            <main className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-14">
                <Link
                    to="/demo/dashboard"
                    className="text-sm font-semibold text-[#667085] transition hover:text-[#17243A]"
                >
                    ← Back to Demo Dashboard
                </Link>

                <div className="mt-8 border-b border-[#DCDDD7] pb-8">
                    <p className="text-sm font-semibold text-[#8BAE42]">
                        Demo Applications
                    </p>

                    <h1 className="mt-2 text-4xl font-bold tracking-[-0.05em]">
                        {demoCandidate.name}'s job search
                    </h1>

                    <p className="mt-3 text-base text-[#667085]">
                        Explore how CareerLens analyzes and manages each
                        application.
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    {demoApplications.map((application) => (
                        <Link
                            key={application.id}
                            to={`/demo/applications/${application.id}`}
                            className="block rounded-[24px] border border-[#DCDDD7] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#8BAE42]"
                        >
                            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                                <div>
                                    <p className="text-xl font-bold">
                                        {application.role}
                                    </p>

                                    <p className="mt-1 text-[#667085]">
                                        {application.company}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="rounded-full bg-[#F0F2E9] px-3 py-1 text-xs font-semibold text-[#667085]">
                                        {application.status}
                                    </span>

                                    <span className="rounded-full bg-[#17243A] px-3 py-1 text-xs font-semibold text-white">
                                        {application.matchScore}% match
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 grid gap-4 border-t border-[#ECEDE8] pt-5 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                        Deadline
                                    </p>

                                    <p className="mt-1 text-sm font-semibold">
                                        {new Date(
                                            application.deadline
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                        Skill Gaps
                                    </p>

                                    <p className="mt-1 text-sm font-semibold">
                                        {application.skillGaps.length} identified
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default DemoApplications;