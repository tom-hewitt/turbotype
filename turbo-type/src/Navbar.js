import logo from './logo.svg';
import profile_icon from './profile_icon.svg';

const Navbar = () => {
    const openMobileMenu = () => {
        const navigationList = document.getElementsByClassName('navbar-item');
        for (let i = 0; i < navigationList.length; i++) {
            navigationList[i].classList.toggle('btn-active');
        }
        const pageContent = document.getElementsByClassName('content');
        pageContent[0].classList.toggle('hide-content');
    }

    return (
        <nav className="navbar">   
            <a href="/"><img src={ logo } id="logo" alt="logo" /></a>   
            <div className="links">  
                <a className="navbar-item" href="/play">PLAY</a>
                <a className="navbar-item" href="/tournaments">TOURNAMENTS</a>
                <a className="navbar-item" href="/customise">CUSTOMISE</a>
                <a className="navbar-item" id="profile" href="/profile"><img src={ profile_icon } id="profile-icon" alt="profile icon" />
                Adam</a>
            </div>
            <div className='collapsed-menu' onClick={ openMobileMenu }>
                <div className='menu-line'></div>
                <div className='menu-line'></div>
                <div className='menu-line'></div>
            </div>
        </nav>
    );
}
 
export default Navbar;