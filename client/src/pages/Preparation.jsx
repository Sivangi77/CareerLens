import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SkillGapRecommendations from "../components/preparation/SkillGapRecommendations.jsx";
import StudyPlan from "../components/preparation/StudyPlan.jsx";
import InterviewQuestions from "../components/preparation/InterviewQuestions.jsx";
import { getApplicationById } from "../services/api/applicationApi";

const Preparation = () => {
    const { id } = useParams();

    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const data = await getApplicationById(id);
                setApplication(data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        "Failed to load application."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchApplication();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F3EE] p-10 text-[#667085]">
                Loading preparation...
            </div>
        );
    }

    if (error || !application) {
        return (
            <div className="min-h-screen bg-[#F5F3EE] p-10 text-red-600">
                {error || "Application not found."}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F3EE] text-[#17243A]">
            <main className="mx-auto max-w-5xl px-6 py-10 md:px-10 lg:px-14">
                <Link
                    to={`/applications/${id}`}
                    className="text-sm font-semibold text-[#667085] transition hover:text-[#17243A]"
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
                        Get personalized recommendations to help you prepare
                        based on your resume and this job's requirements.
                    </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-[20px] border border-[#DCDDD7] bg-white p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Status
                        </p>
                        <p className="mt-2 text-lg font-bold">
                            {application.status}
                        </p>
                    </div>

                    <div className="rounded-[20px] border border-[#DCDDD7] bg-white p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Match Score
                        </p>
                        <p className="mt-2 text-lg font-bold">
                            {typeof application.matchScore === "number"
                                ? `${application.matchScore}%`
                                : "Not analyzed"}
                        </p>
                    </div>

                    <div className="rounded-[20px] border border-[#DCDDD7] bg-white p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Deadline
                        </p>
                        <p className="mt-2 text-lg font-bold">
                            {application.deadline
                                ? new Date(
                                      application.deadline
                                  ).toLocaleDateString()
                                : "No deadline"}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        to={`/applications/${id}`}
                        className="rounded-full border border-[#DCDDD7] bg-white px-4 py-2 text-sm font-semibold text-[#667085] transition hover:border-[#8BAE42] hover:text-[#17243A]"
                    >
                        Overview
                    </Link>

                    <Link
                        to={`/applications/${id}#jd-analysis`}
                        className="rounded-full border border-[#DCDDD7] bg-white px-4 py-2 text-sm font-semibold text-[#667085] transition hover:border-[#8BAE42] hover:text-[#17243A]"
                    >
                        JD Analysis
                    </Link>

                    <Link
                        to={`/applications/${id}#match-analysis`}
                        className="rounded-full border border-[#DCDDD7] bg-white px-4 py-2 text-sm font-semibold text-[#667085] transition hover:border-[#8BAE42] hover:text-[#17243A]"
                    >
                        Match Analysis
                    </Link>

                    <span className="rounded-full bg-[#17243A] px-4 py-2 text-sm font-semibold text-white">
                        Preparation
                    </span>
                </div>

                <div className="mt-8 space-y-8">
                    <SkillGapRecommendations applicationId={id} />

                    <StudyPlan applicationId={id} />

                    <InterviewQuestions applicationId={id} />
                </div>
            </main>
        </div>
    );
};

export default Preparation;