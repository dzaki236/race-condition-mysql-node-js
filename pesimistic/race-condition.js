require("dotenv").config();
const { createConnection: Pool } = require("mysql2/promise");

const Racecondition = async (nominal, namaAdmin, idDonasi) => {
  const db = await Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "db_donasi_online",
    port: process.env.DB_PORT,
  });

  try {
    // Cek bila donasi < 0
    const [dataDonasi] = await db.execute("SELECT * FROM donasi WHERE id = ?", [
      idDonasi,
    ]);
    const totalNominalTerkumpul = dataDonasi[0].total_terkumpul;
    if (totalNominalTerkumpul <= 0) {
      throw new Error("Donasi terkumpul sudah di tarik semua!");
    }

    // Pastikan sudah tida melebihi yang terkumpul
    if (totalNominalTerkumpul < nominal) {
      throw new Error("Nominal penarikan melebihi total donasi terkumpul!");
    }

    // Tambahkan penarikan donasi
    await db.execute(
      "INSERT INTO penarikan_donasi (id_donasi,total_donasi_ditarik,ditarik_oleh) VALUES (?,?,?)",
      [idDonasi, nominal, namaAdmin]
    );

    await db.execute(
      "UPDATE donasi SET total_terkumpul = total_terkumpul - ? WHERE id = ?",
      [nominal, idDonasi]
    );

    console.log(
      `${namaAdmin} berhasil merubah donasi untuk data donasi dengan id ${idDonasi} dengan nominal ${nominal}`
    );
  } catch (error) {
    console.error("Error message : ", error.message);
  } finally {
    await db.end();
  }
};

Racecondition(500_000, "roy", 1);
Racecondition(1_000_000, "rara", 1);
Racecondition(500_000, "bila", 1);
