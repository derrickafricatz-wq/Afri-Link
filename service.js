let activeService = null;

// ============================================
// PERMANENT PAYMENT PROVIDERS
// ============================================

const paymentProviders = [

  {
    id: "mpesa",
    name: "M-Pesa",
    category: "mobile",
    color: "#00a859",
    ussdCode: "*150*00#",
    appLink: "https://play.google.com/store/apps/details?id=com.vodafone.mpesa.tanzania"
  },

  {
    id: "airtel",
    name: "Airtel Money",
    category: "mobile",
    color: "#e60000",
    ussdCode: "*150*60#",
    appLink: "https://play.google.com/store/apps/details?id=com.airtel.africa"
  },

  {
  id: "mixx",
  name: "Mixx by Yas",
  category: "mobile",
  color: "#ffcc00",
  ussdCode: "*150*01#",
  appLink: "https://play.google.com/store/apps/details?id=tz.tigo.mfsapp"
},

  {
  id: "nmb",
  name: "NMB Bank",
  category: "bank",
  color: "#0066b3",
  ussdCode: "*150*66#",
  appLink: "https://play.google.com/store/apps/details?id=com.nmb10.eclectics"
  },

  {
  id: "crdb",
  name: "CRDB Bank",
  category: "bank",
  color: "#005baa",
  ussdCode: "*150*03#",
  appLink: "https://play.google.com/store/apps/details?id=apps.crdbbank.com.mobapp"
  }

];

let bannerIndex = 0;
let bannerTimer = null;


// ===============================
// BOOKING DETAILS
// ===============================

function loadBookingDetails(){

  const box =
    document.getElementById("bookingDetailsText");

  if(!box) return;

  const companyName =
    activeService?.company;

  const bookingDetails =
    bookingDetailsDatabase[companyName];

  if(bookingDetails){

    box.innerHTML =
      bookingDetails
        .trim()
        .split("\n")
        .filter(line => line.trim() !== "")
        .map(line => `
          <div style="
            padding:12px 14px;
            margin-bottom:8px;
            border-radius:10px;
            background:rgba(255,255,255,.05);
            border:1px solid rgba(0,255,255,.12);
            color:#ffffff;
            font-family:monospace;
            font-size:14px;
          ">
            ${line.trim()}
          </div>
        `)
        .join("");

  } else {

    box.innerHTML = `
      <div style="
        padding:20px;
        text-align:center;
        color:#aaa;
      ">
        Booking information will appear here.
      </div>
    `;

  }

}

function getActiveServiceType(){

  const companyData =
    serviceDatabase[activeService?.company];

  return companyData?.serviceType || "service";

}

function updateConfirmationTitle(){

  const title =
    document.getElementById("confirmationTitle");

  if(!title) return;

  const serviceType =
    getActiveServiceType();

  const titles = {

    product:
      "APPROVE YOUR ORDER",

    flight:
      "APPROVE YOUR FLIGHT",

    bus:
      "APPROVE YOUR BUS BOOKING",

    tourism:
      "APPROVE YOUR TOUR",

    hotel:
      "APPROVE YOUR HOTEL",

    service:
      "APPROVE YOUR SERVICE REQUEST"

  };

  title.innerHTML =
    titles[serviceType] ||
    "APPROVE YOUR BOOKING";

}


// ===============================
// COMPANY BANNER
// ===============================

function loadServiceBanner(){

  const banner =
    document.getElementById("companyBanner");

  if(!banner) return;

  if(bannerTimer){
    clearInterval(bannerTimer);
  }

  const companyData =
    serviceDatabase[activeService?.company];

  const messages =
    companyData?.bannerMessages || [
      "Welcome to Digital Service Center",
      "Book Services Easily Inside AfriLink",
      "Smart Business Connection Platform"
    ];

  bannerIndex = 0;

  banner.innerHTML =
    messages[bannerIndex];


  bannerTimer = setInterval(()=>{

    bannerIndex++;

    if(bannerIndex >= messages.length){
      bannerIndex = 0;
    }

    banner.style.opacity = "0";

    setTimeout(()=>{

      banner.innerHTML =
        messages[bannerIndex];

      banner.style.opacity = "1";

    },500);

  },5000);

}

