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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './listProductAccept.sass';
import { getListProductWaiting } from 'services/product';

function ListProductsWaiting() {
  const [listProducts, setListProducts] = useState([]);
  const fetchListProductWaiting = async () => {
    try {
      const res = await getListProductWaiting();
      if (res?.status === 200) {
        setListProducts(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListProductWaiting();
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
              Product Name
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Shop Name
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Brand
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              cost
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Discount
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Quantity
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        {listProducts.map((product) => (
          <TableRow
            key={product?.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {product?.id}
            </TableCell>
            <TableCell>{product?.product_name}</TableCell>
            <TableCell>{product?.shop_name}</TableCell>
            <TableCell>{product?.brand}</TableCell>
            <TableCell>{formatter.format(product?.cost)}</TableCell>
            <TableCell>{product?.discount}</TableCell>
            <TableCell>{product?.quantity}</TableCell>
            <TableCell>
              <div className="listUser_actions">
                <span>
                  <VisibilityIcon color="primary" />
                </span>
                <span>
                  <CheckCircleOutlineIcon color="secondary" />
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

export default ListProductsWaiting;
