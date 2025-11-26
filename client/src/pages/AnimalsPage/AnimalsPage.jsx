import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function AnimalsPage() {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        fetch('api/animals')
        .then(response => response.json())
        .then(animalsFromServer => setAnimals(animalsFromServer.data))
    }, [])

    return (
        <
    )
}