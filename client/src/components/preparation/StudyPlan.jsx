import { useEffect, useState } from "react";
import {
    getStudyPlan,
    generateStudyPlan,
} from "../../services/api/applicationApi.js";

const StudyPlan = ({ applicationId }) => {
    const [studyPlan, setStudyPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadStudyPlan = async () => {
        try {
            setError("");

            const data = await getStudyPlan(applicationId);

            if (data) {
                setStudyPlan(data);
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Failed to load study plan."
            );
        }
    };

    useEffect(() => {
        loadStudyPlan();
    }, [applicationId]);

    const handleGenerate = async () => {
        try {
            setError("");
            setLoading(true);

            const data = await generateStudyPlan(applicationId);

            setStudyPlan(data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Failed to generate study plan."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_40px_rgba(23,36,58,0.04)] sm:p-7">
            {/* Header */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                        Preparation Roadmap
                    </p>

                    <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#17243A]">
                        Study Plan
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
                        A focused preparation plan based on the skills
                        you need to improve for this role.
                    </p>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="shrink-0 rounded-full bg-[#17243A] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? "Building Plan..."
                        : studyPlan
                        ? "Regenerate"
                        : "Create Study Plan"}
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-600">
                    {error}
                </div>
            )}

            {/* Empty State */}
            {!studyPlan && !loading && !error && (
                <div className="mt-6 rounded-2xl border border-[#DCDDD7] bg-[#F5F3EE] p-6">
                    <p className="text-sm font-semibold text-[#17243A]">
                        No study plan created yet.
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#667085]">
                        Create a personalized preparation roadmap
                        based on your skill gaps for this role.
                    </p>
                </div>
            )}

            {/* Study Plan */}
            {studyPlan && (
                <div className="mt-7">
                    {/* Overview */}
                    {studyPlan.overview && (
                        <div className="rounded-2xl border border-[#DCDDD7] bg-[#F5F3EE] p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#9A9F97]">
                                Plan Overview
                            </p>

                            <p className="mt-2 text-sm leading-6 text-[#667085]">
                                {studyPlan.overview}
                            </p>
                        </div>
                    )}

                    {/* Roadmap */}
                    {studyPlan.steps?.length > 0 && (
                        <div className="relative mt-8">
                            <div className="space-y-6">
                                {studyPlan.steps.map((step, index) => (
                                    <div
                                        key={`${step.skill}-${index}`}
                                        className="relative flex gap-4 sm:gap-6"
                                    >
                                        {/* Timeline */}
                                        <div className="flex flex-col items-center">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF3E6] text-sm font-bold text-[#5F7D2D]">
                                                {String(
                                                    step.order ||
                                                        index + 1
                                                ).padStart(2, "0")}
                                            </div>

                                            {index !==
                                                studyPlan.steps.length -
                                                    1 && (
                                                <div className="mt-2 h-full min-h-6 w-px bg-[#DCDDD7]" />
                                            )}
                                        </div>

                                        {/* Step Content */}
                                        <div className="min-w-0 flex-1 rounded-2xl border border-[#DCDDD7] p-5">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#9A9F97]">
                                                    Study Focus
                                                </p>

                                                <h3 className="mt-1 text-lg font-bold text-[#17243A]">
                                                    {step.skill}
                                                </h3>

                                                {step.focus && (
                                                    <p className="mt-1 text-sm leading-6 text-[#667085]">
                                                        {step.focus}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Tasks */}
                                            {step.tasks?.length > 0 && (
                                                <div className="mt-5 border-t border-[#E8E8E3] pt-5">
                                                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#9A9F97]">
                                                        Study Tasks
                                                    </p>

                                                    <div className="mt-3 space-y-3">
                                                        {step.tasks.map(
                                                            (
                                                                task,
                                                                taskIndex
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        taskIndex
                                                                    }
                                                                    className="flex items-start gap-3"
                                                                >
                                                                    <div className="mt-0.5 h-5 w-5 shrink-0 rounded-md border border-[#C9CBC4] bg-white" />

                                                                    <p className="text-sm leading-6 text-[#667085]">
                                                                        {
                                                                            task
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty generated plan */}
                    {(!studyPlan.steps ||
                        studyPlan.steps.length === 0) && (
                        <div className="mt-6 rounded-2xl border border-[#DCDDD7] bg-[#F5F3EE] p-6">
                            <p className="text-sm font-semibold text-[#17243A]">
                                No study steps were generated.
                            </p>

                            <p className="mt-1 text-sm leading-6 text-[#667085]">
                                Regenerate the plan to create a
                                preparation roadmap.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default StudyPlan;