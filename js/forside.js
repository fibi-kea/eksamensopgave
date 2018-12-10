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
	let jsonData = await fetch("http://imkennykennedy.com/kea/2_semester/tema_eksamen/wordpress/wp-json/wp/v2/pages/542");

	let side = await jsonData.json();

	//	test json-import
	console.log(side);

	let dest = document.querySelector("[data-container]");

	//	indsæt i DOM

	//	Splash
	dest.querySelector("[data-overskrift]").textContent = side.acf.overskrift;
	dest.querySelector("[data-underrubrik]").textContent = side.acf.underrubrik;

	//	Produkter - indhent valg
	valg_1 = side.acf.vaelg_produkt_1;
	valg_2 = side.acf.vaelg_produkt_2;
	valg_3 = side.acf.vaelg_produkt_3;

	//	test valg
	console.log(valg_1);
	console.log(valg_2);
	console.log(valg_3);

	//	Indlæs produkter
	hentJsonProdukter();

	//	about
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


//	Indhent produkter
function visProdukter() {

	//	Kør loop for produkt 1
	produkter.forEach(produkt => {
		console.log(produkt);

		//	Filtrer produkter til de 3 valgte på forsiden
		if (produkt.id == valg_1) {

			//	Klon? ja tak
			let klon = produktTemplate.cloneNode(true).content;

			klon.querySelector("[data-billede]").setAttribute("src", produkt.acf.photo.sizes.medium_large);
			klon.querySelector("[data-billede]").setAttribute("alt", produkt.acf.short_description);
			klon.querySelector("[data-title]").textContent = produkt.acf.title;
			klon.querySelector("[data-description]").textContent = produkt.acf.short_description;
			//	Link fra knap
			klon.querySelector("[data-link]").addEventListener("click", () => {
				window.location.href = "product.html?p=" + produkt.slug;
			});

			//	tilføj html DOM
			produktContainer.appendChild(klon);
			console.log("produkt er indlæst");
			console.log("produkt-slug er: " + produkt.slug);
		}
	});

	//	Kør loop for produkt 2
	produkter.forEach(produkt => {
		console.log(produkt);

		//	Filtrer produkter til de 3 valgte på forsiden
		if (produkt.id == valg_2) {

			//	Klon? ja tak
			let klon = produktTemplate.cloneNode(true).content;

			klon.querySelector("[data-billede]").setAttribute("src", produkt.acf.photo.sizes.medium_large);
			klon.querySelector("[data-billede]").setAttribute("alt", produkt.acf.short_description);
			klon.querySelector("[data-title]").textContent = produkt.acf.title;
			klon.querySelector("[data-description]").textContent = produkt.acf.short_description;
			//	Link fra knap
			klon.querySelector("[data-link]").addEventListener("click", () => {
				window.location.href = "product.html?p=" + produkt.slug;
			});

			//	tilføj html DOM
			produktContainer.appendChild(klon);
			console.log("produkt er indlæst");
			console.log("produkt-slug er: " + produkt.slug);
		}
	});

	//	Kør loop for produkt 3
	produkter.forEach(produkt => {
		console.log(produkt);

		//	Filtrer produkter til de 3 valgte på forsiden
		if (produkt.id == valg_3) {

			//	Klon? ja tak
			let klon = produktTemplate.cloneNode(true).content;

			klon.querySelector("[data-billede]").setAttribute("src", produkt.acf.photo.sizes.medium_large);
			klon.querySelector("[data-billede]").setAttribute("alt", produkt.acf.short_description);
			klon.querySelector("[data-title]").textContent = produkt.acf.title;
			klon.querySelector("[data-description]").textContent = produkt.acf.short_description;
			//	Link fra knap
			klon.querySelector("[data-link]").addEventListener("click", () => {
				window.location.href = "product.html?p=" + produkt.slug;
			});

			//	tilføj html DOM
			produktContainer.appendChild(klon);
			console.log("produkt er indlæst");
			console.log("produkt-slug er: " + produkt.slug);
		}
	});
}
