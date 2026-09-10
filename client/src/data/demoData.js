export const demoCandidate = {
    name: "Aarav Sharma",
    title: "Software Engineer",
    experience: "2 years",
    skills: [
        "JavaScript",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "SQL",
        "Git",
        "REST APIs",
    ],
};

export const demoApplications = [
    {
        id: "demo-1",
        company: "TechNova",
        role: "Software Engineer",
        status: "Interview",
        deadline: "2026-09-18",
        matchScore: 86,
        jobDescription:
            "We are looking for a Software Engineer with experience in React, Node.js, REST APIs, databases, and modern web development.",
        matchedSkills: [
            "JavaScript",
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "REST APIs",
        ],
        partialSkills: ["SQL"],
        missingSkills: ["Docker", "AWS"],
        skillGaps: [
            {
                skill: "Docker",
                priority: "high",
                gapType: "missing",
                reason: "The role expects experience with containerized applications.",
                recommendation:
                    "Learn Docker fundamentals and containerize a small Node.js application.",
            },
            {
                skill: "AWS",
                priority: "medium",
                gapType: "missing",
                reason: "Cloud deployment experience is preferred for the role.",
                recommendation:
                    "Study core AWS services and deploy a small backend application.",
            },
            {
                skill: "SQL",
                priority: "low",
                gapType: "partial",
                reason: "The resume shows database experience but limited SQL depth.",
                recommendation:
                    "Practice joins, aggregations, subqueries, and query optimization.",
            },
        ],
        interviewQuestions: [
            {
                question: "How would you design a REST API for a job application tracker?",
                category: "technical",
            },
            {
                question:
                    "Explain how you would optimize a slow MongoDB query.",
                category: "technical",
            },
            {
                question:
                    "Tell me about a challenging project you worked on and how you solved the problem.",
                category: "behavioral",
            },
            {
                question:
                    "How would you structure a scalable Node.js backend?",
                category: "role-specific",
            },
        ],
    },
    {
        id: "demo-2",
        company: "DataSphere",
        role: "Backend Engineer",
        status: "Assessment",
        deadline: "2026-09-24",
        matchScore: 72,
        jobDescription:
            "Seeking a Backend Engineer with strong Node.js, databases, API development, testing, and cloud fundamentals.",
        matchedSkills: [
            "Node.js",
            "Express",
            "MongoDB",
            "REST APIs",
            "Git",
        ],
        partialSkills: ["SQL"],
        missingSkills: ["AWS", "Testing"],
        skillGaps: [
            {
                skill: "AWS",
                priority: "high",
                gapType: "missing",
                reason: "Cloud experience is an important part of the role.",
                recommendation:
                    "Learn AWS fundamentals and basic deployment workflows.",
            },
            {
                skill: "Testing",
                priority: "medium",
                gapType: "missing",
                reason: "The position expects experience writing backend tests.",
                recommendation:
                    "Practice unit and integration testing with a Node.js API.",
            },
        ],
        interviewQuestions: [
            {
                question:
                    "What is middleware in Express and how would you use it?",
                category: "technical",
            },
            {
                question:
                    "How would you design authentication for a Node.js API?",
                category: "technical",
            },
            {
                question:
                    "Describe a time you had to debug a difficult backend issue.",
                category: "behavioral",
            },
        ],
    },
    {
        id: "demo-3",
        company: "FinEdge",
        role: "Full Stack Developer",
        status: "Applied",
        deadline: "2026-10-02",
        matchScore: 61,
        jobDescription:
            "Looking for a Full Stack Developer with React, backend development, SQL, cloud deployment, and testing experience.",
        matchedSkills: ["React", "JavaScript", "Node.js", "Express"],
        partialSkills: ["SQL", "MongoDB"],
        missingSkills: ["AWS", "Testing", "TypeScript"],
        skillGaps: [
            {
                skill: "TypeScript",
                priority: "high",
                gapType: "missing",
                reason: "The role uses TypeScript across the frontend and backend.",
                recommendation:
                    "Convert a small React project from JavaScript to TypeScript.",
            },
            {
                skill: "Testing",
                priority: "medium",
                gapType: "missing",
                reason: "Testing experience is expected for production applications.",
                recommendation:
                    "Practice frontend and backend testing on an existing project.",
            },
        ],
        interviewQuestions: [
            {
                question:
                    "What are the advantages of using TypeScript in a React application?",
                category: "technical",
            },
            {
                question:
                    "How would you structure a full-stack application?",
                category: "role-specific",
            },
        ],
    },
];

export const demoAnalytics = {
    kpis: {
        totalApplications: 3,
        activeApplications: 3,
        averageMatchScore: 73,
        interviewConversion: 33,
    },
    statusDistribution: {
        Applied: 1,
        Assessment: 1,
        Interview: 1,
        Offer: 0,
        Rejected: 0,
        Withdrawn: 0,
    },
    matchScoreDistribution: [
        { range: "0–20", count: 0 },
        { range: "21–40", count: 0 },
        { range: "41–60", count: 0 },
        { range: "61–80", count: 2 },
        { range: "81–100", count: 1 },
    ],
    upcomingDeadlines: [
        {
            applicationId: "demo-1",
            company: "TechNova",
            role: "Software Engineer",
            deadline: "2026-09-18",
            status: "Interview",
        },
        {
            applicationId: "demo-2",
            company: "DataSphere",
            role: "Backend Engineer",
            deadline: "2026-09-24",
            status: "Assessment",
        },
        {
            applicationId: "demo-3",
            company: "FinEdge",
            role: "Full Stack Developer",
            deadline: "2026-10-02",
            status: "Applied",
        },
    ],
    recentApplications: [
        {
            applicationId: "demo-1",
            company: "TechNova",
            role: "Software Engineer",
            status: "Interview",
            matchScore: 86,
            createdAt: "2026-09-10",
        },
        {
            applicationId: "demo-2",
            company: "DataSphere",
            role: "Backend Engineer",
            status: "Assessment",
            matchScore: 72,
            createdAt: "2026-09-08",
        },
        {
            applicationId: "demo-3",
            company: "FinEdge",
            role: "Full Stack Developer",
            status: "Applied",
            matchScore: 61,
            createdAt: "2026-09-06",
        },
    ],
    recurringSkillGaps: [
        { skill: "AWS", count: 2 },
        { skill: "Testing", count: 2 },
        { skill: "SQL", count: 1 },
        { skill: "Docker", count: 1 },
        { skill: "TypeScript", count: 1 },
    ],
};