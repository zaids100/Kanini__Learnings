let finalAmount=0;
document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', calculateTotal);
});

function calculateTotal() {
  let total = 0;

  document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
    total += parseInt(cb.value);
  });

  let discount = 0;
  
  if (total >= 2000) {
    discount = total * 0.2;
  }

  finalAmount = total - discount;

  document.getElementById('price-summary').innerHTML = `
    Subtotal: Rs ${total}<br>
    Discount: Rs ${discount.toFixed(0)}<br>
    <strong>Total Payable: Rs ${finalAmount.toFixed(0)}</strong>
  `;
}

function validateData(){
       const name=document.getElementById('name');
       const phnNum=document.getElementById('phone');
       const email=document.getElementById('email');
       const delivAddr=document.getElementById('address');
       if(!name || !phnNum || !email || !delivAddr){
           return false;
       }
       return true;
}

function placeOrder(){ 
        if(!validateData()){
            return false;
        }
        const form=document.getElementsByTagName('form')[0];
        //  console.log(form);
        if(finalAmount>0){
            form.innerHTML+=`<strong>Your order has been placed successfully. You are requested to pay Rs.${finalAmount.toFixed(0)} on delivery</strong>`;
        }
}

