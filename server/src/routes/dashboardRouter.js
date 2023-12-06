const { Router } = require("express");
const { salesByCategory } = require("../controllers/dashboardController/salesByCategory");
const { getProductCountByCategory } = require("../controllers/dashboardController/getProductCountByCategory ");
const dashboardRouter = Router();


// Ventas por categoria 
// dashboardRouter.get('/', salesByCategory ) no esta definido todavia

// Cantidad de productos por Categoria
dashboardRouter.get('/productCount', getProductCountByCategory)




module.exports = dashboardRouter;