function showPaymentTab(){

  // SHOW BOOKING TAB CONTENT
  document.getElementById("bookingDetailsCard").style.display = "none";

  // HIDE CONFIRMATION
  document.getElementById("confirmationContent").style.display = "none";

  // SHOW PAYMENT
  document.getElementById("paymentContent").style.display = "block";

  // LOAD COMPANY PAYMENT DETAILS
  const companyData =
    serviceDatabase[activeService?.company];

  const paymentBox =
    document.getElementById("paymentDetailsText");

  if(!paymentBox) return;

    const paymentMethods =
  paymentProviders
    .filter(provider =>
  companyData?.paymentAccounts?.[provider.id]
)
    .map(provider => {

      const account =
        companyData.paymentAccounts[provider.id];

      return {

        type: provider.category,

        name: provider.name,

        paymentNumber:
          account.number || "",

        accountName:
        companyData.paymentAccountName || "",

        accountNumber:
          account.accountNumber || "",

        bankName:
          provider.category === "bank"
            ? provider.name
            : "",

        ussdCode:
          provider.ussdCode,

        appLink:
          provider.appLink,

        color:
          provider.color

      };

    });

  if(paymentMethods.length === 0){

    paymentBox.innerHTML = `
      <div style="
        padding:25px;
        text-align:center;
        color:#aaa;
      ">
        Payment information is currently unavailable.
      </div>
    `;

    return;
  }

  paymentBox.innerHTML = `

<div style="
position:relative;
overflow:hidden;
padding:22px;
border-radius:22px;
background:
linear-gradient(135deg,#071a2b,#06111f 45%,#0b2638);
border:1px solid rgba(0,255,255,.5);
box-shadow:
0 0 25px rgba(0,255,255,.15),
inset 0 0 30px rgba(0,255,255,.04);
">

<!-- DIGITAL HEADER -->

<div style="
text-align:center;
margin-bottom:24px;
">

<div style="
font-size:26px;
font-weight:900;
letter-spacing:2px;
font-family:monospace;
color:#00ffff;
text-shadow:
0 0 8px rgba(0,255,255,.8),
0 0 20px rgba(0,255,255,.35);
">
DIGITAL PAYMENT CENTER
</div>

<div style="
margin-top:8px;
font-size:13px;
letter-spacing:1px;
color:#8ffcff;
font-family:monospace;
">
SECURE • FAST • SIMPLE
</div>

</div>


<!-- PAYMENT METHODS -->

<div style="
display:grid;
gap:16px;
">

${paymentMethods.map((method,index)=>`

<div style="
position:relative;
padding:18px;
border-radius:18px;

background:
linear-gradient(
135deg,
rgba(0,255,255,.10),
rgba(255,255,255,.03)
);

border:1px solid
${index % 4 === 0
? "rgba(0,255,255,.5)"
: index % 4 === 1
? "rgba(255,60,100,.5)"
: index % 4 === 2
? "rgba(255,215,0,.5)"
: "rgba(0,255,136,.5)"
};

box-shadow:
0 0 18px
${index % 4 === 0
? "rgba(0,255,255,.12)"
: index % 4 === 1
? "rgba(255,60,100,.12)"
: index % 4 === 2
? "rgba(255,215,0,.12)"
: "rgba(0,255,136,.12)"
};

">

<div style="
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:14px;
">

<div style="
font-size:20px;
font-weight:900;
color:#ffffff;
letter-spacing:1px;
font-family:monospace;
">
${method.name}
</div>

<div style="
font-size:11px;
font-weight:bold;
letter-spacing:1px;
color:#00ff88;
">
● AVAILABLE
</div>

</div>


${
method.type === "mobile"

? `

<div style="
font-size:11px;
color:#7eefff;
font-family:monospace;
letter-spacing:1px;
">
PAYMENT NUMBER
</div>

<div style="
display:flex;
align-items:center;
gap:10px;
margin-top:6px;
">

<div style="
flex:1;
padding:12px;
border-radius:10px;
background:#020b13;
border:1px solid rgba(0,255,255,.3);
color:#00ffff;
font-size:20px;
font-weight:900;
font-family:monospace;
letter-spacing:2px;
">
${method.paymentNumber}
</div>

<button
type="button"
onclick="copyPaymentNumber('${method.paymentNumber}')"
style="
padding:12px 14px;
border:none;
border-radius:10px;
background:#00ffff;
color:#001014;
font-weight:900;
font-family:monospace;
cursor:pointer;
box-shadow:0 0 12px rgba(0,255,255,.3);
">
COPY
</button>

${
  method.ussdCode
  ? `
    <button
      type="button"
      onclick="openUSSD('${method.ussdCode}')"
      style="
        padding:12px 14px;
        border:none;
        border-radius:10px;
        background:#00ff88;
        color:#001014;
        font-weight:900;
        font-family:monospace;
        cursor:pointer;
        box-shadow:0 0 12px rgba(0,255,136,.3);
      ">
      OPEN USSD
    </button>
  `
  : ""
}

${
  method.appLink
  ? `
    <button
      type="button"
      onclick="openPaymentApp('${method.appLink}')"
      style="
        padding:12px 14px;
        border:none;
        border-radius:10px;
        background:#ff4d6d;
        color:#ffffff;
        font-weight:900;
        font-family:monospace;
        cursor:pointer;
        box-shadow:0 0 12px rgba(255,77,109,.35);
      ">
      OPEN APP
    </button>
  `
  : ""
}

</div>


<div style="
margin-top:14px;
font-size:11px;
color:#7eefff;
font-family:monospace;
letter-spacing:1px;
">
ACCOUNT NAME
</div>

<div style="
margin-top:5px;
color:#ffffff;
font-size:16px;
font-weight:bold;
font-family:monospace;
">
${method.accountName}
</div>

`

: `

<div style="
font-size:11px;
color:#7eefff;
font-family:monospace;
letter-spacing:1px;
">
BANK NAME
</div>

<div style="
margin-top:5px;
color:#ffffff;
font-size:16px;
font-weight:bold;
font-family:monospace;
">
${method.bankName}
</div>

<div style="
margin-top:14px;
font-size:11px;
color:#7eefff;
font-family:monospace;
letter-spacing:1px;
">
ACCOUNT NUMBER
</div>

<div style="
display:flex;
align-items:center;
gap:10px;
margin-top:6px;
flex-wrap:wrap;
">

<div style="
flex:1;
min-width:150px;
padding:12px;
border-radius:10px;
background:#020b13;
border:1px solid rgba(0,255,255,.3);
color:#00ffff;
font-size:18px;
font-weight:900;
font-family:monospace;
letter-spacing:2px;
">
${method.accountNumber}
</div>

<button
type="button"
onclick="copyPaymentNumber('${method.accountNumber}')"
style="
padding:12px 14px;
border:none;
border-radius:10px;
background:#00ffff;
color:#001014;
font-weight:900;
font-family:monospace;
cursor:pointer;
box-shadow:0 0 12px rgba(0,255,255,.3);
">
COPY
</button>

${
  method.ussdCode
  ? `
    <button
      type="button"
      onclick="openUSSD('${method.ussdCode}')"
      style="
        padding:12px 14px;
        border:none;
        border-radius:10px;
        background:#00ff88;
        color:#001014;
        font-weight:900;
        font-family:monospace;
        cursor:pointer;
        box-shadow:0 0 12px rgba(0,255,136,.3);
      ">
      OPEN USSD
    </button>
  `
  : ""
}

${
  method.appLink
  ? `
    <button
      type="button"
      onclick="openPaymentApp('${method.appLink}')"
      style="
        padding:12px 14px;
        border:none;
        border-radius:10px;
        background:#ff4d6d;
        color:#ffffff;
        font-weight:900;
        font-family:monospace;
        cursor:pointer;
        box-shadow:0 0 12px rgba(255,77,109,.35);
      ">
      OPEN APP
    </button>
  `
  : ""
}

</div>

<div style="
margin-top:14px;
font-size:11px;
color:#7eefff;
font-family:monospace;
letter-spacing:1px;
">
ACCOUNT NAME
</div>

<div style="
margin-top:5px;
color:#ffffff;
font-size:16px;
font-weight:bold;
font-family:monospace;
">
${method.accountName}
</div>

`

}

</div>

`).join("")}

</div>

</div>

`;

}

