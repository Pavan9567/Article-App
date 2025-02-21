import { useRouter } from "next/router";

export default function AuthPage() {
    const router = useRouter();

    return (
        <div>
            <h1>Signup or Login</h1>
            <button onClick={() => router.push("/signup")}>Signup</button>
            <button onClick={() => router.push("/login")}>Login</button>
        </div>
    )
}