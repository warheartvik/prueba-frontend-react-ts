import { useState, useEffect } from "react";
import { 
    Box, 
    Pagination
} from '@mui/material'

const url = 'https://jsonplaceholder.typicode.com/users/'

interface Paginacion {
    ItemsPorPagina: number,
    paginaSelc: (pagina: number) => any
}

export function ComPaginacion(props: Paginacion) {

    const [itemsTotal, setItemsTotal] = useState<number>(0)
    useEffect(() => {
        FecthData()
    }, []);

    const FecthData = async () => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setItemsTotal(data.length);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            });
    }

    const PaginacionCambio = (evento: any, pagina: number) => {
        console.log(evento)
        props.paginaSelc(pagina);
    }

    return (
        <Box justifyContent={'center'} alignItems={'center'} display={'flex'} sx={{ margin: '20px 0' }}>
            <Pagination 
            onChange={PaginacionCambio}
            count={Math.ceil(itemsTotal / props.ItemsPorPagina)} />
        </Box>
    )
}