function showConfirmationTab(){

  document.getElementById("bookingDetailsCard").style.display = "none";

  document.getElementById("paymentContent").style.display = "none";

  document.getElementById("confirmationContent").style.display = "block";

}

function showBookingTab(){

  // SHOW BOOKING DETAILS
  document.getElementById("bookingDetailsCard").style.display = "block";

  // HIDE PAYMENT
  document.getElementById("paymentContent").style.display = "none";

  // HIDE CONFIRMATION
  document.getElementById("confirmationContent").style.display = "none";

}

function updateConfirmationDetails(){

  const box =
    document.getElementById("confirmationDetailsText");

  if(!box) return;

  const serviceType =
    getActiveServiceType();

  const details = {

    product: `
      <div style="
        padding:14px;
        border-radius:12px;
        background:linear-gradient(135deg,rgba(0,255,255,.08),rgba(255,215,0,.08));
        border:1px solid rgba(0,255,255,.25);
      ">
        <div style="
          font-size:18px;
          font-weight:900;
          color:#00ffff;
          margin-bottom:8px;
        ">
          ORDER SUMMARY
        </div>

        <div style="
          color:#ccc;
          font-size:14px;
        ">
          Please review your product details and customer information before confirming your order.
        </div>
      </div>
    `,

    flight: `
      <div style="
        padding:14px;
        border-radius:12px;
        background:linear-gradient(135deg,rgba(0,150,255,.12),rgba(0,255,255,.08));
        border:1px solid rgba(0,200,255,.3);
      ">
        <div style="
          font-size:18px;
          font-weight:900;
          color:#00ccff;
          margin-bottom:8px;
        ">
          FLIGHT BOOKING
        </div>

        <div style="
          color:#ccc;
          font-size:14px;
        ">
          Please provide your travel information and review your passenger details before confirmation.
        </div>
      </div>
    `,

    bus: `
      <div style="
        padding:14px;
        border-radius:12px;
        background:linear-gradient(135deg,rgba(255,140,0,.12),rgba(255,215,0,.08));
        border:1px solid rgba(255,165,0,.3);
      ">
        <div style="
          font-size:18px;
          font-weight:900;
          color:#ffb000;
          margin-bottom:8px;
        ">
          BUS BOOKING
        </div>

        <div style="
          color:#ccc;
          font-size:14px;
        ">
          Please provide your travel route, date and passenger information before confirmation.
        </div>
      </div>
    `,

    tourism: `
      <div style="
        padding:14px;
        border-radius:12px;
        background:linear-gradient(135deg,rgba(0,255,136,.12),rgba(255,215,0,.08));
        border:1px solid rgba(0,255,136,.3);
      ">
        <div style="
          font-size:18px;
          font-weight:900;
          color:#00ff88;
          margin-bottom:8px;
        ">
          TOURISM & SAFARI
        </div>

        <div style="
          color:#ccc;
          font-size:14px;
        ">
          Please provide your travel plans, number of travelers and special requests before confirmation.
        </div>
      </div>
    `,

    hotel: `
      <div style="
        padding:14px;
        border-radius:12px;
        background:linear-gradient(135deg,rgba(180,80,255,.12),rgba(255,215,0,.08));
        border:1px solid rgba(190,100,255,.3);
      ">
        <div style="
          font-size:18px;
          font-weight:900;
          color:#c77dff;
          margin-bottom:8px;
        ">
          HOTEL BOOKING
        </div>

        <div style="
          color:#ccc;
          font-size:14px;
        ">
          Please provide your stay dates, number of guests and room requirements before confirmation.
        </div>
      </div>
    `,

    service: `
      <div style="
        padding:14px;
        border-radius:12px;
        background:linear-gradient(135deg,rgba(0,255,255,.08),rgba(255,255,255,.05));
        border:1px solid rgba(0,255,255,.25);
      ">
        <div style="
          font-size:18px;
          font-weight:900;
          color:#00ffff;
          margin-bottom:8px;
        ">
          SERVICE REQUEST
        </div>

        <div style="
          color:#ccc;
          font-size:14px;
        ">
          Please provide the information required for your service request before confirmation.
        </div>
      </div>
    `

  };

  box.innerHTML =
    details[serviceType] ||
    details.service;

    }

