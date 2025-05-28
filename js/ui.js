export default function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const imagePath = `images/${product.id}.jpg`;
    const fallbackImage = 'images/default.jpg';

    card.innerHTML = `
        <img 
            src="${imagePath}" 
            alt="${product.name}" 
            class="product-image"
            onerror="this.onerror=null; this.src='${fallbackImage}';"
        >
        <h4>${product.name}</h4>
        <p>₴${product.price}</p>
        <a href="product.html?id=${product.id}" class="btn btn-outline">Детальніше</a>
    `;

    return card;
}
