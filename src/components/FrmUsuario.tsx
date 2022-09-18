import { Button, Typography, TextField } from '@mui/material'
import { useEffect, useState } from "react";
import { UsuarioDetalle } from '../../types/interfaces'
interface UsuarioId {
    id: number,
    cancelarClic: () => any
    guardarClic: (usuario: UsuarioDetalle) => any
}

export function FrmUsuario(props: UsuarioId) {
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
    
    let url = `https://jsonplaceholder.typicode.com/users/${props.id}`;
    useEffect(() => {
        if (props.id > 0) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setUsuarioSelc(data);
                })
                .catch((error) => {
                    console.log("ERROR: ", error);
                });
        }
    }, [url, props.id]);

    return <div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Usuario
        </Typography>
        <form onSubmit={Guardar}>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
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
            {/* </Typography> */}
            <div>
                {/* <button onSubmit={handleOnSubmit}>Add</button> */}
                <Button
                    type="submit"
                    variant="contained">Guardar</Button>
                <Button variant="outlined" color="secondary" onClick={Cancelar}>Cancelar</Button>
            </div>
        </form>
    </div>
}