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
    // Begin transaction
    await db.beginTransaction();

    // Lock the row to prevent race condition
    const [dataDonasi] = await db.execute(
      "SELECT * FROM donasi WHERE id = ? FOR UPDATE",
      [idDonasi]
    );

    // Cek bila donasi < 0
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

    // Commit transaction
    await db.commit();

    console.log(
      `${namaAdmin} berhasil merubah donasi untuk data donasi dengan id ${idDonasi} dengan nominal ${nominal}`
    );
  } catch (error) {
    // Rollback transaction in case of error
    await db.rollback();
    console.error("Error message : ", error.message);
  } finally {
    await db.end();
  }
};
(async () => {
  await Racecondition(500_000, "roy", 1);
  await Racecondition(1_000_000, "rara", 1);
  await Racecondition(500_000, "bila", 1);
})();
