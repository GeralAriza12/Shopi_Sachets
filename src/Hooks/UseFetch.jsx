import { useEffect, useState } from "react"

const useFetch = (apiURL) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch (apiURL);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data: " + error)
            }
        }
        fetchData();
    }, [apiURL]);

    return data;
}

export default useFetch;