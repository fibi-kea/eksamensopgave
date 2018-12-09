//Hent mainpage indhold

//		dokument DOM loadet
document.addEventListener("DOMContentLoaded", hentJson);

//		hent json
async function hentJson() {
	console.log("hentJson");

	let pageTemplate = document.querySelector("[data-template]");
	let pageContainer = document.querySelector("[data-container]");

	//		Hent json-data wordpress content
	let jsonData = await fetch("http://imkennykennedy.com/kea/2_semester/tema_eksamen/wordpress/wp-json/wp/v2/pages/542");

	side = await jsonData.json();

	//	test json-import
	console.log(side);

	//	Klon & indsæt i DOM
	let klon = pageTemplate.cloneNode(true).content;
	klon.querySelector("[data-overskrift]").textContent = side.acf.overskrift;
	klon.querySelector("[data-underrubrik]").textContent = side.acf.underrubrik;
	pageContainer.appendChild(klon);
}

//------------------------------------------------------------

//Hent produkter

//	global var
let produkter = [];
let produktTemplate = document.querySelector("[data-produktTemplate]");
let produktContainer = document.querySelector("[data-produktContainer]");

//	dokument DOM loadet
document.addEventListener("DOMContentLoaded", hentJsonProdukter);

//	hent json
async function hentJsonProdukter() {
	console.log("hentJsonProdukter");

	//	Hent wordpress content fra custom post type
	let jsonData = await fetch("http://imkennykennedy.com/kea/2_semester/tema_eksamen/wordpress/wp-json/wp/v2/products");

	produkter = await jsonData.json();

	//	test json-import
	console.log(produkter);

	//	begræns antal post vist på siden
	antalProdukter = produkter.slice(0, 3);
	console.log(antalProdukter);

	visProdukter();
}

//	Event-loop
function visProdukter() {

	//	Kør loop med json-data
	antalProdukter.forEach(produkt => {
		console.log(produkt);

		//		Klon? ja tak
		let klon = produktTemplate.cloneNode(true).content;

		klon.querySelector("[data-billede]").setAttribute("src", produkt.acf.photo.sizes.medium_large);
		klon.querySelector("[data-billede]").setAttribute("alt", "Eventbillede for: " + produkt.title.rendered);
		klon.querySelector("[data-title]").textContent = produkt.acf.title;
		klon.querySelector("[data-description]").textContent = produkt.acf.short_description;


		//			klon.querySelector(".event-wrapper").addEventListener("click", () => {
		//				window.location.href = "produkter.html?id=" + event.id;
		//				//				window.location.href = "produkter.html?id=" + event.id + "&preload=" + ("src", event.acf.billede);
		//			});

		//	    tilføj html DOM
		produktContainer.appendChild(klon);
		console.log("loop er kørt");
	});
}
