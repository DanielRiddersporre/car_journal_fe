import { useState } from 'react';
import menu from '../assets/menu.png'
import cross from '../assets/cross.png'
import profile from '../assets/profile.png'
import { Link } from "react-router-dom";

function TopBar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            <div className="flex flex-row py-4 w-full bg-[#0a0914] justify-between min-h-15">
                <img src={isMenuOpen ? cross : menu} className={'w-12 h-10 focus:outline' + (isMenuOpen ? 'border-2' : 'border-0')} onClick={toggleMenu} />
                <span className='font-bold text-3xl dark:text-sky-800 '>biljou</span>
                <img src={profile} className='w-12 h-10' />
            </div>

            {isMenuOpen && (
                <div>
                    <div className=" border-2 border-blue-500 bg-[#0f0d1e] rounded-xl">
                        <ul>
                            <li className="py-2 mx-2"><span className="text-xl font-bold"><Link to="/" onClick={toggleMenu}>Översikt</Link></span></li>
                            <li className="py-2 mx-2"><span className="text-xl font-bold"><Link to="dataEntry" onClick={toggleMenu}>Lägg till</Link></span></li>
                            <li className="py-2 mx-2"><span className="text-xl font-bold"><Link to="dataPresentation" onClick={toggleMenu}>Visa</Link></span></li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

export default TopBar
