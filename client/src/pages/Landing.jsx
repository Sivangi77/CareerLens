import { useEffect, useState } from "react";
import { getHealth } from "../services/api/healthApi";

function Landing() {
    const [message, setMessage] = useState("Checking backend...");

    useEffect(() => {
        const checkBackend = async () => {
            try {
                const data = await getHealth();

                setMessage(data.message);
            } catch (error) {
                console.error("Backend connection failed:", error);

                setMessage("Backend connection failed");
            }
        };

        checkBackend();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">
                    CareerLens
                </h1>

                <p className="mt-4 text-gray-600">
                    {message}
                </p>
            </div>
        </div>
    );
}

export default Landing;