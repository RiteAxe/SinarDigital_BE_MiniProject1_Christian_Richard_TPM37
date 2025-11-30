const validateOrder = (req, res, next) => {
  const { name, menu, quantity } = req.body;

  if (!name || !menu || !quantity) {
    return res.status(400).send("Field wajib diisi.");
  }

  if (Number(quantity) <= 0) {
    return res.status(400).send("Jumlah harus > 0.");
  }

  next();
};

module.exports = { validateOrder };
