import { useEffect, useState } from "react";

import {
    uploadResume,
    getResume,
} from "../services/api/resumeApi";

function Resume() {
    const [resume, setResume] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const data = await getResume();
                setResume(data);
            } catch (error) {
                if (error.response?.status !== 404) {
                    setError(
                        error.response?.data?.message ||
                        "Failed to load resume."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        setError("");

        if (!file) {
            setSelectedFile(null);
            return;
        }

        if (file.type !== "application/pdf") {
            setError("Only PDF files are allowed.");
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a PDF resume.");
            return;
        }

        try {
            setUploading(true);
            setError("");

            const data = await uploadResume(selectedFile);

            setResume(data);
            setSelectedFile(null);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to upload and analyze resume."
            );
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F3EE] p-10 text-[#667085]">
                Loading resume...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F3EE] text-[#17243A]">
            <main className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-14">

                {/* Header */}
                <div className="border-b border-[#DCDDD7] pb-8">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCE8B9] text-sm">
                            ✦
                        </span>

                        <span className="text-sm font-semibold text-[#667085]">
                            CareerLens Resume Intelligence
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
                        Your resume.
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#667085]">
                        Upload your resume and let CareerLens turn it into a
                        structured candidate profile.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Upload */}
                <div className="mt-10 rounded-[28px] bg-white p-7 shadow-[0_16px_50px_rgba(23,36,58,0.06)] sm:p-9">

                    <h2 className="text-xl font-bold">
                        {resume ? "Upload a new resume" : "Upload your resume"}
                    </h2>

                    <p className="mt-2 text-sm text-[#667085]">
                        PDF files only.
                    </p>

                    <div className="mt-6">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            disabled={uploading}
                            className="block w-full text-sm text-[#667085]"
                        />
                    </div>

                    {selectedFile && (
                        <p className="mt-4 text-sm font-medium">
                            Selected: {selectedFile.name}
                        </p>
                    )}

                    <button
                        onClick={handleUpload}
                        disabled={!selectedFile || uploading}
                        className="mt-6 rounded-full bg-[#17243A] px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {uploading
                            ? "Analyzing your resume..."
                            : "Upload & Analyze"}
                    </button>

                    {uploading && (
                        <div className="mt-5 rounded-2xl bg-[#F5F3EE] p-4">
                            <p className="text-sm font-semibold">
                                Your resume is being analyzed
                            </p>

                            <p className="mt-1 text-xs leading-5 text-[#667085]">
                                We're uploading your PDF, extracting its text,
                                and using AI to build your structured profile.
                                This may take a few seconds.
                            </p>
                        </div>
                    )}
                </div>

                {/* Resume Profile */}
                {resume?.parsedProfile && (
                    <div className="mt-8 space-y-6">

                        {/* Summary */}
                        <div className="rounded-[28px] bg-white p-7 sm:p-9">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                Summary
                            </p>

                            <p className="mt-4 text-sm leading-7 text-[#667085]">
                                {resume.parsedProfile.summary ||
                                    "No summary found."}
                            </p>
                        </div>

                        {/* Skills */}
                        <div className="rounded-[28px] bg-white p-7 sm:p-9">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                Skills
                            </p>

                            {resume.parsedProfile.skills?.length > 0 ? (
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {resume.parsedProfile.skills.map(
                                        (skill, index) => (
                                            <span
                                                key={index}
                                                className="rounded-full bg-[#F0F2EA] px-4 py-2 text-sm font-medium"
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p className="mt-4 text-sm text-[#9A9F97]">
                                    No skills found.
                                </p>
                            )}
                        </div>

                        {/* Experience */}
                        <div className="rounded-[28px] bg-white p-7 sm:p-9">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                Experience
                            </p>

                            <div className="mt-6 space-y-6">
                                {resume.parsedProfile.experience?.length > 0 ? (
                                    resume.parsedProfile.experience.map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className="border-b border-[#E5E5E0] pb-6 last:border-0 last:pb-0"
                                            >
                                                <h3 className="text-lg font-bold">
                                                    {item.role}
                                                </h3>

                                                <p className="mt-1 text-sm font-medium text-[#667085]">
                                                    {item.company}
                                                </p>

                                                <p className="mt-1 text-xs text-[#9A9F97]">
                                                    {item.startDate} —{" "}
                                                    {item.endDate}
                                                </p>

                                                <p className="mt-4 text-sm leading-7 text-[#667085]">
                                                    {item.description}
                                                </p>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <p className="text-sm text-[#9A9F97]">
                                        No experience found.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Education */}
                        <div className="rounded-[28px] bg-white p-7 sm:p-9">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                Education
                            </p>

                            <div className="mt-6 space-y-6">
                                {resume.parsedProfile.education?.length > 0 ? (
                                    resume.parsedProfile.education.map(
                                        (item, index) => (
                                            <div key={index}>
                                                <h3 className="text-lg font-bold">
                                                    {item.degree}
                                                </h3>

                                                <p className="mt-1 text-sm text-[#667085]">
                                                    {item.field}
                                                </p>

                                                <p className="mt-1 text-sm font-medium">
                                                    {item.institution}
                                                </p>

                                                <p className="mt-1 text-xs text-[#9A9F97]">
                                                    {item.startDate} —{" "}
                                                    {item.endDate}
                                                </p>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <p className="text-sm text-[#9A9F97]">
                                        No education found.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Projects */}
                        <div className="rounded-[28px] bg-white p-7 sm:p-9">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                Projects
                            </p>

                            <div className="mt-6 space-y-6">
                                {resume.parsedProfile.projects?.length > 0 ? (
                                    resume.parsedProfile.projects.map(
                                        (item, index) => (
                                            <div key={index}>
                                                <h3 className="text-lg font-bold">
                                                    {item.name}
                                                </h3>

                                                <p className="mt-3 text-sm leading-7 text-[#667085]">
                                                    {item.description}
                                                </p>

                                                {item.technologies?.length > 0 && (
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        {item.technologies.map(
                                                            (
                                                                technology,
                                                                techIndex
                                                            ) => (
                                                                <span
                                                                    key={
                                                                        techIndex
                                                                    }
                                                                    className="rounded-full bg-[#F0F2EA] px-3 py-1 text-xs font-medium"
                                                                >
                                                                    {
                                                                        technology
                                                                    }
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    )
                                ) : (
                                    <p className="text-sm text-[#9A9F97]">
                                        No projects found.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="rounded-[28px] bg-white p-7 sm:p-9">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                Certifications
                            </p>

                            {resume.parsedProfile.certifications?.length > 0 ? (
                                <ul className="mt-5 space-y-3">
                                    {resume.parsedProfile.certifications.map(
                                        (certification, index) => (
                                            <li
                                                key={index}
                                                className="text-sm text-[#667085]"
                                            >
                                                • {certification}
                                            </li>
                                        )
                                    )}
                                </ul>
                            ) : (
                                <p className="mt-4 text-sm text-[#9A9F97]">
                                    No certifications found.
                                </p>
                            )}
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}

export default Resume;