const { Router } = require("express");
const { salesByMonth } = require("../controllers/dashboardController/salesByMonth");
const { getProductCountByCategory } = require("../controllers/dashboardController/getProductCountByCategory ");
const dashboardRouter = Router();


// Ventas totales en un periodo de tiempo
dashboardRouter.get('/sales', salesByMonth )

// Cantidad de productos por Categoria
dashboardRouter.get('/productCount', getProductCountByCategory)




module.exports = dashboardRouter;