import { Routes, Route, Link, useParams } from "react-router-dom";
import './App.css'
import RepoPage from './Pages/Repo'
import AdvancedPixiScene from './Pages/Nav2d'

function Home() {
    return <h1>Home Page</h1>;
}

function About() {
    return <h1>About Page</h1>;
}

function NotFound() {
    return <h1>404 - Page Not Found</h1>;
}

const RepoDetailsPage = () => {
    const { nom_repo } = useParams();
    return <h1>Page du Repo : {nom_repo}</h1>;
};

function App() {
    return (
        <div>
            W.I.P
            <nav>
                <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/repo">Repositories</Link>
            </nav>
            <nav>
                <Link to="/2d">2D</Link> | <Link to="/3d">3D</Link> | <Link to="/">Classic</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/2d" element={<AdvancedPixiScene />} />
                <Route path="/about" element={<About />} />
                <Route path="/repo" element={<RepoPage />} />
                <Route path="/repo/:nom_repo" element={<RepoDetailsPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App
