import {Router} from 'express'
import multer from 'multer';


import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController} from'./controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

import { CreateProductController } from './controllers/products/CreateProductController';
import { ListByCategoryController } from './controllers/products/ListByCategoryController';

import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';

import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';



import { isAuthenticated } from './middlewares/isAuthenticated';
import uploadConfig from './config/multer'
import { SendOrderController } from './controllers/order/SendOrderController';

import { ListOrderController } from './controllers/order/ListOrderController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

//--ROTAS DE USERS--
//ROTAS USER usuarios
router.post('/users', new CreateUserController().handle)

//ROTA de login
router.post('/session', new AuthUserController().handle)

//ROTA  de dados do usuario logado
router.get('/me', isAuthenticated, new DetailUserController().handle);
//-----------------------------------

//--ROTAS DE CATEGORY--
//--rota para criar categoria, porém só é acessada por um usuario logado pois é uma rota privada categoia
router.post('/category', isAuthenticated, new CreateCategoryController().handle)

//rota privada para listar categorias
router.get('/category', isAuthenticated,new ListCategoryController().handle)
//-------------------------------------

//--ROTAS DE PRODUCTS
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

//ROTA DE PRODUTOS DE UMA CATEGORIA
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)
//----------------------------------------------

//--ROTAS DE ORDER
//ROTA PARA ABRIR UMA MESA, PEDIDO
router.post('/order', isAuthenticated, new CreateOrderController().handlle)

//ROTA PARA DELETAR UM PEDIDO
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

//ROTA PARA ADICIONAR ITENS AO PEDIDO
router.post('/order/add', isAuthenticated, new AddItemController().handle)

//ROTA PARA REMOVER UM ITEM DA LISTA DOS PEDIDOS
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)

//ROTA PARA ALTERAR STATUS DO PEDIDO DE RASCUNHO PARA PEDIDO FINAL
router.put('/order/send', isAuthenticated, new SendOrderController().handle)

//ROTA PARA TRAZER TODOS OS PEDIDOS ABERTOS QUE SAIRAM DE RASCUNHO
router.get('/orders',isAuthenticated, new ListOrderController().handle)


//LISTA DETALHES, OS ITEM DE UM PEDIDO
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

//FINALIZANDO O PEDIDO
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)
//Exportando router para acessar pelo server
export{router};