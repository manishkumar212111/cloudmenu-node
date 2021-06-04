var axios = require('axios');

const createAccount = async (data, cb) => {

    var config = {
        method: 'post',
        url: 'https://payment.superfruit.app/accounts/create',
        headers: {
          'Authorization': 'Bearer 800aa16fb9a949c2c927ff93e0331192feb122fe7a6bb1949fb24d6eabda11e89998205bb448e3ea4559bdbbc5a5c65eeac3f0090cba29fb1243599009ad28dbmOQKu2IJufsEK/zIr359VXG0R5FgJS3GHSkG4/NJ4KKJt/quAoA/hEYoeWolA98Pr33G2ZF3X1NG6wpmUP4odw=='
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
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
          'Authorization': 'Bearer 800aa16fb9a949c2c927ff93e0331192feb122fe7a6bb1949fb24d6eabda11e89998205bb448e3ea4559bdbbc5a5c65eeac3f0090cba29fb1243599009ad28dbmOQKu2IJufsEK/zIr359VXG0R5FgJS3GHSkG4/NJ4KKJt/quAoA/hEYoeWolA98Pr33G2ZF3X1NG6wpmUP4odw=='
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
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
          'Authorization': 'Bearer 800aa16fb9a949c2c927ff93e0331192feb122fe7a6bb1949fb24d6eabda11e89998205bb448e3ea4559bdbbc5a5c65eeac3f0090cba29fb1243599009ad28dbmOQKu2IJufsEK/zIr359VXG0R5FgJS3GHSkG4/NJ4KKJt/quAoA/hEYoeWolA98Pr33G2ZF3X1NG6wpmUP4odw=='
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
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
          'Authorization': 'Bearer 800aa16fb9a949c2c927ff93e0331192feb122fe7a6bb1949fb24d6eabda11e89998205bb448e3ea4559bdbbc5a5c65eeac3f0090cba29fb1243599009ad28dbmOQKu2IJufsEK/zIr359VXG0R5FgJS3GHSkG4/NJ4KKJt/quAoA/hEYoeWolA98Pr33G2ZF3X1NG6wpmUP4odw=='
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
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
          'Authorization': 'Bearer 800aa16fb9a949c2c927ff93e0331192feb122fe7a6bb1949fb24d6eabda11e89998205bb448e3ea4559bdbbc5a5c65eeac3f0090cba29fb1243599009ad28dbmOQKu2IJufsEK/zIr359VXG0R5FgJS3GHSkG4/NJ4KKJt/quAoA/hEYoeWolA98Pr33G2ZF3X1NG6wpmUP4odw=='
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
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
          'Authorization': 'Bearer 800aa16fb9a949c2c927ff93e0331192feb122fe7a6bb1949fb24d6eabda11e89998205bb448e3ea4559bdbbc5a5c65eeac3f0090cba29fb1243599009ad28dbmOQKu2IJufsEK/zIr359VXG0R5FgJS3GHSkG4/NJ4KKJt/quAoA/hEYoeWolA98Pr33G2ZF3X1NG6wpmUP4odw=='
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
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