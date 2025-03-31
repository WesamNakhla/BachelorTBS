import { useState } from "react";
import FormInput from "../../Components/FormInput/FormInput"; 
import FormSelect from "../../Components/FormSelect/FormSelect";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
const Register  = ()=>{
    const [ input, setInput ] = useState<string>("");
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInput(e.target.value);
    }
    return (
        <>
            <div className="flex w-[100%] h-auto">
                <div className="flex justify-center w-[20%] bg-[#112147]">
                    <h1 className="text-[#fff] font-bold">TBS</h1>
                </div>
                <div className="w-[75%] p-10">
                    <div className="font-lexend font-bold text-xl">
                        <h3>KOM IGANG</h3>
                    </div>
                    <div className="flex flex-col justify-center items-center p-5">
                        <form className="w-full">
                            <div className="flex justify-start my-5 font-sans font-semibold text-lg">Opprett bruker</div>
                            <div className="flex justify-evenly">
                                <FormInput 
                                    type="text"
                                    label="Fornavn"
                                    placeholder="Fornavn"
                                    onChange={handleInput}
                                    value={input}
                                />
                                 <FormInput 
                                    type="text"
                                    label="Etternavn"
                                    placeholder="Etternavn"
                                    onChange={handleInput}
                                    value={input}
                                />
                            </div>
                            <div className="flex justify-evenly">
                                <FormInput 
                                    type="email"
                                    label="Email eller telefonnummer"
                                    placeholder="Email eller telefonnummer"
                                    onChange={handleInput}
                                    value={input}
                                />
                                 <FormInput 
                                    type="date"
                                    label="Fødelsdato dd/mm/åååå"
                                    placeholder=""
                                    onChange={handleInput}
                                    value={input}
                                />
                            </div>
                            <div className="flex justify-evenly">
                                <FormInput 
                                    type="password"
                                    label="Passord"
                                    placeholder=""
                                    onChange={handleInput}
                                    value={input}
                                />
                                 <FormInput 
                                    type="password"
                                    label="Bekreft Passord"
                                    placeholder=""
                                    onChange={handleInput}
                                    value={input}
                                />
                            </div>
                            <div className="flex flex-col">
                                <FormSelect label="Hbgusk meg." />
                                <FormSelect label="Jeg godtar alle vilkår og personvern regler ." />
                            </div>
                            <div className="flex items-center justify-between mt-10 w-full">
                                <button type="submit" className="cursor-pointer text-[#fff] bg-[#66B2FF] w-[300px] h-[50px] rounded-md">
                                    Opprett bruker 
                                </button>
                                <button type="button" className="flex items-center justify-center text-[#fff] cursor-pointer bg-[#212020] w-[300px] h-[50px] rounded-md">
                                    <p className="mr-1"><FcGoogle /></p>Logg inn med google  
                                </button>
                            </div>
                            
                        </form>
                        <div className="mt-16">Har allerede en bruker? <Link to="/login" className="text-[#66B2FF]">Logg inn</Link></div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Register;