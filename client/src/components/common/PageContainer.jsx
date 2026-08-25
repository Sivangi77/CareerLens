function PageContainer({ children }) {
    return (
        <main className="min-h-screen px-6 py-8">
            <div className="mx-auto w-full max-w-7xl">
                {children}
            </div>
        </main>
    );
}

export default PageContainer;