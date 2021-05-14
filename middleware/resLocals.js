
const Mentor = require('../models/mentor');
const createError = require('http-errors');

async function resLocals(req, res, next) {
  const userId = req.session?.mentor?.id
  const useRole = req.session?.mentor?.role
  if (useRole === 'mentor') {
    if (userId) {
      const currentProfi = await Mentor.findById(userId);
      if (currentProfi) {
        res.locals.mentor = currentProfi
      }
    }
  }
  next()
}

const checkAuth = (req, res, next) => {
  const userId = req.session?.mentor?.id // ? - оператор опциональной последовательности 
  if (userId) {
    return next()
  }
  return res.redirect('/mentor/signup')
}

const checkMyPage = (req, res, next) => {
  const userId = req.session?.mentor?.id // ? - оператор опциональной последовательности 
  const myPage = req.params.id
  if (userId === myPage) {
    res.locals.myPage = true;
    return next()
  }
  return next()
}

const checkEdit = (req, res, next) => {
  const userId = req.session?.mentor?.id // ? - оператор опциональной последовательности 
  const myPage = req.params.id
  if (userId === myPage) {
    res.locals.myPage = true;
    return next()
  }
  return res.redirect(`/`)
}

function createErr(req, res, next) {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
}

function cathErrAndSendAnswer(err, req, res, next) {
  // Получаем текущий ражим работы приложения.
  const appMode = req.app.get('env');
  // Создаём объект, в котором будет храниться ошибка.
  let error;

  // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку. В противно случае отправим пустой объект.
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  // Записываем информацию об ошибке и сам объект ошибки в специальные переменные, доступные на сервере глобально, но только в рамках одного HTTP-запроса.
  res.locals.message = err.message;
  res.locals.error = error;

  // Задаём в будущем ответе статус ошибки. Берём его из объекта ошибки, если он там есть. В противно случае записываем универсальный стату ошибки на сервере - 500.
  res.status(err.status || 500);
  // Формируем HTML-текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа.
  res.render('error');
}

module.exports = {
  resLocals,
  createErr,
  cathErrAndSendAnswer,
  checkAuth,
  checkMyPage,
  checkEdit
}
