import { Link } from "react-router-dom";

const steps = [
    {
        number: "01",
        title: "Add a job application",
        description:
            "Save the company, role, job description, deadline, and other details in one place.",
    },
    {
        number: "02",
        title: "Understand the job",
        description:
            "CareerLens analyzes the job description and identifies the important skills, requirements, and expectations.",
    },
    {
        number: "03",
        title: "Measure your fit",
        description:
            "Compare your resume against the role to see your compatibility, matched skills, partial matches, and missing skills.",
    },
    {
        number: "04",
        title: "Identify skill gaps",
        description:
            "Turn missing and partial skills into prioritized recommendations focused on what matters for the role.",
    },
    {
        number: "05",
        title: "Build your preparation plan",
        description:
            "Use the identified gaps to create a focused study plan instead of preparing randomly.",
    },
    {
        number: "06",
        title: "Practice for the interview",
        description:
            "Get role-specific technical, behavioral, and interview questions to prepare with greater confidence.",
    },
];

function HowItWorks() {
    return (
        <div className="min-h-screen bg-[#F5F3EE] text-[#17243A]">
            <main className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-14">
                <Link
                    to="/"
                    className="text-sm font-semibold text-[#667085] hover:text-[#17243A]"
                >
                    ← Back to CareerLens
                </Link>

                <section className="mt-12 max-w-3xl">
                    <p className="text-sm font-semibold text-[#8BAE42]">
                        How CareerLens Works
                    </p>

                    <h1 className="mt-4 text-5xl font-bold tracking-[-0.06em] md:text-6xl">
                        From job description to interview strategy.
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-[#667085]">
                        CareerLens connects your resume, the jobs you apply
                        to, and your preparation into one intelligent workflow.
                    </p>
                </section>

                <section className="mt-16 grid gap-5 md:grid-cols-2">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="rounded-[28px] border border-[#DCDDD7] bg-white p-7"
                        >
                            <span className="text-sm font-bold text-[#8BAE42]">
                                {step.number}
                            </span>

                            <h2 className="mt-5 text-2xl font-bold">
                                {step.title}
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-[#667085]">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </section>

                <section className="mt-16 rounded-[32px] bg-[#17243A] p-8 text-white md:p-10">
                    <p className="text-sm font-semibold text-[#B7D477]">
                        The CareerLens approach
                    </p>

                    <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-[-0.04em]">
                        Don't just track applications. Understand how to win
                        them.
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
                        Instead of treating your resume, applications, and
                        interview preparation as separate tasks, CareerLens
                        connects them so every application can lead to a more
                        focused preparation strategy.
                    </p>

                    <Link
                        to="/demo"
                        className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#17243A] transition hover:opacity-90"
                    >
                        Explore the Demo →
                    </Link>
                </section>
            </main>
        </div>
    );
}

export default HowItWorks;