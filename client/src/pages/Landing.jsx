import PageContainer from "../components/common/PageContainer";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

function Landing() {
    return (
        <PageContainer>
            <div className="flex min-h-[80vh] items-center justify-center">
                <Card className="max-w-xl text-center">
                    <h1 className="text-4xl font-bold">
                        CareerLens
                    </h1>

                    <p className="mt-4 text-gray-600">
                        AI Job Application Intelligence Platform
                    </p>

                    <div className="mt-6">
                        <Button>
                            Explore CareerLens
                        </Button>
                    </div>
                </Card>
            </div>
        </PageContainer>
    );
}

export default Landing;