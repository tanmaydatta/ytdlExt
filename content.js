function locationHashChanged() {
	var urlToParse = window.location.href;
	if (!document.getElementById("atag")) {
		var imgTag = document.createElement("img");
		imgTag.src = "https://api.icons8.com/download/231c4cb380f2ab0e685e72f32260b21c55a0de16/Color/PNG/256/Very_Basic/download_2-256.png";
		imgTag.style.cssText = "width: 50px; height: 50px; display: block;";	
		imgTag.id = "imgTag";
		var aTag = document.createElement('a');
		aTag.appendChild(imgTag);
		aTag.id="atag";
		aTag.download = "video";
	}
	document.getElementById("watch-headline-title").appendChild(aTag);
	var parseQueryString = function(url) {
	  var urlParams = {};
	  var mUrl = url
	  mUrl.replace(
	    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
	    function($0, $1, $2, $3) {
	      urlParams[$1] = $3;
	    }
	  );
	  
	  return urlParams;
	}
	var videoId = parseQueryString(urlToParse.substr(0)).v;
	if (videoId) {
		$.get("https://ytdlapi.herokuapp.com/" + videoId, function( data ) {
			console.log(data);
			var linkTag = document.getElementById("atag");
			aTag.setAttribute('href',data);
			aTag.style.cssText = "width: 50px; height: 50px; display: block;";
		});
	}
}

console.log(window);

// window.onhashchange = locationHashChanged();


console.log(location.pathname);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //here we get the new 
    console.log(request.data.url);
    console.log(window.location.href);
    window.setTimeout(locationHashChanged, 1000);
});