import {
  Box,
  Button,
  CardMedia,
  Modal,
  Table, TableCell, TableHead, TableRow, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  deleteUser, getListUser, getUserItem, updateUser,
} from 'services/user';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import './listUser.sass';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ListUser() {
  const [listUsers, setListUsers] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState();
  const fetchListUser = async () => {
    try {
      const res = await getListUser();
      if (res?.status === 200) {
        setListUsers(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetDetail = async (id) => {
    try {
      await getUserItem(id).then((rs) => {
        if (rs) {
          setOpen(true);
          setData(rs.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const hanldeActive = async (id, active) => {
    if (active === 0) {
      await updateUser(id, { isActive: 1 }).then((res) => {
        if (res.status === 200) {
          // eslint-disable-next-line
          alert('succes');
          window.location.reload();
        }
      }).catch((error) => console.log(error));
    } else if (active === 1) {
      await updateUser(id, { isActive: 0 }).then((res) => {
        if (res.status === 200) {
          // eslint-disable-next-line
          alert('succes');
          window.location.reload();
        }
      }).catch((error) => console.log(error));
    }
  };
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id).then(((res) => {
        if (res.status === 200) {
          // eslint-disable-next-line
          alert('succes');
          fetchListUser();
        }
      })).catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListUser();
  }, []);
  return (
    <div className="listUser_container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 600 }}>ID</TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Name
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Email
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Phone Number
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Block
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        {listUsers.map((user) => (
          <TableRow
            key={user?.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {user?.id}
            </TableCell>
            <TableCell>{user?.user_name}</TableCell>
            <TableCell>{user?.email}</TableCell>
            <TableCell>{user?.phone_number}</TableCell>
            <TableCell>{user?.isActive ? 'block' : 'non-block'}</TableCell>
            <TableCell>
              <div className="listUser_actions">
                <span
                  onClick={() => handleGetDetail(user?.id)}
                  aria-hidden="true"
                >
                  <VisibilityIcon color="primary" />
                </span>
                <span
                  onClick={() => hanldeActive(user?.id, user?.isActive)}
                  aria-hidden="true"
                >
                  {
                    user?.isActive === 0 ? <LockOpenIcon color="secondary" /> : <LockIcon color="secondary" />
                  }
                </span>
                <span
                  onClick={() => handleDeleteUser(user.id)}
                  aria-hidden="true"
                >
                  <DeleteForeverIcon color="error" />
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Modal
            </Typography>
            <CardMedia
              component="img"
              height="100"
              src={data?.profile_picture}
            />

            <div className="input_text">
              <span>address</span>
              <TextField className="text" value={data?.address} />
            </div>
            <div className="input_text">
              <span>email</span>
              <TextField className="text" value={data?.email} />
            </div>
            <div className="input_text">
              <span>phone_number</span>
              <TextField className="text" value={data?.phone_number} />
            </div>
            <div className="input_text">
              <span>user_name</span>
              <TextField className="text" value={data?.user_name} id="outlined-basic" />
            </div>
            <Button
              style={{
                marginTop: 20, width: '100%',
              }}
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </Table>
    </div>
  );
}

export default ListUser;
