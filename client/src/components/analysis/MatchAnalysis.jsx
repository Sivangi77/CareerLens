import { useEffect, useState } from "react";
import {
    analyzeApplicationMatch,
    getMatchAnalysis,
} from "../../services/api/applicationApi.js";

const MatchAnalysis = ({ applicationId }) => {
    const [matchAnalysis, setMatchAnalysis] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [error, setError] = useState("");

    const loadMatchAnalysis = async () => {
        try {
            const analysis = await getMatchAnalysis(applicationId);

            if (analysis) {
                setMatchAnalysis(analysis);
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load match analysis."
            );
        }
    };

    useEffect(() => {
        loadMatchAnalysis();
    }, [applicationId]);

    const handleAnalyze = async () => {
        try {
            setError("");
            setAnalyzing(true);

            const analysis = await analyzeApplicationMatch(
                applicationId
            );

            setMatchAnalysis(analysis);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to analyze application match."
            );
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Match Analysis
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Compare your resume with the job requirements.
                    </p>
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {analyzing
                        ? "Analyzing..."
                        : matchAnalysis
                        ? "Re-analyze Match"
                        : "Analyze Match"}
                </button>
            </div>

            {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {!matchAnalysis && !analyzing && !error && (
                <p className="text-sm text-gray-500">
                    No match analysis available yet.
                </p>
            )}

            {matchAnalysis && (
                <>
                    {/* Score */}
                    <div className="rounded-xl bg-gray-50 p-5">
                        <p className="text-sm text-gray-500">
                            Overall Match Score
                        </p>

                        <div className="flex items-end gap-2 mt-1">
                            <span className="text-4xl font-bold text-gray-900">
                                {matchAnalysis.score}
                            </span>

                            <span className="text-gray-500 mb-1">
                                / 100
                            </span>
                        </div>

                        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                            <div
                                className="h-full rounded-full bg-[#8BAE42]"
                                style={{
                                    width: `${matchAnalysis.score}%`,
                                }}
                            />
                        </div>

                        <p className="mt-3 text-sm text-gray-500">
                            {matchAnalysis.score >= 80
                                ? "Strong match for this role."
                                : matchAnalysis.score >= 60
                                ? "Good match with some areas to improve."
                                : matchAnalysis.score >= 40
                                ? "Moderate match with several gaps."
                                : "Low match with significant skill gaps."}
                        </p>
                    </div>

                    {/* Breakdown */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                            Score Breakdown
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                                <p className="text-sm text-gray-500">
                                    Required Skills
                                </p>

                                <p className="text-2xl font-semibold mt-1">
                                    {matchAnalysis.breakdown
                                        ?.requiredSkills ?? 0}
                                    %
                                </p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <p className="text-sm text-gray-500">
                                    Preferred Skills
                                </p>

                                <p className="text-2xl font-semibold mt-1">
                                    {matchAnalysis.breakdown
                                        ?.preferredSkills ?? 0}
                                    %
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Matched Skills */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                            Matched Skills
                        </h3>

                        {matchAnalysis.matchedSkills?.length ? (
                            <div className="flex flex-wrap gap-2">
                                {matchAnalysis.matchedSkills.map(
                                    (skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm"
                                        >
                                            {skill}
                                        </span>
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No exact skills matched.
                            </p>
                        )}
                    </div>

                    {/* Partial Skills */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                            Partial Matches
                        </h3>

                        {matchAnalysis.partialSkills?.length ? (
                            <div className="flex flex-wrap gap-2">
                                {matchAnalysis.partialSkills.map(
                                    (skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-sm"
                                        >
                                            {skill}
                                        </span>
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No partial skill matches.
                            </p>
                        )}
                    </div>

                    {/* Missing Skills */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                            Missing Required Skills
                        </h3>

                        {matchAnalysis.missingSkills?.length ? (
                            <div className="flex flex-wrap gap-2">
                                {matchAnalysis.missingSkills.map(
                                    (skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-sm"
                                        >
                                            {skill}
                                        </span>
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No required skills are missing.
                            </p>
                        )}
                    </div>

                    {/* Why This Score */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                            Why This Score?
                        </h3>

                        <ul className="space-y-2">
                            {matchAnalysis.evidence?.map(
                                (item, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-600"
                                    >
                                        • {item}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default MatchAnalysis;