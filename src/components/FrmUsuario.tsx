import { Button, Typography, TextField, Box } from '@mui/material'
import { useEffect, useState } from "react";
import { UsuarioDetalle } from '../../types/interfaces'
interface UsuarioId {
    id: number,
    cancelarClic: () => any
    guardarClic: (usuario: UsuarioDetalle) => any
}
const url = 'https://jsonplaceholder.typicode.com/users/'

export function FrmUsuario(props: UsuarioId) {


    useEffect(() => {
        if (props.id > 0) {
            ListarUnico(props.id)
        }
    }, [props.id]);

    const ListarUnico = async (_id: number) => {
        fetch(url + _id)
            .then((response) => response.json())
            .then((data) => {
                setUsuarioSelc(data);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            });
    }
    let [UsuarioSelc, setUsuarioSelc] = useState<UsuarioDetalle>({
        id: 0,
        name: "",
        username: "",
        email: "",
        phone: "",
        website: ""
    });
    const Cancelar = (event: any) => {
        props.cancelarClic();
        event.preventDefault();
    }
    const inputCambio = (e: any) => {
        const { name, value } = e.target;
        setUsuarioSelc(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const Guardar = (evt: any) => {
        evt.preventDefault();
        props.guardarClic(UsuarioSelc);

    };

    return <div>
        <Box sx={{
            margin: '10px 0'
        }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Usuario
        </Typography>
        </Box>
        <form onSubmit={Guardar}>
            <TextField
                fullWidth
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                name="name"
                value={UsuarioSelc.name}
                onChange={inputCambio}
            />
            <TextField
                fullWidth
                className='mt-2'
                id="outlined-basic"
                label="Usuario"
                variant="outlined"
                name="username"
                value={UsuarioSelc.username}
                onChange={inputCambio}
            />
            <TextField
                fullWidth
                className='mt-2'
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                value={UsuarioSelc.email}
                onChange={inputCambio}
            />
            <TextField
                fullWidth
                className='mt-2'
                id="outlined-basic"
                label="Teléfono"
                variant="outlined"
                name="phone"
                value={UsuarioSelc.phone}
                onChange={inputCambio}
            />
            <TextField
                fullWidth
                className='mt-2'
                id="outlined-basic"
                label="Sitio web"
                variant="outlined"
                name="website"
                value={UsuarioSelc.website}
                onChange={inputCambio}
            />
            <Box justifyContent={'end'} alignItems={'center'} display={'flex'} sx={{ margin: '10px 0' }}>
                <Button
                    type="submit">Guardar</Button>
                <Button color="secondary" onClick={Cancelar}>Cancelar</Button>
            </Box>
        </form>
    </div>
}