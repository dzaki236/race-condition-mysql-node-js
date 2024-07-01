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
    // Cek bila donasi < 0
    const [dataArticle] = await db.execute(
      "SELECT * FROM article WHERE judul = ?",
      [judulYangDicari]
    );
    // Jika artikel kosong!
    if (dataArticle.length === 0) {
      throw new Error("Article tidak ditemukan!");
    }
    const judulArtikel = dataArticle[0].judul;
    const [updateResult] = await db.execute(
      "UPDATE article SET judul = ? WHERE judul = ?;",
      [judul, judulArtikel]
    );

    console.log("Article berhasil diupdate!");
  } catch (error) {
    console.error("Error message : ", error.message);
  } finally {
    await db.end();
  }
};

RaceconditionOptimistic("Judul-Artikel-1", "Judul-Artikel-3");
RaceconditionOptimistic("Judul-Artikel-1", "Judul-Artikel-2");
