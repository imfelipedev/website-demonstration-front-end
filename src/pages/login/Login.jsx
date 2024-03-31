import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";

import useUser from "../../interface/hooks/useUser";

export default function Login() {
    const emailRef = useRef("");

    const passwordRef = useRef("");

    const [loading, setLoading] = useState(null);

    const navigate = useNavigate();

    const { user, isLoading, login } = useUser();

    useEffect(() => {
        if (user && !isLoading) {
            navigate("/");
        }
    }, [user, isLoading]);

    async function handleSubmit(event) {
        event.preventDefault();

        if (loading) {
            return false;
        }

        setLoading(true);

        try {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const request = await fetch("https://website-demonstration-back-end.vercel.app/api/v1/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const result = await request.json();
            if (request.status === 201) {
                login();
                setLoading(false);
                return toast.success("You have successfully logged into your account.");
            }

            setLoading(false);
            toast.error(result.message, { duration: 5000 });
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("This action was unable to be performed, please try again or contact an administrator.");
        }
    }

    return (
        <section className="flex items-center justify-center grow">
            <div className="px-[3.5rem] max-w-[48.0rem] w-full h-full flex flex-col items-center justify-center lg:min-w-[48.0rem]">
                <img src="/svg/logo.svg" alt="Ilustração icone da empresa" />

                <p className="mt-[3.0rem] text-[2.0rem] text-black font-semibold">Login into your account</p>

                <form onSubmit={handleSubmit} className="mt-[4.5rem] min-w-full">
                    <div>
                        <label htmlFor="email" className="text-[1.6rem] text-[#555555] font-medium">
                            Email Address
                        </label>

                        <div className="mt-[1.0rem] flex rounded-l-2xl bg-[#F1F3F6]">
                            <input
                                required={true}
                                ref={emailRef}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="example@email.com"
                                autoComplete="email"
                                className="pl-[2.0rem] w-full h-[5.0rem] rounded-l-2xl bg-transparent text-[1.5rem] text-[#555555] focus:outline-none"
                            />

                            <div className="min-w-[5.0rem] h-[5.0rem] rounded-2xl bg-[#8930FA] text-white flex items-center justify-center">
                                <MdOutlineMailOutline size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-[2.0rem]">
                        <label htmlFor="password" className="text-[1.6rem] text-[#555555] font-medium">
                            Password
                        </label>

                        <div className="mt-[1.0rem] flex rounded-l-2xl bg-[#F1F3F6]">
                            <input
                                required={true}
                                ref={passwordRef}
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="pl-[2.0rem] w-full h-[5.0rem] rounded-l-2xl bg-transparent text-[1.5rem] text-[#555555] focus:outline-none"
                            />

                            <div className="min-w-[5.0rem] h-[5.0rem] rounded-2xl bg-[#8930FA] text-white flex items-center justify-center">
                                <RiLockPasswordLine size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-[1.0rem] min-w-full flex justify-end">
                        <Link to="/recover" className="text-[#1E2772] text-[1.4rem] hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="mt-[5.0rem] w-full h-[5.0rem] rounded-xl border-[0.2rem] border-[#8930FA] bg-[#8930FA] text-[#f1f1f1] text-[1.6rem] font-semibold hover:bg-transparent hover:text-[#8930FA] transition-all duration-500 group"
                    >
                        {loading && (
                            <div className="w-full h-full flex items-center justify-center gap-3">
                                <div className="relative animate-spin w-[23px] h-[23px] border-4 border-l-white/75 border-white/25 rounded-full bg-transparent group-hover:border-l-[#8930FA]/75 group-hover:border-[#8930FA]/25 transition-colors duration-500" />
                            </div>
                        )}

                        {!loading && <p>Login Now</p>}
                    </button>
                </form>

                <div className="mt-[3.0rem] min-w-full flex items-center justify-center gap-[2.0rem]">
                    <hr className="w-full h-[0.1rem] border-0 bg-[#C2C2C2]" />

                    <p className="text-[1.4rem] text-[#C2C2C2]">OR</p>

                    <hr className="w-full h-[0.1rem] border-0 bg-[#C2C2C2]" />
                </div>

                <Link
                    to="/register"
                    className="mt-[3.0rem] min-w-full h-[5.0rem] flex items-center justify-center rounded-xl border-[0.2rem] border-[#8930FA] text-[#8930FA] text-[1.6rem] font-semibold hover:bg-[#8930FA] hover:text-[#f1f1f1] transition-all duration-500"
                >
                    Signup Now
                </Link>
            </div>

            <div className="w-full h-full hidden flex-col items-center justify-center bg-[#EEEEEE] lg:flex">
                <p className="text-[3.2rem] text-black font-semibold">You should, MoveIt!</p>

                <img src="/svg/delivery.svg" alt="Ilustração icone personagem andando de skate" />
            </div>
        </section>
    );
}
