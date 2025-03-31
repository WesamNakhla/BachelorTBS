import { useState } from "react";
import FormInput from "../../Components/FormInput/FormInput";
const Contact = ()=>{
    const [ input, setInput ] = useState<string>("");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInput(e.target.value);
    }
;    return (
        <>
            <div className="flex flex-col justify-center items-center bg-[#EFEBEB] py-16">
                <div className="flex items-center mb-5">
                    <div className="h-[21px] w-[116px] bg-[#E29C51] rounded-full"></div>
                    <p className="text-[#E29C51] font-lexend font-semibold text-3xl ml-3">Hvem er vi ? </p>
                </div> 
                <form className="bg-[#fff] w-[791px] p-5">
                    <FormInput 
                        type="text"
                        label="Navn"
                        placeholder="Navn"
                        onChange={handleInput}
                        value={input}
                    />
                    <FormInput 
                        type="text"
                        label="etternavn"
                        placeholder="etternavn"
                        onChange={handleInput}
                        value={input}
                    />
                    <FormInput 
                        type="text"
                        label="epost"
                        placeholder="epost"
                        onChange={handleInput}
                        value={input}
                    />
                    <FormInput 
                        type="text"
                        label="melding"
                        placeholder="melding"
                        onChange={handleInput}
                        value={input}
                    />
                    <button type="button" className="cursor-pointer bg-[#2C2C2C] text-[#fff] w-full h-[50px] rounded-full">Submit</button>
                </form>
            </div>
        </>
    );
}
export default Contact;