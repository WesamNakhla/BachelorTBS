import banner from "../../assets/image.png"
const Home = ()=>{
    return (
        <div className="flex items-center justify-center bg-[#132C66] h-[100vh] px-10 py-5">
            <div style={{
                backgroundImage: `url(${banner})`
            }} className="flex items-center justify-center  bg-cover bg-center min-h-full w-[100%]">
                <p className="font-lexend font-bold text-6xl text-[#fff]">TRANSPORT AV SJØMAT SIDEN 2001</p>
            </div>
        </div>
    );
}
export default Home;