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

		const data = this.getFinalData(responseData);
		const finalData = {
			avatar,
			cSharpRepos: data,
		};

		return finalData;
	},

	getFinalData: function (data) {
		let cSharpRepositories = [];
		for (let i = 0; i < data.length; i++) {
			let cSharpRepos = this.getCSharpRepositories(data[i]);
			cSharpRepositories = [...cSharpRepositories, ...cSharpRepos];
		}

		const reposOrderedByCreationDate =
			this.sortByCreationDate(cSharpRepositories);
		const finalRepos = this.formatData(reposOrderedByCreationDate).splice(0, 5);

		return finalRepos;
	},

	getCSharpRepositories: function (repositories) {
		return repositories.filter((repository) => repository.language === "C#");
	},

	sortByCreationDate: function (repositories) {
		return repositories.sort(
			(a, b) => new Date(a.created_at) - new Date(b.created_at)
		);
	},

	formatData: function (repositories) {
		return repositories.map((repository) => ({
			repositoryName: repository.name,
			repositoryDescription: repository.description,
		}));
	},
};

export default githubService;
