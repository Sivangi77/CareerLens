import { Link, useParams } from "react-router-dom";
import { demoApplications } from "../data/demoData";
import DemoNav from "../components/demo/DemoNav";

function DemoApplicationDetails() {
    const { id } = useParams();

    const application = demoApplications.find(
        (item) => item.id === id
    );

    if (!application) {
        return (
            <div className="min-h-screen bg-[#F5F3EE] p-10 text-[#17243A]">
                Demo application not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F3EE] text-[#17243A]">
            <DemoNav />
            <main className="mx-auto max-w-5xl px-6 py-10 md:px-10 lg:px-14">
                <Link
                    to="/demo/applications"
                    className="text-sm font-semibold text-[#667085] hover:text-[#17243A]"
                >
                    ← Back to Demo Applications
                </Link>

                <div className="mt-8 border-b border-[#DCDDD7] pb-8">
                    <p className="text-sm font-semibold text-[#8BAE42]">
                        Demo Application
                    </p>

                    <h1 className="mt-2 text-4xl font-bold tracking-[-0.05em]">
                        {application.role}
                    </h1>

                    <p className="mt-2 text-lg text-[#667085]">
                        {application.company}
                    </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full bg-[#17243A] px-4 py-2 text-sm font-semibold text-white">
                        Overview
                    </span>

                    <a
                        href="#jd-analysis"
                        className="rounded-full border border-[#DCDDD7] bg-white px-4 py-2 text-sm font-semibold text-[#667085] hover:border-[#8BAE42] hover:text-[#17243A]"
                    >
                        JD Analysis
                    </a>

                    <a
                        href="#match-analysis"
                        className="rounded-full border border-[#DCDDD7] bg-white px-4 py-2 text-sm font-semibold text-[#667085] hover:border-[#8BAE42] hover:text-[#17243A]"
                    >
                        Match Analysis
                    </a>

                    <Link
                        to={`/demo/applications/${id}/preparation`}
                        className="rounded-full border border-[#DCDDD7] bg-white px-4 py-2 text-sm font-semibold text-[#667085] hover:border-[#8BAE42] hover:text-[#17243A]"
                    >
                        Preparation
                    </Link>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-3">
                    <div className="rounded-[24px] bg-white p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Status
                        </p>

                        <p className="mt-3 text-xl font-bold">
                            {application.status}
                        </p>
                    </div>

                    <div className="rounded-[24px] bg-white p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Match Score
                        </p>

                        <p className="mt-3 text-xl font-bold">
                            {application.matchScore}%
                        </p>
                    </div>

                    <div className="rounded-[24px] bg-white p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Deadline
                        </p>

                        <p className="mt-3 text-xl font-bold">
                            {new Date(
                                application.deadline
                            ).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <section className="mt-8 rounded-[24px] bg-white p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                        Job Description
                    </p>

                    <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[#667085]">
                        {application.jobDescription}
                    </p>
                </section>

                <section
                    id="jd-analysis"
                    className="mt-8 scroll-mt-8 rounded-[24px] bg-white p-7"
                >
                    <p className="text-sm font-semibold text-[#8BAE42]">
                        JD Analysis
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                        What this role requires
                    </h2>

                    <div className="mt-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Key Requirements
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {[
                                ...application.matchedSkills,
                                ...application.partialSkills,
                                ...application.missingSkills,
                            ].map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full bg-[#F0F2E9] px-3 py-1.5 text-xs font-semibold text-[#667085]"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    id="match-analysis"
                    className="mt-8 scroll-mt-8 rounded-[24px] bg-white p-7"
                >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-semibold text-[#8BAE42]">
                                Match Analysis
                            </p>

                            <h2 className="mt-1 text-2xl font-bold">
                                Your compatibility
                            </h2>
                        </div>

                        <p className="text-4xl font-bold">
                            {application.matchScore}%
                        </p>
                    </div>

                    <div className="mt-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Matched Skills
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {application.matchedSkills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full bg-[#EAF2DC] px-3 py-1.5 text-xs font-semibold text-[#17243A]"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Partial Skills
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {application.partialSkills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full bg-[#F4F1DD] px-3 py-1.5 text-xs font-semibold text-[#667085]"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Missing Skills
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {application.missingSkills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full bg-[#FBEAEA] px-3 py-1.5 text-xs font-semibold text-[#667085]"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mt-8 rounded-[28px] border border-[#DCDDD7] bg-white p-7">
                    <p className="text-sm font-semibold text-[#8BAE42]">
                        Next Step
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                        Prepare for the interview
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085]">
                        Turn the identified skill gaps into a focused
                        preparation plan and practice role-specific interview
                        questions.
                    </p>

                    <Link
                        to={`/demo/applications/${id}/preparation`}
                        className="mt-6 inline-flex rounded-full bg-[#17243A] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                    >
                        Explore Preparation →
                    </Link>
                </section>
            </main>
        </div>
    );
}

export default DemoApplicationDetails;