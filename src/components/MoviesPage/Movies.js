import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {discoverGenre, discoverMovie} from "../../services/service.api/movieService";
import {fetchingGenres, fetchUsers} from "../../redux/actions/actions";
import {Movie} from "../Movie/Movie";

export default function Movies() {
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true)

    let {users} = useSelector(({rootReducer}) => rootReducer);
    let {genres} = useSelector(({genresReducer}) => genresReducer);
    const dispatch = useDispatch();

    document.body.style.backgroundImage = `url("https://st.depositphotos.com/2371801/2999/i/950/depositphotos_29990939-stock-photo-watercolor-leaves-seamless-autumn-background.jpg")`;

    useEffect(() => {
        if (fetching) {
            discoverMovie(currentPage).then(value => {
                dispatch(fetchUsers(value.data))
                setCurrentPage(prevState => prevState + 1)
            })
                .finally(() => setFetching(false));
        }
        if (!genres) {
            discoverGenre().then(value => dispatch(fetchingGenres(value.data)))
        }
    }, [dispatch, fetching, genres]);

    return (

        <div className="Movies">

            {
               users && users.map(value => <Movie key={value.id} value={value}/>)
            }

        </div>
    );
}