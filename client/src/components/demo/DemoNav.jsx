import { Link } from "react-router-dom";

function DemoNav() {
    return (
        <header className="border-b border-[#DCDDD7] bg-[#F5F3EE]">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 md:px-10 lg:px-14">
                <Link to="/demo/dashboard">
                    <h1 className="text-xl font-bold tracking-[-0.04em]">
                        CareerLens
                    </h1>

                    <p className="text-xs text-[#9A9F97]">
                        Interactive Demo
                    </p>
                </Link>

                <div className="flex items-center gap-3">
                    <Link
                        to="/demo/dashboard"
                        className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[#667085] hover:bg-white hover:text-[#17243A] sm:block"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/demo/applications"
                        className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[#667085] hover:bg-white hover:text-[#17243A] sm:block"
                    >
                        Applications
                    </Link>

                    <Link
                        to="/"
                        className="rounded-full border border-[#DCDDD7] bg-white px-4 py-2 text-sm font-semibold text-[#667085] hover:border-[#8BAE42] hover:text-[#17243A]"
                    >
                        Exit Demo
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default DemoNav;