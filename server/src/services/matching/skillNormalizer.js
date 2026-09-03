const SKILL_TAXONOMY = {
    "node.js": ["node", "nodejs", "node.js", "node js"],
    "react": ["react", "reactjs", "react.js", "react js"],
    "c++": ["cpp", "c++", "c plus plus"],
    "c#": ["csharp", "c#", "c sharp"],
    "c": ["c language", "c lang"],
    "postgresql": ["postgres", "postgresql", "psql"],
    "mongodb": ["mongo", "mongodb", "mongo db"],
    "kubernetes": ["k8s", "kubernetes"],
    "amazon web services": ["aws", "amazon web services"],
    "ci/cd": ["ci/cd", "ci cd", "continuous integration"],
    ".net": [".net", "dotnet", "dot net"],
};

const ALIAS_LOOKUP = new Map();

for (const [canonical, aliases] of Object.entries(SKILL_TAXONOMY)) {
    for (const alias of aliases) {
        const cleanKey = alias
            .toLowerCase()
            .trim()
            .replace(/\s+/g, " ");

        ALIAS_LOOKUP.set(cleanKey, canonical);
    }
}

const cleanInput = (str) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[_,–—]/g, " ")
        .replace(/\s+/g, " ");
};

export const normalizeSkill = (rawSkill) => {
    if (typeof rawSkill !== "string") {
        return null;
    }

    const cleaned = cleanInput(rawSkill);

    if (!cleaned) {
        return null;
    }

    if (ALIAS_LOOKUP.has(cleaned)) {
        return ALIAS_LOOKUP.get(cleaned);
    }

    const stripped = cleaned
        .replace(/^[-.]+|[-.]+$/g, "")
        .trim();

    if (ALIAS_LOOKUP.has(stripped)) {
        return ALIAS_LOOKUP.get(stripped);
    }

    return stripped;
};

export const normalizeSkills = (skills = []) => {
    if (!Array.isArray(skills)) {
        return [];
    }

    return [
        ...new Set(
            skills
                .map(normalizeSkill)
                .filter(
                    (skill) => Boolean(skill) && skill.length > 0
                )
        ),
    ];
};