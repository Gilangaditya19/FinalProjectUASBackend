const EmployeeController = require("../controllers/EmployeeController"); //impor modul employeeController dari file yang terletak di controllers

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => { //  Baris ini mendefinisikan rute baru untuk menangani permintaan HTTP GET ke jalur akar (/) dari server web Anda.
  res.send("Hello HRD API Express"); //Baris ini mengirim respons teks sederhana "Hello HRD API Express" kembali ke klien yang membuat permintaan GET.
});

// Membuat route
router.get("/employees", EmployeeController.index);
router.post("/employees", EmployeeController.store);
router.put("/employees/:id", EmployeeController.update);
router.delete("/employees/:id", EmployeeController.destroy);
router.get("/employees/:id", EmployeeController.show);
router.get("/employees/search/:name", EmployeeController.search);
router.get("/employees/status/active", EmployeeController.active);
router.get("/employees/status/inactive", EmployeeController.inactive);
router.get("/employees/status/terminated", EmployeeController.terminated);

module.exports = router;
