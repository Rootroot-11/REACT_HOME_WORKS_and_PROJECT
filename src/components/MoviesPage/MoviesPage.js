import {useEffect, useState} from "react";
import {getMovieById} from "../../services/service.api/movieService";
import {useParams} from "react-router";

export default function MoviesListCard({match:{params:{id}}}) {

    let[movieByID,setMovieById]=useState([]);

    useEffect(()=>{
        getMovieById(id).then(value => setMovieById(value.data))
    },[])

    console.log(id)

    return (
        <div className="MoviesListCard">

        </div>
    );
}