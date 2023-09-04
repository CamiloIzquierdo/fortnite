"use client";
import GetStats from "@/components/getStats";
import { Spinner } from "@/components/Spinner";

import { getStatsByName } from "@/services/calls";
import Head from "next/head";
import { FormEvent, useRef, useState } from "react";

function App() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [finalSubmit, setFinalsubmit] = useState(true);
    const [wins, setWins] = useState({
        firstUser: undefined,
        secondUser: undefined,
    });
    const firstUser = useRef(null);
    const secondUser = useRef(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitted(true);
        const formData = new FormData(event.currentTarget);
        const data: any = Object.fromEntries(formData);
        const firstFetch = await getStatsByName({
            user: data.firstUser,
        });
        if (firstFetch.data.account_id) {
            firstUser.current = firstFetch.data.account_id;
        }
        const secondFetch = await getStatsByName({
            user: data.secondUser,
        });
        if (secondFetch.data.account_id && firstFetch.data) {
            secondUser.current = secondFetch.data.account_id;
        }
        if (firstFetch.data && secondFetch.data) {
            setTimeout(() => {
                setFormSubmitted(false);
            }, 500),
                setFinalsubmit(false);
        }
    };

    const reset = () => {
        setFinalsubmit(true);
        firstUser.current = null;
        secondUser.current = null;
    };

    return (
        <div className="flex h-full justify-center flex-col items-center gap-7 ">
            {finalSubmit && (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-fit items-center justify-center gap-3 pt-36 "
                >
                    <div className="flex flex-col lg:flex-row gap-3">
                        <div
                            className="w-[350px] md:w-[350px] xl:w-[650px] h-[330px] md:h-[600px] border rounded-lg bg-slate-400 flex items-center justify-center bg-center bg-cover"
                            style={{ backgroundImage: "url(input.jpg)" }}
                        >
                            <label
                                htmlFor="firstUser"
                                className="flex flex-col md:text-4xl text-2xl w-fit gap-4 justify-center items-center"
                            >
                                <span className="font-semibold text-center text-4xl bg-gradient-to-r from-violet-700 to-black bg-black text-gray-300 py-2 opacity-90 w-fit px-6 ">
                                    Primer usuario
                                </span>
                                <input
                                    type="text"
                                    name="firstUser"
                                    className="text-black outline-none py-1 px-2 border-b-2 border-blue-500 focus:border-blue-300 transition-all"
                                />
                            </label>
                        </div>
                        <div className="items-center justify-center flex">
                            <span className="text-9xl">vs</span>
                        </div>
                        <div
                            className="w-[350px] md:w-[350px] xl:w-[650px] h-[330px] md:h-[600px] border rounded-lg bg-slate-400 flex items-center justify-center bg-center bg-cover"
                            style={{ backgroundImage: "url(input.jpg)" }}
                        >
                            <label
                                htmlFor="secondUser"
                                className="flex flex-col md:text-4xl text-2xl gap-4 justify-center items-center"
                            >
                                <span className="font-semibold text-center text-4xl bg-gradient-to-r from-violet-700 to-black bg-black text-gray-300 py-2 opacity-90 w-fit px-6 ">
                                    Segundo usuario
                                </span>
                                <input
                                    type="text"
                                    name="secondUser"
                                    className="text-black outline-none py-1 px-2 border-b-2 border-blue-500 focus:border-blue-300 transition-all"
                                    required
                                />
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 rounded-lg py-4 px-6 text- text-white hover:bg-blue-800 hover:scale-105 transition-all"
                    >
                        Obtener valor
                    </button>
                </form>
            )}

            {finalSubmit == false ? (
                <div className="flex h-full w-full xl:h-screen justify-center items-center gap-5 flex-col">
                    <GetStats
                        id1={firstUser.current}
                        isLoading={formSubmitted}
                        id2={secondUser.current}
                        reset={reset}
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default App;
