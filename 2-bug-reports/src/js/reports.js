import { Octokit } from "octokit";

const octokit = new Octokit({
	auth: "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",
});

export const _technologies = [
	["dotnet/core", "512CD4"],
	["microsoft/dotnet", "7013E8"],
	["openjdk/jdk", "DD6803"],
	["nodejs/node", "417E37"],
	["python/cpython", "FDDF76"],
	["angular/angular", "DD0B31"],
	["php/php", "8892BF"],
	["microsoft/TypeScript", "3178C6"],
	["golang/go", "247D9C"],
	["facebook/react", "61DAFB"],
	["ionic-team/ionic-framework", "4A8BFC"],
	["facebook/react-native", "61DAFB"],
	["mongodb/mongo", "1B6149"],
	["mysql/mysql", "21758F"],
	["postgres/postgres", "346891"],
	["git/git", "F54D27"],
	["docker/compose", "041F31"],
	["kubernetes/kubernetes", "316CE6"],
	["flutter/flutter", "5EC9F8"],
	["NativeScript/NativeScript", "65ADF1"],
];

export const setTechnologyInfo = async () => {
	sessionStorage.setItem("technologies", JSON.stringify([]));

	for (let index = 0; index < _technologies.length; index++) {
		const [owner, repo] = _technologies[index][0].split("/");
		try {
			const { data } = await octokit.rest.repos.get({ owner, repo });
			const technologies = JSON.parse(sessionStorage.getItem("technologies"));

			if (technologies.findIndex((tech) => tech.repo === repo) < 0) {
				technologies.push({
					repo: repo,
					owner: owner,
					forks: data.forks_count,
					stars: data.stargazers_count,
					watchers: data.watchers_count,
					issues: data.open_issues_count,
					color: _technologies[index][1],
					subscribers: data.subscribers_count,
				});
				// update technologies
				sessionStorage.setItem("technologies", JSON.stringify(technologies));
			}
		} catch (_) {
			continue;
		}
	}

	return JSON.parse(sessionStorage.getItem("technologies"));
};
