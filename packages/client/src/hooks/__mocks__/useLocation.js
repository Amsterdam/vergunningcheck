module.exports = {
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(), // --> you may use useHistory instead
};
