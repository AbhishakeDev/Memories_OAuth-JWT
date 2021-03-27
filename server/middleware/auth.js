import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        //we are recieving the token from the frontend from the api using the interceptor
        // console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];
        //if token length is greater than 500 then its google auth
        const isCustomAuth = token.length < 500;

        let decodedData;
        //if token is not google's then check if token exist and its our or not
        if (token && isCustomAuth) {
            //test is the secret an should be same when we verify
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id
        }
        //if googlr oauth
        else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub//sub is an google id to differntiate an user
        }
        //this basically gives us permission for the actions after the middleware is executed and gives a green flag 
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;