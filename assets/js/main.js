const getData = (url) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText)
}

let owlSearch;

document.addEventListener('DOMContentLoaded', e => {
    owlSearch = new OwlSearch({
        data: getData('https://jsonplaceholder.typicode.com/users'),
        search: {
            fields: ['name', 'username', 'company.name']
        },
        templates: {
            notFound: document.querySelector('#_itemsNotFound').innerHTML,
            itemList: document.querySelector('#_resultItemList').innerHTML,
            item: document.querySelector('#_resultItem').innerHTML
        }
    });

    const resultsEl = document.querySelector('#results');

    document.querySelector('#query').addEventListener('input', e => {
        let value = `${e.target.value}`.trim();
        resultsEl.innerHTML = '';
        if(value && value.length) {
            resultsEl.innerHTML = owlSearch.render(value);
        }
    });
});