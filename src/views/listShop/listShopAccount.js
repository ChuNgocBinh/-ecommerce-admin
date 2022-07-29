import {
  Box,
  Button,
  CardMedia,
  Modal,
  Table, TableCell, TableHead, TableRow, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getListUser } from 'services/user';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './listShopAccount.sass';
import { getDataItemProduct, getListProductWaiting, updateProductItem } from 'services/product';
import { getListShopAccount, updateShopAccount } from 'services/shopaccount';

function ListShopAccount() {
  const [listShop, setListShop] = useState([]);
  const [data, setData] = useState([]);
  const fetchListShopAccount = async () => {
    try {
      const res = await getListShopAccount();
      if (res?.status === 200) {
        setListShop(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeAccept = async (id) => {
    try {
      const res = await updateShopAccount(id, { shop_account_status: 2 });
      if (res?.status === 200) {
        alert('success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListShopAccount();
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <div className="listUser_container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 600 }}>ID</TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Shop name
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Email
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Phone number
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              City
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Country
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Zipcode
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        {listShop.map((shop) => (
          <TableRow
            key={shop?.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {shop?.id}
            </TableCell>
            <TableCell>{shop?.shop_name}</TableCell>
            <TableCell>{shop?.email}</TableCell>
            <TableCell>{shop?.phone_number}</TableCell>
            <TableCell>{shop?.city}</TableCell>
            <TableCell>{shop?.country}</TableCell>
            <TableCell>{shop?.zip_code}</TableCell>
            <TableCell>
              <div className="listUser_actions">
                <span
                  // onClick={() => handleGetDetail(product?.id)}
                  aria-hidden="true"
                >
                  <VisibilityIcon color="primary" />
                </span>
                {
                  shop.shop_account_status === 1 && (
                    <span
                      onClick={() => hanldeAccept(shop?.id)}
                      aria-hidden="true"
                    >
                      <CheckCircleOutlineIcon color="secondary" />
                    </span>

                  )
                }
              </div>
            </TableCell>
          </TableRow>
        ))}

      </Table>
    </div>
  );
}

export default ListShopAccount;
