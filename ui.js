function renderBooks() {
  const list = document.getElementById("bookList");

      const search =
document.getElementById("bookSearch")
?.value.toLowerCase() || "";

  list.innerHTML = "";

  books
.filter(book =>
book.title.toLowerCase().includes(search)
)
.forEach(book => {

    const item = document.createElement("div");

    item.style = `
  margin:15px;
  padding:15px;
  background:#111;
  border:1px solid #333;
  border-radius:12px;
  text-align:left;
`;

    item.innerHTML = `

<div style="
display:flex;
gap:14px;
align-items:flex-start;
">

<!-- BOOK COVER -->
<div style="flex-shrink:0;">

<img src="${book.cover}" style="
width:160px;
height:240px;
object-fit:cover;
border-radius:14px;
border:2px solid rgba(255,255,255,.10);
box-shadow:0 10px 22px rgba(0,0,0,.50);
transition:.3s;
cursor:pointer;
">

</div>

<!-- BOOK DETAILS -->
<div style="
flex:1;
display:flex;
flex-direction:column;
justify-content:space-between;
height:185px;
">

<div>

<div style="
font-size:25px;
font-weight:bold;
color:#fff;
line-height:1.2;
margin-bottom:10px;
">
${book.title}
</div>

<div style="
font-size:15px;
color:#ffc107;
margin-bottom:8px;
">
Author: ${book.author.author}
</div>

<div style="
display:inline-block;
padding:5px 12px;
border-radius:20px;
font-size:13px;
font-weight:bold;
background:${book.locked ? "rgba(255,68,68,.15)" : "rgba(0,255,136,.15)"};
color:${book.locked ? "#ff5555" : "#00ff88"};
border:1px solid ${book.locked ? "#ff5555" : "#00ff88"};
">
${book.locked ? "LOCKED" : "READY TO READ"}
</div>

</div>

<button onclick="openBook('${book.title}')" style="
margin-top:12px;
width:100%;
padding:13px;
border:none;
border-radius:10px;
font-size:18px;
font-weight:bold;
cursor:pointer;
background:${book.locked ? "linear-gradient(90deg,#ff3b3b,#ff6a6a)" : "linear-gradient(90deg,#00d9ff,#00ffff)"};
color:#fff;
box-shadow:0 4px 12px rgba(0,0,0,.35);
">
${book.locked ? "UNLOCK" : "READ NOW"}
</button>

</div>

</div>

<!-- PLANS -->
<div style="
margin-top:16px;
display:flex;
gap:10px;
">

<div style="
flex:1;
background:#141414;
border:1px solid #00eaff;
border-radius:12px;
padding:12px;
text-align:center;
">

<div style="color:#00ffff;font-weight:bold;font-size:16px;">
STARTER
</div>

<div style="
margin-top:8px;
font-size:22px;
font-weight:bold;
color:white;
">
${book.singlePurchase
  ? `<span style="text-decoration:line-through;color:#888;">TSH ${book.plans.starter.price.toLocaleString()}</span>`
  : `TSH ${book.plans.starter.price.toLocaleString()}`
}
</div>

<div style="
margin-top:5px;
font-size:13px;
color:#aaa;
">
${book.singlePurchase
  ? `<span style="color:#ff6666;font-weight:bold;">Not Available</span>`
  : `${book.plans.starter.pages} Pages`
}
</div>

</div>

<div style="
flex:1;
background:#141414;
border:1px solid #00eaff;
border-radius:12px;
padding:12px;
text-align:center;
">

<div style="color:#00ffff;font-weight:bold;font-size:16px;">
STANDARD
</div>

<div style="
margin-top:8px;
font-size:22px;
font-weight:bold;
color:white;
">
${book.singlePurchase
  ? `<span style="text-decoration:line-through;color:#888;">TSH ${book.plans.standard.price.toLocaleString()}</span>`
  : `TSH ${book.plans.standard.price.toLocaleString()}`
}
</div>

<div style="
margin-top:5px;
font-size:13px;
color:#aaa;
">
${book.singlePurchase
  ? `<span style="color:#ff6666;font-weight:bold;">Not Available</span>`
  : `${book.plans.standard.pages} Pages`
}
</div>

</div>

<div style="
flex:1;
background:#141414;
border:1px solid gold;
border-radius:12px;
padding:12px;
text-align:center;
">

<div style="
color:gold;
font-weight:bold;
font-size:16px;
">
PREMIUM
</div>

<div style="
margin-top:8px;
font-size:22px;
font-weight:bold;
color:gold;
">
${book.singlePurchase
  ? `<div style="color:#00ff88;font-size:14px;font-weight:bold;margin-bottom:5px;">✓ Only Available Option</div>
     <div>TSH ${book.plans.premium.price.toLocaleString()}</div>`
  : `TSH ${book.plans.premium.price.toLocaleString()}`
}
</div>

<div style="
margin-top:5px;
font-size:13px;
color:#aaa;
">
Unlimited Access
</div>

</div>

</div>

<div style="
margin-top:15px;
padding:15px;
border:1px solid #00ffff;
border-radius:12px;
background:rgba(0,255,255,0.08);
align-self:flex-start;
">

<div style="
background:#102428;
border:1px solid #00d9ff;
border-radius:14px;
padding:14px;
font-family:Arial,sans-serif;
">

<div style="
text-align:center;
font-size:20px;
font-weight:bold;
color:#00f7ff;
margin-bottom:2px;
">
SECURE PAYMENT
</div>

<div style="
text-align:center;
font-size:11px;
color:#8da4a8;
margin-bottom:12px;
">
Managed by
</div>

<div style="
text-align:center;
font-size:20px;
font-weight:bold;
color:#ffd700;
line-height:1.35;
margin-bottom:14px;
text-shadow:0 0 8px rgba(255,215,0,.35);
">
Trusted Payment Gateway
</div>

<div style="
background:#151515;
border-left:4px solid #00ff88;
border-radius:10px;
padding:10px 12px;
margin-bottom:10px;
">

<div style="
font-size:10px;
color:#888;
letter-spacing:1px;
">
BUSINESS NAME
</div>

<div style="
font-size:22px;
font-weight:bold;
color:#00ff88;
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;
">
DERRICK KIPAJI OF AFRIKA CO
</div>

</div>

<div style="
background:#151515;
border-left:4px solid #ffd700;
border-radius:10px;
padding:10px 12px;
">

<div style="
font-size:10px;
color:#888;
letter-spacing:1px;
">
MERCHANT NUMBER
</div>

<div style="
font-size:22px;
font-weight:bold;
color:#ffd700;
white-space:nowrap;
">
23544652|PROV: HALOTEL|
</div>

</div>

</div>

<div style="
font-size:14px;
color:#aaa;
margin-top:12px;
line-height:1.5;
">
Instant access. Pay, confirm, and receive your license key.
</div>

<a
href="https://wa.me/255742097868?text=Hello%20Voice%20Of%20God,%0A%0AI%20have%20paid%20for%20the%20book:%20${encodeURIComponent(book.title)}%0A%0APayer%20Name:%20_____________%0A%0APlease%20verify%20my%20payment%20and%20send%20my%20license."
target="_blank"
style="
display:block;
margin-top:15px;
background:#25D366;
color:white;
text-align:center;
padding:14px;
border-radius:10px;
font-size:16px;
font-weight:bold;
text-decoration:none;
">
 VERIFY </a>


`;

    list.appendChild(item);
  });

  showRandomVerse();

    }

