function objectToQueryString(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
function serialize(data) {
	let obj = {};
	for (let [key, value] of data) {
		if (obj[key] !== undefined) {
			if (!Array.isArray(obj[key])) {
				obj[key] = [obj[key]];
			}
			obj[key].push(value);
		} else {
			obj[key] = value;
		}
	}
	return obj;
}
function FormEvent(event) {
    event.preventDefault();
    const form = event.target
    let data = serialize(new FormData(form))
    let path = form.getAttribute("action") || "/"
    let method = form.getAttribute("method") || "post"
    if(method.trim().toUpperCase() == "SOCKET" && typeof socket != 'undefined'){
        socket.emit(path, data);
        return;
    }
    if (method.trim().toUpperCase() == "GET") path+=`?${objectToQueryString(data)}`
    fetch(path,{
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: (method.trim().toUpperCase() != "GET")?JSON.stringify(data):undefined
    })
    .then(async response => {
        console.log(response)
        let data = await response.text()
        let element = form
        try {
            data = JSON.parse(data)
        }catch{}
        if(response.status>=200&&response.status<300){
            try {
                if(form.getAttribute("success")) eval(form.getAttribute("success"))
            } catch (error) {
                if(form.getAttribute("error")) eval(form.getAttribute("error"))
            }
        }
        else{
            if(form.getAttribute("error")) eval(form.getAttribute("error"))
        }
    })
}
window.onload = function(){
    document.querySelectorAll("form").forEach((form)=>{
        form.addEventListener('submit', FormEvent);
    })
}
new MutationObserver(function() {
    document.querySelectorAll("form").forEach((form)=>{
        form.addEventListener('submit', FormEvent);
    })
}).observe(document, {subtree: true, childList: true});