// STYLES
import "./css/index.css";
import "./css/github-corner.css";

// SCRIPTS
import { setTechnologyInfo } from "./js/reports";
import { Chart, registerables } from "chart.js";

const main = async () => {
	try {
		const technologies = await setTechnologyInfo();
		const ctx = document.getElementById("chart").getContext("2d");
		Chart.register(...registerables);
		new Chart(ctx, {
			type: "radar",
			data: {
				labels: ["Forks", "Stars", "Watchers", "Issues", "Subscribers"],
				datasets: technologies.map((technology) => {
					const { color, repo, forks, stars, watchers, issues, subscribers } = technology;
					return {
						label: repo,
						borderWidth: 1,
						fontColor: "#DCE1E9",
						borderColor: [color],
						backgroundColor: [`#${color}77`],
						borderColor: "#DCE1E9",
						data: [forks, stars, watchers, issues, subscribers],
					};
				}),
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						fullSize: true,
					},
				},
			},
		});
	} catch (err) {
		console.error(err);
	}
};

main().finally((_) => null);
