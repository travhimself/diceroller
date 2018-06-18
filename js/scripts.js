// initialization

const settings = {};

const entries = document.querySelector('#entries');
const entry_master = document.querySelector('#entries .entry.master');
const add_button = document.querySelector('#controls #add button');
const roll_button = document.querySelector('#controls #roll button');
const total = document.querySelector('#controls #roll span');



// die entry functions

const add_entry = () => {

    let entry_clone = entry_master.cloneNode(true);
    entry_clone.classList.remove('master');

    let die = entry_clone.querySelector('.die select');
    let modtype = entry_clone.querySelector('.mod_type select');
    let mod = entry_clone.querySelector('.mod input');
    let result = entry_clone.querySelector('.result div');

    modtype.value = "+";
    mod.value = "0";
    result.textContent = "";

    const remove_entry = () => {
        entries.removeChild(entry_clone);
    };

    let remove_button = entry_clone.querySelector('button.remove');
    remove_button.removeAttribute('disabled');
    remove_button.addEventListener('click', remove_entry);

    entries.appendChild(entry_clone);
}

add_button.addEventListener('click', add_entry);



// roll function

const roll_dice = () => {

    let dice = document.querySelectorAll('.entry');
    console.log('dice found: ' + dice.length);

    let total_sum = 0;

    for (i = 0; i < dice.length; ++i) {
        let entry = dice[i];
        let die = entry.querySelector('.die select');
        let modtype = entry.querySelector('.mod_type select');
        let mod = entry.querySelector('.mod input');
        let result = entry.querySelector('.result div');

        let local_sum = 0;
        let random_portion = Math.floor((Math.random() * parseInt(die.value)) + 1);
        let mod_portion = parseInt(mod.value) || 0;

        if (modtype.value === "+") {
            local_sum = random_portion + mod_portion;
        } else {
            local_sum = random_portion - mod_portion;
        }

        result.textContent = local_sum;

        console.log(`die ${i+1}: ${local_sum} (${random_portion} ${modtype.value} ${mod_portion})`);

        total_sum = total_sum + local_sum;
    }

    total.textContent = total_sum;

    console.log('total result: ' + total_sum);
    console.log('--')
};

roll_button.addEventListener('click', roll_dice);