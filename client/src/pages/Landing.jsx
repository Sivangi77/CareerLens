import { Link } from "react-router-dom";
import PageContainer from "../components/common/PageContainer";
import Card from "../components/common/Card";

function Landing() {
    return (
        <PageContainer>
            <div className="min-h-screen py-8 md:py-12">
                <nav className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold tracking-[-0.04em] text-[#17243A]">
                            CareerLens
                        </h1>
                        <p className="text-xs text-[#9A9F97]">
                            Career intelligence
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/how-it-works"
                            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[#667085] hover:bg-white hover:text-[#17243A] sm:block"
                        >
                            How It Works
                        </Link>

                        <Link
                            to="/demo"
                            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[#667085] hover:bg-white hover:text-[#17243A] sm:block"
                        >
                            Demo
                        </Link>

                        <Link
                            to="/login"
                            className="rounded-full border border-[#DCDDD7] bg-white px-4 py-2 text-sm font-semibold text-[#667085] hover:border-[#8BAE42] hover:text-[#17243A]"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="rounded-full bg-[#17243A] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>

                <section className="mx-auto max-w-5xl py-20 text-center md:py-28">
                    <div className="mx-auto mb-6 inline-flex rounded-full border border-[#DCDDD7] bg-white px-4 py-2 text-xs font-semibold text-[#667085]">
                        AI Job Application Intelligence
                    </div>

                    <h2 className="text-5xl font-bold leading-[1.05] tracking-[-0.05em] text-[#17243A] md:text-7xl">
                        Turn every job application into a smarter career strategy.
                    </h2>

                    <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#667085] md:text-lg">
                        CareerLens helps you understand job requirements,
                        measure your fit, identify skill gaps, and prepare
                        strategically for interviews.
                    </p>

                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            to="/signup"
                            className="w-full rounded-full bg-[#17243A] px-7 py-3.5 text-sm font-semibold text-white hover:opacity-90 sm:w-auto"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/demo"
                            className="w-full rounded-full border border-[#DCDDD7] bg-white px-7 py-3.5 text-sm font-semibold text-[#17243A] hover:border-[#8BAE42] sm:w-auto"
                        >
                            Explore Demo →
                        </Link>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl">
                    <div className="mb-8">
                        <p className="text-sm font-semibold text-[#8BAE42]">
                            ONE WORKFLOW
                        </p>

                        <h3 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#17243A]">
                            From job description to interview strategy.
                        </h3>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085]">
                            CareerLens connects the different parts of your
                            job search instead of treating each application
                            as a separate task.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-4">
                        <Card>
                            <p className="text-sm font-semibold text-[#8BAE42]">
                                01
                            </p>
                            <h4 className="mt-4 text-lg font-bold text-[#17243A]">
                                Understand the Job
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-[#667085]">
                                Break down the requirements and important
                                skills from the job description.
                            </p>
                        </Card>

                        <Card>
                            <p className="text-sm font-semibold text-[#8BAE42]">
                                02
                            </p>
                            <h4 className="mt-4 text-lg font-bold text-[#17243A]">
                                Measure Your Fit
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-[#667085]">
                                See how your experience and skills align with
                                the role.
                            </p>
                        </Card>

                        <Card>
                            <p className="text-sm font-semibold text-[#8BAE42]">
                                03
                            </p>
                            <h4 className="mt-4 text-lg font-bold text-[#17243A]">
                                Find Skill Gaps
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-[#667085]">
                                Identify the skills you need to strengthen
                                before the interview.
                            </p>
                        </Card>

                        <Card>
                            <p className="text-sm font-semibold text-[#8BAE42]">
                                04
                            </p>
                            <h4 className="mt-4 text-lg font-bold text-[#17243A]">
                                Prepare Strategically
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-[#667085]">
                                Turn your gaps into a focused study plan and
                                interview preparation.
                            </p>
                        </Card>
                    </div>
                </section>

                <section className="mx-auto mt-20 max-w-6xl">
                    <Card className="bg-white">
                        <div className="grid items-center gap-8 md:grid-cols-2">
                            <div>
                                <p className="text-sm font-semibold text-[#8BAE42]">
                                    SEE IT IN ACTION
                                </p>

                                <h3 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#17243A]">
                                    Explore a complete application journey.
                                </h3>

                                <p className="mt-4 text-sm leading-6 text-[#667085]">
                                    Explore a realistic candidate profile,
                                    multiple applications, match analysis,
                                    skill gaps, study plans, and interview
                                    questions.
                                </p>
                            </div>

                            <div className="flex md:justify-end">
                                <Link
                                    to="/demo"
                                    className="rounded-full bg-[#17243A] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
                                >
                                    Explore the Demo →
                                </Link>
                            </div>
                        </div>
                    </Card>
                </section>

                <section className="mx-auto max-w-3xl py-20 text-center">
                    <h3 className="text-3xl font-bold tracking-[-0.03em] text-[#17243A] md:text-4xl">
                        Make every application more intentional.
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-[#667085]">
                        Stop guessing what to improve. Use CareerLens to turn
                        job requirements into a clear preparation strategy.
                    </p>

                    <Link
                        to="/signup"
                        className="mt-7 inline-block rounded-full bg-[#17243A] px-7 py-3.5 text-sm font-semibold text-white hover:opacity-90"
                    >
                        Create Your CareerLens Account →
                    </Link>
                </section>
            </div>
        </PageContainer>
    );
}

export default Landing;