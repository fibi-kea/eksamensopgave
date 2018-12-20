	//	hent og gem URL variabeler
	let urlParams = new URLSearchParams(window.location.search);

	//	hent produkt-id
	let urlSlug = urlParams.get("p");
	console.log("urlSlug er: " + urlSlug)

	let news;

	//	dokument DOM loadet
	document.addEventListener("DOMContentLoaded", hentJson);


	//--------------------------- Indhent sideindhold ---------------------------------


	//	hent json
	async function hentJson() {
		console.log("hentJson");

		//	Hent json-data wordpress content
		let jsonData = await fetch("http://imkennykennedy.com/kea/2_semester/tema_eksamen/wordpress/wp-json/wp/v2/news");

		news = await jsonData.json();

		visNews();
	}

	function visNews() {

		//	Kør loop med json-data
		news.forEach(news_item => {

			// test event
			console.log(news_item);

			//hvis nyhed matcher, så kør loop
			if (news_item.slug == urlSlug) {

				let dest = document.querySelector("[data-container]");

				//	indsæt i DOM

				dest.querySelector("[data-seo_title]").textContent = "News | " + news_item.title.rendered;
				dest.querySelector("[data-seo_description]").setAttribute("content", news_item.acf.seo_description);
				dest.querySelector("[data-billede]").setAttribute("src", news_item.acf.photo.sizes.medium_large);
				dest.querySelector("[data-billede]").setAttribute("alt", news_item.acf.short_description);
				dest.querySelector("[data-dato]").textContent = news_item.acf.dato_picker;
				dest.querySelector("[data-title]").textContent = news_item.title.rendered;
				dest.querySelector("[data-long_description]").innerHTML = news_item.acf.long_description;
				dest.querySelector("[data-stirub]").textContent = news_item.title.rendered;

				// hentet ind
				console.log("nyhed er hentet ind");

			}
		});
	}
