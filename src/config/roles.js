const roles = ['user','admin'];

const roleRights = new Map();
roleRights.set(roles[0], [
  'getUsers',
  'manageUsers',
  'manageRestaurants',
  'getRestaurants',

  'manageQrs',
  'getQrs',

  'manageCategorys',
  'getCategorys',

  'manageCmss',
  'getCmss',

  'manageEnquirys',
  'getEnquirys',

  'manageProducts',
  'getProducts',

  'manageOrders',
  'getOrders',

  'manageModifiers',
  'getModifiers',
  
]);

roleRights.set(roles[1], [
  'getUsers',
  'manageUsers',
  'manageRestaurants',
  'getRestaurants',

  'manageCategorys',
  'getCategorys',

  'manageQrs',
  'getQrs',

  'manageCmss',
  'getCmss',

  'manageEnquirys',
  'getEnquirys',

  'manageProducts',
  'getProducts',

  'manageOrders',
  'getOrders',


  'manageModifiers',
  'getModifiers',
]);


module.exports = {
  roles,
  roleRights,
};
