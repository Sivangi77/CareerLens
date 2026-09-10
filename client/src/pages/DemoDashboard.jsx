import { Link } from "react-router-dom";
import { demoAnalytics, demoCandidate } from "../data/demoData";
import DemoNav from "../components/demo/DemoNav";

function DemoDashboard() {
    const { kpis, upcomingDeadlines, recentApplications } = demoAnalytics;

    return (
        <div className="min-h-screen bg-[#F5F3EE] text-[#17243A]">
            <DemoNav />
            <main className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-14">
                <div className="flex flex-col justify-between gap-6 border-b border-[#DCDDD7] pb-8 md:flex-row md:items-end">
                    <div>
                        <p className="text-sm font-semibold text-[#8BAE42]">
                            CareerLens Demo
                        </p>

                        <h1 className="mt-2 text-4xl font-bold tracking-[-0.05em]">
                            Good morning, {demoCandidate.name.split(" ")[0]}
                        </h1>

                        <p className="mt-3 text-base text-[#667085]">
                            Here's a snapshot of your job search.
                        </p>
                    </div>

                    <span className="w-fit rounded-full bg-[#17243A] px-4 py-2 text-xs font-semibold text-white">
                        Demo Mode
                    </span>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-[24px] bg-white p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Applications
                        </p>
                        <p className="mt-3 text-3xl font-bold">
                            {kpis.totalApplications}
                        </p>
                    </div>

                    <div className="rounded-[24px] bg-white p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Active
                        </p>
                        <p className="mt-3 text-3xl font-bold">
                            {kpis.activeApplications}
                        </p>
                    </div>

                    <div className="rounded-[24px] bg-white p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Avg. Match
                        </p>
                        <p className="mt-3 text-3xl font-bold">
                            {kpis.averageMatchScore}%
                        </p>
                    </div>

                    <div className="rounded-[24px] bg-white p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Interview Rate
                        </p>
                        <p className="mt-3 text-3xl font-bold">
                            {kpis.interviewConversion}%
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
                    <section className="rounded-[28px] border border-[#DCDDD7] bg-white p-7">
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-[#8BAE42]">
                                    Application Pulse
                                </p>

                                <h2 className="mt-1 text-2xl font-bold">
                                    Your current pipeline
                                </h2>
                            </div>

                            <Link
                                to="/demo/applications"
                                className="text-sm font-semibold text-[#667085] hover:text-[#17243A]"
                            >
                                View all →
                            </Link>
                        </div>

                        <div className="mt-8 space-y-5">
                            {Object.entries(
                                demoAnalytics.statusDistribution
                            ).map(([status, count]) => (
                                <div key={status}>
                                    <div className="mb-2 flex justify-between text-sm">
                                        <span className="font-medium">
                                            {status}
                                        </span>
                                        <span className="text-[#667085]">
                                            {count}
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-[#EEF0E9]">
                                        <div
                                            className="h-full rounded-full bg-[#8BAE42]"
                                            style={{
                                                width: `${
                                                    kpis.totalApplications
                                                        ? (count /
                                                              kpis.totalApplications) *
                                                          100
                                                        : 0
                                                }%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[28px] bg-[#17243A] p-7 text-white">
                        <p className="text-sm font-semibold text-[#B7D477]">
                            Upcoming Deadlines
                        </p>

                        <h2 className="mt-1 text-2xl font-bold">
                            Stay ahead
                        </h2>

                        <div className="mt-6 space-y-5">
                            {upcomingDeadlines.map((application) => (
                                <Link
                                    key={application.applicationId}
                                    to={`/demo/applications/${application.applicationId}`}
                                    className="block border-b border-white/10 pb-4 last:border-0 last:pb-0"
                                >
                                    <p className="font-semibold">
                                        {application.company}
                                    </p>

                                    <p className="mt-1 text-sm text-white/60">
                                        {application.role}
                                    </p>

                                    <p className="mt-2 text-xs font-semibold text-[#B7D477]">
                                        {new Date(
                                            application.deadline
                                        ).toLocaleDateString()}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>

                <section className="mt-8 rounded-[28px] border border-[#DCDDD7] bg-white p-7">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold text-[#8BAE42]">
                                Recent Applications
                            </p>

                            <h2 className="mt-1 text-2xl font-bold">
                                Keep your search moving
                            </h2>
                        </div>

                        <Link
                            to="/demo/applications"
                            className="text-sm font-semibold text-[#667085] hover:text-[#17243A]"
                        >
                            View all →
                        </Link>
                    </div>

                    <div className="mt-6 divide-y divide-[#ECEDE8]">
                        {recentApplications.map((application) => (
                            <Link
                                key={application.applicationId}
                                to={`/demo/applications/${application.applicationId}`}
                                className="flex flex-col gap-3 py-5 transition hover:bg-[#FAFAF7] sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div>
                                    <p className="font-semibold">
                                        {application.role}
                                    </p>
                                    <p className="mt-1 text-sm text-[#667085]">
                                        {application.company}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="rounded-full bg-[#F0F2E9] px-3 py-1 text-xs font-semibold text-[#667085]">
                                        {application.status}
                                    </span>

                                    <span className="text-sm font-bold">
                                        {application.matchScore}%
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default DemoDashboard;