// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import authMiddleware from "./middleware/authMiddleware";
const handler = async (req, res) => {
    res.status(200).json({ name: "John Doe" });
};

export default authMiddleware(handler);
