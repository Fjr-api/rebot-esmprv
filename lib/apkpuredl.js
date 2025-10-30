import * as cheerio from "cheerio"

export const apkpuredl = async (query) => {
	try {
		const response = await fetch(`https://apkpure.com/id/search?q=${encodeURIComponent(query)}`);
		const html = await response.text();
		const $ = cheerio.load(html);
		const apps = [];

		for (const el of $('.search-res li').get()) {
			const appUrl = $(el).find('a.dd').attr('href');
			const appResponse = await fetch(appUrl);
			const appHtml = await appResponse.text();
			const $$ = cheerio.load(appHtml);


			const downloadPageUrl = $$('a.download_apk_news').attr('href');

			if (downloadPageUrl) {
				const downloadPageResponse = await fetch(downloadPageUrl);
				const downloadPageHtml = await downloadPageResponse.text();
				const $$$ = cheerio.load(downloadPageHtml);


				const directDownloadElement = $$$('a.dl-direct-download-btn');
				const directDownloadUrl = directDownloadElement.attr('href');


				let fileSize = 'Unknown';
				const fileSizeBytes = directDownloadElement.attr('data-dt-file_size') ||
				$$$('a.dl-ref').attr('data-dt-file_size');

				if (fileSizeBytes) {
					fileSize = `${Math.round(fileSizeBytes / 1024 / 1024 * 100) / 100} MB`;
				} else {

					const sizeText = $$$('.info-bottom .size').first().text().trim();
					if (sizeText) fileSize = sizeText;
				}

				apps.push({
					title: $(el).find('.p1').text().trim(),
					developer: $(el).find('.p2').text().trim(),
					rating: $(el).find('.star').text().trim(),
					icon: $(el).find('img').attr('src'),
					url: appUrl,
					directDownloadUrl: directDownloadUrl || downloadPageUrl,
					fileSize: fileSize,
					version: directDownloadElement.attr('data-dt-version') || 'Unknown',
					downloadPage: downloadPageUrl
				});
			} 
		}

		return apps;
	} catch (error) {
		console.error('Error:', error);
		return [];
	}
};