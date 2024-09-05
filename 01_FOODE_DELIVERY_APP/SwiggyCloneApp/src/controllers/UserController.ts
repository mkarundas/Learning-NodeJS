export class UserController {


    static login(req, res) {
        const data = [{name: 'arundas mk'}];
        res.status(200).send(data);
    }
}