const roles = ['user','admin'];

const roleRights = new Map();
roleRights.set(roles[0], [
  'getUsers',
  'manageUsers',
  'getPlans',
  'changePasssword',
  'changeEmail',
  'managePayment',
  'manageEnquirys',
  'manageBlogs',
  'getBlogs',
  'manageProducts',
  'getProducts'
  ]);

roleRights.set(roles[1], [
  'getUsers',
  'manageUsers',
  'getPlans',
  'managePlans',
  'changePasssword',
  'changeEmail',
  'manageTransactions',
  'getTransactions',
  'manageEnquirys',
  'getEnquirys',
  'manageBlogs',
  'getBlogs',
  'manageE_templates',
  'getE_templates',
  'manageProducts',
  'getProducts'

]);


module.exports = {
  roles,
  roleRights,
};