function showRandomVerse() {

  const verseBox = document.getElementById("dailyVerse");

  if (!verseBox) return;

  const randomVerse =
    bibleVerses[Math.floor(Math.random() * bibleVerses.length)];

  verseBox.innerHTML = `
    <div style="
      color:#00ffff;
      font-size:18px;
      font-weight:bold;
      margin-bottom:10px;
    ">
    Daily Encouragement
    </div>

    <div style="
      color:white;
      font-style:italic;
      margin-bottom:10px;
    ">
      "${randomVerse.verse}"
    </div>

    <div style="
      color:#aaa;
      font-size:14px;
    ">
      — ${randomVerse.reference}
    </div>
  `;

} 

function renderMarket() {

  const container = document.getElementById("marketAds");
  if (!container) return;

  const categoryBox = document.getElementById("marketCategories");

if (categoryBox) {

  categoryBox.innerHTML = "";

  marketCategories.forEach(category => {

    categoryBox.innerHTML += `
      <button
        onclick="selectCategory('${category}')"
        style="
  background:${selectedCategory === category ? '#00ffff' : '#111'};
  color:${selectedCategory === category ? '#000' : '#00ffff'};
  border:1px solid #00ffff;
  border-radius:20px;
  padding:10px 18px;
  font-weight:bold;

  box-shadow:
    0 4px 0 #008b8b,
    0 8px 15px rgba(0,255,255,.35);

  transition:all .2s ease;
"
      >
        ${category}
      </button>
    `;

  });

}

  const search =
    document.getElementById("marketSearch")?.value.toLowerCase() || "";

  container.innerHTML = "";

  const now = new Date();

const filtered = marketAds.filter(company => {

  // Remove expired ads
  if (
    company.expiresAt &&
    new Date(company.expiresAt) <= now
  ) {
    return false;
  }

  // Category filter
  if (
    selectedCategory !== "All" &&
    (!company.categories ||
     !company.categories.includes(selectedCategory))
  ) {
    return false;
  }

  // Search filter
  return (
    (company.company || "").toLowerCase().includes(search) ||
    (company.location || "").toLowerCase().includes(search) ||
    (company.phone || "").toLowerCase().includes(search) ||
    (company.whatsapp || "").toLowerCase().includes(search)
  );

});

  filtered.forEach((company, index) => {

    const imagesSafe = encodeURIComponent(JSON.stringify(company.images || []));

    container.innerHTML += `
      <div class="marketCard" id="company-${index}" style="
        background:#111;
        border:1px solid #00ffff;
        border-radius:15px;
        padding:15px;
        margin-bottom:20px;
      ">

        <img
          class="marketBillboard"
          src="${company.images?.[0] || ''}"
          data-images="${imagesSafe}"
          data-index="0"
          style="
            width:100%;
            border-radius:10px;
            opacity:1;
            transition: opacity 1.2s ease-in-out;
          "
        >

        <div style="
          display:flex;
          flex-wrap:wrap;
          gap:10px;
          align-items:center;
          margin-top:10px;
          font-size:16px;
        ">

          <span style="color:#00ffff;font-weight:bold;">
            ${company.company}
          </span>

          <span style="color:#aaa;">
            ${company.location}
          </span>

          <a href="tel:${company.phone}" style="color:#00ffff;text-decoration:none;">
            Call
          </a>

          <button
           onclick="orderNow(${index})"
           style="
           background:#00ffff;
           color:black;
           border:none;
           border-radius:8px;
           padding:8px 15px;
           font-weight:bold;
           cursor:pointer;
           ">
           OPEN SERVICE
           </button>

        </div>

      </div>
    `;

  });

  // IMPORTANT: restart billboard AFTER render
  setTimeout(() => {
    startMarketBillboard();
  }, 100);

}

