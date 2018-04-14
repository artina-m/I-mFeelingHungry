// will hold csv data
var data;
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

// filters based on 'categories', 'dollar_sign', 'neighborhood'. 
// returns array of matched restaurant objects
function filter_search(data, category_filter, price_filter, neighborhood_filter, ) {

    // console.log(category_filter, price_filter, neighborhood_filter);

    var filtered = data.filter(function (row) {
        
        // for 'Any' search on neighborhood
        if (neighborhood_filter == "ANY") {
            if (
                isInArray(row.categories, category_filter) &&
                row.dollar_sign == price_filter) { return row };
        }
        // for search with 3 inputted catgeories
        else{
            // works via an 'and' search
            if (
                isInArray(row.categories, category_filter) &&
                row.dollar_sign == price_filter &&
                (row.neighborhood == neighborhood_filter || row.neighborhood == "NULL")) { return row };
        }
    });
    // drop dups in the data
    return removeDuplicates(filtered, "name");
};


// returns random restaurant from an array
function randomRestaurant(restaurant_arr){
    return restaurant_arr[(Math.floor(Math.random() * restaurant_arr.length))]; 
}


// used in dynamic generation of catgeories

// function combine(multiarr) {
//     return multiarr.map((arr) => arr.map((y) => y[1]));
// };

// function uniqueCategories(data){

//     // this is a 2d array of all categories
//     var allCategories= data.reduce(function (keeper, entry) {
//         return keeper.concat(combine(entry.categories));
//     }, []);

//     // determine unique categories, return as Set of categories
//     let set = new Set([].concat.apply([], allCategories));

//     return Array.from(set);
// }

// these can be dynanmically generated, but this method saves computation time

const prices = ["$", "$$", "$$$", "$$$$"];

const categories = { "Breakfast & Brunch": "breakfast_brunch", "Burgers": "burgers", "Sandwiches": "sandwiches", "Mexican": "mexican", "Japanese": "japanese", "Italian": "italian", "Pizza": "pizza", "Seafood": "seafood", "Live/Raw Food": "raw_food", "American (New)": "newamerican", "Mediterranean": "mediterranean", "Vegan": "vegan", "Gluten-Free": "gluten_free", "Spanish": "spanish", "Wine Bars": "wine_bars", "Tapas/Small Plates": "tapasmallplates", "Salad": "salad", "Juice Bars & Smoothies": "juicebars", "Vegetarian": "vegetarian", "Indian": "indpak", "Belgian": "belgian", "American (Traditional)": "tradamerican", "Pubs": "pubs", "Korean": "korean", "Asian Fusion": "asianfusion", "Lounges": "lounges", "Coffee & Tea": "coffee", "Cafes": "cafes", "Delis": "delis", "Grocery": "grocery", "Bakeries": "bakeries", "Gastropubs": "gastropubs", "Bars": "bars", "Cocktail Bars": "cocktailbars", "Desserts": "desserts", "French": "french", "Steakhouses": "steak", "Cheese Shops": "cheese", "Sushi Bars": "sushi", "Bubble Tea": "bubbletea", "Vietnamese": "vietnamese", "Caterers": "catering", "Cheesesteaks": "cheesesteaks", "Diners": "diners", "Turkish": "turkish", "Falafel": "falafel", "Pakistani": "pakistani", "Bangladeshi": "bangladeshi", "Himalayan/Nepalese": "himalayan", "Halal": "halal", "Fast Food": "hotdogs", "Hot Pot": "hotpot", "Chinese": "chinese", "Ramen": "ramen", "Mongolian": "mongolian", "Dim Sum": "dimsum", "Cantonese": "cantonese", "Latin American": "latin", "Food Trucks": "foodtrucks", "Thai": "thai", "Ice Cream & Frozen Yogurt": "icecream", "Donuts": "donuts", "Food Stands": "foodstands", "Cupcakes": "cupcakes", "Greek": "greek", "Ethnic Food": "ethnicmarkets", "Armenian": "armenian", "Middle Eastern": "mideastern", "Polish": "polish", "Ukrainian": "ukrainian", "Shopping": "shopping" };

const neighborhoods = ["Financial District", "North End", "Waterfront", "East Boston", "Downtown", "South End", "NULL", "Beacon Hill", "Back Bay", "South Boston", "Chinatown", "Allston/Brighton", "Charlestown", "Kendall Square/MIT", "Dorchester", "Teele Square", "Jamaica Plain", "Inman Square", "Harvard Square", "Fenway", "Mission Hill", "Porter Square", "North Cambridge", "West Roxbury", "Coolidge Corner"];


$("#mySearch").autocomplete({
    source: Object.keys(categories)
});

// make the serializeArray into a nicer object
function objectifyForm(formArray) {
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
};

// pick a random restaurant from the CSV 
function generate_random() {
    let random = randomRestaurant(data);
    return random;
};

d3.csv("yelp_cats_boston.csv", cleanse_row, function (d) {
    data = d;
    var filtered_results;
    console.log("Cleaned data:");
    console.log(data)

    // grab inputs from frontend form
    $("form").on("submit", function (event) {
        event.preventDefault();
        var input_searches = objectifyForm($(this).serializeArray());

        filtered_results = filter_search(data, categories[input_searches.category_filter], input_searches.price_filter, input_searches.neighborhood_filter);
        console.log("results going into card generation from USER SELECTION");
        console.log(filtered_results);
        //remove current cards and generate new ones here....
    });

    // handle random generation
    $("#random_generator").click(function (){
        filtered_results = generate_random();
        
        console.log("results going into card generation from RANDOM");
        console.log(filtered_results);
        //remove current cards and generate new ones here....
    });


    



    // generate unique categories from the data
    // let uniqueCats = uniqueCategories(data);
    // console.log(uniqueCats);
   

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
    // let filtered_results = filter_search(data, "mexican", "$", "East Boston");

    // console.log("filtered_results of a test filter:");
    // console.log(filtered_results);
    // console.log("random restaurant from this filtered array:");
    // console.log(randomRestaurant(filtered_results));

    // // render a card 
    // filtered_results.forEach(element => {
    //     createCard(element);
    // });

});