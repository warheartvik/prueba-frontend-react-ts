import { MenuItem, InputLabel, Box } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'

interface CantidadSelc {
    value: number,
    cantidadCambio: (cantidad: number) => any
}

export function ComItemPorPagina(props: CantidadSelc) {
    const [cantidad, setcantidad] = useState('10');
    const handleChange = (event: SelectChangeEvent) => {
        setcantidad(event.target.value as string);
        props.cantidadCambio(Number(cantidad));
    };
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <InputLabel id="demo-simple-select-label">Usuarios por página</InputLabel>
            <Select
                className='ml-1'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cantidad}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
            </Select>
        </Box>
    )
}