function updateDynamicBookingFields(){

  const box =
    document.getElementById("dynamicBookingFields");

  if(!box) return;

  const serviceType =
    getActiveServiceType();

  /* =========================
     PRODUCT
  ========================= */

  if(serviceType === "product"){

    box.innerHTML = `

      <div style="
        padding:16px;
        background:linear-gradient(
          135deg,
          rgba(0,255,255,.06),
          rgba(255,215,0,.06)
        );
        border:1px solid rgba(0,255,255,.25);
        border-radius:14px;
      ">

        <div style="
          font-size:17px;
          font-weight:900;
          color:#00ffff;
          margin-bottom:12px;
        ">
          PRODUCT ORDER INFORMATION
        </div>

        <div style="
          font-size:13px;
          color:#aaa;
          line-height:1.6;
        ">
          Please provide the product or service you would like to order.
        </div>

      </div>

    `;

  }


  /* =========================
     FLIGHT
  ========================= */

  else if(serviceType === "flight"){

    box.innerHTML = `

      <div style="
        padding:16px;
        background:linear-gradient(
          135deg,
          rgba(0,180,255,.08),
          rgba(0,255,255,.05)
        );
        border:1px solid rgba(0,200,255,.35);
        border-radius:14px;
      ">

        <div style="
          font-size:17px;
          font-weight:900;
          color:#00ccff;
          margin-bottom:14px;
        ">
          FLIGHT TRAVEL DETAILS
        </div>

       <div style="
  margin-bottom:14px;
  padding:14px;
  border-radius:12px;
  background:rgba(0,255,255,.05);
  border:1px solid rgba(0,255,255,.2);
">

  <div style="
    font-size:13px;
    font-weight:900;
    color:#00ffff;
    margin-bottom:10px;
  ">
    BOOKING PURPOSE
  </div>

  <div style="
    color:#ffffff;
    font-size:13px;
    line-height:1.6;
  ">
    You can book your flight, send a parcel, or receive a parcel.
  </div>

</div> 

<div style="
  display:grid;
  grid-template-columns:1fr;
  gap:10px;
  margin-bottom:14px;
">

  <label style="
    display:flex;
    align-items:center;
    gap:10px;
    padding:14px;
    border-radius:10px;
    background:rgba(0,200,255,.08);
    border:1px solid rgba(0,200,255,.3);
    color:#ffffff;
    cursor:pointer;
  ">

    <input
      type="checkbox"
      id="flightTravelChoice"
      onchange="handleFlightTravelChoice()"
    >

    <span>
      TRAVEL
    </span>

  </label>


  <label style="
    display:flex;
    align-items:center;
    gap:10px;
    padding:14px;
    border-radius:10px;
    background:rgba(0,255,136,.08);
    border:1px solid rgba(0,255,136,.3);
    color:#ffffff;
    cursor:pointer;
  ">

    <input
      type="checkbox"
      id="flightSendParcelChoice"
      onchange="handleFlightSendParcelChoice()"
    >

    <span>
      SEND PARCEL
    </span>

  </label>


  <label style="
    display:flex;
    align-items:center;
    gap:10px;
    padding:14px;
    border-radius:10px;
    background:rgba(0,150,255,.08);
    border:1px solid rgba(0,150,255,.3);
    color:#ffffff;
    cursor:pointer;
  ">

    <input
      type="checkbox"
      id="flightReceiveParcelChoice"
      onchange="handleFlightReceiveParcelChoice()"
    >

    <span>
      RECEIVE PARCEL
    </span>

  </label>

</div>

    
<input
  id="bookingDeparture"
  placeholder="Departure City / Airport"
  style="
  width:100%;
  padding:14px;
  margin-bottom:10px;
  border:none;
  border-radius:10px;
  box-sizing:border-box;
  ">

<input
  id="bookingDestination"
  placeholder="Destination City / Airport"
  style="
  width:100%;
  padding:14px;
  margin-bottom:10px;
  border:none;
  border-radius:10px;
  box-sizing:border-box;
  ">

<input
  id="bookingTravelDate"
  type="date"
  style="
  width:100%;
  padding:14px;
  margin-bottom:10px;
  border:none;
  border-radius:10px;
  box-sizing:border-box;
  ">

<input
  id="bookingPassengers"
  type="number"
  min="1"
  placeholder="Number of Passengers"
  style="
  width:100%;
  padding:14px;
  margin-bottom:10px;
  border:none;
  border-radius:10px;
  box-sizing:border-box;
  ">

<select
  id="bookingTravelClass"
  style="
  width:100%;
  padding:14px;
  border:none;
  border-radius:10px;
  box-sizing:border-box;
  ">

  <option value="">
    Select Travel Class
  </option>

  <option value="Economy">
    Economy
  </option>

  <option value="Premium Economy">
    Premium Economy
  </option>

  <option value="Business">
    Business
  </option>

  <option value="First Class">
    First Class
  </option>

</select>


<!-- =========================
     SUBMIT SEAT REQUEST
========================= -->

<button
  type="button"
  id="submitSeatRequestButton"
  onclick="submitSeatRequest()"
  style="
    width:100%;
    margin-top:12px;
    padding:14px;
    border:none;
    border-radius:12px;
    background:#00ff88;
    color:#000000;
    font-size:15px;
    font-weight:900;
    cursor:pointer;
  "
>
  SUBMIT SEAT REQUEST
</button>


<!-- =========================
     CHECK MY SEAT
========================= -->

<button
  type="button"
  id="checkMySeatButton"
  onclick="openCheckMySeat()"
  style="
    width:100%;
    margin-top:10px;
    padding:14px;
    border:none;
    border-radius:12px;
    background:#00ffff;
    color:#000000;
    font-size:15px;
    font-weight:900;
    cursor:pointer;
  "
>
  CHECK MY SEAT
</button>

        <!-- =========================
     PARCEL SERVICE
========================= -->

<div style="
  margin-top:18px;
  padding:16px;
  border-radius:14px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(0,255,255,.25);
">

  <div style="
    font-size:17px;
    font-weight:900;
    color:#00ffff;
    margin-bottom:12px;
  ">
    PARCEL SERVICE
  </div>

  <div style="
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:10px;
  ">

    <label style="
      padding:14px;
      border-radius:10px;
      background:rgba(0,255,136,.08);
      border:1px solid rgba(0,255,136,.3);
      color:#ffffff;
      cursor:pointer;
      text-align:center;
    ">

      <input
        type="radio"
        name="parcelAction"
        value="send"
        onchange="handleParcelChoice()"
      >

      SEND PARCEL

    </label>

    <label style="
      padding:14px;
      border-radius:10px;
      background:rgba(0,150,255,.08);
      border:1px solid rgba(0,150,255,.3);
      color:#ffffff;
      cursor:pointer;
      text-align:center;
    ">

      <input
        type="radio"
        name="parcelAction"
        value="receive"
        onchange="handleParcelChoice()"
      >

      RECEIVE PARCEL

    </label>

  </div>

</div>

<div
id="parcelDetails"
style="
  display:none;
  margin-top:12px;
">
</div>

      </div>

    `;

  }


  /* =========================
     BUS
  ========================= */

  else if(serviceType === "bus"){

    box.innerHTML = `

      <div style="
        padding:16px;
        background:linear-gradient(
          135deg,
          rgba(255,165,0,.08),
          rgba(255,215,0,.05)
        );
        border:1px solid rgba(255,165,0,.35);
        border-radius:14px;
      ">

        <div style="
          font-size:17px;
          font-weight:900;
          color:#ffb000;
          margin-bottom:14px;
        ">
          BUS TRAVEL DETAILS
        </div>

        <div style="
  margin-bottom:14px;
  padding:14px;
  border-radius:12px;
  background:rgba(0,255,255,.05);
  border:1px solid rgba(0,255,255,.2);
">

  <div style="
    font-size:13px;
    font-weight:900;
    color:#00ffff;
    margin-bottom:10px;
  ">
    BOOKING PURPOSE
  </div>

  <div style="
    color:#ffffff;
    font-size:13px;
    line-height:1.6;
  ">
    You can book your bus travel, send a parcel, or receive a parcel.
  </div>

</div>


<div style="
  display:grid;
  grid-template-columns:1fr;
  gap:10px;
  margin-bottom:14px;
">


  <!-- =========================
       BUS TRAVEL
  ========================== -->

  <label style="
    display:flex;
    align-items:center;
    gap:10px;
    padding:14px;
    border-radius:10px;
    background:rgba(0,200,255,.08);
    border:1px solid rgba(0,200,255,.3);
    color:#ffffff;
    cursor:pointer;
  ">

    <input
      type="checkbox"
      id="busTravelChoice"
      onchange="handleBusTravelChoice()"
    >

    <span>
      TRAVEL
    </span>

  </label>


  <!-- =========================
       BUS SEND PARCEL
  ========================== -->

  <label style="
    display:flex;
    align-items:center;
    gap:10px;
    padding:14px;
    border-radius:10px;
    background:rgba(0,255,136,.08);
    border:1px solid rgba(0,255,136,.3);
    color:#ffffff;
    cursor:pointer;
  ">

    <input
      type="checkbox"
      id="busSendParcelChoice"
      onchange="handleBusSendParcelChoice()"
    >

    <span>
      SEND PARCEL
    </span>

  </label>


  <!-- =========================
       BUS RECEIVE PARCEL
  ========================== -->

  <label style="
    display:flex;
    align-items:center;
    gap:10px;
    padding:14px;
    border-radius:10px;
    background:rgba(0,150,255,.08);
    border:1px solid rgba(0,150,255,.3);
    color:#ffffff;
    cursor:pointer;
  ">

    <input
      type="checkbox"
      id="busReceiveParcelChoice"
      onchange="handleBusReceiveParcelChoice()"
    >

    <span>
      RECEIVE PARCEL
    </span>

  </label>

</div>

        <input
  id="bookingDeparture"
  placeholder="Departure / From"
  style="
  width:100%;
  padding:14px;
  margin-bottom:10px;
  border:none;
  border-radius:10px;
  box-sizing:border-box;
  ">

<input
  id="bookingDestination"
  placeholder="Destination / To"
  style="
  width:100%;
  padding:14px;
  margin-bottom:10px;
  border:none;
  border-radius:10px;
  box-sizing:border-box;
  ">

<input
  id="bookingTravelDate"
  type="date"
  style="
  width:100%;
  padding:14px;
  margin-bottom:10px;
  border:none;
  border-radius:10px;
  box-sizing:border-box;
  ">

<input
  id="bookingPassengers"
  type="number"
  min="1"
  placeholder="Number of Passengers"
  style="
  width:100%;
  padding:14px;
  border:none;
  border-radius:10px;
  box-sizing:border-box;
  ">


<!-- =========================================
     SUBMIT SEAT REQUEST
========================================= -->

<button
  type="button"
  id="submitSeatRequestButton"
  onclick="submitSeatRequest()"
  style="
    width:100%;
    margin-top:12px;
    padding:14px;
    border:none;
    border-radius:12px;
    background:#00ff88;
    color:#000000;
    font-size:15px;
    font-weight:900;
    cursor:pointer;
  "
>
  SUBMIT SEAT REQUEST
</button>


<!-- =========================================
     CHECK MY SEAT
========================================= -->

<button
  type="button"
  id="checkMySeatButton"
  onclick="openCheckMySeat()"
  style="
    width:100%;
    margin-top:10px;
    padding:14px;
    border:none;
    border-radius:12px;
    background:#00ffff;
    color:#000000;
    font-size:15px;
    font-weight:900;
    cursor:pointer;
  "
>
  CHECK MY SEAT
</button>


        <!-- =========================
     PARCEL SERVICE
========================= -->

<div style="
  margin-top:18px;
  padding:16px;
  border-radius:14px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(0,255,255,.25);
">

  <div style="
    font-size:17px;
    font-weight:900;
    color:#00ffff;
    margin-bottom:12px;
  ">
    PARCEL SERVICE
  </div>

  <div style="
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:10px;
  ">

    <label style="
      padding:14px;
      border-radius:10px;
      background:rgba(0,255,136,.08);
      border:1px solid rgba(0,255,136,.3);
      color:#ffffff;
      cursor:pointer;
      text-align:center;
    ">

      <input
        type="radio"
        name="parcelAction"
        value="send"
        onchange="handleParcelChoice()"
      >

      SEND PARCEL

    </label>

    <label style="
      padding:14px;
      border-radius:10px;
      background:rgba(0,150,255,.08);
      border:1px solid rgba(0,150,255,.3);
      color:#ffffff;
      cursor:pointer;
      text-align:center;
    ">

      <input
        type="radio"
        name="parcelAction"
        value="receive"
        onchange="handleParcelChoice()"
      >

      RECEIVE PARCEL

    </label>

  </div>

</div>

<div
id="parcelDetails"
style="
  display:none;
  margin-top:12px;
">
</div> 

      </div>

    `;

  }


  /* =========================
     TOURISM / SAFARI
  ========================= */

  else if(serviceType === "tourism"){

    box.innerHTML = `

      <div style="
        padding:16px;
        background:linear-gradient(
          135deg,
          rgba(0,255,136,.08),
          rgba(255,215,0,.05)
        );
        border:1px solid rgba(0,255,136,.35);
        border-radius:14px;
      ">

        <div style="
          font-size:17px;
          font-weight:900;
          color:#00ff88;
          margin-bottom:14px;
        ">
          SAFARI & TOURISM DETAILS
        </div>

        <input
        id="bookingDestination"
        placeholder="Safari / Tour Destination"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingTravelDate"
        type="date"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingPassengers"
        type="number"
        min="1"
        placeholder="Total Number of Travelers"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingAdults"
        type="number"
        min="0"
        placeholder="Number of Adults"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingChildren"
        type="number"
        min="0"
        placeholder="Number of Children"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <select
        id="bookingHotel"
        style="
        width:100%;
        padding:14px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

          <option value="">
            Hotel Accommodation Required?
          </option>

          <option value="Yes">
            Yes
          </option>

          <option value="No">
            No
          </option>

        </select>

      </div>

    `;

  }


  /* =========================
     HOTEL
  ========================= */

  else if(serviceType === "hotel"){

    box.innerHTML = `

      <div style="
        padding:16px;
        background:linear-gradient(
          135deg,
          rgba(190,100,255,.08),
          rgba(255,215,0,.05)
        );
        border:1px solid rgba(190,100,255,.35);
        border-radius:14px;
      ">

        <div style="
          font-size:17px;
          font-weight:900;
          color:#c77dff;
          margin-bottom:14px;
        ">
          HOTEL BOOKING DETAILS
        </div>

        <input
        id="bookingCheckIn"
        type="date"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingCheckOut"
        type="date"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingGuests"
        type="number"
        min="1"
        placeholder="Number of Guests"
        style="
        width:100%;
        padding:14px;
        margin-bottom:10px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

        <input
        id="bookingRooms"
        type="number"
        min="1"
        placeholder="Number of Rooms"
        style="
        width:100%;
        padding:14px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

      </div>

    `;

  }


  /* =========================
     GENERAL SERVICE
  ========================= */

  else{

    box.innerHTML = `

      <div style="
        padding:16px;
        background:linear-gradient(
          135deg,
          rgba(0,255,255,.06),
          rgba(255,255,255,.04)
        );
        border:1px solid rgba(0,255,255,.25);
        border-radius:14px;
      ">

        <div style="
          font-size:17px;
          font-weight:900;
          color:#00ffff;
          margin-bottom:14px;
        ">
          SERVICE REQUEST DETAILS
        </div>

        <input
        id="bookingServiceDate"
        type="date"
        style="
        width:100%;
        padding:14px;
        border:none;
        border-radius:10px;
        box-sizing:border-box;
        ">

      </div>

    `;

  }

}

