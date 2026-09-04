import { useEffect, useState } from "react";
import {
    getInterviewQuestions,
    generateInterviewQuestions,
} from "../../services/api/applicationApi.js";

const categoryLabels = {
    technical: "Technical",
    behavioral: "Behavioral",
    "role-specific": "Role Specific",
};

const InterviewQuestions = ({ applicationId }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadQuestions = async () => {
        try {
            setError("");

            const result = await getInterviewQuestions(applicationId);

            if (result) {
                setData(result);
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Failed to load interview questions."
            );
        }
    };

    useEffect(() => {
        loadQuestions();
    }, [applicationId]);

    const handleGenerate = async () => {
        try {
            setError("");
            setLoading(true);

            const result =
                await generateInterviewQuestions(applicationId);

            setData(result);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Failed to generate interview questions."
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
                        Interview Preparation
                    </p>

                    <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#17243A]">
                        Interview Questions
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
                        Practice questions tailored to the requirements
                        and skill gaps identified for this role.
                    </p>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="shrink-0 rounded-full bg-[#17243A] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? "Preparing Questions..."
                        : data
                        ? "Regenerate"
                        : "Generate Questions"}
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-600">
                    {error}
                </div>
            )}

            {/* Empty */}
            {!data && !loading && !error && (
                <div className="mt-6 rounded-2xl bg-[#F5F3EE] p-6">
                    <p className="text-sm font-semibold text-[#17243A]">
                        No interview questions generated yet.
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#667085]">
                        Generate tailored questions to practice before
                        your interview.
                    </p>
                </div>
            )}

            {/* Questions */}
            {data?.questions?.length > 0 && (
                <div className="mt-8 space-y-4">
                    {data.questions.map((item, index) => (
                        <div
                            key={`${item.question}-${index}`}
                            className="rounded-2xl border border-[#DCDDD7] p-5 transition hover:shadow-[0_8px_24px_rgba(23,36,58,0.04)]"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5F3EE] text-sm font-bold text-[#17243A]">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-[#EEF3E6] px-3 py-1 text-xs font-semibold text-[#5F7D2D]">
                                            {categoryLabels[
                                                item.category
                                            ] || item.category}
                                        </span>
                                    </div>

                                    <h3 className="mt-3 text-base font-semibold leading-6 text-[#17243A]">
                                        {item.question}
                                    </h3>

                                    {item.reason && (
                                        <div className="mt-4 border-t border-[#E8E8E3] pt-4">
                                            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#9A9F97]">
                                                Why this matters
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-[#667085]">
                                                {item.reason}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Generated but empty */}
            {data &&
                (!data.questions ||
                    data.questions.length === 0) && (
                    <div className="mt-6 rounded-2xl bg-[#F5F3EE] p-6">
                        <p className="text-sm font-semibold text-[#17243A]">
                            No questions were generated.
                        </p>

                        <p className="mt-1 text-sm leading-6 text-[#667085]">
                            Try regenerating the interview questions.
                        </p>
                    </div>
                )}
        </div>
    );
};

export default InterviewQuestions;