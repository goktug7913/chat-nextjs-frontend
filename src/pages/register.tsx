import {UserContext} from "@/context/userContext";
import {useContext, useState} from "react";
import axiosInstance from "@/api/axiosInstance";
import AppBar from "@/components/AppBar";

export default function Register() {
    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nickname, setNickname] = useState("");
    const [tos, setTos] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setError("Passwords do not match");
            return;
        } else if (!tos) {
            setError("You must accept the terms of service");
            return;
        } else if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        } else if (nickname.length < 3) {
            setError("Nickname must be at least 3 characters");
            return;
        } else if (nickname.length > 20) {
            setError("Nickname must be at most 20 characters");
            return;
        }

        setLoading(true);

        try {
            const response = await axiosInstance.post("/auth/register", {
                email,
                password,
                passwordConfirm,
                nickname,
            });
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            setLoading(false);
        } catch (err: any) {
            setError(err.response.data.message);
            setLoading(false);
        }
    }

    return (
        <>
        <AppBar />
        <div className={"flex flex-col items-center justify-center"}>
            <div className={"flex flex-col items-center justify-center bg-white rounded-md shadow-md p-4"}>
                <h1 className={"text-2xl font-bold"}>Chatter Register</h1>
                <form className={"flex flex-col w-full justify-center"} onSubmit={handleSubmit}>
                    <input className={"border-2 border-gray-300 rounded-md p-2 my-2"} type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    <input className={"border-2 border-gray-300 rounded-md p-2 my-2"} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <input className={"border-2 border-gray-300 rounded-md p-2 my-2"} type="password" placeholder="Confirm Password" onChange={e => setPasswordConfirm(e.target.value)}/>
                    <input className={"border-2 border-gray-300 rounded-md p-2 my-2"} type="text" placeholder="Nickname(Can be changed later)" onChange={e => setNickname(e.target.value)}/>

                    <div className="flex flex-row items-left">
                        <input className={"border-2 border-gray-300 rounded-md p-2 my-2"} type="checkbox" onChange={e => setTos(prevState => !prevState)}/>
                        <p className={"text-sm my-2 ml-2"}>I agree to the <a href="#" className={"text-blue-500"}>Terms of Service</a> and <a href="#" className={"text-blue-500"}>Privacy Policy</a></p>
                    </div>

                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2" role="alert">
                        <p className="font-bold">{error}</p>
                    </div>}

                    <button className={"bg-purple-600 text-white rounded-md p-2 my-2"}>
                        {loading ? "Loading..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}