import { Link, useParams } from "react-router-dom";
import { demoApplications } from "../data/demoData";
import DemoNav from "../components/demo/DemoNav";

function DemoPreparation() {
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
                    to={`/demo/applications/${id}`}
                    className="text-sm font-semibold text-[#667085] hover:text-[#17243A]"
                >
                    ← Back to Application
                </Link>

                <div className="mt-8 border-b border-[#DCDDD7] pb-8">
                    <p className="text-sm font-semibold text-[#8BAE42]">
                        Interview Preparation
                    </p>

                    <h1 className="mt-2 text-4xl font-bold tracking-[-0.05em]">
                        Prepare for {application.role}
                    </h1>

                    <p className="mt-2 text-lg text-[#667085]">
                        {application.company}
                    </p>

                    <p className="mt-3 max-w-2xl text-base leading-7 text-[#667085]">
                        CareerLens has identified the areas you should focus
                        on before your interview.
                    </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        to={`/demo/applications/${id}`}
                        className="rounded-full border border-[#DCDDD7] bg-white px-4 py-2 text-sm font-semibold text-[#667085] hover:border-[#8BAE42] hover:text-[#17243A]"
                    >
                        Overview
                    </Link>

                    <a
                        href={`/demo/applications/${id}#jd-analysis`}
                        className="rounded-full border border-[#DCDDD7] bg-white px-4 py-2 text-sm font-semibold text-[#667085] hover:border-[#8BAE42] hover:text-[#17243A]"
                    >
                        JD Analysis
                    </a>

                    <a
                        href={`/demo/applications/${id}#match-analysis`}
                        className="rounded-full border border-[#DCDDD7] bg-white px-4 py-2 text-sm font-semibold text-[#667085] hover:border-[#8BAE42] hover:text-[#17243A]"
                    >
                        Match Analysis
                    </a>

                    <span className="rounded-full bg-[#17243A] px-4 py-2 text-sm font-semibold text-white">
                        Preparation
                    </span>
                </div>

                <section className="mt-8 rounded-[28px] border border-[#DCDDD7] bg-white p-7">
                    <p className="text-sm font-semibold text-[#8BAE42]">
                        Skill Gaps
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                        What to improve
                    </h2>

                    <div className="mt-6 space-y-4">
                        {application.skillGaps.map((gap) => (
                            <div
                                key={gap.skill}
                                className="rounded-[20px] border border-[#ECEDE8] p-5"
                            >
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                                    <div>
                                        <h3 className="font-bold">
                                            {gap.skill}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-[#667085]">
                                            {gap.reason}
                                        </p>
                                    </div>

                                    <span className="w-fit rounded-full bg-[#F0F2E9] px-3 py-1 text-xs font-semibold uppercase text-[#667085]">
                                        {gap.priority}
                                    </span>
                                </div>

                                <div className="mt-4 rounded-2xl bg-[#F5F3EE] p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                        Recommendation
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-[#17243A]">
                                        {gap.recommendation}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-8 rounded-[28px] border border-[#DCDDD7] bg-white p-7">
                    <p className="text-sm font-semibold text-[#8BAE42]">
                        Study Plan
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                        Turn gaps into preparation
                    </h2>

                    <div className="mt-6 space-y-4">
                        {application.skillGaps.map((gap, index) => (
                            <div
                                key={gap.skill}
                                className="flex gap-4 rounded-[20px] border border-[#ECEDE8] p-5"
                            >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17243A] text-sm font-bold text-white">
                                    {index + 1}
                                </div>

                                <div>
                                    <h3 className="font-bold">
                                        Focus on {gap.skill}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-[#667085]">
                                        {gap.recommendation}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-8 rounded-[28px] border border-[#DCDDD7] bg-white p-7">
                    <p className="text-sm font-semibold text-[#8BAE42]">
                        Interview Questions
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                        Practice before the interview
                    </h2>

                    <div className="mt-6 space-y-4">
                        {application.interviewQuestions.map(
                            (item, index) => (
                                <div
                                    key={item.question}
                                    className="rounded-[20px] border border-[#ECEDE8] p-5"
                                >
                                    <div className="flex gap-4">
                                        <span className="text-sm font-bold text-[#8BAE42]">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <div>
                                            <p className="font-semibold leading-6">
                                                {item.question}
                                            </p>

                                            <span className="mt-3 inline-block rounded-full bg-[#F0F2E9] px-3 py-1 text-xs font-semibold capitalize text-[#667085]">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default DemoPreparation;