function orderNow(index) {

  selectedCompany = marketAds[index];
  activeService = selectedCompany;

  if (!selectedCompany) return;

  document.getElementById("orderContent").innerHTML = `

<img
src="${selectedCompany.images[0]}"
style="
width:100%;
max-height:240px;
object-fit:cover;
border-radius:15px;
margin-bottom:20px;
">

<div id="serviceHeader"></div>

<h2 style="
margin:0;
font-size:30px;
font-weight:900;
text-transform:uppercase;
letter-spacing:2px;
background:linear-gradient(45deg,#00ffff,#ffffff,#00aaff);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
text-shadow:0 0 15px rgba(0,255,255,.4);
">
${selectedCompany.company}
</h2>

<p style="
color:#bbb;
font-size:16px;
margin-top:8px;
margin-bottom:20px;
">
${selectedCompany.location}
</p>

<div style="
margin:20px 0;
padding:16px;
background:linear-gradient(135deg,#0d3b1e,#14532d);
border:1px solid #00ff88;
border-radius:14px;
box-shadow:0 0 15px rgba(0,255,136,.2);
">

<div style="
font-size:18px;
font-weight:900;
color:#00ff88;
margin-bottom:8px;
">
SERVICE STATUS
</div>

<div style="
font-size:16px;
color:white;
line-height:1.6;
">

Booking Status:
<b style="color:#00ff88;">OPEN</b>

<br><br>

Our team is ready to receive your booking or service request.

</div>

</div>

<div id="serviceInfoCard" style="
margin:20px 0;
padding:18px;
background:linear-gradient(135deg,#111,#1d1d1d);
border:1px solid #ffd700;
border-radius:16px;
box-shadow:0 0 18px rgba(255,215,0,.18);
">

<div style="
font-size:19px;
font-weight:900;
color:#ffd700;
margin-bottom:12px;
">
SERVICE INFORMATION
</div>

<div id="serviceInfoText" style="
font-size:16px;
line-height:1.7;
color:#f5f5f5;
">

Welcome to our Digital Service Center.

Please complete your booking request below. Our team will contact you with pricing, availability and confirmation.

</div>

</div>

<div style="
margin:22px 0;
padding:18px;
display:flex;
justify-content:space-between;
align-items:center;
gap:10px;
background:linear-gradient(135deg,#111,#222);
border:1px solid #00ffff;
border-radius:18px;
box-shadow:0 0 18px rgba(0,255,255,.15);
">

<div style="flex:1;text-align:center;">

<div
onclick="showBookingTab()"
style="
width:46px;
height:46px;
margin:auto;
border-radius:50%;
background:#00ffff;
color:#000;
display:flex;
align-items:center;
justify-content:center;
font-size:18px;
font-weight:900;
">
|
</div>

<div style="
margin-top:10px;
font-size:14px;
font-weight:bold;
color:#00ffff;
">
BOOKING
</div>

</div>

<div style="
flex:1;
height:3px;
background:#00ffff;
opacity:.35;
"></div>

<div style="flex:1;text-align:center;">

<div
onclick="showPaymentTab()"
style="
width:46px;
height:46px;
margin:auto;
border-radius:50%;
background:#ffd700;
color:#000;
display:flex;
align-items:center;
justify-content:center;
font-size:18px;
font-weight:900;
">
|
</div>

<div style="
margin-top:10px;
font-size:14px;
font-weight:bold;
color:#ffd700;
">
PAYMENT
</div>

</div>

<div style="
flex:1;
height:3px;
background:#ffd700;
opacity:.35;
"></div>

<div style="flex:1;text-align:center;">

<div
onclick="showConfirmationTab()"
style="
width:46px;
height:46px;
margin:auto;
border-radius:50%;
background:#00ff88;
color:#000;
display:flex;
align-items:center;
justify-content:center;
font-size:18px;
font-weight:900;
">
|
</div>

<div style="
margin-top:10px;
font-size:14px;
font-weight:bold;
color:#00ff88;
">
CONFIRMATION
</div>

</div>

</div>

<div id="bookingDetailsCard" style="
margin:20px 0;
padding:18px;
background:linear-gradient(135deg,#111,#1d1d1d);
border:1px solid #00ffff;
border-radius:16px;
box-shadow:0 0 20px rgba(0,255,255,.18);
">

<div style="
font-size:22px;
font-weight:900;
color:#00ffff;
margin-bottom:18px;
text-align:center;
letter-spacing:1px;
">
BOOKING DETAILS
</div>

<div id="bookingDetailsText" style="
font-size:16px;
line-height:1.8;
color:#ffffff;
">

Loading service details...

</div>

</div>

<div id="paymentContent" style="
display:none;
margin:20px 0;
padding:18px;
background:linear-gradient(135deg,#111,#1d1d1d);
border:1px solid #ffd700;
border-radius:16px;
box-shadow:0 0 20px rgba(255,215,0,.18);
">

<div style="
font-size:22px;
font-weight:900;
color:#ffd700;
margin-bottom:18px;
text-align:center;
letter-spacing:1px;
">
PAYMENT DETAILS
</div>

<div id="paymentDetailsText" style="
font-size:16px;
line-height:1.8;
color:#ffffff;
text-align:center;
">

Payment information will appear here.

</div>

</div>

<div id="confirmationContent" style="
display:none;
margin:20px 0;
padding:18px;
background:linear-gradient(135deg,#111,#1d1d1d);
border:1px solid #00ff88;
border-radius:16px;
box-shadow:0 0 20px rgba(0,255,136,.18);
">

<div
id="confirmationTitle"
style="
font-size:22px;
font-weight:900;
color:#00ff88;
margin-bottom:18px;
text-align:center;
letter-spacing:1px;
">
CONFIRM YOUR BOOKING
</div>

<div id="confirmationDetailsText" style="
font-size:16px;
line-height:1.8;
color:#ffffff;
text-align:center;
">

Preparing your booking details...

</div>

<div
id="dynamicBookingFields"
style="
margin-top:18px;
">
</div>

<input
id="customerName"
placeholder="Your Full Name"
style="
width:100%;
padding:14px;
margin-top:20px;
border:none;
border-radius:10px;
box-sizing:border-box;
">

<input
id="customerPhone"
placeholder="Phone Number"
style="
width:100%;
padding:14px;
margin-top:12px;
border:none;
border-radius:10px;
box-sizing:border-box;
">

<input
id="customerEmail"
type="email"
placeholder="Email Address"
style="
width:100%;
padding:14px;
margin-top:12px;
border:none;
border-radius:10px;
box-sizing:border-box;
">

<input
id="customerLocation"
placeholder="Delivery Location (Optional)"
style="
width:100%;
padding:14px;
margin-top:12px;
border:none;
border-radius:10px;
box-sizing:border-box;
">

<button
type="button"
onclick="getCurrentLocation()"
style="
width:100%;
padding:14px;
margin-top:10px;
background:#00ffff;
color:#000;
border:none;
border-radius:10px;
font-size:16px;
font-weight:bold;
cursor:pointer;
transition:.3s;
">
Use My Current Location|
Tip: Press To Auto Fetch Your Location.
</button>

<div
id="locationVerified"
style="
display:none;
margin-top:10px;
padding:12px;
background:#0b3d1d;
border:1px solid #00ff66;
border-radius:10px;
color:#00ff66;
font-weight:bold;
font-size:15px;
text-align:center;
animation:fadeIn .4s ease;
">
Location Verified
Your GPS location has been attached successfully.
</div>

<input
id="customerProduct"
placeholder="Package/Product or Service (Optional)"
style="
width:100%;
padding:14px;
margin-top:12px;
border:none;
border-radius:10px;
box-sizing:border-box;
">

<input
id="customerQuantity"
placeholder="Quantity (Optional)"
style="
width:100%;
padding:14px;
margin-top:12px;
border:none;
border-radius:10px;
box-sizing:border-box;
">

<textarea
id="customerNote"
placeholder="Additional Notes/Inquiry (Optional)"
style="
width:100%;
height:120px;
padding:14px;
margin-top:12px;
border:none;
border-radius:10px;
box-sizing:border-box;
resize:none;
"></textarea>

<button
onclick="sendOrder()"
style="
width:100%;
margin-top:20px;
padding:18px;
font-size:20px;
font-weight:bold;
background:#00ff88;
color:#000;
border:none;
border-radius:12px;
cursor:pointer;
box-shadow:0 0 18px rgba(0,255,136,.25);
">
CONFIRM & SEND BOOKING
</button>

</div>

`;

  document.getElementById("orderPage").style.display = "block";
  
  document.getElementById("serviceHeader").innerHTML = `
<div style="
background:linear-gradient(135deg,#002b36,#004d66);
border:1px solid #00ffff;
border-radius:12px;
padding:12px;
margin-bottom:20px;
text-align:center;
">

<div style="
font-size:24px;
font-weight:900;
letter-spacing:2px;
text-transform:uppercase;
font-family:Arial,sans-serif;
background:linear-gradient(
180deg,
#fff8dc 0%,
#ffd700 35%,
#ffb300 70%,
#cc8400 100%
);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
text-shadow:
0 2px 0 #8b5a00,
0 4px 10px rgba(255,215,0,.45),
0 0 18px rgba(255,193,7,.35);
margin-bottom:12px;
">
DIGITAL SERVICE CENTER
</div>

<div id="companyBanner"
style="
margin-top:12px;
min-height:120px;
padding:18px;
display:flex;
align-items:center;
justify-content:center;
text-align:center;

font-size:24px;
font-weight:900;
line-height:1.6;
letter-spacing:.8px;

color:#ffffff;

background:
linear-gradient(
135deg,
rgba(0,0,0,.35),
rgba(255,255,255,.08)
);

border:2px solid rgba(255,215,0,.75);

border-radius:16px;

box-shadow:
0 0 15px rgba(255,215,0,.25),
0 0 35px rgba(0,255,255,.15),
inset 0 0 20px rgba(255,255,255,.05);

transition:
opacity .5s ease,
transform .4s ease;

backdrop-filter:blur(4px);
">
Loading...
</div>

</div>
`;

loadServiceBanner();
loadBookingDetails();
updateConfirmationTitle();
updateConfirmationDetails();
updateDynamicBookingFields();

  customerLatitude = "";
customerLongitude = "";

document.getElementById("locationVerified").style.display = "none";

}

function closeOrderPage(){

document.getElementById("orderPage").style.display="none";

}

function getCurrentLocation() {

  if (!navigator.geolocation) {
    alert("Your device does not support GPS.");
    return;
  }

  navigator.geolocation.getCurrentPosition(

    function(position) {

      customerLatitude = position.coords.latitude;
      customerLongitude = position.coords.longitude;
      customerAccuracy = Math.round(position.coords.accuracy);

      let accuracyLevel = "";

if(customerAccuracy <= 10){
  accuracyLevel = "Excellent";
}else if(customerAccuracy <= 25){
  accuracyLevel = "Good";
}else if(customerAccuracy <= 50){
  accuracyLevel = "Fair";
}else{
  accuracyLevel = "Approximate";
}

customerAccuracy = `${customerAccuracy} meters (${accuracyLevel})`;
     
      findNearestLandmark(customerLatitude, customerLongitude);

    },

    function(error) {

      alert("Unable to get your location. Please enable GPS and Location permission.");

    },

    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    }

  );

}

