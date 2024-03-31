import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUser from "../../interface/hooks/useUser";

export default function Home() {
    const navigate = useNavigate();
    const { user, isLoading } = useUser();

    useEffect(() => {
        if (!user && !isLoading) {
            navigate("/login");
        }
    }, [user, isLoading]);

    return (
        <section className="max-w-[100vw] w-full h-full flex flex-col items-center justify-center grow">
            <p className="text-[3.2rem] text-black font-semibold">Hello, {user?.username}. Are you logged!</p>

            <img src="/svg/delivery.svg" alt="Ilustração icone personagem andando de skate" />

            <button className="px-[20.0rem] h-[5.5rem] rounded-xl border-[0.2rem] border-[#8930FA] bg-[#8930FA] text-[#f1f1f1] text-[2.0rem] font-medium hover:bg-transparent hover:text-[#8930FA] transtion-all duration-500">Logout</button>
        </section>
    );
}
