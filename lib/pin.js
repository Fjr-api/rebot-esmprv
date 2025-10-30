import axios from 'axios';

function isPin(url) {
  if (!url) return false;
  const patterns = [
    /^https?:\/\/(?:www\.)?pinterest\.com\/pin\/[\w.-]+/,
    /^https?:\/\/(?:www\.)?pinterest\.[\w.]+\/pin\/[\w.-]+/,
    /^https?:\/\/(?:www\.)?pinterest\.(?:ca|co\.uk|com\.au|de|fr|id|es|mx|br|pt|jp|kr|nz|ru|at|be|ch|cl|dk|fi|gr|ie|nl|no|pl|pt|se|th|tr)\/pin\/[\w.-]+/,
    /^https?:\/\/pin\.it\/[\w.-]+/,
    /^https?:\/\/(?:www\.)?pinterest\.com\/amp\/pin\/[\w.-]+/,
    /^https?:\/\/(?:[a-z]{2}|www)\.pinterest\.com\/pin\/[\w.-]+/,
    /^https?:\/\/(?:www\.)?pinterest\.com\/pin\/[\d]+(?:\/)?$/,
    /^https?:\/\/(?:www\.)?pinterest\.[\w.]+\/pin\/[\d]+(?:\/)?$/,
    /^https?:\/\/(?:www\.)?pinterestcn\.com\/pin\/[\w.-]+/,
    /^https?:\/\/(?:www\.)?pinterest\.com\.[\w.]+\/pin\/[\w.-]+/
];
return patterns.some(pattern => pattern.test(url.trim().toLowerCase()));
}

async function getCookies() {
  try {
    const response = await axios.get('https://www.pinterest.com/csrf_error/');
    const setCookieHeaders = response.headers['set-cookie'];
    if (setCookieHeaders) {
      const cookies = setCookieHeaders.map(cookieString => {
        const cookieParts = cookieString.split(';');
        return cookieParts[0].trim();
    });
      return cookies.join('; ');
  } else {
      console.warn('No set-cookie headers found in the response.');
      return null;
  }
} catch (error) {
    console.error('Error fetching cookies:', error);
    return null;
}
}

async function pindl(pinUrl) {
    try {
        const cookies = await getCookies();
        if (!cookies) {
            console.log('Failed to retrieve cookies. Exiting.');
            return;
        }

        if (!isPin(pinUrl)) {
            console.log('URL bukan pin valid dari Pinterest.');
            return;
        }

        let pinId = pinUrl.split('/pin/')[1]?.replace('/', '')

        if (!pinId) {
            const redirectUrl = await axios.get(pinUrl);
            pinId = redirectUrl.request.res.responseUrl.split('/pin/')[1].split('/')[0];
        }

        const url = 'https://www.pinterest.com/resource/PinResource/get/';
        const params = {
            source_url: `/pin/${pinId}/`,
            data: JSON.stringify({
                options: { field_set_key: "detailed", id: pinId },
                context: {}
            }),
            _: Date.now()
        };

        const headers = {
            'accept': 'application/json, text/javascript, */*, q=0.01',
            'cookie': cookies,
            'referer': 'https://www.pinterest.com/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'x-app-version': 'a9522f',
            'x-pinterest-appstate': 'active',
            'x-pinterest-pws-handler': 'www/[username]/[slug].js',
            'x-pinterest-source-url': '/pin-resource/',
            'x-requested-with': 'XMLHttpRequest'
        };

        const { data } = await axios.get(url, { headers, params });

        if (!data.resource_response.data) {
            console.log('Pin tidak ditemukan atau sudah tidak tersedia.');
            return;
        }

        const pd = data.resource_response.data;
        const mediaUrls = [];

        if (pd.videos) {
            const videoFormats = Object.values(pd.videos.video_list).sort((a, b) => b.width - a.width);
            videoFormats.forEach(video => {
                mediaUrls.push({
                    type: 'video',
                    quality: `${video.width}x${video.height}`,
                    url: video.url,
                    width: video.width,
                    height: video.height
                });
            });
        }

        if (pd.images) {
            const images = {
                original: pd.images.orig,
                large: pd.images['736x'],
                medium: pd.images['474x'],
                small: pd.images['236x'],
                thumbnail: pd.images['170x']
            };
            Object.entries(images).forEach(([quality, image]) => {
                if (image) {
                    mediaUrls.push({
                        type: 'image',
                        quality,
                        url: image.url,
                        width: image.width,
                        height: image.height
                    });
                }
            });
        }

        return {
            id: pd.id,
            title: pd.title || "",
            description: pd.description || "",
            media: mediaUrls
        };

    } catch (error) {
        console.error(error);
        return null;
    }
}

async function pinterest(query) {
    try {
        const cookies = await getCookies();
        if (!cookies) {
            console.log('Failed to retrieve cookies. Exiting.');
            return;
        }

        const url = 'https://www.pinterest.com/resource/BaseSearchResource/get/';

        const params = {
            source_url: `/search/pins/?q=${query}`,
            data: JSON.stringify({
                "options": {
                    "isPrefetch": false,
                    "query": query,
                    "scope": "pins",
                    "no_fetch_context_on_resource": false
                },
                "context": {}
            }),
            _: Date.now()
        };

        const headers = {
            'accept': 'application/json, text/javascript, */*, q=0.01',
            'accept-encoding': 'gzip, deflate',
            'accept-language': 'en-US,en;q=0.9',
            'cookie': cookies,
            'dnt': '1',
            'referer': 'https://www.pinterest.com/',
            'sec-ch-ua': '"Not(A:Brand";v="99", "Microsoft Edge";v="133", "Chromium";v="133"',
            'sec-ch-ua-full-version-list': '"Not(A:Brand";v="99.0.0.0", "Microsoft Edge";v="133.0.3065.92", "Chromium";v="133.0.6943.142"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-model': '""',
            'sec-ch-ua-platform': '"Windows"',
            'sec-ch-ua-platform-version': '"10.0.0"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
            'x-app-version': 'c056fb7',
            'x-pinterest-appstate': 'active',
            'x-pinterest-pws-handler': 'www/[username]/[slug].js',
            'x-pinterest-source-url': '/hargr003/cat-pictures/',
            'x-requested-with': 'XMLHttpRequest'
        };

        const { data } = await axios.get(url, {
            headers: headers,
            params: params
        })

        const container = [];
        const results = data.resource_response.data.results.filter((v) => v.images?.orig);
        results.forEach((result) => {
            container.push({
                upload_by: result.pinner.username,
                fullname: result.pinner.full_name,
                followers: result.pinner.follower_count,
                caption: result.grid_title,
                image: result.images.orig.url,
                source: "https://id.pinterest.com/pin/" + result.id,
            });
        });

        return container;
    } catch (error) {
        console.log(error);
        return [];
    }
}
// module.exports = { pinterest ,pindl }

// async function pin() {
//     let res = await pinterest('cat')
//     console.log(res)

// }
// pin()
export { pinterest, pindl };