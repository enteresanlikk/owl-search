It allows you to search the data in your hand simply. If you want, you can output your search results according to the template you specify.

# How to use it?
You must include the `owl-search.js` file in your page.

```html
<script src="YOUR_PATH/owl-search.js"></script>
```

You must create a new javascript file and write in it the codes required for the `OwlSearch` class.
```html
<script src="YOUR_PATH/main.js"></script>
```
```javascript
const owlSearch = new OwlSearch({
    data: YOUR_DATA_ARRAY,
    search: {
        fields: FIELDS_TO_SEARCH
    },
    templates: {
        notFound: `NOT_FOUND_HTML`,
        itemList: `ITEMS_HTML`,
        item: `ITEM_HTML`
    }
});
```

# Methods
## `.search('YOUR_KEYWORDS')`
In the data you provide (`data`), according to the fields you specify (`search.fields`), it will search and return `Array`.

## `.render('YOUR_KEYWORDS')`
In the data you provide (`data`), search according to the fields you specify (`search.fields`) and returns 'HTML` according to template.

## `.renderHTML(YOUR_DATA_ARRAY)`
Converts the data you provide in it directly to HTML according to the template.

---

If you just want to get the search results, you will only need to use the method `search () `.

```javascript
const filtered_data = owlSearch.search('YOUR_KEYWORDS')
```

If you want to output HTML according to the template you specify and the keyword entered, you will simply use the method `render ()`.

```javascript
const html_w_keywords = owlSearch.render('YOUR_KEYWORDS')
```

If you want to output `HTML` according to the template you specify and the data available in your hand, you will only need to use the method `renderHTML ()`.

```javascript
const html_only_data = owlSearch.renderHTML(YOUR_DATA_ARRAY)
```

# Parameters
|Name|Type|Default Value|Description|
|-|-|-|-|
|data|`Array`|[]|Data to search.|
|search|[`Search`](#search-model)|||
|templates|[`Template`](#template-model)|||
|showAllQuery|`Boolean | String`|*|When the given value is entered, all the data is drawn. If `false` is given, this function will not work.|
|flattenObject|`Boolean`|`true`|It's used to reduce your nested objects to a single level. The field `user.names.firstname` can be converted to the field `user_names_firstname` and can be used in this way on the `template` side.|
|limit|`Boolean | Number`|`false`|If you want to restrict the number of data to be returned, you can use it. If you give `false`, all the results found will be brought.|

## Search Model
|Name|Type|Default Value|Description|
|-|-|-|-|
|fields|`Array`|[]|The fields to search are determined here.|

## Template Model
|Name|Type|Default Value|Description|
|-|-|-|-|
|notFound|`String`|Empty string||
|itemList|`String`|Empty string||
|item|`String`|Empty string||

# Templates
## Not Found Template
```html
<script type="text/template" id="_itemsNotFound">
    <div class="not-found">
        <p>There were no results.</p>
    </div>
</script>
```

## Item List Template
```html
<script type="text/template" id="_resultItemList">
    <div class="results">
        <ul class="list-unstyled">
            {{items}}
        </ul>
    </div>
</script>
```

## Item Template
```html
<script type="text/template" id="_resultItem">
    <li class="result-item" data-id="{{id}}">
        <div class="inner">
            <b>Name</b>: {{name}}<br>
            <b>Username</b>: {{username}}<br>
            <b>Website</b>: <a href="//{{website}}" target="_blank">{{website}}</a><br>
            <b>Company</b>: {{company_name}}<br>
            <b>Lat, Long</b>: {{address_geo_lat}}, {{address_geo_lng}}
        </div>
    </li>
</script>
```