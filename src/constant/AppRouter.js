import DashBoard from 'views/dashboard/dashboard';
import ListUser from 'views/list-user/listUser';
import ListProductsAccept from 'views/listProductAccept/listProductAccept';
import ListProductsWaiting from 'views/listProductWaiting/listProductWaiting';
import ListShopAccount from 'views/listShop/listShopAccount';
import path from './path';

const appRouter = [
  { component: <DashBoard />, path: path.default },
  { component: <ListUser />, path: path.listUser },
  { component: <ListProductsWaiting />, path: path.listProductWaiting },
  { component: <ListProductsAccept />, path: path.listProductAccept },
  { component: <ListShopAccount />, path: path.listShopAccount },
];

export default appRouter;
