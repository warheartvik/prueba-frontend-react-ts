import { MenuItem, InputLabel, Box } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'

interface CantidadSelc {
    value: number,
    cantidadCambio: (cantidad: any) => any
}

export function ComItemPorPagina(props: CantidadSelc) {
    const [cantidad, setcantidad] = useState(props.value.toString());
    const handleChange = (event: SelectChangeEvent) => {
        let _cantidad = event.target.value
        setcantidad(_cantidad);
        props.cantidadCambio(_cantidad);
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