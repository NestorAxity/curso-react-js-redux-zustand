require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',  // 🔹 Asegúrate de poner el origen correcto del frontend
  credentials: true,  // 🔹 Permite enviar cookies
}));

const users = []; // Simulación de una base de datos en memoria

const SECRET_KEY = process.env.JWT_SECRET || 'secreto-super-seguro';

// 👉 Middleware para verificar el token en cookies
const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: 'Acceso denegado' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
};

// 👉 Ruta de registro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, password: hashedPassword });
  res.json({ message: 'Usuario registrado con éxito' });
});

  // 👉 user
  app.get('/userData', (req, res) => {
    const token = req.headers.authorization
    if (!token) {
        res.status(401).json({ message: 'Token inválido' });
    }
    res.json({ message: 'Perfil privado', user: req.user });
  });

// 👉 Ruta de login (genera y guarda el token en cookies)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

  res.cookie('authToken', token, {
    httpOnly: false,
    secure: false, // Solo HTTPS en producción
    sameSite: 'Strict',
    maxAge: 3600000, // 1 hora
  });

  res.json({ message: 'Login exitoso'});
});

// 👉 Ruta protegida (requiere autenticación)
app.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Perfil privado', user: req.user });
});

// 👉 Ruta de logout (elimina la cookie)
app.post('/logout', (req, res) => {
  res.clearCookie('authToken');
  res.json({ message: 'Logout exitoso' });
});

app.get('/auth/me', (req, res) => {
  const token = req.cookies?.authToken; // Debe coincidir con el nombre de la cookie

  if (!token) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ isAuthenticated: true, user: decoded.username });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
});

app.post('/refresh-token', (req, res) => {
  const token = req.cookies?.authToken;
  if (!token) return res.status(401).json({ message: 'No autenticado' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Si el token expira en menos de 5 minutos, renovarlo
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
    if (expiresIn > 300) {
      return res.status(400).json({ message: 'Token aún válido' });
    }

    // Generar un nuevo token
    const newToken = jwt.sign({ username: decoded.username }, SECRET_KEY, { expiresIn: '1h' });

    // Guardar el nuevo token en la cookie
    res.cookie('authToken', newToken, {
      httpOnly: true,
      secure: true, // Solo para HTTPS
      sameSite: 'Strict',
      maxAge: 3600000, // 1 hora
    });

    res.json({ message: 'Token renovado' });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }


});


const PORT = 8080;
app.listen(PORT, () => console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`));