function findNearestLandmark(lat, lon){

fetch(
`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18`
)
.then(res => res.json())
.then(data => {

const address = data.address || {};

const landmark =
address.road ||
address.pedestrian ||
address.footway ||
address.cycleway ||
address.path ||
"";

const area =
address.neighbourhood ||
address.suburb ||
address.quarter ||
address.hamlet ||
address.village ||
address.town ||
"";

const city =
address.city ||
address.county ||
address.state_district ||
address.state ||
"";

document.getElementById("customerLocation").value =
landmark
? `Near ${landmark}, ${area}, ${city}`
: `${area}, ${city}`;

document.getElementById("locationVerified").style.display = "block";

})
.catch(()=>{

document.getElementById("customerLocation").value =
"Current Location";

document.getElementById("locationVerified").style.display = "block";

});

}

function sendOrder(){

let senderName = "";
let senderPhone = "";  

const name=document.getElementById("customerName").value.trim();
const phone=document.getElementById("customerPhone").value.trim();
const email=document.getElementById("customerEmail").value.trim();  
const location=document.getElementById("customerLocation").value.trim();
const product=document.getElementById("customerProduct").value.trim();
const quantity=document.getElementById("customerQuantity").value.trim();
const note=document.getElementById("customerNote").value.trim();

// =========================
// PARCEL DATA
// =========================

const parcelAction =
  document.querySelector('input[name="parcelAction"]:checked')?.value || "";

const parcelType =
  document.getElementById("parcelType")?.value.trim() || "";

const parcelDestination =
  document.getElementById("parcelDestination")?.value.trim() || "";

const parcelReceiverName =
  document.getElementById("parcelReceiverName")?.value.trim() || "";

const parcelReceiverPhone =
  document.getElementById("parcelReceiverPhone")?.value.trim() || "";

const parcelSenderName =
  document.getElementById("parcelSenderName")?.value.trim() || "";

const parcelSenderPhone =
  document.getElementById("parcelSenderPhone")?.value.trim() || "";

const parcelDeliveryLocation =
  document.getElementById("parcelDeliveryLocation")?.value.trim() || "";  

const serviceType = getActiveServiceType();

let dynamicBookingInfo = "";

if(serviceType === "flight"){

  const departure =
    document.getElementById("bookingDeparture")?.value.trim() || "";

  const destination =
    document.getElementById("bookingDestination")?.value.trim() || "";

  const travelDate =
    document.getElementById("bookingTravelDate")?.value || "";

  const passengers =
    document.getElementById("bookingPassengers")?.value || "";

  const travelClass =
    document.getElementById("bookingTravelClass")?.value || "";

  const isFlightTravelSelected =
  document.getElementById("flightTravelChoice")?.checked || false;

    const parcelAction =
    document.querySelector('input[name="parcelAction"]:checked')?.value || "";

  const parcelType =
    document.getElementById("parcelType")?.value.trim() || "";

  const parcelDestination =
    document.getElementById("parcelDestination")?.value.trim() || "";

  const receiverName =
  document.getElementById("parcelReceiverName")?.value.trim() || "";

const receiverPhone =
  document.getElementById("parcelReceiverPhone")?.value.trim() || "";

const senderName =
  document.getElementById("parcelSenderName")?.value.trim() || "";

const senderPhone =
  document.getElementById("parcelSenderPhone")?.value.trim() || "";

const parcelDeliveryLocation =
  document.getElementById("parcelDeliveryLocation")?.value.trim() || "";

 if(isFlightTravelSelected){

  dynamicBookingInfo = `
Service Type:
FLIGHT BOOKING

Departure:
${departure || "Not provided"}

Destination:
${destination || "Not provided"}

Travel Date:
${travelDate || "Not provided"}

Passengers:
${passengers || "Not provided"}

Travel Class:
${travelClass || "Not specified"}
`;

}


// PARCEL INFORMATION STAYS OUTSIDE
// THE TRAVEL IF STATEMENT

dynamicBookingInfo += `

Parcel Service:
${parcelAction || "Not selected"}

Parcel Type:
${parcelType || "Not provided"}

${
  parcelAction === "send"
  ? `
Parcel Destination:
${parcelDestination || "Not provided"}

Receiver Name:
${parcelReceiverName || "Not provided"}

Receiver Phone:
${parcelReceiverPhone || "Not provided"}
`
  : ""
}

${
  parcelAction === "receive"
  ? `
Sender Name:
${parcelSenderName || "Not provided"}

Sender Phone:
${parcelSenderPhone || "Not provided"}

Parcel Delivery Location:
${parcelDeliveryLocation || "Not provided"}
`
  : ""
} 
`;

}

else if(serviceType === "bus"){

  const departure =
    document.getElementById("bookingDeparture")?.value.trim() || "";

  const destination =
    document.getElementById("bookingDestination")?.value.trim() || "";

  const travelDate =
    document.getElementById("bookingTravelDate")?.value || "";

  const passengers =
    document.getElementById("bookingPassengers")?.value || "";

  const isBusTravelSelected =
  document.getElementById("busTravelChoice")?.checked || false;

  const parcelAction =
  document.querySelector('input[name="parcelAction"]:checked')?.value || "";

const parcelType =
  document.getElementById("parcelType")?.value.trim() || "";

const parcelDestination =
  document.getElementById("parcelDestination")?.value.trim() || "";

const parcelReceiverName =
  document.getElementById("parcelReceiverName")?.value.trim() || "";

const parcelReceiverPhone =
  document.getElementById("parcelReceiverPhone")?.value.trim() || "";

const parcelSenderName =
  document.getElementById("parcelSenderName")?.value.trim() || "";

const parcelSenderPhone =
  document.getElementById("parcelSenderPhone")?.value.trim() || "";

const parcelDeliveryLocation =
  document.getElementById("parcelDeliveryLocation")?.value.trim() || "";  

  if(isBusTravelSelected){

  dynamicBookingInfo = `
Service Type:
BUS / TRANSPORT BOOKING

Departure:
${departure || "Not provided"}

Destination:
${destination || "Not provided"}

Travel Date:
${travelDate || "Not provided"}

Passengers:
${passengers || "Not provided"}
`;

}


// ============================================
// BUS PARCEL INFORMATION
// ============================================

if(parcelAction){

  dynamicBookingInfo += `

Parcel Service:
${parcelAction}

Parcel Type:
${parcelType || "Not provided"}
`;


  // SEND PARCEL

  if(parcelAction === "send"){

    dynamicBookingInfo += `

Parcel Destination:
${parcelDestination || "Not provided"}

Receiver Name:
${parcelReceiverName || "Not provided"}

Receiver Phone:
${parcelReceiverPhone || "Not provided"}
`;

  }


  // RECEIVE PARCEL

  if(parcelAction === "receive"){

    dynamicBookingInfo += `

Sender Name:
${parcelSenderName || "Not provided"}

Sender Phone:
${parcelSenderPhone || "Not provided"}

Parcel Delivery Location:
${parcelDeliveryLocation || "Not provided"}
`;

  }

}
}  

else if(serviceType === "tourism"){

  const destination =
    document.getElementById("bookingDestination")?.value.trim() || "";

  const travelDate =
    document.getElementById("bookingTravelDate")?.value || "";

  const passengers =
    document.getElementById("bookingPassengers")?.value || "";

  const adults =
    document.getElementById("bookingAdults")?.value || "";

  const children =
    document.getElementById("bookingChildren")?.value || "";

  const hotel =
    document.getElementById("bookingHotel")?.value || "";

  dynamicBookingInfo = `
Service Type:
TOURISM / SAFARI

Destination:
${destination || "Not provided"}

Travel Date:
${travelDate || "Not provided"}

Total Travelers:
${passengers || "Not provided"}

Adults:
${adults || "Not provided"}

Children:
${children || "Not provided"}

Hotel Accommodation:
${hotel || "Not specified"}
`;

}

else if(serviceType === "hotel"){

  const checkIn =
    document.getElementById("bookingCheckIn")?.value || "";

  const checkOut =
    document.getElementById("bookingCheckOut")?.value || "";

  const guests =
    document.getElementById("bookingGuests")?.value || "";

  const rooms =
    document.getElementById("bookingRooms")?.value || "";

  dynamicBookingInfo = `
Service Type:
HOTEL BOOKING

Check-In:
${checkIn || "Not provided"}

Check-Out:
${checkOut || "Not provided"}

Guests:
${guests || "Not provided"}

Rooms:
${rooms || "Not provided"}
`;

}

else if(serviceType === "product"){

  dynamicBookingInfo = `
Service Type:
PRODUCT ORDER

Product / Service:
${product || "Not specified"}

Quantity:
${quantity || "Not specified"}
`;

}

else{

  const serviceDate =
    document.getElementById("bookingServiceDate")?.value || "";

  dynamicBookingInfo = `
Service Type:
GENERAL SERVICE

Preferred Date:
${serviceDate || "Not provided"}
`;

}  

if(name==="" || phone===""){

alert("Please complete the required information. Thank You.");

return;

}

const mapLink =
(customerLatitude && customerLongitude)
? `https://maps.google.com/?q=${customerLatitude},${customerLongitude}`
: "Location not shared";

const typedLocation =
location || "Not provided";

const message =

`NEW BOOKING REQUEST

Company:
${selectedCompany.company}

Customer:
${name}

Phone:
${phone}

Email:
${email}

Delivery Location:
${typedLocation}

Google Maps:
${mapLink}

GPS Accuracy:
${customerAccuracy}

${dynamicBookingInfo}

Notes:
${note || "None"}

Sent from Afri|Link App.`;

window.open(

`https://wa.me/${selectedCompany.whatsapp}?text=${encodeURIComponent(message)}`,

"_blank"

);

closeOrderPage();

}

