import './Header2.css'
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Search2 from '../Search2/Search2';

type PagesName = { name: string }

function Header2({ name }: PagesName) {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return(
        <div className={`Header2 ${scrolled ? 'scrolled' : ''}`}>
            <div className="Header2Icon">
                <IoIosArrowBack className='ArrowBack' onClick={() => navigate(-1)} />
            </div>
            <div className="SpanContainer">
                <span>{name}</span>
            </div>
            <div className='SearchBar'>
                <Search2 />
            </div>
        </div>
    )
}

export default Header2