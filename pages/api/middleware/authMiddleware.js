import jwt from "jsonwebtoken";
import User from "../../../models/User";
import connectDB from "../../../utils/mongoConnect";
const authMiddleware = (handler) => {
  return async (req, res) => {
    await connectDB();
    if (req.body.token) {
      const token = req.body.token;
      try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        return handler(req,res);
      } catch (error) {
        // Token Expired
        const decode = jwt.decode(token, process.env.SECRET_KEY);
        console.log('decode :>> ', decode);
        const user = await User.findOne({ _id: decode.id });
        if (user && user.token == token) {
          const res1 = await user.refToken();
          await user.save();
          if (res1.token) {
            var newToken = res1.token;
            return handler(req, res, newToken);
          } else {
            // Refresh Token Expired. Relogin Page.
            res.json({ error: res1 });
            // {
            //   "error": {
            //     "error": "TokenExpired",
            //     "message": "Refresh Token Expired re-login again."
            //   }
            // }
          }
        } else {
          // Hacker
          res.status(401).json({ 
            error: "Unauthorized",
            message: "Expired Token Used."
           });
        }
      }
    } else {
      res.status(401).json({ err: "UnAuthorized", message: "Missing Token" });
    }
  };
};

export default authMiddleware;

// jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {

//         if (err) {
//           const data = jwt.decode(token, process.env.SECRET_KEY);
//           const id = data.id;
//           const user = await User.findOne({ _id: id });
//           if (user && user.token == token) {
//             jwt.verify(user.refreshToken, process.env.REFRESH_KEY, async(err, data) => {
//               if (err) {
//                 res.status(401).json({
//                   error: "TokenExpired",
//                   err: err,
//                   message: "Refresh Token Expired re-login again.",
//                 });
//               } else {
//                 console.log('user before updating token :>> ', user);
//                 user.token = jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
//                   expiresIn: process.env.SECRET_LIFETIME,
//                 });
//                 await user.save();
//                 console.log('user after updating token :>> ', user);

//               }
//             });
//             console.log('res :>> ', res);
//             if (res?.err) {
//               res.status(401).json({
//                 error: "TokenExpired",
//                 message: "Re-Login Refresh Token Expired.",
//               });
//             } else if ("token" in res) {
//               return handler(req, res, res.token);
//             } else {
//               res.status(500).json({ error: res });
//             }
//           } else {
//             // Hacker
//             res.status(401).json({
//               error: "Unauthorized",
//               message: "Re-Login Again",
//             });
//           }
//           // res
//           //   .status(403)
//           //   .json({ error: "TokenExpired", message: "Session Expired." });
//         } else {
//           return handler(req, res);
//         }
//       });
