import { Link } from "react-router-dom";

function Demo() {
    return (
        <div className="min-h-screen bg-[#F5F3EE] text-[#17243A]">
            <main className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-14">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold text-[#8BAE42]">
                        CareerLens Demo
                    </p>

                    <h1 className="mt-4 text-5xl font-bold tracking-[-0.06em] md:text-6xl">
                        See how CareerLens turns a job application into a
                        strategy.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-[#667085]">
                        Explore a sample candidate's applications, resume
                        match, skill gaps, and interview preparation through
                        the complete CareerLens workflow.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            to="/demo/dashboard"
                            className="rounded-full bg-[#17243A] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                            Explore Demo →
                        </Link>

                        <Link
                            to="/how-it-works"
                            className="rounded-full border border-[#DCDDD7] bg-white px-6 py-3 text-sm font-semibold text-[#667085] transition hover:border-[#8BAE42] hover:text-[#17243A]"
                        >
                            How It Works
                        </Link>
                    </div>
                </div>

                <div className="mt-16 grid gap-5 md:grid-cols-3">
                    <div className="rounded-[24px] border border-[#DCDDD7] bg-white p-6">
                        <p className="text-sm font-semibold text-[#8BAE42]">
                            01
                        </p>

                        <h2 className="mt-4 text-xl font-bold">
                            Understand the role
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#667085]">
                            Analyze a job description and identify the skills
                            and requirements that matter.
                        </p>
                    </div>

                    <div className="rounded-[24px] border border-[#DCDDD7] bg-white p-6">
                        <p className="text-sm font-semibold text-[#8BAE42]">
                            02
                        </p>

                        <h2 className="mt-4 text-xl font-bold">
                            Measure your fit
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#667085]">
                            Compare the candidate's resume against the role
                            and understand the compatibility score.
                        </p>
                    </div>

                    <div className="rounded-[24px] border border-[#DCDDD7] bg-white p-6">
                        <p className="text-sm font-semibold text-[#8BAE42]">
                            03
                        </p>

                        <h2 className="mt-4 text-xl font-bold">
                            Prepare strategically
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#667085]">
                            Turn identified gaps into personalized preparation,
                            study plans, and interview questions.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Demo;