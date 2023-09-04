import "./styles.css";

export const Spinner = () => {
    return (
        <div className="flex gap-16 ">
            <div className="flex bg-black bg-opacity-70 rounded-lg animate-pulse transition-all">
                <div className="grid grid-cols-2 grid-rows-3 gap-4 rounded-lg p-4 w-[200px] md:w-[350px] xl:w-[650px] h-[600px] bg-center">
                    <div className="col-span-2 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-xl">
                        <span className="text-2xl font-bold"></span>
                    </div>
                    <div className="row-start-2 flex flex-col items-center justify-center bg-black bg-opacity-30 rounded-xl">
                        <span></span>
                        <span></span>
                    </div>
                    <div className="row-start-2 flex flex-col items-center justify-center bg-black bg-opacity-30 rounded-xl">
                        <span></span>
                        <span></span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-black bg-opacity-30 rounded-xl">
                        <span></span>
                        <span></span>
                    </div>
                    <div className="row-start-3 flex flex-col items-center justify-center bg-black bg-opacity-30 rounded-xl">
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            <div className="flex bg-opacity-70 bg-black rounded-lg animate-pulse transition-all">
                <div className="grid grid-cols-2 grid-rows-3 gap-4   p-4 w-[200px] md:w-[350px] xl:w-[650px] h-[600px] bg-center">
                    <div className="col-span-2 flex flex-col items-center justify-center bg-black bg-opacity-30 rounded-xl">
                        <span className="text-2xl font-bold"></span>
                    </div>
                    <div className="row-start-2 flex flex-col items-center justify-center bg-black bg-opacity-30 rounded-xl">
                        <span></span>
                        <span></span>
                    </div>
                    <div className="row-start-2 flex flex-col items-center justify-center bg-black bg-opacity-30 rounded-xl">
                        <span></span>
                        <span></span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-black bg-opacity-30 rounded-xl">
                        <span></span>
                        <span></span>
                    </div>
                    <div className="row-start-3 flex flex-col items-center justify-center bg-black bg-opacity-30 rounded-xl">
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
