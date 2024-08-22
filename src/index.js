import './style.css';
import countMain from './sock.js';

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
    console.log(footLength);
    instructions.innerHTML = '';
    instructions.appendChild(component('h2', 'Instructions'));

    instructions.appendChild(component('h3', 'TODO: toe'));
    var toeList = component('ul', '');
    toeList.appendChild(component('li', `End toe with ${footCount/2} sts on each side, ${footCount} sts total`));
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
}
form.elements["sockBtn"].addEventListener("click", function(event) {
    event.preventDefault;
    generate();
});