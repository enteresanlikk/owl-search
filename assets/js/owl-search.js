class OwlSearch {
    defaults = {
        data: [],
        search: {
            fields: []
        },
        templates: {
            notFound: '',
            itemList: '',
            item: ''
        },
        showAllQuery: '*',
        flattenObject: true
    }

    constructor(options = this.defaults) {
        this.options = {
            ...this.defaults,
            ...options
        };

        if(this.options.flattenObject) {
            this.options.data = this.options.data.map(item => {
                return this.flattenObject(item);
            });
        }
    }

    search(query, data = []) {
        let searchData = this.options.data;
        if(data && data.length > 0) {
            searchData = data;
        }

        if(this.options.showAllQuery !== false && query == this.options.showAllQuery) {
            return searchData;
        }

        let regex = new RegExp(query, 'gim');
        let searchFields = this.options.search.fields;

        let retVal = [];
        for(let item of searchData) {
            let hasItem = null;
            for(let searchField of searchFields) {
                let str = `${item[searchField]}`;
                let hasData = str.match(regex);

                if(hasItem == null && hasData && hasData.length > 0) {
                    hasItem = item;
                }
            }

            if(hasItem != null) {
                retVal.push(hasItem);
            }
        }

        return retVal;
    }

    render(query, data = []) {
        let html = '';
        
        if(query && query.length) {
            let templates = this.options.templates;

            let items = this.search(query, data);
            if(items && items.length > 0) {
                let listHtml = templates.itemList;
                let listItems = [];

                for(let item of items) {
                    let keys = Object.keys(item);

                    let itemHTML = templates.item;
                    for(let key of keys) {
                        itemHTML = itemHTML.replace(new RegExp(`{{${key}}}`, 'gim'), item[key])
                    }

                    listItems.push(itemHTML);
                }

                let resultHtml = listHtml.replace(new RegExp('{{items}}', 'gim'), listItems.join(''));

                html = resultHtml;
            } else {
                html = templates.notFound;
            }
        }

        return html;
    }

    flattenObject(obj) {
        var toReturn = {};

        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;

            if ((typeof obj[i]) == 'object') {
                var flatObject = this.flattenObject(obj[i]);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) continue;

                    toReturn[i + '_' + x] = flatObject[x];
                }
            } else {
                toReturn[i] = obj[i];
            }
        }
        return toReturn;
    }
}