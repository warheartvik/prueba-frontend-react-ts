import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Button, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { FrmUsuario } from './FrmUsuario'
import { UsuarioDetalle } from '../../types/interfaces'
import { ComPaginacion } from './ComPaginacion'
import { ComItemPorPagina } from './ComItemPorPagina'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const url = 'https://jsonplaceholder.typicode.com/users/'
export function ComTablaUsuario() {

    let [ListaUsuarios, setListaUsuarios] = useState<UsuarioDetalle[]>([]);
    let [UsuarioId, setUsuarioId] = useState<number>(0)

    const [cantidadUsuario, setCantidadUsuario] = useState<number>(5);
    const [paginaSelc, setPaginaSelc] = useState<number>(1);

    const [mostrarModal, setMostrarModal] = useState(false);
    const abrirModal = () => setMostrarModal(true)
    const cerrarModal = () => setMostrarModal(false)

    const [mostrarModalElimina, setMostrarModalElimina] = useState(false);
    const abrirModalElimina = () => setMostrarModalElimina(true)
    const cerrarModalElimina = () => setMostrarModalElimina(false)

    const NuevoRegistroClic = () => {
        setUsuarioId(0)
        abrirModal()
    }

    const EditarClic = (_UsuarioID: number) => {
        setUsuarioId(_UsuarioID)
        abrirModal()
    }

    const EliminarClic = (_UsuarioID: number) => {
        setUsuarioId(_UsuarioID)
        abrirModalElimina()
    }

    useEffect(() => {
        FecthData(paginaSelc, cantidadUsuario);
    }, [paginaSelc, cantidadUsuario]);

    const FecthData = async (_paginaSelc: number, _cantidadUsuario: number) => {
        fetch(url + `?_page=${_paginaSelc}&_limit=${_cantidadUsuario}`)
            .then((response) => response.json())
            .then((data) => {
                setListaUsuarios(data);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            });
    }

    const Guardar = async (Usuario: UsuarioDetalle) => {
        if (Usuario.id > 0) {
            await Editar(Usuario)
        } else {
            await Agregar(Usuario)
        }
        cerrarModal()
    }

    const Agregar = async (Usuario: UsuarioDetalle) => {
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(Usuario),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => {
                if (response.status !== 201) {
                    return;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data)
                setListaUsuarios((ListaUsuarios) => [...ListaUsuarios, data]);
            })
            .catch((error) => console.log(error));
    };

    const Editar = async (Usuario: UsuarioDetalle) => {
        await fetch(url + Usuario.id, {
            method: "PUT",
            body: JSON.stringify(Usuario),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => {
                if (response.status !== 200) {
                    return;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                // setUsers((users) => [...users, data]);
                const updateListaUsuarios = ListaUsuarios.map((user) => {
                    if (user.id === Usuario.id) {
                        user = Usuario
                    }

                    return user;
                });

                setListaUsuarios((ListaUsuarios) => updateListaUsuarios);
            })
            .catch((error) => console.log(error));
    };

    const Eliminar = async (id: number) => {
        await fetch(url + id, {
            method: "DELETE"
        })
            .then((response) => {
                if (response.status !== 200) {
                    return;
                } else {
                    setListaUsuarios(
                        ListaUsuarios.filter((unUsuario) => {
                            return unUsuario.id !== id;
                        })
                    );
                }
            })
            .catch((error) => console.log(error));
        cerrarModalElimina()
    };

    const PaginadoCambio = (cantidad: number) => {
        setCantidadUsuario(cantidad)
        setPaginaSelc(1)
    }

    const PaginaSelcCambio = (pagina: number) => {
        setPaginaSelc(pagina)
    }

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between', margin: '20px 0', padding: '0 20px'
                }}>
                <ComItemPorPagina
                    value={cantidadUsuario}
                    cantidadCambio={PaginadoCambio} />
                <PersonAddAlt1Icon onClick={NuevoRegistroClic} />
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Usuario</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Telefono</TableCell>
                            <TableCell align="right">Sitio web</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ListaUsuarios.map((unUsuario) => (
                            <TableRow
                                key={unUsuario.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {unUsuario.name}
                                </TableCell>
                                <TableCell align="right">{unUsuario.username}</TableCell>
                                <TableCell align="right">{unUsuario.email}</TableCell>
                                <TableCell align="right">{unUsuario.phone}</TableCell>
                                <TableCell align="right">{unUsuario.website}</TableCell>
                                <TableCell align="right">
                                    <EditIcon onClick={() => EditarClic(unUsuario.id)} />
                                    <DeleteIcon
                                        onClick={() => EliminarClic(unUsuario.id)}
                                        className="ml-1" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ComPaginacion
                ItemsPorPagina={cantidadUsuario}
                paginaSelc={PaginaSelcCambio}
            />
            <Modal
                open={mostrarModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FrmUsuario
                        guardarClic={Guardar}
                        cancelarClic={cerrarModal}
                        id={UsuarioId} />
                </Box>
            </Modal>
            <Modal
                open={mostrarModalElimina}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Eliminar
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        ¿Está seguro de eliminar el registro?
                    </Typography>
                    <Box justifyContent={'end'} alignItems={'center'} display={'flex'} sx={{ margin: '10px 0' }}>
                        <Button onClick={() => Eliminar(UsuarioId)}>Eliminar</Button>
                        <Button color="secondary" onClick={cerrarModalElimina}>Cancelar</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}