async function submitSeatRequest(){

  // =========================
  // GET ACTIVE SERVICE
  // =========================

  const serviceType = getActiveServiceType();


  // =========================
  // ONLY FLIGHT OR BUS
  // =========================

  if(
    serviceType !== "flight" &&
    serviceType !== "bus"
  ){

    alert(
      "Seat requests are only available for Flight and Bus services."
    );

    return;

  }


  // =========================
  // CHECK TRAVEL SELECTION
  // =========================

  const travelSelected =
    serviceType === "flight"
    ? document.getElementById("flightTravelChoice")?.checked
    : document.getElementById("busTravelChoice")?.checked;


  if(!travelSelected){

    alert(
      "Please select TRAVEL first."
    );

    return;

  }


  // =========================
  // CUSTOMER INFORMATION
  // =========================

  const customerName =
    document.getElementById("customerName")
    ?.value
    .trim() || "";

  const customerPhone =
    document.getElementById("customerPhone")
    ?.value
    .trim() || "";


  // =========================
  // TRAVEL INFORMATION
  // =========================

  const departure =
    document.getElementById("bookingDeparture")
    ?.value
    .trim() || "";

  const destination =
    document.getElementById("bookingDestination")
    ?.value
    .trim() || "";

  const travelDate =
    document.getElementById("bookingTravelDate")
    ?.value || "";

  const passengers =
    document.getElementById("bookingPassengers")
    ?.value || "";

  
const travelClass =
  document.getElementById("bookingTravelClass")?.value || "Standard";

  // =========================
  // CHECK REQUIRED INFORMATION
  // =========================

  if(
    customerName === "" ||
    customerPhone === "" ||
    departure === "" ||
    destination === "" ||
    travelDate === "" ||
    passengers === ""
  ){

    alert(
      "Please complete your customer and travel information before requesting a seat."
    );

    return;

  }


// =========================
// GET COMPANY EMAIL
// =========================

const { data: companyData, error: companyError } =
  await client
    .from("companies")
    .select("email")
    .ilike(
      "company_name",
      selectedCompany?.company?.trim()
    )
    .maybeSingle();

if(companyError){

  console.error(
    "COMPANY EMAIL ERROR:",
    companyError
  );

  alert(
    "Unable to find company email:\n\n" +
    companyError.message
  );

  return;

}

const companyEmail =
  companyData?.email || "";

alert(
  "Company Name: " +
  selectedCompany?.company_name +
  "\n\nCompany Data: " +
  JSON.stringify(companyData) +
  "\n\nCompany Email: " +
  companyEmail
);

console.log(
  "COMPANY NAME:",
  selectedCompany?.company_name
);

console.log(
  "COMPANY EMAIL:",
  companyEmail
);
  
  

  const seatRequest = {

  company_name:
  selectedCompany?.company ||
  selectedCompany?.company_name ||
  "",

   company_email:
  companyEmail,

    service_type:
      serviceType,

    customer_name:
      customerName,

    customer_phone:
      customerPhone,

    departure:
      departure,

    destination:
      destination,

    travel_date:
      travelDate,

    passengers:
  Number(passengers),

travel_class:
  travelClass,

status:
  "pending"

  };


  // =========================
  // SEND TO SUPABASE
  // IMPORTANT:
  // YOUR SUPABASE CLIENT IS "client"
  // =========================

const {
  data: {
    session
  }
} = await client.auth.getSession();

console.log(
  "SUPABASE SESSION:",
  session
);

console.log(
  "SUPABASE ACCESS TOKEN:",
  session?.access_token
);
  

  const { data, error } = await client
  .from("seat_requests")
  .insert([seatRequest])
  .select()
  .single();

  if(error){

  console.error("SEAT REQUEST ERROR:", error);

  alert(
    "SUPABASE ERROR:\n\n" +
    error.message
  );

  return;

}

showSeatRequestPayNow(data);


  // =========================
  // HANDLE ERROR
  // =========================

 if(error){

  console.error("SEAT REQUEST ERROR:", error);

  alert(
    "SUPABASE ERROR:\n\n" +
    error.message
  );

  return;

} 

  // =========================
  // SUCCESS
  // =========================

  console.log(
    "Seat request submitted successfully:",
    data
  );

  alert(
    "Your seat request has been submitted successfully. Please wait for the available seat update."
  );

}


// =========================================
// CHECK MY SEAT - SEARCH SUPABASE
// =========================================

