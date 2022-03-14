import githubService from "./service.mjs";
import express from "express";

const app = express();

app.get("/", async (req, res) => {
	const data = await githubService.getReposFromUser("takenet");
	res.status(200).json(data);
});

const port = 3000;
app.listen(port, () => {
	console.log(`app running on port ${port}...`);
});
