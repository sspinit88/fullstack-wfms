const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');


module.exports.login = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email});

  if (candidate) {
    // Проверка пароля, пользователь существует

    // в if пришлось прописать !passwordResult, так как приходит false, при одинаковых паролях
    // по сути, работает некорректно
    // const passwordResult = bcrypt.compareSync(candidate.password, req.body.password);

    if (candidate.password === req.body.password) {
      // Генерация токена, пароли совпали
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate.id
      }, keys.jwt, {expiresIn: 60 * 60});

      res.status(200).json({
        token: `Bearer ${token}`,
      })
    } else {
      // Пароли не совпали
      res.status(401).json({
        message: `Пароли не совпадают. Попробуйте снова.`
      })
    }
  } else {
    // Пользователя нет, ошибка
    res.status(404).json({
      message: `Пользователь с таким email не найден.`
    })
  }
};


module.exports.register = async function(req, res) {
  // email password
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    // Пользователь существует, нужно отправить ошибку
    res.status(409).json({
      message: 'Такой email уже занят. Попробуйте другой.'
    })
  } else {
    // Нужно создать пользователя
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    });

    try {
      await user.save();
      res.status(201).json(user)
    } catch(e) {
      // Обработать ошибку
    }

  }
};