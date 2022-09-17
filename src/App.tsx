import { useEffect, useState } from "react";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Button, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FrmUsuario } from './components/FrmUsuario'
import { UsuarioDetalle } from '../types/interfaces'

// import './App.css';
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

// interface UsuarioDetalle {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   phone: string;
//   website: string;
// }
function App() {
  let [ListaUsuarios, setListaUsuarios] = useState<UsuarioDetalle[]>([]);

  let [UsuarioId, setUsuarioId] = useState<number>(0)

  const [mostrarModal, setMostrarModal] = useState(false);
  const abrirModal = () => setMostrarModal(true)
  const cerraModal = () => setMostrarModal(false)

  const Editar = (_UsuarioID: number) => {
    setUsuarioId(_UsuarioID)
    abrirModal()
  }

  const NuevoRegistro = () => {
    setUsuarioId(0)
    abrirModal()
  }

  let url = "https://jsonplaceholder.typicode.com/users";
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setListaUsuarios(data);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  }, [url]);

  const Agregar = async (Usuario: UsuarioDetalle ) => {
    console.log('Agregar', Usuario)
    await fetch("https://jsonplaceholder.typicode.com/users", {
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
        setListaUsuarios((ListaUsuarios) => [...ListaUsuarios, data]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Button variant="contained" onClick={NuevoRegistro}>Nuevo usuario</Button>
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
                  <EditIcon onClick={()=>Editar(unUsuario.id)} />
                  <DeleteIcon className="ml-1" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={mostrarModal}
        onClose={cerraModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FrmUsuario 
          guardarClic = {Agregar}
          cancelarClic = {cerraModal}
          id={UsuarioId} />
        </Box>
      </Modal>
    </div>
  );
}

export default App;
