
import pool from "../db.js";
export default async (_,res)=>{
  const r = await pool.query("SELECT o.*,u.username FROM orders o JOIN users u ON u.id=o.user_id ORDER BY o.created_at DESC");
  res.json(r.rows);
};