function copyPaymentNumber(number){

  navigator.clipboard.writeText(number);

}

function openUSSD(code){

  const ussdLink =
    "tel:" + encodeURIComponent(code);

  window.location.href = ussdLink;

}

function openPaymentApp(appLink){

  if(!appLink){

    alert(
      "The official app for this payment provider is not available yet."
    );

    return;

  }

  window.location.href = appLink;

}

// ============================================
// PARCEL SERVICE
// ============================================

function handleParcelChoice(){

  const selected =
    document.querySelector(
      'input[name="parcelAction"]:checked'
    );

  const parcelBox =
    document.getElementById("parcelDetails");

  if(!selected || !parcelBox) return;

  // =========================
  // SEND PARCEL
  // =========================

  if(selected.value === "send"){

    parcelBox.style.display = "block";

    parcelBox.innerHTML = `

      <div style="
        padding:16px;
        border-radius:14px;
        background:rgba(0,255,136,.06);
        border:1px solid rgba(0,255,136,.25);
      ">

        <div style="
          font-size:16px;
          font-weight:900;
          color:#00ff88;
          margin-bottom:14px;
        ">
          SEND PARCEL DETAILS
        </div>

        <input
          id="parcelType"
          placeholder="Type of Parcel (Bag, Box, Envelope...)"
          style="
            width:100%;
            padding:14px;
            margin-bottom:10px;
            border:none;
            border-radius:10px;
            box-sizing:border-box;
          "
        >

        <input
          id="parcelDestination"
          placeholder="Parcel Destination"
          style="
            width:100%;
            padding:14px;
            margin-bottom:10px;
            border:none;
            border-radius:10px;
            box-sizing:border-box;
          "
        >

        <input
          id="parcelReceiverName"
          placeholder="Receiver Full Name"
          style="
            width:100%;
            padding:14px;
            margin-bottom:10px;
            border:none;
            border-radius:10px;
            box-sizing:border-box;
          "
        >

        <input
          id="parcelReceiverPhone"
          type="tel"
          placeholder="Receiver Phone Number"
          style="
            width:100%;
            padding:14px;
            border:none;
            border-radius:10px;
            box-sizing:border-box;
          "
        >

      </div>

    `;

  }


  // =========================
  // RECEIVE PARCEL
  // =========================

  else if(selected.value === "receive"){

    parcelBox.style.display = "block";

    parcelBox.innerHTML = `

      <div style="
        padding:16px;
        border-radius:14px;
        background:rgba(0,150,255,.06);
        border:1px solid rgba(0,150,255,.25);
      ">

        <div style="
          font-size:16px;
          font-weight:900;
          color:#00aaff;
          margin-bottom:14px;
        ">
          RECEIVE PARCEL DETAILS
        </div>

        <input
          id="parcelType"
          placeholder="Type of Parcel (Bag, Box, Envelope...)"
          style="
            width:100%;
            padding:14px;
            margin-bottom:10px;
            border:none;
            border-radius:10px;
            box-sizing:border-box;
          "
        >

        <input
          id="parcelSenderName"
          placeholder="Sender Full Name"
          style="
            width:100%;
            padding:14px;
            margin-bottom:10px;
            border:none;
            border-radius:10px;
            box-sizing:border-box;
          "
        >

        <input
          id="parcelSenderPhone"
          type="tel"
          placeholder="Sender Phone Number"
          style="
            width:100%;
            padding:14px;
            margin-bottom:10px;
            border:none;
            border-radius:10px;
            box-sizing:border-box;
          "
        >

        <input
          id="parcelDeliveryLocation"
          placeholder="Delivery Location"
          style="
            width:100%;
            padding:14px;
            border:none;
            border-radius:10px;
            box-sizing:border-box;
          "
        >

      </div>

    `;

  }

}

