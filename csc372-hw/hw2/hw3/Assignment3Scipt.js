document.addEventListener('DOMContentLoaded', () => {
    const dishImages = document.querySelectorAll('.dish-image');
    const dishDescription = document.getElementById('dish-description');

    dishImages.forEach(image => {
        image.addEventListener('click', () => {
    
            dishImages.forEach(img => img.classList.remove('active'));
         
            image.classList.add('active');

          
            const name = image.getAttribute('data-name');
            const desc = image.getAttribute('data-description');
            const price = image.getAttribute('data-price');

            dishDescription.innerHTML = `
                <h3>${name}</h3>
                <p>${desc}</p>
                <p>Price: ${price}</p>
            `;
            dishDescription.classList.add('active');
        });
    });


    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('dish-image')) {
            dishImages.forEach(img => img.classList.remove('active'));
            dishDescription.classList.remove('active');
        }
    });
});

    const dishes = [

        { name: "Margherita Pizza", price: 12 },
        { name: "Quattro Formaggi", price: 14 },
        { name: "Veggie Delight", price: 13 },
     
        { name: "California Roll", price: 8 },
        { name: "Spicy Tuna Roll", price: 9 },
        { name: "Miso Ramen", price: 11 },
     
        { name: "Classic Cheeseburger", price: 10 },
        { name: "BBQ Bacon Burger", price: 12 },
        { name: "Veggie Burger", price: 11 }
    ];

    const dishList = document.querySelector('#dish-list ul');
    const mealPlanList = document.getElementById('meal-plan-list');
    const totalCostElement = document.getElementById('total-cost');

    let mealPlan = {};

    
    dishes.forEach((dish, index) => {
        const li = document.createElement('li');
        li.textContent = `${dish.name} - $${dish.price}`;
        
        const addButton = document.createElement('button');
        addButton.textContent = "Add";
        addButton.classList.add('add-button');
        addButton.dataset.index = index;

        li.appendChild(addButton);
        dishList.appendChild(li);
    });

  
    dishList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-button')) {
            const index = e.target.dataset.index;
            const dish = dishes[index];
            if (mealPlan[dish.name]) {
                mealPlan[dish.name].quantity += 1;
            } else {
                mealPlan[dish.name] = { price: dish.price, quantity: 1 };
            }
            updateMealPlan();
        }
    });

    mealPlanList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-button')) {
            const dishName = e.target.dataset.name;
            delete mealPlan[dishName];
            updateMealPlan();
        }

        if (e.target.classList.contains('increase-button')) {
            const dishName = e.target.dataset.name;
            mealPlan[dishName].quantity += 1;
            updateMealPlan();
        }
    });

    function updateMealPlan() {
        mealPlanList.innerHTML = '';
        let total = 0;
        for (let dish in mealPlan) {
            const li = document.createElement('li');
            li.textContent = `${dish} x${mealPlan[dish].quantity} - $${mealPlan[dish].price * mealPlan[dish].quantity}`;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.classList.add('remove-button');
            removeButton.dataset.name = dish;

            const increaseButton = document.createElement('button');
            increaseButton.textContent = "Add More";
            increaseButton.classList.add('increase-button');
            increaseButton.dataset.name = dish;

            li.appendChild(removeButton);
            li.appendChild(increaseButton);
            mealPlanList.appendChild(li);

            total += mealPlan[dish].price * mealPlan[dish].quantity;
        }
        totalCostElement.textContent = `Total: $${total}`;
    }
