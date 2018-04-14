
function createCard(d) {
    // This function takes a row from a dataset
    // Creates one card
    // id = resturant name 

    var card = document.createElement("div");
    card.className = "card";
    card.id = d.name;

    // Photo
    var restPhoto = document.createElement("div")
    restPhoto.id = "rest_photo";

    var photo = document.createElement("img")
    photo.className = "photo"
    photo.src = d.img_url;
    restPhoto.appendChild(photo)

    // Details
    var restInfo = document.createElement("div")
    restInfo.id = "rest_info";

    var para = document.createElement("p");
    para.id = "rest_name"
    var rest_name = document.createTextNode(d.name);
    para.appendChild(rest_name);
    restInfo.appendChild(para);

    var para = document.createElement("p");
    para.id = "rest_cat"
    var rest_cat = document.createTextNode(d.categories);
    para.appendChild(rest_cat);
    restInfo.appendChild(para)

    var para = document.createElement("p");
    para.id = "rest_stars"
    var rest_stars = document.createTextNode("  " + d.rating + "   ");
    para.appendChild(rest_stars);
    restInfo.appendChild(para)

    var para = document.createElement("p");
    para.id = "rest_dollars"
    var rest_dollars = document.createTextNode(d.dollar_sign);
    para.appendChild(rest_dollars);
    restInfo.appendChild(para)

    var para = document.createElement("a");
    para.id = "rest_website"
    para.href = d.url
    para.target = "_blank"
    var rest_website = document.createTextNode("  |  Reviews");
    para.appendChild(rest_website);
    restInfo.appendChild(para)

    // Create card
    card.appendChild(restPhoto)
    card.appendChild(restInfo)
    // modified this getElement, #scroll didnt seem to exist
    document.getElementById("right-mount").appendChild(card)
}

// 2d array to flat array
function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
// check if search category is in this restaurants categories
function isInArray(arr, match_term) {
    let total_array = flatten(arr);
    return total_array.includes(match_term);

}

// theres duplicate rows in the data. For some reason it's true but hard to tell the difference between the objects, this will just filter out by name of restaurant
function removeDuplicates(arr, prop) {
    var obj = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
    }
    var newArr = [];
    for (var key in obj) newArr.push(obj[key]);
    return newArr;
}


// process each row on load
function cleanse_row(row) {
    return {
        categories: JSON.parse("[" + row.categories + "]"),
        dollar_sign: row.dollar_sign,
        dollar_text: row.dollar_text,
        img_url: row.image_url,
        latitude: Number(row.latitude),
        location: JSON.parse(row.location),
        longitude: Number(row.longitude),
        name: row.name,
        neighborhood: (typeof row.neighborhood == "undefined" || row.neighborhood == "") ? "NULL" : row.neighborhood,
        rating: Number(row.rating),
        review_count: Number(row.review_count),
        search_category: (typeof row.search_category == "undefined") ? "NULL" : row.search_category,
        snippet_text: row.snippet_text,
        url: row.url
    };
};

// filters based on 'categories', 'dollar_sign', 'neighborhood'. Arguements from the front end should be passed into this, returns array of restaurant objects

function filter_search(data, category_filter, price_filter, neighborhood_filter, ) {
    // assuming we're using fields: 'categories', 'dollar_sign', neighborhood' for the search

    var filtered = data.filter(function (row) {
        // works via an 'and' search
        if (
            isInArray(row.categories, category_filter) &&
            row.dollar_sign == price_filter &&
            (row.neighborhood == neighborhood_filter || row.neighborhood == "NULL") )
        { return row };

    });
    // drop dups in the data
    return removeDuplicates(filtered, "name");
};


// returns random restaurant from an array
function randomRestaurant(restaurant_arr){
    return restaurant_arr[(Math.floor(Math.random() * restaurant_arr.length))]; 
}



function combine(multiarr) {
    return multiarr.map((arr) => arr.map((y) => y[0]));
};

function uniqueCategories(data){

    // this is a 2d array of all categories
    var allCategories= data.reduce(function (keeper, entry) {
        return keeper.concat(combine(entry.categories));
    }, []);

    // determine unique categories, return as Set of categories
    let set = new Set([].concat.apply([], allCategories));

    
    
    return Array.from(set);
}

// not making this dynamic for time saving purpose
$("#mySearch").autocomplete({
    source: ["Breakfast & Brunch", "Burgers", "Sandwiches", "Mexican", "Japanese", "Italian", "Pizza", "Seafood", "Live/Raw Food", "American (New)", "Mediterranean", "Vegan", "Gluten-Free", "Spanish", "Wine Bars", "Tapas/Small Plates", "Salad", "Juice Bars & Smoothies", "Vegetarian", "Indian", "Belgian", "American (Traditional)", "Pubs", "Korean", "Asian Fusion", "Lounges", "Coffee & Tea", "Cafes", "Delis", "Grocery", "Bakeries", "Gastropubs", "Bars", "Cocktail Bars", "Desserts", "French", "Steakhouses", "Cheese Shops", "Sushi Bars", "Bubble Tea", "Vietnamese", "Caterers", "Cheesesteaks", "Diners", "Turkish", "Falafel", "Pakistani", "Bangladeshi", "Himalayan/Nepalese", "Halal", "Fast Food", "Hot Pot", "Chinese", "Ramen", "Mongolian", "Dim Sum", "Cantonese", "Latin American", "Food Trucks", "Thai", "Ice Cream & Frozen Yogurt", "Donuts", "Food Stands", "Cupcakes", "Greek", "Ethnic Food", "Armenian", "Middle Eastern", "Polish", "Ukrainian", "Shopping"]
});

d3.csv("yelp_cats_boston.csv", cleanse_row, function (data) {
    console.log("Cleaned data:");
    console.log(data)


    // generate unique categories from the data
    // let uniqueCats = uniqueCategories(data);
   

    // tests for output on various filters....
    
    // 8 results
    // let filtered_results = filter_search(data, "sandwiches", "$", "Financial District");
    
    // 3 results
    // let filtered_results = filter_search(data, "italian", "$", "Financial District");
    
    // 3 results
    // let filtered_results = filter_search(data, "cafes", "$", "Financial District");
    
    // 7 results, but also img error
    // let filtered_results = filter_search(data, "indpak", "$$", "Allston/Brighton");
    
    // 2 results
    // let filtered_results = filter_search(data, "pizza", "$$", "East Boston");
    
    // 6 results
    let filtered_results = filter_search(data, "mexican", "$", "East Boston");

    console.log("filtered_results of a test filter:");
    console.log(filtered_results);
    // console.log("random restaurant from this filtered array:");
    // console.log(randomRestaurant(filtered_results));


     // render a card 
     filtered_results.forEach(element => {
         createCard(element);
     });

});