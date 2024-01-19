// import Model Employee
const Employee = require("../models/Employee");

// membuat class employeecontroller
class EmployeeController {
  // ambil dan tampilkan data pegawai
  async index(req, res) { 
    const employees = await Employee.all();

    const data = {
      message: "Get all resources",
      data: employees,
    }; 

    res.status(200).json(data);
    // Jika terjadi kesalahan, mengembalikan respons dengan status 200 dan pesan kesalahan
  } catch (error) {
    const errorResponse = {
      success: false,
      message: "data is empty",
      error: error.message,
    };

    res.status(200).json(errorResponse);
  }

  // Menambahkan data employee
  async store(req, res) {
    const { name, gender, phone, address, email, status, hired_on, timestamp } = req.body;
    const employees = await Employee.create(req.body);
    const data = {
      message: "Resource is added successfully",
      data: employees,
    };

    res.status(201).json(data);
    // Jika terjadi kesalahan, mengembalikan respons dengan status 422 dan pesan kesalahan.
  } catch (error) {
    const errorResponse = {
      success: false,
      message: "all field must be filled correctly",
      error: error.message,
    };

    res.status(422).json(errorResponse);
  }

  // edit data employee
  async update(req, res) {
    const { id } = req.params;

  const employees = await Employee.find(id);

      if (employees) {
            // update data
            const employeeUpdated = await Employee.update(id, req.body);
            const data = {
                message: "Resoures is updated successfully",
                data: employeeUpdated,
            };

            res.status(200).json(data);
        } else {
            // kirim data tidak ada
            const data = {
                message: "Resource not found",
            };

            res.status(404).json(data);
        }



    }

  // menghapus data employee
  async destroy(req, res) {
    const { id } = req.params; // cari id yang ingin dihapus

    const employee = await Employee.find(id);
    // akan melakukan validasi jika data ada atau tidak ada
    if (employee) {
      await Employee.delete(id);
      const data = {
        message: "Resource is delete successfully", //ini adalah pesan jika hapus sukses
      };

      res.status(200).json(data); 
    } else {
  // jika data tidak ada
      const data = {
        message: "Resource not found", //ini adalah pesan yang akan tampil jika resource atau data tidak ada.
      };

      res.status(404).json(data);
    }
  }

  // GET one resource
  async show(req, res) {
    const { id } = req.params;

    const employee = await Employee.find(id);

    if (employee) {
      const data = {
        message: "Get Detail Resource", // ini adalah pesan jika berhasil 
        data: employee,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: "Resource Not Found", //ini adalah pesan jika resource tidak ada
      };

      res.status(404).json(data);
    }
  }

  async search(req, res) {
    const { name } = req.params;
    // melakukan search
    const employee = await Employee.search(name);

    // melakukan validasi jika data ada atau tidak ada
    if (employee) {
        const data = {
            message: "Get Searched Resource",
            data: employee,
        };

        res.status(200).json(data);
    } else {
        const data = {
            message: "Resource not found",
        };

        res.status(404).json(data);
    }
}

async active(req, res) {
    // melakukan pencarian status active
    const employee = await Employee.findByStatus("active");

    // melakukan validasi jika data ada atau tidak ada
    if (employee) {
        const data = {
            message: "Get active Resource",
            data: employee,
        };

        res.status(200).json(data);
    } else {
        const data = {
            message: "Data tidak ada",
        };

        res.status(404).json(data);
    }
}

async inactive(req, res) {
    // melakukan pencarian status inactive menggunakan function findByStatus
    const employee = await Employee.findByStatus("inactive");

    // melakukan validasi jika data ada atau tidak ada
    if (employee) {
        const data = {
            message: "Get inactive Resource",
            data: employee,
        };

        res.status(200).json(data);
    } else {
        const data = {
            message: "Data tidak ada",
        };

        res.status(404).json(data);
    }
}

async terminated(req, res) {
    // melakukan pencarian status menggunakan function findByStatus
    const employee = await Employee.findByStatus("terminated");

    // melakukan validasi jika data ada atau tidak ada
    if (employee) {
        const data = {
            message: "Get terminated Resource",
            data: employee,
        };

        res.status(200).json(data);
    } else {
        const data = {
            message: "Data tidak ada",
        };

        res.status(404).json(data);
    }
}
}

const object = new EmployeeController();

module.exports = object;