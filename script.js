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

let get_random_number = () => Math.ceil(Math.random() * 100)

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
            // Waiting for 250 ms between movements
            setTimeout(() => {
                array_elements.insertBefore(el2, el1);
                resolve();
            }, 450);
        });
    });
}

async function bubble_sort() {
    let blocks = document.querySelectorAll(".block");

    for (let i = 0; i < blocks.length; i += 1) {
        for (let j = 0; j < blocks.length - i - 1; j += 1) {
            blocks[j].style.backgroundColor = "#feca57";
            blocks[j + 1].style.backgroundColor = "#feca57";

            // Waiting for 100 ms before comparisons
            await new Promise(resolve =>
                setTimeout(() => resolve(), 100)
            );

            let value1 = Number(blocks[j].childNodes[0].innerHTML);
            let value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }

            blocks[j].style.backgroundColor = "#f368e0";
            blocks[j + 1].style.backgroundColor = "#f368e0";
        }

        blocks[blocks.length - i - 1].style.backgroundColor = "#222f3e";
    }
}