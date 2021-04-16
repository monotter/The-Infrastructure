window.socket = io();
socket.on("newMessage",logMessage)
socket.on("updateMessage",logMessage)
socket.on("deleteMessage",({_id})=>{
    let element = document.querySelector(`#messages>[data-id="${_id}"]`)
    if (!element) return;
    element.remove()
})
function EditMessage(mrow){
    let _id = mrow.getAttribute("data-id")
    let sender = mrow.querySelector(".sender>span.field").innerText
    let content = mrow.querySelector(".content>span.field").innerText
    mrow.classList.remove("plain")
    mrow.classList.add("edit")
    mrow.innerHTML = /*html*/`
        <form method="put" action="/api/message">
            <input type="hidden" name="_id" value="${_id}">
            <label class="sender"><span>Sender:</span> <input name="sender" value="${sender}"></label>
            <label class="content"><span>Content:</span> <textarea name="content">${content}</textarea></label>
            <input type="submit" value="Save">
        </form>
        <form method="get" action="/api/message" success="data.chunk&&logMessage(data.chunk[0])">
            <input type="hidden" name="_id" value="${_id}">
            <input type="submit" value="Cancel">
        </form>
    `
}
function logMessage({_id,sender,content}){
    let container = document.querySelector("#messages")
    let mrow = container.querySelector(`[data-id='${_id}']`)||(document.createElement("div"));
    mrow.classList.add("plain")
    mrow.classList.add("message")
    mrow.classList.remove("edit")
    !mrow.parentNode&&container.append(mrow);
    mrow.setAttribute("data-id",_id)
    mrow.innerHTML = /*html*/`
        <div class="sender"><span>Sender:</span> <span class="field">${sender}</span></div>
        <div class="content"><span>Content:</span> <span class="field">${content}</span></div>
        <button class="updateButton" onclick="EditMessage(this.parentElement)">Update</button>
        <form class="deleteform" method="delete" action="/api/message">
            <input type="hidden" name="_id" value="${_id}">
            <input type="submit" value="Delete">
        </form>
    `
}

fetch("/api/message")
.then(async response => {
    let data = await response.json()
    if(data.chunk)
    data.chunk.forEach(logMessage)
})
function copycontent(element){
    console.log(element)
    var TempInput = document.createElement("input")
    document.body.append(TempInput)
    TempInput.value = element.innerText
    TempInput.select()
    TempInput.setSelectionRange(0, 99999)
    document.execCommand("copy")
    TempInput.remove()
    alert("Copied the text: " + TempInput.value)
}