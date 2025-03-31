const Modal = ({children}: any)=>{
    return(
        <>
            <div className="flex items-center justify-center w-full min-h-screen bg-[#A2A1A8]/20 backdrop-blur-xs fixed inset-0">
                <div className="bg-[#fff] w-[878px] max-h-screen rounded-md p-5 overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    );
}
export default Modal;