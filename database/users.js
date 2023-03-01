const connection = require(".");

function groupUsersDrinks(rows) {
    const users = {};
    const ids = new Set();
    rows.forEach(({id, name, ...drink}) =>{
        if(users[id]) {
            users[id].drinks.push(drink);
        } else {
            users[id] = { id, name, drinks: [drink] };
        }
        ids.add(id);
    });
    return Array.from(ids).map(id => users[id]);
}

async function getAllUsers() {
    const [result] = await connection.query("SELECT u.id, u.name, d.id as drink_id, d.name as drink_name from users as u join drinks as d on d.user_id  = u.id order by u.id ASC;");
    return groupUsersDrinks(result);
}

async function findUserById(id, limit = 1) {
    const [[user]] = await connection.query(
        `SELECT * FROM users WHERE id=? LIMIT ?;`, [id, limit]
    );
    return user;
}

async function addUser(info) {
    const [user1] = await connection.query(
        `INSERT INTO users(name, apikey, password, phone_number, email_address) VALUE ( ?, ?,  ?, ?, ?);`,
        [info.name, info.apikey, info.password, info.phone_number, info.email_address]
    )
    return findUserById(user1.insertId);
}

async function UpdateUserId(info, user_id) {
    const [update_user] = await connection.query(
      `UPDATE users SET name = ?, api_key = ?,  email = ?, phone = ? WHERE id = ? `,
      [info.name, info.api_key, info.email, info.phone, user_id]
    );
    return findUserByID(user_id);
  }

  async function patchAll(data, id) {
      const values = [];
      const newKeyVal = Object.keys(data)
        .map((key) => {
          values.push(data[key]);
          return `${key} = ?`;
        })
        .join(", ");
      connection.query(`UPDATE users SET ${newKeyVal} WHERE id = ?`, [
        ...values,
        id,
      ]);
    }
  async function patchAll(info, user_id) {
    const [updateALL] = await connection.query(
      `UPDATE users SET ? WHERE id = ? `,
      [info, user_id]
    );
    return findUserByID(user_id);
  }
  async function DeleteAll(user_id) {
    const [deleteUser] = await connection.query(
      `DELETE FROM users  WHERE id = ? `,
      [user_id]
    );
    return deleteUser;
  }
  
module.exports = {
    getAllUsers,
    findUserById,
    addUser,
    UpdateUserId,
    patchAll,
    DeleteAll
};