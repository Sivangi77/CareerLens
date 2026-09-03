import { useState } from "react";
import { analyzeJobDescription } from "../../services/api/applicationApi";

function JobAnalysis({ applicationId, jobDescription }) {
    const [jobAnalysis, setJobAnalysis] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {
        setError("");

        try {
            setAnalyzing(true);

            const analysis = await analyzeJobDescription(applicationId);

            setJobAnalysis(analysis);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to analyze job description."
            );
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="rounded-[24px] bg-white p-6 md:col-span-2">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                        Job Analysis
                    </p>

                    <p className="mt-2 text-sm text-[#667085]">
                        Extract requirements and keywords from this job description.
                    </p>
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={!jobDescription?.trim() || analyzing}
                    className="rounded-full bg-[#17243A] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {analyzing ? "Analyzing..." : "Analyze Job Description"}
                </button>
            </div>

            {error && (
                <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {jobAnalysis && (
                <div className="mt-6 grid gap-5 md:grid-cols-2">

                    {/* Required Skills */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Required Skills
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {jobAnalysis.requiredSkills?.length > 0 ? (
                                jobAnalysis.requiredSkills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-[#F5F3EE] px-3 py-1.5 text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-sm text-[#9A9F97]">
                                    No required skills found.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Preferred Skills */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Preferred Skills
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {jobAnalysis.preferredSkills?.length > 0 ? (
                                jobAnalysis.preferredSkills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-[#F5F3EE] px-3 py-1.5 text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-sm text-[#9A9F97]">
                                    No preferred skills found.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Experience */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Experience
                        </p>

                        <p className="mt-3 text-sm text-[#667085]">
                            {jobAnalysis.experience || "Not specified."}
                        </p>
                    </div>

                    {/* Education */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Education
                        </p>

                        <p className="mt-3 text-sm text-[#667085]">
                            {jobAnalysis.education || "Not specified."}
                        </p>
                    </div>

                    {/* Role Category */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Role Category
                        </p>

                        <p className="mt-3 text-sm text-[#667085]">
                            {jobAnalysis.roleCategory || "Not specified."}
                        </p>
                    </div>

                    {/* Keywords */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Keywords
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {jobAnalysis.keywords?.length > 0 ? (
                                jobAnalysis.keywords.map((keyword, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-[#F5F3EE] px-3 py-1.5 text-sm"
                                    >
                                        {keyword}
                                    </span>
                                ))
                            ) : (
                                <p className="text-sm text-[#9A9F97]">
                                    No keywords found.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="md:col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                            Responsibilities
                        </p>

                        {jobAnalysis.responsibilities?.length > 0 ? (
                            <ul className="mt-3 space-y-2 text-sm text-[#667085]">
                                {jobAnalysis.responsibilities.map(
                                    (responsibility, index) => (
                                        <li key={index}>
                                            • {responsibility}
                                        </li>
                                    )
                                )}
                            </ul>
                        ) : (
                            <p className="mt-3 text-sm text-[#9A9F97]">
                                No responsibilities found.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default JobAnalysis;