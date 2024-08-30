import './style.scss';
import { countMain, countToe, countHeel } from "./sock.js";

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
    var heelCount = countHeel(footCount);
    instructions.innerHTML = '';
    instructions.appendChild(component('h2', 'Instructions'));

    if (form.elements["stitchTechnique"].checked) {
        document.getElementById('techniques').classList = 'd-block';
    } else {
        document.getElementById('techniques').classList = 'd-none';
    }

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

    instructions.appendChild(component("h3", "Heel"));
    instructions.appendChild(
        component(
            "span",
            "<em>These heel instructions are for a shadow-wrapped heel, but any other short-row heel can be substituted.</em>",
        ),
    );
    var heelList = component("ul", "");
    var heelRowCount = heelCount[0] * 2; // 1 row to turn each side stitch into a twin stitch
    var heelInstruct = [
        `Row 1 (RS): Knit to 1 stitch before the end of the sole stitches, ts, turn`,
        `Row 2 (WS): Purl to 1 stitch before the end of the sole stitches, ts, turn`,
        `Row 3 (RS): Knit to 1 stitch before the previous twin stitch, ts, turn`,
        `Row 4 (WS): Purl to 1 stitch before the previous twin stitch, ts, turn`,
        `Rows 5-${heelRowCount}: Repeat rows 3-4 ${(heelRowCount - 4) / 2} more times, ending on a wrong side row (${heelCount[0]} twin stitches on each side, ${heelCount[1]} regular stitches in the middle)`,
        `Row ${heelRowCount + 1} (RS): Knit to the first twin stitch, knit both strands of the twin stitch together, make triplet, turn`,
        `Row ${heelRowCount + 2} (WS): Purl to the first twin stitch, purl both strands of the twin stitch together, make triplet, turn`,
        `Row ${heelRowCount + 3} (RS): Knit to the triplet, knit the strands of the triplet together, make triplet, turn`,
        `Row ${heelRowCount + 4} (WS): Purl to the triplet, purl the strands of the triplet together, make triplet, turn`,
        `Rows ${heelRowCount + 5}-${heelRowCount * 2 - 2}: Repeat rows ${heelRowCount + 3}-${heelRowCount + 4} until there is only one triplet left on each side of the heel, ending on a wrong side row`,
        `Row ${heelRowCount * 2 - 1} (RS): Knit to the triplet, knit the strands of the triplet together`,
        `Round ${heelRowCount * 2}, instep: Knit across`,
        `Round ${heelRowCount * 2}, sole: Knit the strands of the last triplet together, knit across`,
    ];
    for (var i of heelInstruct) {
        heelList.appendChild(component("li", i));
    }
    instructions.appendChild(heelList);

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