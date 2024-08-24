import './style.css';
import { countMain, countToe } from "./sock.js";

function component(type, content) {
    const element = document.createElement(type);
    element.innerHTML = content;
    return element;
}

const form = document.getElementById('sockForm');
const instructions = document.getElementById('instructions');
/**
 * Generate sock pattern
 */
function generate() {
    var gauge = form.elements["gauge"].value;
    var size = form.elements["size"].value;
    var footLength = form.elements["footLength"].value;
    var footCount = countMain(gauge, size);
    var toeCount = countToe(footCount);
    instructions.innerHTML = '';
    instructions.appendChild(component('h2', 'Instructions'));

    instructions.appendChild(component("h3", "Toe"));
    var toeList = component("ul", "");
    var toeInstruct = [
        `Cast on ${toeCount} stitches (${toeCount / 2} on each needle) using a Turkish cast on`,
        "Round 1: Knit across both sides",
        "Round 2, instep: k1, m1r, knit to 1 stitch before the end, m1l, k1",
        "Round 2, sole: k1, m1r, knit to 1 stitch before the end, m1l, k1",
        "Round 3: Knit across both sides",
        `Rounds 4-${(footCount - toeCount) / 2 + 1}: Repeat rounds 2-3 (end with ${footCount / 2} sts on each side, ${footCount} sts total)`,
    ];
    for (var i of toeInstruct) {
        toeList.appendChild(component("li", i));
    }
    instructions.appendChild(toeList);

    instructions.appendChild(component('h3', 'Foot'));
    var footList = component('ul', '');
    footList.appendChild(component('li', `Work in St st across both sides until sock measures approximately ${footLength - 2}"`));
    footList.appendChild(component('li', 'Knit across instep one more time to reach the heel stitches'));
    instructions.appendChild(footList);

    instructions.appendChild(component('h3', 'TODO: heel'));

    instructions.appendChild(component('h3', 'Leg'));
    var legList = component('ul', '');
    legList.appendChild(component('li', `Work in St st across both sides until leg measures approximately ${Math.floor(footLength - 2
        )}" (or 2" less than desired leg length)`));
    legList.appendChild(component('li', 'Work in 2x2 rib for 2"'));
    legList.appendChild(component('li', 'Bind off using preferred stretchy bind off'));
    instructions.appendChild(legList);

    var hList = document.querySelectorAll("h3");
    for (var i of hList) {
        i.classList.add("h5");
    }
}
form.addEventListener("submit", function(event) {
    generate();
})