import axios from "axios";

const githubService = {
	getReposFromUser: async function (user) {
		let currentPage = 1;
		let responseData = [];
		let avatar = "";
		let responseLength;

		do {
			const response = await axios.get(
				`https://api.github.com/users/${user}/repos`,
				{
					params: {
						per_page: 100,
						page: currentPage,
					},
					headers: {
						authorization: "token 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",
					},
				}
			);
			responseData.push(response.data);
			avatar = response.data[0].owner.avatar_url;
			responseLength = response.data.length;
			currentPage++;
		} while (responseLength === 100);

		return responseData;
	},
};

export default githubService;
