var $ = require('jquery');
var handlebars = require('handlebars');
var _ = require('underscore');

var url = 'https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=sports%20cards&includes=Images,Shop&sort_on=score';


function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);

    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

fetchJSONP(url, function(data){
  var products = data.results;
  displayProduct(products);
    //console.log(titles);
});



function displayProduct(products){
  _.each(products, function(product){
    var source = $('#product-template').html();
    var productTemplate = handlebars.compile(source);
    var renderProductTemplate = productTemplate(product);

    $('.container').append(renderProductTemplate);
  });
}
