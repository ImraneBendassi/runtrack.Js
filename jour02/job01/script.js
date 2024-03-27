
let ma_citation = document.getElementById("citation");
let button = document.getElementById("button");

function citation() {

    button.addEventListener("click", function() {
        console.log(ma_citation.textContent);
    })
}

citation();
