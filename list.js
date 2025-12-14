
import pool from "../db.js";
export default async (req,res)=>{
  const { user_id } = req.query;
  const r = await pool.query("SELECT * FROM notifications WHERE receiver_id=$1 ORDER BY created_at DESC",[user_id]);
  res.json(r.rows);
};
