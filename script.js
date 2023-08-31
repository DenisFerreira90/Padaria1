document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-button");
    const costTableBody = document.getElementById("cost-table-body");
    const totalCostValue = document.getElementById("total-cost-value");
    const revenueValue = document.getElementById("revenue-value");

    let totalCost = 0;

    addButton.addEventListener("click", function () {
        const ingredientInput = document.getElementById("ingredient");
        const quantityInput = document.getElementById("quantity");
        const unitSelect = document.getElementById("unit");
        const costInput = document.getElementById("cost");
        const additionalCostInput = document.getElementById("additional-cost");

        const ingredient = ingredientInput.value;
        const quantity = quantityInput.value;
        const unit = unitSelect.value;
        const cost = parseFloat(costInput.value);
        const additionalCost = parseFloat(additionalCostInput.value);
        const total = (cost * quantity) + additionalCost;

        totalCost += total;
        totalCostValue.textContent = totalCost.toFixed(2);

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${ingredient}</td>
            <td>${quantity} ${unit}</td>
            <td>${unit}</td>
            <td>${cost.toFixed(2)}</td>
            <td>${additionalCost.toFixed(2)}</td>
            <td>${total.toFixed(2)}</td>
        `;

        costTableBody.appendChild(newRow);

        // Limpar campos do formulário
        ingredientInput.value = "";
        quantityInput.value = "";
        unitSelect.value = "mg";
        costInput.value = "";
        additionalCostInput.value = "";
    });

    // ... (seu código existente) ...
});
