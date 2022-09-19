import { useEffect } from "react";
import { 
    Box, 
    Pagination
    // TablePagination 
} from '@mui/material'

interface Paginacion {
    ItemsPorPagina: number,
    ItemsTotal: number,
}

export function ComPaginacion(props: Paginacion) {
    useEffect(() => {
        console.log(props)
    }, [props]);

    // const [page, setPage] = useState(2);
    // const [rowsPerPage, setRowsPerPage] = useState(10);

    // const handleChangePage = (
    //     event: React.MouseEvent<HTMLButtonElement> | null,
    //     newPage: number,
    // ) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (
    //     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    // ) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };
    return (
        <Box justifyContent={'center'} alignItems={'center'} display={'flex'} sx={{ margin: '20px 0' }}>
            <Pagination 
            count={Math.ceil(props.ItemsTotal / props.ItemsPorPagina)} />
        </Box>
    )
}