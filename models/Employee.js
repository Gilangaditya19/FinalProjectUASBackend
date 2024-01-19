// import database
const db = require("../config/database");

// membuat class Employee
class Employee {
  // menampilkan data employee
    static all() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM employees";
        db.query(sql, (sql, results) => {
            resolve(results);
        });
    });
    }

   // Menambahkan data
    static create(Employee) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO employees SET ?";
        db.query(sql, Employee, (err, results) => {
        const newEmployeeId = results.insertId;
        this.all()
            .then(allEmployees => {
            const newEmployee = allEmployees.find(employee => employee.id === newEmployeeId);
            resolve(newEmployee);
            })
            .catch(error => {
            reject(error);
            });
        });
    });
}

    static find(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM employees WHERE id = ?`;
        db.query(sql, id, (err, results) => {
            resolve(results[0]);
        });
    });
}

static findByStatus(status) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM employees WHERE status = ?`;
        db.query(sql, status, (err, results) => {
            resolve(results[0]);
        });
    });
}

static async update(id, data) {
      //Mengupdate data
    await new Promise((resolve, reject) => {
        const sql = "UPDATE employees SET ? WHERE id = ?";
        db.query(sql, [data, id], (err, results) => {
            resolve(results);
        });
    });

    const employee = await this.find(id);
    return employee;
}

static async delete(id) {
    // ini untuk menghapus
    return new Promise((resolve, reject) => {
        // menghapus data
        const sql = "DELETE FROM employees WHERE id = ?";
        db.query(sql, id, (err, results) => {
            resolve(results);
        });
    });
}

static show(id) {
    return new Promise((resolve, reject) => {
        // select data berdasarkan id
        const sql = `SELECT * FROM employees WHERE id = ${id} `;
        db.query(sql, (err, results) => {
            resolve(results);
        });
    });
}

static search(name) {
    return new Promise((resolve, reject) => {
        // select data berdasarkan name
        const sql = `SELECT * FROM employees WHERE name LIKE '%${name}%' `;
        db.query(sql, (err, results) => {
            resolve(results);
        });
    });
}

}

module.exports = Employee;