import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (<nav className="navigation" >
        <div className="nav-container">
            <Link to="/"
                className="nav-logo" > 🎬MovieTracker 
                </Link>

                <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    <Link to="/"
                        className={`nav-link ${isActive('/')}`}
                        onClick={
                            () => setIsMobileMenuOpen(false)}>
                        Home 
                        </Link> 
                        <Link to="/dashboard"
                            className={`nav-link ${isActive('/dashboard')}`}
                            onClick={
                                () => setIsMobileMenuOpen(false)}>
                            Dashboard </Link> 
                            <Link to="/tv-series"
                                className={`nav-link ${isActive('/tv-series')}`}
                                onClick={
                                    () => setIsMobileMenuOpen(false)}>
                                TV Series </Link> 
                                <Link to="/cartoons"
                                    className={`nav-link ${isActive('/cartoons')}`}
                                    onClick={
                                        () => setIsMobileMenuOpen(false)}>
                                    Cartoons </Link> 
                                    <Link to="/anime"
                                        className={`nav-link ${isActive('/anime')}`}
                                        onClick={
                                            () => setIsMobileMenuOpen(false)}>
                                        Anime </Link> 
                                        <Link to="/about"
                                            className={`nav-link ${isActive('/about')}`}
                                            onClick={
                                                () => setIsMobileMenuOpen(false)} >
                                            About 
                                            </Link> 
                                            </div>

                                            < div className="hamburger"
                                                onClick={toggleMobileMenu} >
                                                <span> </span> 
                                                <span> </span> 
                                                <span> </span> 
                                                </div> </div> 
                                                </nav>
                                                            );
}

                                                            export default Navigation;