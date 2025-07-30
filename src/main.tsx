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
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
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
