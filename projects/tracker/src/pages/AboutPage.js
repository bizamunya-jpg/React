import '../styles/Pages.css';

function AboutPage() {
    return (<main className="page-container about-page">
        <div className="page-header">
            <h1> About MovieTracker </h1> <p> Your personal movie collection manager </p> 
            </div>

                    <div className="content-section">
                        <h2> What is MovieTracker ? </h2> 
                        <p>
                                MovieTracker is a modern web application built with React that helps you discover,
                                collect, and manage your favorite movies.We integrate with The Movie Database(TMDb) to provide you with comprehensive movie information, ratings, and recommendations. </p> 
        </div>

                            <div className="content-section">
                                    <h2> Features </h2>
                                     <ul>
        <li> Search for movies from a vast database </li> 
        <li> 🎬Create and manage your personal movie collection </li> 
        <li> ⭐View ratings and detailed information </li> 
        <li> 📊Explore top - rated movies on the Dashboard </li> 
        <li > 📱Fully responsive design for all devices </li> 
        <li> 🚀Lightning - fast performance with code splitting </li> 
        </ul> 
        </div>

                                                                    
<div className="content-section">
<h2> Technology Stack </h2> 
<p>Built with modern technologies including React, React Router for navigation, and implementing best practices like code splitting with lazy loading for optimal performance. </p> 
</div>

<div className="content-section">
<h2> Data Source </h2> 
<p>All movie data, ratings, and images are provided by The Movie Database(TMDb), a free API for accessing movie and TV series information. </p> </div> 
</main>
);
}

export default AboutPage;