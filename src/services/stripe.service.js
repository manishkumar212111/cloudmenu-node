var axios = require('axios');

const auth_token = 'Bearer b39bccad2e0e0c14b7dd511522fecc2b0e98b76111f23f74ab08dccead84a1a325ded1efa55143391576ae013476507ffb86a1f91c69eabf8c1912ef1dce7981rv4traaay1kruEjAMWNCkEVtvFH4S+7+kHnr06ubUx03V9OqgEFI4f34MK5E3unIVIzii52rd/1DYkrl/hQktg==';
// const auth_token = auth_token;
const createAccount = async (data, cb) => {

    var config = {
        method: 'post',
        url: 'https://payment.superfruit.app/accounts/create',
        headers: {
          'Authorization': auth_token
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data);
        cb(response);
      })
      .catch(function (error) {
        console.log(error);
        cb({error : true});

      });
      
}

const deleteAccount = async (data, cb) => {

    var config = {
        method: 'post',
        url: 'https://payment.superfruit.app/accounts/delete',
        headers: {
          'Authorization': auth_token
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data);
        cb(response);
      })
      .catch(function (error) {
        console.log(error);
        cb({error : true});

      });
      
}

const createProduct = async (data, cb) => {

    var config = {
        method: 'post',
        url: 'https://payment.superfruit.app/products/create',
        headers: {
          'Authorization': auth_token
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data);
        cb(response);
      })
      .catch(function (error) {
        console.log(error);
        cb({error : true});

      });
      
}

const bulkCreate = async (data, cb) => {

    var config = {
        method: 'post',
        url: 'https://payment.superfruit.app/products/bulk-create',
        headers: {
          'Authorization': auth_token
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data);
        cb(response);
      })
      .catch(function (error) {
        console.log(error);
        cb({error : true});

      });
      
}

const deleteProduct = async (data, cb) => {

    var config = {
        method: 'post',
        url: 'https://payment.superfruit.app/products/bulk-create',
        headers: {
          'Authorization': auth_token
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data);
        cb(response);
      })
      .catch(function (error) {
        console.log(error);
        cb({error : true});

      });
      
}

const createPaymentLink = async (data, cb) => {

    var config = {
        method: 'post',
        url: 'https://payment.superfruit.app/payment-links/create',
        headers: {
          'Authorization': auth_token
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data);
        cb(response);
      })
      .catch(function (error) {
        console.log(error);
        cb({error : true});

      });
      
}
module.exports = {
    createAccount,
    deleteAccount,
    createProduct,
    bulkCreate,
    deleteProduct,
    createPaymentLink
}