import { useEffect, useState } from "react";
import {
    getSkillGapRecommendations,
    generateSkillGapRecommendations,
} from "../../services/api/applicationApi.js";

const SkillGapRecommendations = ({ applicationId }) => {
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadRecommendations = async () => {
        try {
            setError("");

            const data = await getSkillGapRecommendations(
                applicationId
            );

            if (data) {
                setAnalysis(data);
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Failed to load skill-gap recommendations."
            );
        }
    };

    useEffect(() => {
        loadRecommendations();
    }, [applicationId]);

    const handleGenerate = async () => {
        try {
            setError("");
            setLoading(true);

            const data =
                await generateSkillGapRecommendations(
                    applicationId
                );

            setAnalysis(data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Failed to generate skill-gap recommendations."
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
                        Skill Gaps
                    </p>

                    <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#17243A]">
                        Skill Gap Recommendations
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
                        Personalized recommendations based on your
                        resume and this job's requirements.
                    </p>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="shrink-0 rounded-full bg-[#17243A] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? "Generating..."
                        : analysis
                        ? "Regenerate"
                        : "Generate Recommendations"}
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-600">
                    {error}
                </div>
            )}

            {/* Empty State */}
            {!analysis && !loading && !error && (
                <div className="mt-6 rounded-2xl border border-[#DCDDD7] bg-[#F5F3EE] p-6">
                    <p className="text-sm font-medium text-[#17243A]">
                        No recommendations available yet.
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#667085]">
                        Generate your personalized recommendations
                        to see which skills you should focus on for
                        this role.
                    </p>
                </div>
            )}

            {/* Recommendations */}
            {analysis?.recommendations?.length > 0 && (
                <div className="mt-7 space-y-4">
                    {analysis.recommendations.map(
                        (item, index) => (
                            <div
                                key={`${item.skill}-${index}`}
                                className="rounded-2xl border border-[#DCDDD7] p-5 transition hover:shadow-[0_8px_25px_rgba(23,36,58,0.04)]"
                            >
                                {/* Skill Header */}
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-[#17243A]">
                                            {item.skill}
                                        </h3>

                                        <p className="mt-1 text-sm capitalize text-[#9A9F97]">
                                            {item.gapType} skill gap
                                        </p>
                                    </div>

                                    <span
                                        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                            item.priority ===
                                            "high"
                                                ? "bg-[#F3E8E5] text-[#9B4A3C]"
                                                : item.priority ===
                                                  "medium"
                                                ? "bg-[#F5F0DF] text-[#8A7028]"
                                                : "bg-[#EEF3E6] text-[#5F7D2D]"
                                        }`}
                                    >
                                        {item.priority} priority
                                    </span>
                                </div>

                                {/* Details */}
                                <div className="mt-5 grid gap-5 border-t border-[#E8E8E3] pt-5 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#9A9F97]">
                                            Why?
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-[#667085]">
                                            {item.reason}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#9A9F97]">
                                            What to work on
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-[#667085]">
                                            {item.recommendation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}

            {/* No Gaps */}
            {analysis &&
                (!analysis.recommendations ||
                    analysis.recommendations.length === 0) && (
                    <div className="mt-6 rounded-2xl border border-[#DCDDD7] bg-[#F5F3EE] p-6">
                        <p className="text-sm font-semibold text-[#17243A]">
                            No significant skill gaps identified.
                        </p>

                        <p className="mt-1 text-sm leading-6 text-[#667085]">
                            Your current skills align well with the
                            requirements identified for this role.
                        </p>
                    </div>
                )}
        </div>
    );
};

export default SkillGapRecommendations;