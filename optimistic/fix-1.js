require("dotenv").config();
const { createConnection: Pool } = require("mysql2/promise");

const RaceconditionOptimistic = async (judulYangDicari, judul) => {
  const db = await Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "db_article_online",
    port: process.env.DB_PORT,
  });

  try {
    // 
    const [dataArticle] = await db.execute(
      "SELECT * FROM article WHERE judul = ?",
      [judulYangDicari]
    );
    // Jika artikel kosong!
    if (dataArticle.length === 0) {
      throw new Error("Article tidak ditemukan!");
    }
    const judulArtikel = dataArticle[0].judul;
    const versiArtikel = dataArticle[0].versi;

    // Cek berdasarkan judul sebelumnya dengan judul baru dan double check ke versi yang update terbaru
    const [updateResult] = await db.execute(
      "UPDATE article SET judul = ?, versi = versi + 1 WHERE judul = ? AND versi = ?;",
      [judul, judulArtikel, versiArtikel]
    );
    // Kondisi jika update gagal di lakukan!
    if (updateResult.affectedRows === 0) {
      throw new Error("Gagal diupdate, terjadi version conflict!");
    }

    console.log("Article berhasil diupdate!");
  } catch (error) {
    console.error("Error message : ", error.message);
  } finally {
    await db.end();
  }
};

RaceconditionOptimistic("Judul-Artikel-1", "Judul-Artikel-3");
RaceconditionOptimistic("Judul-Artikel-1", "Judul-Artikel-2");
