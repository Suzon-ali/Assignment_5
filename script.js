

let totalSeats = 40;
let selectedSeats = 0;
const ticketPrice = 550;
const ticketPrices = [];
const coupon1 = 'NEW15';
const coupon2 = 'Couple 20';
let grandTotal = 0;
let finalGrandTotal = 0;
let offer = 0;
let coupon = ''
let phoneNumber = null;


const seats = document.querySelectorAll('.seat');
const seatLeftContainer = document.getElementById('seat-left');
const seatsContainer = document.getElementById('seats-container');
const totalPriceContainer =  document.getElementById("total_price");
const grandTotalContainer =  document.getElementById('grand_total');
const couponContainer =  document.getElementById('coupon');
const applyCoupon = document.getElementById('apply');
const couponBox = document.getElementById('coupon_box');
const discountContainer = document.getElementById('discount_container');
const discountAmountContainer = document.getElementById('discount_amount');
const nextButon = document.getElementById('next_button');
const phoneNumberCointainer = document.getElementById('passenger_phone_number');
const modal = document.getElementById('modal');
let isNumber = false;


couponContainer.addEventListener("keyup", function(){
    coupon = couponContainer.value ;
    console.log(coupon);
});
phoneNumberCointainer.addEventListener('keyup', function(){
    phoneNumber = parseFloat(phoneNumberCointainer.value);
    if(typeof phoneNumber === 'number'){
        isNumber = true;
    }else{
        isNumber = false;
    }

    if(selectedSeats > 0 && isNumber && phoneNumberCointainer.value !== '' ){
        nextButon.removeAttribute('disabled');
        nextButon.classList.add('bg-success');
    }else{
        nextButon.setAttribute('disabled', 'disabled');
        nextButon.classList.remove('bg-success');
    }

});


applyCoupon.addEventListener('click', ()=>{
    console.log("clicked on apply button")
    if(coupon === ''){
        alert('Please insert coupon code');
    }
    else if(coupon === coupon1){
        offer = grandTotal / 100 * 15;
        finalGrandTotal = grandTotal - offer;
        grandTotalContainer.innerText = finalGrandTotal;
        couponBox.style.display = 'none';
        discountContainer.classList.remove('hidden');
        discountAmountContainer.innerText = offer;
        
    }else if(coupon === coupon2){
        offer = grandTotal / 100 * 20;
        finalGrandTotal = grandTotal - offer;
        grandTotalContainer.innerText = finalGrandTotal;
        couponBox.style.display = 'none';
        discountContainer.classList.remove('hidden');
        discountAmountContainer.innerText = offer;
    }else{
        alert("coupon is not correct");
    }
})

function seatCount() {
    const selectedSeatCointainer = document.querySelectorAll('.selected_seat');
    selectedSeats = selectedSeatCointainer.length;
    let totalSeatLeft = totalSeats - selectedSeats; 
    seatLeftContainer.innerText = totalSeatLeft;
    let selectedSeatContainer = document.getElementById('selected_seat_amount');
    selectedSeatContainer.innerText = selectedSeats;

}

function calculateTotalPrice (){
    let totalPrice = 0;

   for(price of ticketPrices){
    totalPrice += price;
   }
   totalPriceContainer.innerText = totalPrice;
   grandTotal = totalPrice ;
   grandTotalContainer.innerText = grandTotal ;

   console.log(totalPrice)
}

function addtoCart (seatName){
        const li = document.createElement('li');
        li.classList.add("flex" ,"justify-between" ,"items-center" ,"text-low_white");

        const div1 = document.createElement('div');
        div1.textContent = seatName ;
        const div2 = document.createElement('div');
        div2.textContent = "Economy";
        const div3 = document.createElement('div');
        div3.classList.add("ticket_price");
        div3.textContent = "550";

        li.appendChild(div1);
        li.appendChild(div2);
        li.appendChild(div3);

        const seatCart = document.getElementById('seat_cart');

        seatCart.appendChild(li);
}

nextButon.addEventListener('click', function(){
    modal.classList.remove('hidden');
    modal.classList.add('flex');
})


for(let i=0; i <= seats.length; i++){
    seats[i].addEventListener('click', (e)=>{
        
        if(selectedSeats > 0 && isNumber && phoneNumberCointainer.value !== '' ){
            nextButon.removeAttribute('disabled');
            nextButon.classList.add('bg-success');
        }else{
            nextButon.setAttribute('disabled', 'disabled');
            nextButon.classList.remove('bg-success');
        }
        console.log(ticketPrices);


        if (selectedSeats >= 4) {
            alert('You can not buy more than 4 seats');
            return; 
        }
        if(e.target.classList.contains('selected_seat')){
            alert('seat already selected')
            return ;
        }
        e.target.classList.add('selected_seat','text-white');
        const seatName = e.target.innerText;
        addtoCart(seatName);
        ticketPrices.push(ticketPrice);
        calculateTotalPrice();
        seatCount();
        
        if(selectedSeats > 0 && isNumber && phoneNumberCointainer.value !== '' ){
            nextButon.removeAttribute('disabled');
            nextButon.classList.add('bg-success');
        }else{
            nextButon.setAttribute('disabled', 'disabled');
            nextButon.classList.remove('bg-success');
        }

        if(selectedSeats === 4){
            applyCoupon.removeAttribute('disabled');
            applyCoupon.classList.remove('bg-gray-400');
            applyCoupon.classList.add('bg-success');
        }
        

    })  
}

