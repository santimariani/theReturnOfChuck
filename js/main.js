'use strict';

const categoryForm = document.createElement('form');

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM Ready");
    const app = document.querySelector('#app');

    app.appendChild(categoryForm);

    fetch('https://api.chucknorris.io/jokes/categories').then(function (response) {
        return response.json()
    }).then(function (data) {
        const filteredCategories = data.filter(function (category) {
            if (category !== 'explicit' && category !=='religion' && category !=='political') {
                return category; 
            }
        });
        generateCategoryList(filteredCategories);
        getQuote();
    })
    .catch(function (error) {
        console.error('Error! ', error);
    });

    const submitButton = document.createElement('button');
    submitButton.type = "submit";
    submitButton.innerText = 'Get Quote';

    categoryForm.append(submitButton);

    categoryForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newCategory = this.querySelector('select').value;
        getQuote(newCategory);
    })

});

function getQuote(category) {
    if (!category) {
        category = 'dev';
    }

    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then(
            function(response) {
                return response.json();
        }
        ).then(function (data) {
            console.log("Data:", data);
            showQuote(data.value);
        });

}

function showQuote(quote) {
    const app = document.querySelector('#app');

    const quoteDisplay = document.createElement('p');
    quoteDisplay.innerText = quote;

    app.appendChild(quoteDisplay);
}

function generateCategoryList(categories) {
    const selectEl = document.createElement('select');

    categories.map(function(category) {
        const optionEl = document.createElement('option');
        optionEl.value = category;
        optionEl.text = category;
        selectEl.appendChild(optionEl);
    })
    
    categoryForm.appendChild(selectEl);
}