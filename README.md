# IIC Oil & Gas website

Static site (HTML/CSS/JS, no build step). Upload the contents of this folder to any web host.

## Pages
- `index.html` — Home (hero, partners, about, capabilities, products, services, news, sectors, contact)
- `products.html` — Product catalogue, trade process, quotation form
- `news.html` — News listing with category filters, search and load-more
- `article.html?slug=...` — Single article page (built from the news data)

## Adding / editing news
Edit `assets/js/news-data.js`. Instructions are at the top of that file.
Copy an existing entry, give it a unique `slug`, set the `date` and `category`, and write the body in HTML.

## Before going live
- Replace the Unsplash stock photos with your own photography (URLs are in the HTML and `news-data.js`).
- Replace the rebuilt text logo with official logo files if available.
- Forms currently open the visitor's email app (to office@iicpetroleum.com). To receive submissions
  directly, connect the forms to a form service (e.g. Formspree) or your own server.
- Update the social links in the footer (currently generic facebook.com / twitter.com / youtube.com).
- Add the Disclaimer / Terms / Privacy pages (footer links are placeholders).
- Have the starter news articles reviewed internally.

## Local preview
    python -m http.server 5173
then open http://localhost:5173
