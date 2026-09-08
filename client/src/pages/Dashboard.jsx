import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAnalyticsOverview } from "../services/api/analyticsApi";

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalyticsOverview();
        setAnalytics(data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] p-8 text-[#667085]">
        Loading your career dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] p-8 text-red-600">{error}</div>
    );
  }

  const { kpis, statusDistribution, upcomingDeadlines, recentApplications } =
    analytics;

  const needsAttention = recentApplications.filter(
    (application) =>
      application.status === "Interview" ||
      (typeof application.matchScore === "number" &&
        application.matchScore < 60),
  );

  const statusOrder = [
    "Applied",
    "Assessment",
    "Interview",
    "Offer",
    "Rejected",
    "Withdrawn",
  ];

  return (
    <div className="min-h-screen bg-[#F5F3EE] text-[#17243A]">
      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-14">
        <div className="border-b border-[#DCDDD7] pb-8">
          <p className="text-sm font-semibold text-[#8BAE42]">
            Career overview
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
            Your job search, at a glance.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085]">
            See where your applications stand and what deserves your attention
            next.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[24px] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
              Applications
            </p>
            <p className="mt-4 text-4xl font-bold">{kpis.totalApplications}</p>
            <p className="mt-2 text-sm text-[#667085]">Total applications</p>
          </div>

          <div className="rounded-[24px] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
              Active
            </p>
            <p className="mt-4 text-4xl font-bold">{kpis.activeApplications}</p>
            <p className="mt-2 text-sm text-[#667085]">
              Applications still in progress
            </p>
          </div>

          <div className="rounded-[24px] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
              Compatibility
            </p>
            <p className="mt-4 text-4xl font-bold">
              {kpis.averageMatchScore !== null
                ? `${kpis.averageMatchScore}%`
                : "—"}
            </p>
            <p className="mt-2 text-sm text-[#667085]">Average resume match</p>
          </div>

          <div className="rounded-[24px] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
              Interview rate
            </p>
            <p className="mt-4 text-4xl font-bold">
              {kpis.interviewConversion}%
            </p>
            <p className="mt-2 text-sm text-[#667085]">
              Applications reaching interview
            </p>
          </div>
        </div>

        <section className="mt-6 rounded-[28px] border border-[#DCDDD7] bg-white p-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8BAE42]">
              Needs attention
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Applications worth a closer look
            </h2>

            <p className="mt-2 text-sm text-[#667085]">
              A quick view of applications that may need your attention next.
            </p>
          </div>

          {needsAttention.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-[#F5F3EE] p-5">
              <p className="text-sm font-semibold">You're all caught up.</p>

              <p className="mt-1 text-sm text-[#667085]">
                No recent applications currently need extra attention.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {needsAttention.map((application) => (
                <Link
                  key={application.applicationId}
                  to={`/applications/${application.applicationId}`}
                  className="rounded-2xl border border-[#E8E9E3] p-5 transition hover:-translate-y-0.5 hover:border-[#8BAE42]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{application.role}</p>

                      <p className="mt-1 text-sm text-[#667085]">
                        {application.company}
                      </p>
                    </div>

                    {application.matchScore !== null && (
                      <span className="text-sm font-bold">
                        {application.matchScore}%
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-xs font-semibold text-[#8BAE42]">
                    {application.status === "Interview"
                      ? "Interview stage"
                      : "Low compatibility"}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <section className="rounded-[28px] bg-white p-7 lg:col-span-3">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                  Application pulse
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Where your applications stand
                </h2>
              </div>

              <Link
                to="/applications"
                className="text-sm font-semibold text-[#667085] hover:text-[#17243A]"
              >
                View all →
              </Link>
            </div>

            <div className="mt-8 space-y-5">
              {statusOrder.map((status) => {
                const count = statusDistribution[status];
                const percentage =
                  kpis.totalApplications > 0
                    ? (count / kpis.totalApplications) * 100
                    : 0;

                return (
                  <div key={status}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-semibold">{status}</span>
                      <span className="text-[#667085]">{count}</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#EEF0E9]">
                      <div
                        className="h-full rounded-full bg-[#8BAE42]"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-[28px] bg-[#17243A] p-7 text-white lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#DCE8B9]">
              Upcoming
            </p>

            <h2 className="mt-2 text-2xl font-bold">Deadlines</h2>

            {upcomingDeadlines.length === 0 ? (
              <p className="mt-8 text-sm leading-6 text-[#B8C0CF]">
                No upcoming deadlines. You're all clear.
              </p>
            ) : (
              <div className="mt-6 space-y-4">
                {upcomingDeadlines.map((application) => (
                  <Link
                    key={application.applicationId}
                    to={`/applications/${application.applicationId}`}
                    className="block rounded-2xl bg-white/10 p-4 transition hover:bg-white/15"
                  >
                    <p className="font-semibold">{application.role}</p>

                    <p className="mt-1 text-sm text-[#B8C0CF]">
                      {application.company}
                    </p>

                    <p className="mt-3 text-xs font-semibold text-[#DCE8B9]">
                      {new Date(application.deadline).toLocaleDateString()}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="mt-6 rounded-[28px] bg-white p-7">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                Recent activity
              </p>

              <h2 className="mt-2 text-2xl font-bold">Latest applications</h2>
            </div>

            <Link
              to="/applications"
              className="text-sm font-semibold text-[#667085] hover:text-[#17243A]"
            >
              View all →
            </Link>
          </div>

          {recentApplications.length === 0 ? (
            <p className="mt-8 text-sm text-[#9A9F97]">
              Your recent applications will appear here.
            </p>
          ) : (
            <div className="mt-6 divide-y divide-[#EEF0E9]">
              {recentApplications.map((application) => (
                <Link
                  key={application.applicationId}
                  to={`/applications/${application.applicationId}`}
                  className="flex flex-col gap-3 py-5 transition hover:opacity-70 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold">{application.role}</p>
                    <p className="mt-1 text-sm text-[#667085]">
                      {application.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {application.matchScore !== null && (
                      <span className="text-sm font-semibold">
                        {application.matchScore}% match
                      </span>
                    )}

                    <span className="rounded-full bg-[#F0F2EA] px-3 py-1.5 text-xs font-semibold text-[#667085]">
                      {application.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
