import { useAuth } from "../context/AuthContext";

function Profile() {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#F5F3EE] text-[#17243A]">
            <main className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-14">

                {/* Header */}
                <div className="flex flex-col justify-between gap-6 border-b border-[#DCDDD7] pb-8 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCE8B9] text-sm">
                                ✦
                            </span>

                            <span className="text-sm font-semibold text-[#667085]">
                                CareerLens Profile
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
                            Your career profile.
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-[#667085]">
                            This is the foundation CareerLens uses to
                            understand your experience, identify opportunities,
                            and personalize your preparation.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-[#667085]">
                        <span className="h-2 w-2 rounded-full bg-[#8BAE42]" />
                        Profile active
                    </div>
                </div>

                {/* Profile area */}
                <div className="mt-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">

                    {/* LEFT — Identity */}
                    <section className="rounded-[28px] bg-[#17243A] p-7 text-white sm:p-9">

                        <div className="flex h-20 w-20 items-center justify-center rounded-[22px] bg-[#B7D86A] text-3xl font-bold text-[#17243A]">
                            {user.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <h2 className="mt-7 text-2xl font-bold tracking-[-0.03em]">
                            {user.name}
                        </h2>

                        <p className="mt-2 break-all text-sm text-white/50">
                            {user.email}
                        </p>

                        <div className="mt-10 border-t border-white/10 pt-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">
                                Member
                            </p>

                            <p className="mt-2 text-sm text-white/70">
                                CareerLens user
                            </p>
                        </div>

                        <div className="mt-8 rounded-2xl bg-white/[0.06] p-5">
                            <p className="text-sm font-medium">
                                Your profile powers your intelligence layer.
                            </p>

                            <p className="mt-2 text-xs leading-5 text-white/40">
                                Resume analysis, job similarity and
                                personalized preparation will all build
                                from the information connected to your
                                account.
                            </p>
                        </div>
                    </section>

                    {/* RIGHT — Details */}
                    <section className="rounded-[28px] bg-white p-7 shadow-[0_16px_50px_rgba(23,36,58,0.06)] sm:p-9">

                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-semibold text-[#8BAE42]">
                                    Account details
                                </p>

                                <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em]">
                                    About you
                                </h2>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F2EA] text-[#8BAE42]">
                                ✓
                            </div>
                        </div>

                        <div className="mt-8 divide-y divide-[#ECEDE8]">

                            {/* Name */}
                            <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                        Full name
                                    </p>

                                    <p className="mt-1 text-base font-medium">
                                        {user.name}
                                    </p>
                                </div>

                                <span className="text-xs text-[#9A9F97]">
                                    Personal information
                                </span>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9F97]">
                                        Email address
                                    </p>

                                    <p className="mt-1 text-base font-medium break-all">
                                        {user.email}
                                    </p>
                                </div>

                                <span className="text-xs text-[#9A9F97]">
                                    Login identity
                                </span>
                            </div>

                        </div>

                        {/* Intelligence status */}
                        <div className="mt-8 rounded-2xl bg-[#F5F6F0] p-5">
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DCE8B9]">
                                    ✦
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold">
                                        Ready for personalization
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-[#667085]">
                                        Add your resume to let CareerLens
                                        start analyzing your skills and
                                        building a more complete picture
                                        of your career.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Career intelligence preview */}
                <section className="mt-8 rounded-[28px] border border-[#DCDDD7] bg-[#FAFAF7] p-7 sm:p-9">

                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-semibold text-[#8BAE42]">
                                What comes next
                            </p>

                            <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em]">
                                Build your career intelligence
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-6 text-[#667085]">
                            Your account is ready. The next step is giving
                            CareerLens the information it needs to understand
                            where you are and where you're going.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-3">

                        <div className="rounded-2xl bg-white p-5">
                            <span className="text-xs font-semibold text-[#8BAE42]">
                                01
                            </span>

                            <h3 className="mt-5 font-semibold">
                                Upload your resume
                            </h3>

                            <p className="mt-2 text-xs leading-5 text-[#667085]">
                                Let AI understand your experience,
                                skills and strengths.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-5">
                            <span className="text-xs font-semibold text-[#8BAE42]">
                                02
                            </span>

                            <h3 className="mt-5 font-semibold">
                                Explore job fit
                            </h3>

                            <p className="mt-2 text-xs leading-5 text-[#667085]">
                                Compare your profile against the roles
                                you're interested in.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-5">
                            <span className="text-xs font-semibold text-[#8BAE42]">
                                03
                            </span>

                            <h3 className="mt-5 font-semibold">
                                Get your prep plan
                            </h3>

                            <p className="mt-2 text-xs leading-5 text-[#667085]">
                                Focus your preparation on the gaps that
                                matter most for your target roles.
                            </p>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
}

export default Profile;