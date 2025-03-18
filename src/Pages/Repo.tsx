import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Repo.css"

type Project = {
    name: string;
    description: string;
    image: string;
    repoUrl: string;
};

function RepoPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch("/projects.json") // Charge le fichier JSON
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error("Erreur lors du chargement :", err));
    }, []);
    return (
        <div>
            <h1>Mes Repos</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.name} className="RepoCard">
                        <img src={project.image} alt={project.name} width="100" />
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <Link to={`/repo/${project.name}`} className="button button-primary">Voir le projet</Link>
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="button button-secondary">Voir le Repo</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RepoPage