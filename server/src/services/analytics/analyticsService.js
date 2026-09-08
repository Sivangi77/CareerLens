import Application from "../../models/Application.js";
import SkillGapAnalysis from "../../models/SkillGapAnalysis.js";
import ApplicationEvent from "../../models/ApplicationEvent.js";

export const getAnalyticsOverview = async (userId) => {
    const applications = await Application.find({ userId })
        .sort({ createdAt: -1 })
        .lean();

    const totalApplications = applications.length;

    const statusDistribution = {
        Applied: 0,
        Assessment: 0,
        Interview: 0,
        Offer: 0,
        Rejected: 0,
        Withdrawn: 0,
    };

    applications.forEach((application) => {
        if (statusDistribution[application.status] !== undefined) {
            statusDistribution[application.status]++;
        }
    });

    const inactiveStatuses = ["Rejected", "Withdrawn", "Offer"];

    const activeApplications = applications.filter(
        (application) => !inactiveStatuses.includes(application.status)
    ).length;

    const applicationsWithScore = applications.filter(
        (application) => typeof application.matchScore === "number"
    );

    const averageMatchScore =
        applicationsWithScore.length > 0
            ? Math.round(
                  applicationsWithScore.reduce(
                      (sum, application) => sum + application.matchScore,
                      0
                  ) / applicationsWithScore.length
              )
            : null;

    const now = new Date();

    const upcomingDeadlines = applications
        .filter(
            (application) =>
                application.deadline &&
                new Date(application.deadline) >= now
        )
        .sort(
            (a, b) =>
                new Date(a.deadline) - new Date(b.deadline)
        )
        .slice(0, 5)
        .map((application) => ({
            applicationId: application._id,
            company: application.company,
            role: application.role,
            deadline: application.deadline,
            status: application.status,
        }));

    const recentApplications = applications
        .slice(0, 5)
        .map((application) => ({
            applicationId: application._id,
            company: application.company,
            role: application.role,
            status: application.status,
            matchScore: application.matchScore,
            createdAt: application.createdAt,
        }));

    const applicationIds = applications.map(
        (application) => application._id
    );

    const skillGapAnalyses = await SkillGapAnalysis.find({
        applicationId: { $in: applicationIds },
    }).lean();

    const skillCounts = {};

    skillGapAnalyses.forEach((analysis) => {
        analysis.recommendations.forEach((recommendation) => {
            const skill = recommendation.skill?.trim();

            if (!skill) return;

            const key = skill.toLowerCase();

            if (!skillCounts[key]) {
                skillCounts[key] = {
                    skill,
                    count: 0,
                };
            }

            skillCounts[key].count++;
        });
    });

    const recurringSkillGaps = Object.values(skillCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);

    const applicationEvents = await ApplicationEvent.find({
        applicationId: { $in: applicationIds },
    }).lean();

    const interviewedApplicationIds = new Set();

    applicationEvents.forEach((event) => {
        if (
            event.newStatus === "Interview" ||
            event.newStatus === "Offer"
        ) {
            interviewedApplicationIds.add(
                event.applicationId.toString()
            );
        }
    });

    applications.forEach((application) => {
        if (
            application.status === "Interview" ||
            application.status === "Offer"
        ) {
            interviewedApplicationIds.add(
                application._id.toString()
            );
        }
    });

    const interviewConversion =
        totalApplications > 0
            ? Math.round(
                  (interviewedApplicationIds.size / totalApplications) * 100
              )
            : 0;

    const matchScoreDistribution = [
        { range: "0–20", count: 0 },
        { range: "21–40", count: 0 },
        { range: "41–60", count: 0 },
        { range: "61–80", count: 0 },
        { range: "81–100", count: 0 },
    ];

    applications.forEach((application) => {
        const score = application.matchScore;

        if (typeof score !== "number") return;

        if (score <= 20) {
            matchScoreDistribution[0].count++;
        } else if (score <= 40) {
            matchScoreDistribution[1].count++;
        } else if (score <= 60) {
            matchScoreDistribution[2].count++;
        } else if (score <= 80) {
            matchScoreDistribution[3].count++;
        } else {
            matchScoreDistribution[4].count++;
        }
    });

    return {
        kpis: {
            totalApplications,
            activeApplications,
            averageMatchScore,
            interviewConversion,
        },

        statusDistribution,

        matchScoreDistribution,

        upcomingDeadlines,

        recentApplications,

        recurringSkillGaps,
    };
};