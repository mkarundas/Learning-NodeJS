export class UserController {


    static login(req, res, next) {
        // const data = [{name: 'arundas mk'}];
        // res.status(200).send(data);

        const error = Error('This is a text error');
        next(error);
    }
}