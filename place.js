
import pool from "../db.js";
export default async (req,res)=>{
  const { user_id, items } = req.body;
  let total = items.reduce((s,i)=>s+i.price*i.qty,0);
  const o = await pool.query("INSERT INTO orders(user_id,total,status) VALUES($1,$2,'pending') RETURNING id",[user_id,total]);
  for(const i of items){
    await pool.query("INSERT INTO order_items(order_id,menu_id,quantity,price) VALUES($1,$2,$3,$4)",
      [o.rows[0].id,i.menu_id,i.qty,i.price]);
  }
  res.json({order_id:o.rows[0].id});
};
