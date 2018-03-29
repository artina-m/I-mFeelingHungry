function parseLine(line){
        return {
            name: line["name"],
            img_url: line["image_url"],
            url: line["url"],
            review_count: line["review_count"],
            categories: line["categories"],
            rating: Number(line["rating"]),
            location: line["location"],
            neighborhood: line["neighborhood"],
            nlongitude: Number(line["nlongitude"]),
            nlatitude: Number(line["nlatitude"]),
            longitude: Number(line["longitude"]),
            latitude: Number(line["latitude"]),
            search_category: line["search category"],
            dollar_sign: line["dollar_sign"],
            dollar_text: line["dollar_text"]
        }
}

function createCard(d){
    // This function takes a row from a dataset
    // Creates one card
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
    restInfo.appendChild(para)


    var para = document.createElement("p");
    para.id = "rest_cat"
    var rest_cat = document.createTextNode(d.categories);
    para.appendChild(rest_cat);
    restInfo.appendChild(para)

    
    var para = document.createElement("p");
    para.id = "rest_stars"
    var rest_stars = document.createTextNode(d.rating + "  |  ");
    para.appendChild(rest_stars);
    restInfo.appendChild(para)

    var para = document.createElement("p");
    para.id = "rest_dollars"
    var rest_dollars = document.createTextNode(d.dollar_sign + "  |  ");
    para.appendChild(rest_dollars);
    restInfo.appendChild(para)
    
    var para = document.createElement("a");
    para.id = "rest_website"
    para.href = d.url
    para.target = "_blank"
    var rest_website = document.createTextNode("Reviews");
    para.appendChild(rest_website);
    restInfo.appendChild(para)

    // Create card
    card.appendChild(restPhoto)
    card.appendChild(restInfo)
    document.getElementById("scroll").appendChild(card)    
}


var yelpData;

d3.csv("yelp_cats_boston-adjusted.csv", parseLine, function(error,data){
        yelpData = data;
    
        yelpData.forEach(function(d){
            
            createCard(d)
            
        })

})


