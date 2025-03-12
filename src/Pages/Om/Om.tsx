import rocket from "../../assets/rocket.png";
import bulb from "../../assets/bulb.png";
import round from "../../assets/360.png";
const Om = ()=>{
    return (
        <>
            <div className="flex p-16">
                <div className="flex flex-col w-1/2">
                    <div className="flex items-center">
                        <div className="h-[21px] w-[116px] bg-[#E29C51] rounded-full"></div>
                        <p className="text-[#E29C51] font-lexend font-semibold text-3xl ml-3">Hvem er vi ? </p>
                    </div>
                    <p className="font-normal text-xl my-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                    </p>
                    <p className="font-normal text-xl my-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                    </p>
                </div>
                <div className="flex flex-col items-end w-1/2 p-10">
                    <div className="flex">
                        <img src={rocket} alt="rocket" />
                        <p className="font-normal text-base w-[388px] ml-4">
                            Lorem Ipsum is simply dummy
                            text of the printing and typesetting
                            industry. Lorem Ipsum has been
                            the industry's standard dummy
                            text ever since the 1500s,
                        </p>
                    </div>
                    <div className="flex my-20">
                        <img src={bulb} alt="rocket" />
                        <p className="font-normal text-base w-[388px] ml-4">
                            Lorem Ipsum is simply dummy
                            text of the printing and typesetting
                            industry. Lorem Ipsum has been
                            the industry's standard dummy
                            text ever since the 1500s,
                        </p>
                    </div>
                    <div className="flex">
                        <img src={round} alt="rocket" />
                        <p className="font-normal text-base w-[388px] ml-4">
                            Lorem Ipsum is simply dummy
                            text of the printing and typesetting
                            industry. Lorem Ipsum has been
                            the industry's standard dummy
                            text ever since the 1500s,
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Om;