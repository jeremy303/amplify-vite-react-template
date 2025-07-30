import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';
import { signInWithRedirect, getCurrentUser, signOut } from "@aws-amplify/auth";

Amplify.configure(outputs);

function Root() {
    const [user, setUser] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            console.log("Getting current user...");
            try {
                const currentUser = await getCurrentUser();
                console.log('current user', currentUser);
                setUser(currentUser);
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (!user) {
        return (
            <button onClick={() => signInWithRedirect({provider: {custom: 'GeorgiaTech'}})}>Sign in</button>
        );
    }

    return (
        <>
            <App />
            <button onClick={() => signOut()}>Sign out</button>
        </>
    );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);
