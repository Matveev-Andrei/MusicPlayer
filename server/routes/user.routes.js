const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/login', UserController.login);
    app.post('/refresh', UserController.refresh);
    app.post('/create', UserController.create);
    app.get('/users', UserController.getAll);
    app.delete('/users/:id', UserController.delete);

    app.put('/addsong/:id', UserController.addSong);
    app.put('/removesong', UserController.removeSong);
}