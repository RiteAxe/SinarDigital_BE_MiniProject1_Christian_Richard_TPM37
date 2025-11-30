const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const { dataPath } = require("../config/app.config");

router.get("/", (req, res) => {
  res.send(`
    <h1>${req.appName}</h1>
    <a href="/order">Buat Pesanan</a> |
    <a href="/orders">Lihat Pesanan</a>
  `);
});

router.get("/order", (req, res) => {
  res.send(`
    <h1>Buat Pesanan</h1>
    <form method="POST" action="/api/orders">
      <input type="text" name="name" placeholder="Nama" required/><br/><br/>
      <input type="text" name="menu" placeholder="Menu" required/><br/><br/>
      <input type="number" name="quantity" placeholder="Jumlah" min="1" required/><br/><br/>
      <textarea name="note" placeholder="Catatan"></textarea><br/><br/>
      <button type="submit">Kirim</button>
    </form>
    <a href="/">Kembali</a>
  `);
});

router.get("/orders", (req, res) => {
  const raw = fs.readFileSync(dataPath, "utf-8") || '{"orders": []}';
  const data = JSON.parse(raw);

  const listItems = data.orders.length
    ? data.orders
        .map(
          (o, i) =>
            `<li>#${i + 1} - ${o.name} pesan ${o.quantity} ${o.menu} (${
              o.note || "-"
            })</li>`
        )
        .join("")
    : "<li>Belum ada pesanan.</li>";

  res.send(`
    <h1>Daftar Pesanan</h1>
    <ul>${listItems}</ul>
    <a href="/">Kembali</a>
  `);
});

module.exports = router;
