const article = document.querySelector("article, .entry.entryPage");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g;  // Regular expression
    const words = text.matchAll(wordMatchRegExp);
    // matchAll returns an iterator, convert to array to get word count
    const wordCount = [...words].length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    const badge = document.createElement("p");
    // Use the same styling as the article's header
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `⏱️ ${readingTime} min read`;

    // Support for API reference docs
    const heading = article.querySelector("h1, h2");
    // Support for article docs with date
    const date = article.querySelector("time")?.parentNode;
    const target = date ?? heading;
    if (target) {
        target.insertAdjacentElement("afterend", badge);
    }
}