async function checkMySeat(){

  // =======================================
  // GET CUSTOMER DETAILS
  // =======================================

  const customerName =
    document
      .getElementById("checkSeatCustomerName")
      ?.value
      .trim() || "";

  const customerPhone =
    document
      .getElementById("checkSeatCustomerPhone")
      ?.value
      .trim() || "";

  const departure =
    document
      .getElementById("checkSeatDeparture")
      ?.value
      .trim() || "";

  const destination =
    document
      .getElementById("checkSeatDestination")
      ?.value
      .trim() || "";

  const travelDate =
    document
      .getElementById("checkSeatTravelDate")
      ?.value || "";


  // =======================================
  // RESULT BOX
  // =======================================

  const resultBox =
    document.getElementById(
      "checkSeatResult"
    );


  // =======================================
  // VALIDATE
  // =======================================

  if(
    customerName === "" ||
    customerPhone === "" ||
    departure === "" ||
    destination === "" ||
    travelDate === ""
  ){

    resultBox.style.display = "block";

    resultBox.innerHTML = `
      <div style="
        color:#ffcc00;
        font-weight:900;
      ">
        Please complete all information
        before checking your seat.
      </div>
    `;

    return;

  }


  // =======================================
  // SHOW LOADING
  // =======================================

  resultBox.style.display = "block";

  resultBox.innerHTML = `
    <div style="
      color:#00ffff;
      font-weight:900;
    ">
      Checking your seat availability...
    </div>
  `;


  // =======================================
  // SEARCH SUPABASE
  // =======================================

  const {
    data,
    error
  } = await client

    .from("seat_requests")

    .select("*")

    .eq(
      "customer_name",
      customerName
    )

    .eq(
      "customer_phone",
      customerPhone
    )

    .eq(
      "departure",
      departure
    )

    .eq(
      "destination",
      destination
    )

    .eq(
      "travel_date",
      travelDate
    )

    .order(
      "created_at",
      {
        ascending:false
      }
    )

    .limit(1);


  // =======================================
  // DATABASE ERROR
  // =======================================

  if(error){

    console.error(
      "Check seat error:",
      error
    );

    resultBox.innerHTML = `
      <div style="
        color:#ff4444;
        font-weight:900;
      ">
        Unable to check your seat.
      </div>

      <div style="
        margin-top:8px;
        font-size:13px;
      ">
        Please check your internet connection
        and try again.
      </div>
    `;

    return;

  }


  // =======================================
  // NO REQUEST FOUND
  // =======================================

  if(
    !data ||
    data.length === 0
  ){

    resultBox.innerHTML = `
      <div style="
        color:#ffcc00;
        font-weight:900;
      ">
        No seat request found.
      </div>

      <div style="
        margin-top:8px;
        font-size:13px;
      ">
        Please make sure you entered the
        same information used when you
        submitted your seat request.
      </div>
    `;

    return;

  }


  // =======================================
  // GET REQUEST
  // =======================================

  const request =
    data[0];


  // =======================================
  // REQUEST STILL PENDING
  // =======================================

  if(
    request.status === "pending" ||
    !request.available_seats
  ){

    resultBox.innerHTML = `
      <div style="
        color:#00ffff;
        font-weight:900;
      ">
        YOUR REQUEST IS STILL BEING REVIEWED
      </div>

      <div style="
        margin-top:8px;
        font-size:13px;
      ">
        The in-charge has not updated
        the available seats yet.
        Please check again later.
      </div>
    `;

    return;

  }


  // =======================================
  // SEATS AVAILABLE
  // =======================================

 if(
  request.status === "seats_available" &&
  request.available_seats
){

  // =======================================
  // GET PASSENGER COUNT
  // =======================================

  const passengerCount =
    Number(request.passengers) || 1;


  // =======================================
  // CONVERT AVAILABLE SEATS TO ARRAY
  // =======================================

  const availableSeats =
    String(request.available_seats)
      .split(",")
      .map(seat => seat.trim())
      .filter(seat => seat !== "");


  // =======================================
  // SHOW SUCCESS MESSAGE
  // =======================================

  resultBox.innerHTML = `

    <div style="
      color:#00ff88;
      font-size:18px;
      font-weight:900;
    ">
      SEATS AVAILABLE!
    </div>

    <div style="
      margin-top:10px;
      font-size:14px;
    ">
      You requested
      <strong>${passengerCount}</strong>
      passenger(s).
    </div>

    <div style="
      margin-top:10px;
      font-size:14px;
    ">
      Please select
      <strong>${passengerCount}</strong>
      seat(s).
    </div>

  `;


  // =======================================
  // SHOW SEAT SELECTION AREA
  // =======================================

  const seatSelectionArea =
    document.getElementById(
      "seatSelectionArea"
    );

  const availableSeatsContainer =
    document.getElementById(
      "availableSeatsContainer"
    );


  if(
    seatSelectionArea &&
    availableSeatsContainer
  ){

    seatSelectionArea.style.display =
      "block";


    // Clear previous seats

    availableSeatsContainer.innerHTML =
      "";


    // =====================================
    // CREATE SEAT BUTTONS
    // =====================================

    availableSeats.forEach(
      seat => {

        const seatButton =
          document.createElement(
            "button"
          );


        seatButton.type =
          "button";


        seatButton.textContent =
          "SEAT " + seat;


        seatButton.dataset.seat =
          seat;


        seatButton.style.cssText = `
          padding:12px 16px;
          border:none;
          border-radius:10px;
          background:#00ffff;
          color:#000000;
          font-size:14px;
          font-weight:900;
          cursor:pointer;
        `;


        // =================================
        // SELECT SEAT
        // =================================

        seatButton.onclick =
          function(){

            toggleSeatSelection(
              seat,
              seatButton,
              passengerCount
            );

          };


        availableSeatsContainer
          .appendChild(
            seatButton
          );

      }
    );

  }


  return;

} 


  // =======================================
  // OTHER STATUS
  // =======================================

  resultBox.innerHTML = `

    <div style="
      color:#00ffff;
      font-weight:900;
    ">
      REQUEST STATUS
    </div>

    <div style="
      margin-top:10px;
    ">
      ${request.status || "Pending"}
    </div>

  `;

}

// =========================================
// SELECT / DESELECT MULTIPLE SEATS
// =========================================

let selectedSeats = [];

function toggleSeatSelection(
  seat,
  seatButton,
  passengerCount
){

  // =======================================
  // CHECK IF SEAT IS ALREADY SELECTED
  // =======================================

  const seatIndex =
    selectedSeats.indexOf(seat);


  // =======================================
  // DESELECT SEAT
  // =======================================

  if(seatIndex !== -1){

    selectedSeats.splice(
      seatIndex,
      1
    );


    // Return button to normal

    seatButton.style.background =
      "#00ffff";

    seatButton.style.color =
      "#000000";

  }

  // =======================================
  // SELECT NEW SEAT
  // =======================================

  else{

    // Don't allow more seats
    // than passenger count

    if(
      selectedSeats.length >=
      passengerCount
    ){

      alert(
        "You can select only " +
        passengerCount +
        " seat(s)."
      );

      return;

    }


    // Add seat

    selectedSeats.push(
      seat
    );


    // Highlight selected seat

    seatButton.style.background =
      "#00ff88";

    seatButton.style.color =
      "#000000";

  }


  // =======================================
  // UPDATE SELECTED SEATS DISPLAY
  // =======================================

  const selectedSeatsDisplay =
    document.getElementById(
      "selectedSeatsDisplay"
    );


  if(
    selectedSeatsDisplay
  ){

    if(
      selectedSeats.length === 0
    ){

      selectedSeatsDisplay.innerHTML =
        "Selected Seats: None";

    }else{

      selectedSeatsDisplay.innerHTML =
        "Selected Seats: " +
        selectedSeats.join(", ");

    }

  }

}

// =========================================
// CONFIRM SELECTED SEATS
// =========================================

