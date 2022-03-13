import passport from "passport";
import nc from "next-connect";
import jwt from "jsonwebtoken";

const handler = nc().get(passport.authenticate("google"), (req: any, res) => {
	const payload = {
		_id: req.user._id,
		email: req.user.email,
		name: req.user.name,
	};
	const token = jwt.sign(payload, process.env.JWT_KEY as string, {
		expiresIn: 60 * 60 * 8, // 8 hours
	});
	const url = "/dashboard?token=" + encodeURI(token);
	res.writeHead(302, {
		Location: url,
	});
	res.end();
});

export default handler;
