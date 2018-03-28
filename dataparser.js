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


var yelpData;

d3.csv("yelp_cats_boston-adjusted.csv", parseLine, function(error,data){
        yelpData = data;

})