function handleFlightTravelChoice(){

  const travelChoice =
    document.getElementById("flightTravelChoice");

  const travelFields = [
    "bookingDeparture",
    "bookingDestination",
    "bookingTravelDate",
    "bookingPassengers",
    "bookingTravelClass"
  ];

  travelFields.forEach(id => {

    const field =
      document.getElementById(id);

    if(!field) return;

    field.style.display =
      travelChoice?.checked
      ? ""
      : "none";

  });

}

function handleFlightSendParcelChoice(){

  const sendChoice =
    document.getElementById("flightSendParcelChoice");

  if(!sendChoice) return;

  // Find the existing SEND PARCEL radio button
  const sendParcelRadio =
    document.querySelector(
      'input[name="parcelAction"][value="send"]'
    );

  if(sendChoice.checked){

    if(sendParcelRadio){

      sendParcelRadio.checked = true;

      // Use your existing parcel system
      handleParcelChoice();

    }

  }else{

    // If SEND PARCEL is unchecked,
    // remove the parcel selection only if it was SEND
    if(sendParcelRadio){

      sendParcelRadio.checked = false;

    }

    const parcelBox =
      document.getElementById("parcelDetails");

    if(parcelBox){

      parcelBox.style.display = "none";
      parcelBox.innerHTML = "";

    }

  }

        }