async function confirmSelectedSeats(){

  // =======================================
  // CHECK SELECTED SEATS
  // =======================================

  if(
    !selectedSeats ||
    selectedSeats.length === 0
  ){

    alert(
      "Please select at least one seat before confirming."
    );

    return;

  }


  // =======================================
  // GET CUSTOMER DETAILS
  // =======================================

  const customerName =
    document
      .getElementById("checkSeatCustomerName")
      ?.value
      .trim() || "";

  const customerPhone =
    document
      .getElementById("checkSeatCustomerPhone")
      ?.value
      .trim() || "";

  const departure =
    document
      .getElementById("checkSeatDeparture")
      ?.value
      .trim() || "";

  const destination =
    document
      .getElementById("checkSeatDestination")
      ?.value
      .trim() || "";

  const travelDate =
    document
      .getElementById("checkSeatTravelDate")
      ?.value || "";


  // =======================================
  // VALIDATE CUSTOMER DETAILS
  // =======================================

  if(
    customerName === "" ||
    customerPhone === "" ||
    departure === "" ||
    destination === "" ||
    travelDate === ""
  ){

    alert(
      "Please complete your booking information before confirming your seat(s)."
    );

    return;

  }


  // =======================================
  // SHOW CONFIRMATION
  // =======================================

  const confirmed =
    confirm(
      "Confirm selected seat(s):\n\n" +
      selectedSeats.join(", ") +
      "\n\nDo you want to confirm these seat(s)?"
    );


  if(!confirmed){

    return;

  }


  // =======================================
  // UPDATE SUPABASE
  // =======================================

  const {
    data,
    error
  } = await client

    .from("seat_requests")

    .update({

      selected_seat:
        selectedSeats.join(", "),

      status:
        "seat_selected"

    })

    .eq(
      "customer_name",
      customerName
    )

    .eq(
      "customer_phone",
      customerPhone
    )

    .eq(
      "departure",
      departure
    )

    .eq(
      "destination",
      destination
    )

    .eq(
      "travel_date",
      travelDate
    );


  // =======================================
  // ERROR
  // =======================================

  if(error){

    console.error(
      "Seat selection error:",
      error
    );

    alert(
      "Unable to confirm your selected seat(s). Please try again."
    );

    return;

  }


  // =======================================
  // SUCCESS
  // =======================================

  alert(
    "Your seat(s) have been confirmed successfully!\n\n" +
    "Selected Seat(s): " +
    selectedSeats.join(", ")
  );


  // =======================================
  // UPDATE DISPLAY
  // =======================================

  const selectedSeatsDisplay =
    document.getElementById(
      "selectedSeatsDisplay"
    );


  if(
    selectedSeatsDisplay
  ){

    selectedSeatsDisplay.innerHTML =
      "Confirmed Seat(s): " +
      selectedSeats.join(", ");

  }


  // =======================================
  // DISABLE SEAT BUTTONS
  // =======================================

  const availableSeatsContainer =
    document.getElementById(
      "availableSeatsContainer"
    );


  if(
    availableSeatsContainer
  ){

    const seatButtons =
      availableSeatsContainer
        .querySelectorAll("button");


    seatButtons.forEach(
      button => {

        button.disabled =
          true;

        button.style.cursor =
          "not-allowed";

      }
    );

  }

}


function showSeatRequestPayNow(request){

  const totalFare =
    document.getElementById("busFareAmount")?.innerText || "TZS 0";

  const phone =
    document.getElementById("customerPhone")?.value?.trim() || "";

  if(!request?.id){

    alert("Invalid seat request. Please try again.");

    return;

  }

  const proceed = confirm(
`Seat Request Submitted Successfully!

Request ID:
${request.id}

Amount:
${totalFare}

Phone:
${phone}

Press OK to continue to payment.`
  );

  if(!proceed) return;

  payForSeatRequest(request);

}


async function payForSeatRequest(request){

  const controller = new AbortController();

  const timeout = setTimeout(() => {

    controller.abort();

  },30000);

  try{

    const amount = Number(

      document
        .getElementById("busFareAmount")
        ?.innerText
        ?.replace("TZS","")
        ?.replace(/,/g,"")
        ?.trim()

    );

    const phone =

      document
        .getElementById("customerPhone")
        ?.value
        ?.trim();

    const customerName =

      document
        .getElementById("customerName")
        ?.value
        ?.trim();

    const payload = {

      request_id: String(request.id),

      amount: amount,

      phone_number: phone,

      customer_name: customerName

    };

    console.log("PAYMENT PAYLOAD:",payload);

    const response = await fetch(

      "https://xbemkmvvbkxknuduthsg.supabase.co/functions/v1/create-blmpay-payment",

      {

        method:"POST",

        headers:{

          "Content-Type":"application/json",

          "Accept":"application/json"

        },

        body:JSON.stringify(payload),

        signal:controller.signal

      }

    );

    clearTimeout(timeout);

    const text = await response.text();

    let result;

    try{

      result = JSON.parse(text);

    }catch{

      result = {

        raw:text

      };

    }

    console.log("HTTP STATUS:",response.status);

    console.log("PAYMENT RESPONSE:",result);

    if(!response.ok){

      alert(

        "Payment Error\n\n" +

        "HTTP Status: " +

        response.status +

        "\n\n" +

        JSON.stringify(result,null,2)

      );

      return;

    }

    alert(

      "Payment Request Sent Successfully!\n\n" +

      JSON.stringify(result,null,2)

    );

    // =========================================
   // WAIT FOR BLMPAY PAYMENT COMPLETION
  // =========================================
  await waitForSeatPayment(request.id);

  }

  catch(err){

    clearTimeout(timeout);

    console.error("PAYMENT ERROR:",err);

    if(err.name === "AbortError"){

      alert(

        "Connection timed out.\nPlease check your internet connection and try again."

      );

      return;

    }

    alert(

      "Network Error\n\n" +

      err.message

    );

  }

}

// =========================================
// WAIT FOR SEAT PAYMENT TO BECOME PAID
// =========================================
async function waitForSeatPayment(requestId){

  console.log(
    "Waiting for payment completion:",
    requestId
  );

  const maxAttempts = 60;

  let attempts = 0;

  const checkPayment = async () => {

    attempts++;

    console.log(
      "Checking payment status...",
      attempts,
      requestId
    );

    const {
      data,
      error
    } = await client
      .from("seat_requests")
      .select("*")
      .eq("id", requestId)
      .maybeSingle();

    if(error){

      console.error(
        "PAYMENT STATUS CHECK ERROR:",
        error
      );

      return false;
    }

    console.log(
      "CURRENT PAYMENT STATUS:",
      data?.payment_status
    );

    // =====================================
    // PAYMENT COMPLETED
    // =====================================
    if(
  data?.payment_status === "paid"
  ){

  console.log(
    "PAYMENT CONFIRMED!",
    data
  );

  alert(
    "Payment completed successfully!"
  );

  // =====================================
  // SHOW TICKET BUTTONS
  // =====================================
  showTicketButtons(data);

  return true;
}

    // =====================================
    // STOP AFTER MAXIMUM ATTEMPTS
    // =====================================
    if(
      attempts >= maxAttempts
    ){

      alert(
        "We could not confirm your payment yet.\n\n" +
        "Please check your booking again shortly."
      );

      return true;
    }

    return false;
  };

  // =====================================
  // CHECK IMMEDIATELY
  // =====================================
  if(
    await checkPayment()
  ){
    return;
  }

  // =====================================
  // CHECK EVERY 3 SECONDS
  // =====================================
  const interval = setInterval(
    async () => {

      const finished =
        await checkPayment();

      if(finished){

        clearInterval(interval);

      }

    },
    3000
  );
}

