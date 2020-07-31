exports.getMe = (req, res, next) => {
  console.log(req);
  res.status(200).send({
    data: 'Here is your data'
  });
};
