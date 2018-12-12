	//	hent og gem URL variabeler
	let urlParams = new URLSearchParams(window.location.search);

	//	hent produkt-id
	let urlSlug = urlParams.get("p");
	console.log("urlSlug er: " + urlSlug)

	let produkter;


	//	dokument DOM loadet
	document.addEventListener("DOMContentLoaded", hentJson);


	//--------------------------- Indhent sideindhold ---------------------------------


	//	hent json
	async function hentJson() {
		console.log("hentJson");

		//	Hent json-data wordpress content
		let jsonData = await fetch("http://imkennykennedy.com/kea/2_semester/tema_eksamen/wordpress/wp-json/wp/v2/products");

		produkter = await jsonData.json();

		visProdukt();
	}

	function visProdukt() {

		//	Kør loop med json-data
		produkter.forEach(produkt => {

			// test event
			console.log(produkt);

			//hvis eventtype matcher, så kør loop
			if (produkt.slug == urlSlug) {

				let dest = document.querySelector("[data-container]");

				//	indsæt i DOM

				dest.querySelector("[data-seo_title]").textContent = produkt.title.rendered;
				dest.querySelector("[data-seo_description]").setAttribute("content", produkt.acf.seo_description);
				dest.querySelector("[data-title]").textContent = produkt.title.rendered;
				dest.querySelector("[data-designed_for]").textContent = produkt.acf.designed_for;
				dest.querySelector("[data-long_description]").innerHTML = produkt.acf.long_description;
				dest.querySelector("[data-photo_by]").textContent = produkt.acf.photo_by;
				dest.querySelector("[data-billede]").setAttribute("src", produkt.acf.photo.sizes.medium_large);
				dest.querySelector("[data-billede]").setAttribute("alt", produkt.acf.short_description);

				// hentet ind
				console.log("produktet er hentet ind");

			}
		});
	}
