"use client";
import { getStats1 } from "@/services/calls";
import React, { useEffect, useMemo, useState } from "react";
import { Spinner } from "./Spinner";

interface Info {
    name: string;
    result: boolean;
    global_stats: {
        solo: {
            placetop1: number;
        };
        duo: {
            placetop1: number;
        };
        trio: {
            placetop1: number;
        };
        squad: {
            placetop1: number;
        };
    };
}

interface Props {
    id1: string | null;
    isLoading: boolean;
    id2: string | null;
    reset: () => void;
}

interface CheckColor {
    value: number;
    index: number;
    mode: "solo" | "duo" | "trio" | "squad";
}

const backgrounds = [
    "/fondo1.jpg",
    "/fondo2.avif",
    "/fondo3.avif",
    "/fondo4.webp",
];

const GetStats: React.FC<Props> = ({ id1, isLoading, id2, reset }) => {
    const [stats, setStats] = useState<Info[] | undefined>(undefined);
    const [infoLoading, setInfoLoading] = useState(false);

    const checkColor = ({ value, index, mode }: CheckColor) => {
        const checkIndex = index === 0 ? 1 : 0;
        const statsFormat = stats && stats[checkIndex].global_stats;
        const statsObject = {
            solo: statsFormat ? statsFormat.solo.placetop1 : 0,
            duo: statsFormat ? statsFormat.duo.placetop1 : 0,
            trio: statsFormat ? statsFormat.trio.placetop1 : 0,
            squad: statsFormat ? statsFormat.squad.placetop1 : 0,
        };
        let color = "white";
        if (stats && value - statsObject[mode] > 0) {
            color = "green";
        } else if (value - statsObject[mode] === 0) {
            color = "yellow";
        } else {
            color = "red";
        }
        return color;
    };

    const randomNumberInRange = () => {
        return Math.floor(Math.random() * (backgrounds.length - 1 - 0 + 1)) + 0;
    };
    useEffect(() => {
        if (!id1 || !id2) return;
        setInfoLoading(true);
        const fetchData = async () => {
            const result1 = await getStats1({
                id: id1,
            });
            const result2 = await getStats1({
                id: id2,
            });
            setStats([result1.data, result2.data]);
            setInfoLoading(false);
        };
        fetchData();
    }, [id1, id2]);

    if (isLoading || infoLoading) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="w-full flex h-full justify-center items-center flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-[2.5fr,2.5fr] gap-6 text-white justify-center items-center">
                {stats?.map((stat, index) =>
                    stat?.result &&
                    Object.entries(stat.global_stats).length > 0 ? (
                        <div
                            className="grid grid-cols-2 grid-rows-3 gap-4 border-2 rounded-lg border-blue-600 p-4 w-[350px] md:w-[350px] xl:w-[650px] h-[600px] bg-center bg-cover"
                            key={index}
                            style={{
                                backgroundImage: `url(${
                                    backgrounds[randomNumberInRange()]
                                })`,
                            }}
                        >
                            <div className="col-span-2 flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-xl">
                                <span className="text-2xl font-bold">
                                    {stat.name}
                                </span>
                            </div>
                            <div className="row-start-2 flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-xl">
                                <span className="text-xl font-bold">
                                    Wins solo
                                </span>
                                <span
                                    className="text-xl"
                                    style={{
                                        color: checkColor({
                                            value: stat.global_stats.solo
                                                .placetop1,
                                            index: index,
                                            mode: "solo",
                                        }),
                                    }}
                                >
                                    {stat.global_stats.solo.placetop1}
                                </span>
                            </div>
                            <div className="row-start-2 flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-xl">
                                <span className="text-xl font-bold">
                                    Wins duo
                                </span>
                                <span
                                    className="text-xl"
                                    style={{
                                        color: checkColor({
                                            value: stat.global_stats.duo
                                                .placetop1,
                                            index: index,
                                            mode: "duo",
                                        }),
                                    }}
                                >
                                    {stat.global_stats.duo.placetop1}
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-xl">
                                <span className="text-xl font-bold">
                                    Wins trio
                                </span>
                                <span
                                    className="text-xl"
                                    style={{
                                        color: checkColor({
                                            value: stat.global_stats.trio
                                                .placetop1,
                                            index: index,
                                            mode: "trio",
                                        }),
                                    }}
                                >
                                    {stat.global_stats.trio.placetop1}
                                </span>
                            </div>
                            <div className="row-start-3 flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-xl">
                                <span className="text-xl font-bold">
                                    Wins squad
                                </span>
                                <span
                                    className="text-xl"
                                    style={{
                                        color: checkColor({
                                            value: stat.global_stats.squad
                                                .placetop1,
                                            index: index,
                                            mode: "squad",
                                        }),
                                    }}
                                >
                                    {" "}
                                    {stat.global_stats.squad.placetop1}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full border-2 border-blue-600 justify-center items-center flex text-xl text-wrap p-4 rounded-lg">
                            Tu usuario es incorrecto o no tiene estadisticas.
                        </div>
                    )
                )}
            </div>
            <div className="flex items-center justify-center">
                <button
                    className="bg-white text-black w-fit  py-3 px-5 rounded-full text-xl font-semibold"
                    onClick={reset}
                >
                    Reiniciar
                </button>
            </div>
            ;
        </div>
    );
};

export default GetStats;
