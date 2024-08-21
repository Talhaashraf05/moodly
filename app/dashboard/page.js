import Main from "@/components/Main";
import Login from "@/components/Login";

export const metadata = {
    title: "Moodly ⋅ Dashboard",
};

export  default function DashboardPage() {

    const isAuthenticated = false;

    let children = (
        <Login />
    )

    if (isAuthenticated) {
        children = (
            <div>Dashboard</div>
        )
    }

    return (
        <Main>
            {children}
        </Main>
    )
}