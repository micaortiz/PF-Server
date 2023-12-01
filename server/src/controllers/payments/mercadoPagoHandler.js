require("dotenv").config();
const {ACCESS_TOKEN, IDEM_POTENCY} = process.env;

const {MercadoPagoConfig, Preference} = require("mercadopago");

// VERSION 2.0

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN
});

const payment = new Preference(client);
// funcion de agregar
const createOrder = async (req, res) => {
  try {
    // la info se recibe como un objeto individual, hay que ver las variables como vienen y cargarlas
    const {items} = req.body;
    console.log(items);


    let preference = {
      body: {
        items: items,
        // payer: {
        //   name: 'João',
        //   surname: 'Silva',
        //   email: 'user@email.com',
        //   phone: {
        //     area_code: '11',
        //     number: '4444-4444'
        //   },
        //   identification: {
        //     type: 'CPF',
        //     number: '19119119100'
        //   },
        //   address: {
        //     street_name: 'Street',
        //     street_number: 123,
        //     zip_code: '06233200'
        //   }
        // },
        back_urls: {
          success: 'http://localhost:3001/payments/orderFeedback',
          failure: 'http://localhost:3001/payments/orderFeedback',
          pending: 'http://localhost:3001/payments/orderFeedback'
        },
        // auto_return: 'approved',
        // payment_methods: {
        //   excluded_payment_methods: [],
        //   excluded_payment_types: [],
        //   installments: 1
        // },
        // notification_url: 'https://www.your-site.com/ipn',
        // statement_descriptor: 'TECHNOOK',
        // external_reference: 'Reference_1234',
        // expires: false,
        // expiration_date_from: '2016-02-01T12:00:00.000-04:00',
        // expiration_date_to: '2016-02-28T12:00:00.000-04:00'
      }
    }

    const response = await payment.create(preference);

    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

const purchaseResults = (req, res) => {
  try {
    const {payment_id, status, merchant_order_id } = req.query;
    console.log("paso por aca");
    res.json({
        payment: payment_id,
        status: status,
        merchantOrder: merchant_order_id
    });

  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

module.exports = {createOrder, purchaseResults};
