import AppBar from "@/components/AppBar";
import AxiosInstance from "@/api/axiosInstance";
import {useEffect, useState} from "react";
export default function TestPage() {

    const [testData, setTestData] = useState<any>(null);

    useEffect(() => {
        const data = {
            username: "test",
            password: "test"
        }

        AxiosInstance.post('/api/v1/login',data).then((response) => {
            setTestData(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <AppBar/>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold text-white">Test</h1>
                {
                    // Pretty print the JSON data
                    testData &&
                    <pre className="text-white">
                        {JSON.stringify(testData, null, 2)}
                    </pre>
                }
            </div>
        </>
    )
}