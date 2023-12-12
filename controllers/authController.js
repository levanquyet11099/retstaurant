const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');



const getlogin = (req, res) => {
  res.render('../views/login/login');
};
const getregister = (req, res) => {
  res.render('../views/login/register');
};
 
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
   
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Username đã tồn tại');
      return res.redirect('/register');
      //return res.status(400).json({ message: 'Username đã tồn tại' });
    }
    const id_user = generateRandomId();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ id_user, username, password: hashedPassword });
    await newUser.save();
    console.log( 'Tài khoản được đăng ký thành công');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    console.log('Tài khoản không được đăng ký thành công');
    res.redirect('/register');
  }
};
  const login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        //return res.status(401).json({ message: 'không có username' });
        req.flash('error_msg','không có username');
        return res.redirect('/login');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        req.flash('error_msg','Sai username or password');
        return res.redirect('/login');
        //return res.status(401).json({ message: 'Sai username or password' });
      }
      //req.session.user = { username: user.username };
      const token = jwt.sign({ userId: String(user.id_user) }, '110901', { expiresIn: '1h' });
      req.session.user = { username: user.username, token };
      
      req.flash('success_msg','Đăng nhập thành công');
      //res.redirect('/api/v1/table/list');
      res.redirect('/index');
    } catch (error) {
      console.error(error);
      //req.flash('error_msg','không thể đăng nhập');
      res.redirect('/login');
    }
  };
  const logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error', err);
        return res.status(500).send('Error');
      }
      res.redirect('/login'); 
    });
  };

  const generateRandomId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomId = '';
  
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
  
    return randomId;
  };


  module.exports = {
    generateRandomId,
    login,
    register,
    getlogin,
    getregister,
    logout,
  };
