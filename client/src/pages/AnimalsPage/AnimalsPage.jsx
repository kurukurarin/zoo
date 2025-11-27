import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useApi } from '../../hooks/useApi'

export default function AnimalsPage() {
    const { data: animals} = useApi('api/animals') // << !! мб переделать сслыку

    if (loading)

    return (
        <div>
            
        </div>
    )
}