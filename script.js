const label_size = document.getElementById('size');
const label_speed = document.getElementById('speed');
const size_slider = document.getElementById('array-size');
const animation_speed_slider = document.getElementById('animation-speed');
const array_elements = document.querySelector('section');
const random_button = document.getElementById('random-button');
const solve_button = document.getElementById('solve-button');

var size = size_slider.value;
var speed = 800;


const speed_dict = {
    "1": 650,
    "2": 500,
    "3": 350,
    "4": 200,
    "5": 50
};


size_slider.addEventListener('change', () => {
    size = size_slider.value;
    label_size.innerHTML = `Size: ${size}/100`;
})

animation_speed_slider.addEventListener('change', () => {
    value = animation_speed_slider.value;
    speed = speed_dict[value];
    label_speed.innerHTML = `Speed: ${value}/5`;
})

solve_button.addEventListener('click', bubble_sort);
random_button.addEventListener('click', randomize_array);


let get_random_number = () => Math.ceil(Math.random() * 100);

function clear_blocks() {
    while (array_elements.firstChild)
        array_elements.removeChild(array_elements.lastChild);
}

function create_block(random, i) {
    let block = document.createElement('div');
    block.classList.add('block');
    block.style.height = `${random * 3}px`;
    block.style.transform = `translate(${i * 18}px)`;
    return block;
}

function create_block_label(random) {
    let label = document.createElement('p');
    label.classList.add('block_id');
    label.innerHTML = random;
    return label;
}

function randomize_array() {
    clear_blocks();
    for (let i = 0; i < size; i += 1) {
        let random_value = get_random_number();
        let block = create_block(random_value, i);
        let bar_label = create_block_label(random_value);
        block.appendChild(bar_label);
        array_elements.appendChild(block);
    }
}

function swap(el1, el2) {
    return new Promise(resolve => {
        let temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;

        window.requestAnimationFrame(() => {
            // Wait for milliseconds between movements according to speed_dict
            setTimeout(() => {
                array_elements.insertBefore(el2, el1);
                resolve();
            }, speed);
        })
    })
}

async function delay(ms) {
    await new Promise(resolve =>
        setTimeout(() => resolve(), ms)
    );
}

async function colorize_block(block, color) {
    block.style.backgroundColor = color;
}

async function disable_solve_button() {
    solve_button.disabled = true;
}

async function enable_solve_button() {
    solve_button.disabled = false;
}

async function bubble_sort() {
    let blocks = document.querySelectorAll(".block");
    disable_solve_button();
    for (let i = 0; i < blocks.length; i += 1) {
        for (let j = 0; j < blocks.length - i - 1; j += 1) {
            colorize_block(blocks[j], "#feca57");
            colorize_block(blocks[j + 1], "#feca57");

            delay(150);     // Delay between comparisons

            let value1 = Number(blocks[j].childNodes[0].innerHTML);
            let value2 = Number(blocks[j + 1].childNodes[0].innerHTML);
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }
            colorize_block(blocks[j], "#f368e0");
            colorize_block(blocks[j + 1], "#f368e0");
        }
        // Colorize the sorted block
        colorize_block(blocks[blocks.length - i - 1], "#222f3e");
    }
    enable_solve_button();
}