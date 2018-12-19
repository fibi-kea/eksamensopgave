//	global var
let news = [];
let news_item;

let newsTemplate = document.querySelector("[data-newsTemplate]");
let newsContainer = document.querySelector("[data-newsContainer]");

//	dokument DOM loadet
document.addEventListener("DOMContentLoaded", hentJson);


//--------------------------- Indhent sideindhold ---------------------------------


//	hent json
async function hentJson() {
	console.log("hentJson");

	//	Hent json-data wordpress content
	let jsonData = await fetch("http://imkennykennedy.com/kea/2_semester/tema_eksamen/wordpress/wp-json/wp/v2/pages/735");

	let side = await jsonData.json();

	//	test json-import
	console.log(side);

	let dest = document.querySelector("[data-container]");

	//	indsæt i DOM

	//	SEO title & description
	dest.querySelector("[data-seo_title]").textContent = "produkcts | " + side.title.rendered;
	dest.querySelector("[data-seo_description]").setAttribute("content", side.acf.seo_description);

	hentJsonNews();
}

//--------------------------- Indlæs news ---------------------------------


//	hent json
async function hentJsonNews() {
	console.log("hentJsonNews");

	//	Hent wordpress content fra custom post type
	let jsonData = await fetch("http://imkennykennedy.com/kea/2_semester/tema_eksamen/wordpress/wp-json/wp/v2/news");

	news = await jsonData.json();

	//	test json-import
	console.log(news);

	visNews();
}


//	vis nyheder
function visNews() {

	//	Kør loop for produkt 1
	news.forEach(news_item => {
		console.log(news_item);

		//	Klon? ja tak
		let klon = newsTemplate.cloneNode(true).content;


		klon.querySelector("[data-link_all]").addEventListener("click", () => {
			window.location.href = "news_article.html?p=" + news_item.slug;
		});
		klon.querySelector("[data-billede]").setAttribute("src", news_item.acf.photo.sizes.medium_large);
		klon.querySelector("[data-billede]").setAttribute("alt", news_item.acf.short_description);
		klon.querySelector("[data-dato]").textContent = news_item.acf.dato_picker;
		klon.querySelector("[data-title]").textContent = news_item.title.rendered;
		klon.querySelector("[data-short_description]").textContent = news_item.acf.short_desciption;


		//	tilføj html DOM
		newsContainer.appendChild(klon);
		console.log("news_items er indlæst");
		console.log("news-slug er: " + news_item.slug);
	});
}
