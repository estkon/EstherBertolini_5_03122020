//protége les routes sélectionnées et vérifie que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //extraire le token du header Authorization de la requête entrante
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //verify pour décoder le token
    const userId = decodedToken.userId; // extraire l'ID utilisateur de notre token
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};