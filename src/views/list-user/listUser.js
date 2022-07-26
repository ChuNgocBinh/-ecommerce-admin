import {
  Table, TableCell, TableHead, TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getListUser } from 'services/user';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import './listUser.sass';

function ListUser() {
  const [listUsers, setListUsers] = useState([]);
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
                <span>
                  <VisibilityIcon color="primary" />
                </span>
                <span>
                  {
                    user?.isActive ? <LockOpenIcon color="secondary" /> : <LockIcon color="secondary" />
                  }
                </span>
                <span
                  // onClick={() => handleDeleteProduct(product.id)}
                  aria-hidden="true"
                >
                  <DeleteForeverIcon color="error" />
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

export default ListUser;
