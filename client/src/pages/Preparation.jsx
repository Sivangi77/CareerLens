import { Link, useParams } from "react-router-dom";
import SkillGapRecommendations from "../components/preparation/SkillGapRecommendations.jsx";
import StudyPlan from "../components/preparation/StudyPlan.jsx";

const Preparation = () => {
  const { id } = useParams();

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
            Prepare for {`this role`}
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-[#667085]">
            Get personalized recommendations to help you prepare based on your
            resume and this job's requirements.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          <SkillGapRecommendations applicationId={id} />

          <StudyPlan applicationId={id} />
        </div>
      </main>
    </div>
  );
};

export default Preparation;
