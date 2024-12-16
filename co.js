
const cart = JSON.parse(localStorage.getItem("order")) || [];


function loadOrderSummary() {
  const tbody = document.querySelector("#order-summary-table tbody");
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price * item.quantity}</td>
      </tr>
    `;
  });

  document.getElementById("total-price").innerText = `Total: $${total}`;
}


function processOrder() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const zip = document.getElementById("zip").value;
  const cardNumber = document.getElementById("card-number").value;
  const expiryDate = document.getElementById("expiry-date").value;
  const cvv = document.getElementById("cvv").value;

  if (name && email && phone && address && city && zip && cardNumber && expiryDate && cvv) {

    document.querySelector(".thank-you-message").style.display = "block";
    document.querySelector(".checkout-container").style.display = "none";
    setTimeout(() => {
      window.location.href = "thankyou.html";  
    }, 3000);const cart = JSON.parse(localStorage.getItem("order")) || [];

    function loadOrderSummary() {
      const tbody = document.querySelector("#order-summary-table tbody");
      tbody.innerHTML = ""; 
      let total = 0;
    
      
      cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
    
        tbody.innerHTML += `
          <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${itemTotal.toFixed(2)}</td>
          </tr>
        `;
      });
    
      document.getElementById("total-price").innerText = `Total: $${total.toFixed(2)}`;
    }
    
    function processOrder() {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;
      const city = document.getElementById("city").value;
      const zip = document.getElementById("zip").value;
      const cardNumber = document.getElementById("card-number").value;
      const expiryDate = document.getElementById("expiry-date").value;
      const cvv = document.getElementById("cvv").value;
    
     
      if (name && email && phone && address && city && zip && cardNumber && expiryDate && cvv) {
        alert("Order placed successfully!");
        document.querySelector(".thank-you-message").style.display = "block";
        document.querySelector(".checkout-container").style.display = "none";
    
      
        localStorage.removeItem("order");
    
        
        setTimeout(() => {
          window.location.href = "order.html";
        }, 3000);
      } else {
        alert("Please fill in all the fields!");
      }
    }
    
    
    window.onload = loadOrderSummary;
  } else {
    alert("Please fill in all fields.");
  }
}

window.onload = loadOrderSummary;
