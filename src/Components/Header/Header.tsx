import { Link, NavLink, NavLinkRenderProps } from "react-router-dom";

const Header = ()=>{
    return(
        <>
            <div className="flex justify-between items-center px-10 py-5 bg-[#132C66] text-[#fff] font-lexend">
                <h1>TBS</h1>
                <div>
                    <NavLink to="/" className={({isActive}: NavLinkRenderProps)=> isActive ? "text-[#76C2D1] underline decoration-[#76C2D1] mb-3" : undefined } >HJEMME</NavLink>
                    <NavLink to="/om" className={({isActive}: NavLinkRenderProps)=> isActive ? "text-[#76C2D1] underline decoration-[#76C2D1] mb-3 mx-4" : "mx-4" }>OM OSS</NavLink>
                    <NavLink to="/contact" className={({isActive}: NavLinkRenderProps)=> isActive ? "text-[#76C2D1] underline decoration-[#76C2D1] mb-3" : undefined }>KONTAKT</NavLink>
                </div>
                <div>
                    <Link to="/login">LOGG INN</Link>
                </div>
            </div>
        </>
    );
}
export default Header;