// =========================================
// SHOW PRINT / DOWNLOAD TICKET
// =========================================
function showTicketButtons(request){

  if(!request?.id){

    console.error(
      "Invalid ticket request:",
      request
    );

    return;
  }

  // =======================================
  // GET TICKET AREA
  // =======================================
  let ticketArea =
    document.getElementById(
      "paymentTicketArea"
    );

  // =======================================
  // CREATE TICKET AREA IF NEEDED
  // =======================================
  if(!ticketArea){

    ticketArea =
      document.createElement("div");

    ticketArea.id =
      "paymentTicketArea";

    ticketArea.style.cssText = `
      margin-top:20px;
      padding:20px;
      border-radius:15px;
      background:#111;
      border:2px solid #00ff88;
      color:#ffffff;
    `;

    const paymentContent =
      document.getElementById(
        "paymentContent"
      );

    if(paymentContent){

      paymentContent.appendChild(
        ticketArea
      );

    }else{

      document.body.appendChild(
        ticketArea
      );

    }
  }

  // =======================================
  // PREPARE TICKET DATA
  // =======================================

  const company =
    request.company_name ||
    "Bus Company";

  const passenger =
    request.customer_name ||
    "";

  const phone =
    request.customer_phone ||
    "";

  const from =
    request.departure ||
    "";

  const to =
    request.destination ||
    "";

  const travelDate =
    request.travel_date ||
    "";

  const passengers =
    Number(request.passengers) || 1;

  const travelClass =
    request.travel_class ||
    "Standard";

  const seats =
    request.selected_seat ||
    "Not assigned";

  const amount =
    Number(request.amount) || 0;

  const paymentReference =
    request.payment_reference ||
    request.payment_external_id ||
    request.id;

  // =======================================
  // FORMAT FARE
  // =======================================
  const formattedAmount =
    amount.toLocaleString("en-US");

  // =======================================
  // CREATE TICKET
  // =======================================
  ticketArea.innerHTML = `

    <div
      id="seatTicket"
      style="
        background:#ffffff;
        color:#111111;
        border-radius:15px;
        padding:20px;
        max-width:500px;
        margin:0 auto;
      "
    >

      <div style="
        text-align:center;
        border-bottom:2px solid #111;
        padding-bottom:15px;
        margin-bottom:15px;
      ">

        <div style="
          font-size:24px;
          font-weight:900;
        ">
          Afri|Link
        </div>

        <div style="
          font-size:18px;
          font-weight:900;
          margin-top:5px;
        ">
          BUS TICKET
        </div>

        <div style="
          color:#00a65a;
          font-weight:900;
          margin-top:8px;
        ">
          PAYMENT CONFIRMED
        </div>

      </div>

      <div style="
        font-size:14px;
        line-height:1.8;
      ">

        <div>
          <strong>Company:</strong>
          ${company}
        </div>

        <div>
          <strong>Passenger:</strong>
          ${passenger}
        </div>

        <div>
          <strong>Phone:</strong>
          ${phone}
        </div>

        <hr>

        <div>
          <strong>From:</strong>
          ${from}
        </div>

        <div>
          <strong>To:</strong>
          ${to}
        </div>

        <div>
          <strong>Travel Date:</strong>
          ${travelDate}
        </div>

        <div>
          <strong>Passengers:</strong>
          ${passengers}
        </div>

        <div>
          <strong>Travel Class:</strong>
          ${travelClass}
        </div>

        <div>
          <strong>Seat:</strong>
          ${seats}
        </div>

        <hr>

        <div style="
          font-size:18px;
          font-weight:900;
        ">
          <strong>Fare:</strong>
          TZS ${formattedAmount}
        </div>

        <div>
          <strong>Payment:</strong>
          PAID
        </div>

        <div style="
          word-break:break-all;
        ">
          <strong>Payment Reference:</strong>
          ${paymentReference}
        </div>

        <div>
          <strong>Ticket ID:</strong>
          ${request.id}
        </div>

      </div>

      <div style="
        margin-top:18px;
        padding-top:15px;
        border-top:1px dashed #777;
        text-align:center;
        font-size:12px;
      ">
        Thank you for booking with Afri|Link.
      </div>

    </div>

    <div style="
      margin-top:15px;
    ">

      <button
        type="button"
        onclick="printSeatTicket()"
        style="
          width:100%;
          padding:14px;
          margin-bottom:10px;
          border:none;
          border-radius:10px;
          background:#00ff88;
          color:#000;
          font-size:15px;
          font-weight:900;
          cursor:pointer;
        "
      >
        PRINTTICKET
      </button>

      <button
        type="button"
        onclick="downloadSeatTicket()"
        style="
          width:100%;
          padding:14px;
          border:none;
          border-radius:10px;
          background:#00ffff;
          color:#000;
          font-size:15px;
          font-weight:900;
          cursor:pointer;
        "
      >
        GETTICKET
      </button>

    </div>

  `;

  // =======================================
  // SCROLL TO TICKET
  // =======================================
  ticketArea.scrollIntoView({
    behavior:"smooth",
    block:"center"
  });

}

// =========================================
// PRINT BUS TICKET
// =========================================
function printSeatTicket(){

  const ticket =
    document.getElementById("seatTicket");

  if(!ticket){

    alert(
      "Ticket is not available to print."
    );

    return;
  }

  const printWindow =
    window.open(
      "",
      "_blank",
      "width=800,height=900"
    );

  if(!printWindow){

    alert(
      "Please allow pop-ups in your browser to print the ticket."
    );

    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>

      <title>Afri|Link Bus Ticket</title>

      <meta
        name="viewport"
        content="width=device-width,initial-scale=1"
      >

      <style>

        body{
          margin:0;
          padding:20px;
          background:#ffffff;
          font-family:Arial,sans-serif;
        }

        .ticket{
          max-width:500px;
          margin:auto;
        }

        @media print{

          body{
            padding:0;
          }

          .ticket{
            width:100%;
          }

        }

      </style>

    </head>

    <body>

      <div class="ticket">
        ${ticket.innerHTML}
      </div>

    </body>

    </html>
  `);

  printWindow.document.close();

  printWindow.focus();

  setTimeout(() => {

    printWindow.print();

  },500);

}

// =========================================
// DOWNLOAD BUS TICKET
// =========================================
function downloadSeatTicket(){

  const ticket =
    document.getElementById("seatTicket");

  if(!ticket){

    alert(
      "Ticket is not available for download."
    );

    return;
  }

  const ticketHTML = `
    <!DOCTYPE html>
    <html>

    <head>

      <meta charset="UTF-8">

      <title>
        Afri|Link Bus Ticket
      </title>

      <meta
        name="viewport"
        content="width=device-width,initial-scale=1"
      >

      <style>

        body{
          margin:0;
          padding:20px;
          background:#ffffff;
          font-family:Arial,sans-serif;
        }

        .ticket{
          max-width:500px;
          margin:auto;
        }

      </style>

    </head>

    <body>

      <div class="ticket">
        ${ticket.innerHTML}
      </div>

    </body>

    </html>
  `;

  const blob =
    new Blob(
      [ticketHTML],
      {
        type:"text/html"
      }
    );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href =
    url;

  link.download =
    "AfriLink-Bus-Ticket-" +
    Date.now() +
    ".html";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  setTimeout(() => {

    URL.revokeObjectURL(url);

  },1000);

}
