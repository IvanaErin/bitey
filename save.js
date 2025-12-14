
import pool from "../db.js";
export default async (req,res)=>{
  const { user_id, text } = req.body;
  await pool.query("INSERT INTO reviews(user_id,content) VALUES($1,$2)",[user_id,text]);
  res.json({ok:true});
};