function handleFlightReceiveParcelChoice(){

  const receiveChoice =
    document.getElementById("flightReceiveParcelChoice");

  if(!receiveChoice) return;

  // Find the existing RECEIVE PARCEL radio button
  const receiveParcelRadio =
    document.querySelector(
      'input[name="parcelAction"][value="receive"]'
    );

  if(receiveChoice.checked){

    if(receiveParcelRadio){

      receiveParcelRadio.checked = true;

      // Use the existing parcel system
      handleParcelChoice();

    }

  }else{

    // Remove RECEIVE selection
    if(receiveParcelRadio){

      receiveParcelRadio.checked = false;

    }

    const parcelBox =
      document.getElementById("parcelDetails");

    if(parcelBox){

      parcelBox.style.display = "none";
      parcelBox.innerHTML = "";

    }

  }

}

function handleBusTravelChoice(){

  const travelChoice =
    document.getElementById("busTravelChoice");

  const travelFields = [
    "bookingDeparture",
    "bookingDestination",
    "bookingTravelDate",
    "bookingPassengers"
  ];

  travelFields.forEach(id => {

    const field =
      document.getElementById(id);

    if(!field) return;

    field.style.display =
      travelChoice?.checked
      ? ""
      : "none";

  });

}

function handleBusSendParcelChoice(){

  const sendChoice =
    document.getElementById("busSendParcelChoice");

  if(!sendChoice) return;

  // Find the existing SEND PARCEL radio button
  const sendParcelRadio =
    document.querySelector(
      'input[name="parcelAction"][value="send"]'
    );

  if(sendChoice.checked){

    if(sendParcelRadio){

      sendParcelRadio.checked = true;

      // Use your existing parcel system
      handleParcelChoice();

    }

  }else{

    // Remove SEND PARCEL selection
    if(sendParcelRadio){

      sendParcelRadio.checked = false;

    }

    const parcelBox =
      document.getElementById("parcelDetails");

    if(parcelBox){

      parcelBox.style.display = "none";
      parcelBox.innerHTML = "";

    }

  }

}

function handleBusReceiveParcelChoice(){

  const receiveChoice =
    document.getElementById("busReceiveParcelChoice");

  if(!receiveChoice) return;

  // Find the existing RECEIVE PARCEL radio button
  const receiveParcelRadio =
    document.querySelector(
      'input[name="parcelAction"][value="receive"]'
    );

  if(receiveChoice.checked){

    if(receiveParcelRadio){

      receiveParcelRadio.checked = true;

      // Use the existing parcel system
      handleParcelChoice();

    }

  }else{

    // Remove RECEIVE selection
    if(receiveParcelRadio){

      receiveParcelRadio.checked = false;

    }

    const parcelBox =
      document.getElementById("parcelDetails");

    if(parcelBox){

      parcelBox.style.display = "none";
      parcelBox.innerHTML = "";

    }

  }

}
