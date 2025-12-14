
import pool from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async (req, res) => {
  const { username, password } = req.body;
  const u = await pool.query("SELECT * FROM users WHERE username=$1",[username]);
  if(!u.rows.length) return res.status(401).json({error:"Invalid"});
  if(!bcrypt.compareSync(password,u.rows[0].password)) return res.status(401).json({error:"Invalid"});
  const token = jwt.sign({id:u.rows[0].id,role:u.rows[0].role},process.env.JWT_SECRET);
  res.json({token,role:u.rows[0].role});
};
