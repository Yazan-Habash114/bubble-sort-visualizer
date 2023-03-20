const label_element = document.querySelector('label')
const slider_element = document.querySelector('input')
const array_elements = document.querySelector('section')
const random_button = document.getElementById('random-button')
const solve_button = document.getElementById('solve-button')

var size = slider_element.value

slider_element.addEventListener('change', show_value)
solve_button.addEventListener('click', bubble_sort)
random_button.addEventListener('click', randomize_array)

function show_value() {
    size = slider_element.value
    label_element.innerHTML = size
}

let get_random_number = () => Math.ceil(Math.random() * 30)

function clear_blocks() {
    while (array_elements.firstChild)
        array_elements.removeChild(array_elements.lastChild)
}

function randomize_array() {
    clear_blocks()
    for (let i = 0; i < size; i += 1) {
        let random_value = get_random_number()
        let block = document.createElement('div')
        block.classList.add('block')
        block.style.height = `${random_value * 3}px`
        block.style.transform = `translate(${i * 30}px)`
        bar_label = document.createElement('p')
        bar_label.classList.add('block_id')
        bar_label.innerHTML = random_value
        block.appendChild(bar_label)
        array_elements.appendChild(block)
    }
}

function swap(el1, el2) {
    return new Promise(resolve => {
        let temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;

        window.requestAnimationFrame(() => {
            // Waiting for 0.25 sec
            setTimeout(() => {
                array_elements.insertBefore(el2, el1);
                resolve();
            }, 250);
        });
    });
}

async function bubble_sort(delay = 100) {
    let blocks = document.querySelectorAll(".block");

    // BubbleSort Algorithm
    for (var i = 0; i < blocks.length; i += 1) {
        for (var j = 0; j < blocks.length - i - 1; j += 1) {

            // To change background-color of the
            // blocks to be compared
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";

            // Waiting for 0.1 sec
            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            console.log("run");
            var value1 = Number(blocks[j].childNodes[0].innerHTML);
            var value2 = Number(blocks[j + 1]
                .childNodes[0].innerHTML);

            // Comparing value of two blocks
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }

            // Changing the color to the previous one
            blocks[j].style.backgroundColor = "#6b5b95";
            blocks[j + 1].style.backgroundColor = "#6b5b95";
        }

        // Changing the color of greatest element 
        // Found in the above traversal
        blocks[blocks.length - i - 1]
            .style.backgroundColor = "#13CE66";
    }
}