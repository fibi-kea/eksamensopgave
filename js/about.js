//	dokument DOM loadet
document.addEventListener("DOMContentLoaded", hentJson);


//--------------------------- Indhent sideindhold ---------------------------------


//	hent json
async function hentJson() {
	console.log("hentJson");

	//	Hent json-data wordpress content
	let jsonData = await fetch("http://imkennykennedy.com/kea/2_semester/tema_eksamen/wordpress/wp-json/wp/v2/pages/16");

	let side = await jsonData.json();

	//	test json-import
	console.log(side);

	let dest = document.querySelector("[data-container]");

	//	indsæt i DOM

	//	SEO title & description
	dest.querySelector("[data-seo_title]").textContent = side.title.rendered;
	dest.querySelector("[data-seo_description]").setAttribute("content", side.acf.seo_description);
	dest.querySelector("[data-biografi]").innerHTML = side.acf.biografi;
}
