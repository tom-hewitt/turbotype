import logo from './logo.svg';
import profile_icon from './profile_icon.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const openCollapsedMenu = () => {
        const navigationList = document.getElementsByClassName('navbar-item');
        for (let i = 0; i < navigationList.length; i++) {
            navigationList[i].classList.toggle('btn-active');
        }
        const pageContent = document.getElementsByClassName('content');
        pageContent[0].classList.toggle('hide-content');
    }

    return (
        <nav className="navbar">   
            <Link to="/"><img src={ logo } id="logo" alt="logo" /></Link>   
            <div className="links">  
                <Link className="navbar-item" to="/play">PLAY</Link>
                <Link className="navbar-item" to="/tournaments">TOURNAMENTS</Link>
                <Link className="navbar-item" to="/customise">CUSTOMISE</Link>
                <Link id="profile" to="/profile"><img src={ profile_icon } id="profile-icon" alt="profile icon" />
                <div id="profile-name">Adam H</div></Link>
            </div>
            <div className='collapsed-menu' onClick={ openCollapsedMenu }>
                <div className='menu-line'></div>
                <div className='menu-line'></div>
                <div className='menu-line'></div>
            </div>
        </nav>
    );
}
 
export default Navbar;