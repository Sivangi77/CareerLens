import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import JobAnalysis from "../components/analysis/JobAnalysis.jsx";
import MatchAnalysis from "../components/analysis/MatchAnalysis";

import {
  getApplicationById,
  updateApplication,
  deleteApplication,
  getApplicationEvents,
} from "../services/api/applicationApi";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [formData, setFormData] = useState(null);
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const data = await getApplicationById(id);

        setApplication(data);
        const eventsData = await getApplicationEvents(id);

        setEvents(eventsData);

        setFormData({
          company: data.company || "",
          role: data.role || "",
          jobUrl: data.jobUrl || "",
          jobDescription: data.jobDescription || "",
          deadline: data.deadline ? data.deadline.split("T")[0] : "",
          status: data.status || "Applied",
          notes: data.notes || "",
        });
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load application.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setSaving(true);

      const updatedApplication = await updateApplication(id, formData);

      setApplication(updatedApplication);

      const updatedEvents = await getApplicationEvents(id);
      setEvents(updatedEvents);

      setFormData({
        company: updatedApplication.company || "",
        role: updatedApplication.role || "",
        jobUrl: updatedApplication.jobUrl || "",
        jobDescription: updatedApplication.jobDescription || "",
        deadline: updatedApplication.deadline
          ? updatedApplication.deadline.split("T")[0]
          : "",
        status: updatedApplication.status || "Applied",
        notes: updatedApplication.notes || "",
      });

      setEditing(false);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to update application.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      await deleteApplication(id);

      navigate("/applications");
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to delete application.",
      );
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] p-10 text-[#667085]">
        Loading application...
      </div>
    );
  }

  if (error && !application) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] p-10 text-red-600">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3EE] text-[#17243A]">
      <main className="mx-auto max-w-5xl px-6 py-10 md:px-10 lg:px-14">
        <Link
          to="/applications"
          className="text-sm font-semibold text-[#667085] hover:text-[#17243A]"
        >
          ← Back to Applications
        </Link>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {!editing ? (
          <>
            {/* Header */}
            <div className="mt-8 flex flex-col justify-between gap-6 border-b border-[#DCDDD7] pb-8 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold text-[#8BAE42]">
                  Application Details
                </p>

                <h1 className="mt-2 text-4xl font-bold tracking-[-0.05em]">
                  {application.role}
                </h1>

                <p className="mt-2 text-lg text-[#667085]">
                  {application.company}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditing(true)}
                  className="rounded-full border border-[#DCDDD7] bg-white px-5 py-3 text-sm font-semibold"
                >
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-[24px] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                  Status
                </p>

                <p className="mt-3 text-xl font-bold">{application.status}</p>
              </div>

              <div className="rounded-[24px] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                  Deadline
                </p>

                <p className="mt-3 text-xl font-bold">
                  {application.deadline
                    ? new Date(application.deadline).toLocaleDateString()
                    : "No deadline"}
                </p>
              </div>

              <div className="rounded-[24px] bg-white p-6 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                  Job URL
                </p>

                {application.jobUrl ? (
                  <a
                    href={application.jobUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 block break-all text-sm font-medium text-[#667085] underline"
                  >
                    {application.jobUrl}
                  </a>
                ) : (
                  <p className="mt-3 text-sm text-[#9A9F97]">
                    No job URL provided.
                  </p>
                )}
              </div>

              <div className="rounded-[24px] bg-white p-6 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                  Job Description
                </p>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[#667085]">
                  {application.jobDescription || "No job description provided."}
                </p>
              </div>

              <JobAnalysis
                applicationId={id}
                jobDescription={application.jobDescription}
              />

              <MatchAnalysis applicationId={id} />

              <div className="rounded-[24px] bg-white p-6 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                  Notes
                </p>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[#667085]">
                  {application.notes || "No notes added."}
                </p>
              </div>
              {/* Application Timeline */}
              <div className="rounded-[24px] bg-white p-6 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                  Application Timeline
                </p>

                {events.length === 0 ? (
                  <p className="mt-4 text-sm text-[#9A9F97]">
                    No status changes recorded yet.
                  </p>
                ) : (
                  <div className="mt-6 space-y-5">
                    {events.map((event) => (
                      <div key={event._id} className="flex gap-4">
                        <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#8BAE42]" />

                        <div>
                          <p className="text-sm font-semibold">
                            {event.oldStatus} → {event.newStatus}
                          </p>

                          <p className="mt-1 text-xs text-[#9A9F97]">
                            {new Date(event.timestamp).toLocaleString()}
                          </p>

                          {event.note && (
                            <p className="mt-2 text-sm text-[#667085]">
                              {event.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Edit Form */
          <form
            onSubmit={handleUpdate}
            className="mt-8 rounded-[28px] bg-white p-7 shadow-[0_16px_50px_rgba(23,36,58,0.06)] sm:p-9"
          >
            <h1 className="text-2xl font-bold">Edit Application</h1>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                  Company
                </label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-[#DCDDD7] px-4 py-3 text-sm outline-none focus:border-[#8BAE42]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                  Role
                </label>

                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-[#DCDDD7] px-4 py-3 text-sm outline-none focus:border-[#8BAE42]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                  Job URL
                </label>

                <input
                  type="url"
                  name="jobUrl"
                  value={formData.jobUrl}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-[#DCDDD7] px-4 py-3 text-sm outline-none focus:border-[#8BAE42]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                  Deadline
                </label>

                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-[#DCDDD7] px-4 py-3 text-sm outline-none focus:border-[#8BAE42]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-[#DCDDD7] bg-white px-4 py-3 text-sm outline-none focus:border-[#8BAE42]"
                >
                  <option>Applied</option>
                  <option>Assessment</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                  <option>Withdrawn</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                  Notes
                </label>

                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-[#DCDDD7] px-4 py-3 text-sm outline-none focus:border-[#8BAE42]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                Job Description
              </label>

              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows={8}
                className="mt-2 w-full resize-none rounded-xl border border-[#DCDDD7] px-4 py-3 text-sm outline-none focus:border-[#8BAE42]"
              />
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-full border border-[#DCDDD7] px-5 py-3 text-sm font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[#17243A] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

export default ApplicationDetails;
