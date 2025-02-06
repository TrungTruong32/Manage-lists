// JavaScript program to illustrate
// Table sort for both columns and both directions.

function sortTable(n) {
    let table;
    table = document.getElementById('productTable');
    let rows,
      i,
      x,
      y,
      count = 0;
    let switching = true;
  
    // Order is set as ascending
    let direction = 'ascending';
  
    // Run loop until no switching is needed
    while (switching) {
      switching = false;
      let rows = table.rows;
  
      //Loop to go through all rows
      for (i = 1; i < rows.length - 1; i++) {
        var Switch = false;
  
        // Fetch 2 elements that need to be compared
        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];
  
        // Check the direction of order
        if (direction == 'ascending') {
          // Check if 2 rows need to be switched
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If yes, mark Switch as needed and break loop
            Switch = true;
            break;
          }
        } else if (direction == 'descending') {
          // Check direction
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If yes, mark Switch as needed and break loop
            Switch = true;
            break;
          }
        }
      }
      if (Switch) {
        // Function to switch rows and mark switch as completed
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
  
        // Increase count for each switch
        count++;
      } else {
        // Run while loop again for descending order
        if (count == 0 && direction == 'ascending') {
          direction = 'descending';
          switching = true;
        }
      }
    }
  }
function updatePrice() {
    const productNameSelect = document.getElementById("productName");
    const productPriceInput = document.getElementById("productPrice");
    document.getElementById("productQuantity").value = '1';

    const price = productNameSelect.value;
    productPriceInput.value = price ? price : "";
}

let products = [];

function addProduct() {
    const productName = document.getElementById("productName").selectedOptions[0].text;
    const productPrice = parseFloat(document.getElementById("productPrice").value);
    const productQuantity = parseInt(document.getElementById("productQuantity").value);
    const productNote = document.getElementById("productNote").value;

    if (!productName || isNaN(productPrice) || isNaN(productQuantity) || productQuantity <= 0) {
        alert("Vui lòng điền đầy đủ thông tin sản phẩm và số lượng hợp lệ.");
        return;
    }

    const totalPrice = productPrice * productQuantity;

    products.push({
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        total: totalPrice,
        note: productNote
    });

    // Reset form
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productQuantity').value = '';
    document.getElementById('productNote').value = '';


    renderProductList();
    updateSummary();
}

function renderProductList() {
    const danhSachSanPham = document.getElementById("danhSachSanPham");
    danhSachSanPham.innerHTML = "";

    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.total}</td>
            <td>${product.note}</td>
            <td><button onclick="removeProduct(${index})">Xóa</button></td>
        `;
        danhSachSanPham.appendChild(row);
    });
}

function updateSummary() {
    const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
    const totalValue = products.reduce((sum, product) => sum + product.total, 0);

    document.getElementById("totalQuantity").textContent = totalQuantity;
    document.getElementById("totalValue").textContent = totalValue.toLocaleString();
}

function removeProduct(index) {
    products.splice(index, 1);
    renderProductList();
    updateSummary();
}
