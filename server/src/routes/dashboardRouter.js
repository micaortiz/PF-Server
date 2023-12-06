const { Router } = require("express");
const { salesByCategory } = require("../controllers/dashboardController/salesByCategory");
const { getProductCountByCategory } = require("../controllers/dashboardController/getProductCountByCategory ");
const dashboardRouter = Router();


// Ventas por categoria 
dashboardRouter.get('/', salesByCategory )

// Cantidad de productos por Categoria
dashboardRouter.get('/countByCategory', getProductCountByCategory)




module.exports = dashboardRouter;