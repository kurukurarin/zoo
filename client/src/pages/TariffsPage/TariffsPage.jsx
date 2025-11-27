import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useApi } from '../../hooks/useApi'

export default function AnimalsPage() {
    const { data: tariffs} = useApi('api/tariffs') // << !! мб переделать сслыку

    return (
        <div>
            
        </div>
    )
}