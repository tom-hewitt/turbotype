import logo from './logo.svg';
import profile_icon from './profile_icon.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const [showCollapsedMenu, setShowCollapsedMenu] = useState(false);

    const toggleCollapsedMenu = () => setShowCollapsedMenu(!showCollapsedMenu);

    return (
        <>
            <nav className="navbar">
                <Link to="/">
                    <img src={logo} id="logo" alt="logo" />
                </Link>
                <div className="links">
                    <Links />
                </div>
                <CollapsedMenuButton onClick={toggleCollapsedMenu} />
            </nav>
            {showCollapsedMenu ? 
                <CollapsedMenu />
            : null}
        </>
    );
}

const Links = () => {
    return (
        <>
            <Link to="/play">PLAY</Link>
            <Link to="/tournaments">TOURNAMENTS</Link>
            <Link to="/customise">CUSTOMISE</Link>
            <Link id="profile" to="/profile">
                <img src={ profile_icon } id="profile-icon" alt="profile icon" />
                <div id="profile-name">Adam H</div>
            </Link>
        </>
    );
}

const CollapsedMenuButton = (props) => {
    return (
        <button className='collapsed-menu-button' onClick={props.onClick}>
            <div className='menu-line'></div>
            <div className='menu-line'></div>
            <div className='menu-line'></div>
        </button>
    );
}

const CollapsedMenu = () => {
    return (
        <div className="collapsed-menu">
            <Links />
        </div>
    );
}
 
export default Navbar;