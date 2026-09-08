import { NavLink, Outlet } from "react-router-dom";

const navigation = [
    { name: "Dashboard", path: "/dashboard", icon: "⌂" },
    { name: "Applications", path: "/applications", icon: "▣" },
    { name: "Resume", path: "/resume", icon: "▤" },
    { name: "Analytics", path: "/analytics", icon: "◔" },
];

function MainLayout() {
    return (
        <div className="min-h-screen bg-[#F5F3EE] text-[#17243A] md:flex">
            <aside className="w-full border-b border-[#DCDDD7] bg-[#F5F3EE] md:min-h-screen md:w-64 md:border-b-0 md:border-r">
                <div className="flex items-center justify-between px-6 py-5 md:block md:px-6 md:py-8">
                    <div>
                        <h1 className="text-xl font-bold tracking-[-0.04em]">
                            CareerLens
                        </h1>
                        <p className="mt-1 text-xs text-[#9A9F97]">
                            Career intelligence
                        </p>
                    </div>
                </div>

                <nav className="flex gap-2 overflow-x-auto px-4 pb-4 md:block md:px-4">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                                    isActive
                                        ? "bg-[#17243A] text-white"
                                        : "text-[#667085] hover:bg-white hover:text-[#17243A]"
                                }`
                            }
                        >
                            <span>{item.icon}</span>
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            <main className="min-w-0 flex-1">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;