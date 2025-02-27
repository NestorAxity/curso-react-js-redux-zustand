import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getTodos } from "../services/todos.service";

const Home: React.FC = () => {

    const {isLoading, isError, data} = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos,
        retry: false,
        //refetchOnWindowFocus: false,
        //staleTime: Infinity
    });

    if (isLoading) {
        return (
            <h1>Loading ...</h1>
        )
    }

    if (isError) {
        return(
            <h1>Upps, fallo algo</h1>
        )
    }

    return(
        <ol>
            {
                data?.map((element) => <li key={element.id}>{element.title}</li>)
            }
        </ol>
    )
}


export default Home