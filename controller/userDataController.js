import userData from "../model/user.js";
import bcrypt from "bcrypt";
import generateToken from "../utits/jwtutits.js";
import cloudinary from "../config/cloudinary.js";

const uploadtoCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "mscit_backend" },
      (error, result) => {
            if (error) return reject(error);
        resolve(result)
    })
    stream.end(buffer)
  })
  }


      

export const adduser = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    let imageUrl = "";
      if (req.file) {
        const result = await uploadtoCloudinary(req.file.buffer);
        imageUrl = result.secure_url;
      }

    const userDataVal = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: password,
      image: imageUrl,
    };

    const saveUserData = await userData.create(userDataVal);

    res.status(200).json({ message: "user added successfully", data: saveUserData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const getUserData = await userData.find();

    res.status(200).json({ message: "user get successfully", data: getUserData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleUserData = await userData.findById(id);

    res.status(200).json({ message: "user get successfully", data: getSingleUserData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUserData = await userData.findByIdAndDelete(id);

    res.status(200).json({ message: "user deleted successfully", data: deleteUserData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userDataVal = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    };

    const updateUserData = await userData.findByIdAndUpdate(id, userDataVal, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "user updated successfully", data: updateUserData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const uData = await userData.findOne({ email: req.body.email });
    if (!uData) {
      return res.status(200).json({ message: "User not found", status: 0 });
    }

    const comparePassword = await bcrypt.compare(req.body.password, uData.password);

    if (comparePassword) {
      const token = generateToken(uData);
      return res.status(200).json({ message: "Login Successfully", status: 1, token });
    }

    return res.status(200).json({ message: "Wrong Password", status: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};