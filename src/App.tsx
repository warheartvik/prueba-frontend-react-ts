import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Button, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FrmUsuario } from './components/FrmUsuario'
import { UsuarioDetalle } from '../types/interfaces'

import './Funcional.css';

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

function App() {
  let [ListaUsuarios, setListaUsuarios] = useState<UsuarioDetalle[]>([]);
  let [UsuarioId, setUsuarioId] = useState<number>(0)

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
    FecthData();
  }, []);

  const FecthData = async () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setListaUsuarios(data);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  }

  const Guardar = async (Usuario: UsuarioDetalle) => {
    console.log('Guardar')
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

  return (
    <div>
      <Button variant="contained" onClick={NuevoRegistroClic}>Nuevo usuario</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Usuario</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Telefono</TableCell>
              <TableCell align="right">Sitio web</TableCell>
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
          <div>
            <Button onClick={() => Eliminar(UsuarioId)}>Eliminar</Button>
            <Button onClick={cerrarModalElimina}>Cancelar</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
