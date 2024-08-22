import Main from "@/components/Main";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";

export const metadata = {
    title: "Moodly ⋅ Dashboard",
};

export  default function DashboardPage() {

    const isAuthenticated = true;

    let children = (
        <Login />
    )

    if (isAuthenticated) {
        children = (
        <Dashboard />
    )
    }

    return (
        <Main>
            {children}
        </Main>
    )
}