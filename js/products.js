//	global var
let produkter = [];
let produkt;

let produktTemplate = document.querySelector("[data-produktTemplate]");
let produktContainer = document.querySelector("[data-produktContainer]");

//  vars til valg af produkter
let valg_1;
let valg_2;
let valg_3;

//	dokument DOM loadet
document.addEventListener("DOMContentLoaded", hentJson);


//--------------------------- Indhent sideindhold ---------------------------------


//	hent json
async function hentJson() {
	console.log("hentJson");

	//	Hent json-data wordpress content
	let jsonData = await fetch("http://imkennykennedy.com/kea/2_semester/tema_eksamen/wordpress/wp-json/wp/v2/pages/654");

	let side = await jsonData.json();

	//	test json-import
	console.log(side);

	let dest = document.querySelector("[data-container]");

	//	indsæt i DOM

	//	dest.querySelector("[data-overskrift]").textContent = side.acf.overskrift;

	hentJsonProdukter();
}

//--------------------------- Indlæs produkter ---------------------------------


//	hent json
async function hentJsonProdukter() {
	console.log("hentJsonProdukter");

	//	Hent wordpress content fra custom post type
	let jsonData = await fetch("http://imkennykennedy.com/kea/2_semester/tema_eksamen/wordpress/wp-json/wp/v2/products");

	produkter = await jsonData.json();

	//	test json-import
	console.log(produkter);

	visProdukter();
}


//	vis produkter
function visProdukter() {

	//	Filtrer produkter til de 3 valgte på forsiden

	//	Kør loop for produkt 1
	produkter.forEach(produkt => {
		console.log(produkt);

		//	Klon? ja tak
		let klon = produktTemplate.cloneNode(true).content;

		klon.querySelector("[data-link_all]").addEventListener("click", () => {
			window.location.href = "product.html?p=" + produkt.slug;
		});

		klon.querySelector("[data-billede]").setAttribute("src", produkt.acf.photo.sizes.medium_large);
		klon.querySelector("[data-billede]").setAttribute("alt", produkt.acf.short_description);
		klon.querySelector("[data-title]").textContent = produkt.acf.title;
		klon.querySelector("[data-material]").textContent = produkt.acf.material;

		//	tilføj html DOM
		produktContainer.appendChild(klon);
		console.log("produkt er indlæst");
		console.log("produkt-slug er: " + produkt.slug);
	});
}
