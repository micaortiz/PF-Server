const { Order, Product} = require("../../db");

const salesByMonth = async(req, res) => {
    try {
        const orders = await Order.findAll();

        // Objeto para almacenar los totales por mes
        const monthlySales = {};
    
        // Recorre cada pedido
        orders.forEach(order => {
          // Parsea la fecha del pedido
          const orderDate = new Date(order.orderDate);
    
          // Extrae el mes y el año
          const month = orderDate.getMonth() + 1; // +1 porque los meses son indexados desde 0
          const year = orderDate.getFullYear();
    
          // Crea una clave única para el mes y el año
          const monthYearKey = `${month}-${year}`;
    
          // Si la clave ya existe, suma el total al existente, de lo contrario, crea una nueva entrada
          if (monthlySales[monthYearKey]) {
            monthlySales[monthYearKey] += order.totalPrice;
          } else {
            monthlySales[monthYearKey] = order.totalPrice;
          }
        });
    
        // Resultado final con totales de ventas por mes
        console.log(monthlySales);
    
        // Envía la respuesta al cliente con los totales de ventas por mes
        return res.status(200).json(monthlySales);
    } catch (error) {
        return res.status(500).json(error.message) 
    }
}

module.exports = {
    salesByMonth
}