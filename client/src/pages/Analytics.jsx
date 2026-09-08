import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { getAnalyticsOverview } from "../services/api/analyticsApi";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalyticsOverview();
        setAnalytics(data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] p-8 text-[#667085]">
        Loading analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] p-8 text-red-600">{error}</div>
    );
  }

  const {
    kpis,
    statusDistribution,
    recurringSkillGaps,
    matchScoreDistribution,
    upcomingDeadlines,
  } = analytics;

  const statusData = Object.entries(statusDistribution).map(
    ([status, count]) => ({
      status,
      count,
    }),
  );

  return (
    <div className="min-h-screen bg-[#F5F3EE] text-[#17243A]">
      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-14">
        <div className="border-b border-[#DCDDD7] pb-8">
          <p className="text-sm font-semibold text-[#8BAE42]">
            Job search intelligence
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
            Understand your search.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085]">
            See patterns across your applications, interviews, compatibility
            scores, and recurring skill gaps.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[24px] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
              Applications
            </p>
            <p className="mt-4 text-4xl font-bold">{kpis.totalApplications}</p>
          </div>

          <div className="rounded-[24px] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
              Active
            </p>
            <p className="mt-4 text-4xl font-bold">{kpis.activeApplications}</p>
          </div>

          <div className="rounded-[24px] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
              Avg. Match
            </p>
            <p className="mt-4 text-4xl font-bold">
              {kpis.averageMatchScore !== null
                ? `${kpis.averageMatchScore}%`
                : "—"}
            </p>
          </div>

          <div className="rounded-[24px] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
              Interview Rate
            </p>
            <p className="mt-4 text-4xl font-bold">
              {kpis.interviewConversion}%
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[28px] bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
              Pipeline
            </p>

            <h2 className="mt-2 text-2xl font-bold">Application status</h2>

            <div className="mt-8 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8BAE42" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-[28px] bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
              Distribution
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Where applications stand
            </h2>

            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData.filter((item) => item.count > 0)}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {statusData
                      .filter((item) => item.count > 0)
                      .map((item, index) => (
                        <Cell
                          key={item.status}
                          fill={
                            [
                              "#8BAE42",
                              "#17243A",
                              "#667085",
                              "#DCE8B9",
                              "#B8C0CF",
                              "#9A9F97",
                            ][index % 6]
                          }
                        />
                      ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[28px] border border-[#DCDDD7] bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8BAE42]">
              Compatibility
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              How your applications score
            </h2>

            <p className="mt-2 text-sm text-[#667085]">
              Distribution of your resume-to-job compatibility scores.
            </p>

            <div className="mt-8 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={matchScoreDistribution}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E8E9E3"
                  />
                  <XAxis
                    dataKey="range"
                    tick={{ fontSize: 12, fill: "#667085" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: "#9A9F97" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#8BAE42"
                    radius={[8, 8, 0, 0]}
                    barSize={36}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#DCDDD7] bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8BAE42]">
              Interview conversion
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              From application to interview
            </h2>

            <div className="mt-8 flex items-center justify-center">
              <div className="flex h-48 w-48 items-center justify-center rounded-full border-[18px] border-[#DCE8B9]">
                <div className="text-center">
                  <p className="text-4xl font-bold">
                    {kpis.interviewConversion}%
                  </p>
                  <p className="mt-1 text-xs text-[#667085]">conversion</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm leading-6 text-[#667085]">
              Percentage of applications that have reached the interview stage.
            </p>
          </section>
        </div>

        <section className="mt-6 rounded-[28px] border border-[#DCDDD7] bg-white p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8BAE42]">
            Skill intelligence
          </p>

          <div className="mt-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold text-[#17243A]">
                Skills appearing most often in your gaps
              </h2>
              <p className="mt-2 text-sm text-[#667085]">
                Skills that repeatedly appear as gaps across your applications.
              </p>
            </div>
          </div>

          {recurringSkillGaps.length === 0 ? (
            <p className="mt-8 text-sm text-[#9A9F97]">
              Skill-gap patterns will appear after you analyze your
              applications.
            </p>
          ) : (
            <div className="mt-8 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={recurringSkillGaps}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 20,
                    bottom: 5,
                    left: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#E8E9E3"
                  />

                  <XAxis
                    type="number"
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: "#9A9F97" }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    type="category"
                    dataKey="skill"
                    width={150}
                    tick={{ fontSize: 12, fill: "#667085" }}
                    tickFormatter={(value) =>
                      value.length > 22 ? `${value.slice(0, 22)}...` : value
                    }
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip cursor={{ fill: "#F5F3EE" }} />

                  <Bar
                    dataKey="count"
                    fill="#8BAE42"
                    radius={[0, 8, 8, 0]}
                    barSize={22}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
        <section className="mt-6 rounded-[28px] border border-[#DCDDD7] bg-white p-7">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8BAE42]">
                Upcoming
              </p>

              <h2 className="mt-2 text-2xl font-bold">Deadlines to watch</h2>

              <p className="mt-2 text-sm text-[#667085]">
                Applications with the nearest upcoming deadlines.
              </p>
            </div>
          </div>

          {upcomingDeadlines.length === 0 ? (
            <p className="mt-8 text-sm text-[#9A9F97]">
              No upcoming deadlines.
            </p>
          ) : (
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingDeadlines.map((application) => (
                <a
                  key={application.applicationId}
                  href={`/applications/${application.applicationId}`}
                  className="rounded-2xl border border-[#E8E9E3] p-5 transition hover:-translate-y-0.5 hover:border-[#8BAE42]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">{application.role}</p>

                      <p className="mt-1 text-sm text-[#667085]">
                        {application.company}
                      </p>
                    </div>

                    <span className="rounded-full bg-[#F0F2EA] px-3 py-1 text-xs font-semibold text-[#667085]">
                      {application.status}
                    </span>
                  </div>

                  <p className="mt-5 text-sm font-semibold text-[#17243A]">
                    {new Date(application.deadline).toLocaleDateString()}
                  </p>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Analytics;
