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
    fetch(form.getAttribute("action")||"/",{
        method: form.getAttribute("method")||"post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(async response => {
        let data = await response.text()
        let element = form
        try {
            data = JSON.parse(data)
        }catch{}
        try {
            if(form.getAttribute("success")) eval(form.getAttribute("success"))
        } catch (error) {
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