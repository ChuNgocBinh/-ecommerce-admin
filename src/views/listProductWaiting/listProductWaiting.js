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
import './listUser.sass';
import { getDataItemProduct, getListProductWaiting, updateProductItem } from 'services/product';

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

function ListProductsAccept() {
  const [listProducts, setListProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
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
  const handleClose = () => {
    setOpen(false);
  };
  const handleGetDetail = async (id) => {
    try {
      await getDataItemProduct(id).then((rs) => {
        if (rs) {
          setOpen(true);
          setData(rs.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeAccept = async (id) => {
    await updateProductItem(id, { isAccept: 1 }).then((res) => {
      if (res.status === 200) {
        // eslint-disable-next-line
        alert('success');
        fetchListProductWaiting();
      }
    }).catch((error) => console.log(error));
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
                <span
                  onClick={() => handleGetDetail(product?.id)}
                  aria-hidden="true"
                >
                  <VisibilityIcon color="primary" />
                </span>
                <span
                  onClick={() => hanldeAccept(product?.id)}
                  aria-hidden="true"
                >
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
              src={data?.picture_url}
            />
            <div className="input_text">
              <span>Upload</span>
              <TextField type="file" className="text" id="product_name" />
            </div>
            <div className="input_text">
              <span>Product name</span>
              <TextField className="text" value={data?.product_name} id="product_name" />
            </div>
            <div className="input_text">
              <span>Brand</span>
              <TextField className="text" value={data?.brand} id="outlined-basic" />
            </div>
            <div className="input_text">
              <span>Cost</span>
              <TextField className="text" value={data?.cost} id="outlined-basic" />
            </div>
            <div className="input_text">
              <span>Discount</span>
              <TextField className="text" value={data?.discount} id="outlined-basic" />
            </div>
            <div className="input_text">
              <span>Quantity</span>
              <TextField className="text" value={data?.quantity} id="outlined-basic" />
            </div>
            <div className="input_text">
              <span>Description</span>
              <TextField className="text" value={data?.description} id="outlined-basic" />
            </div>
            <div className="input_text">
              <span>IsAccept</span>
              <TextField className="text" value={data?.isAccept} id="outlined-basic" />
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

export default ListProductsAccept;
