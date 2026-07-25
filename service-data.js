const serviceDatabase = {

  "SHALOM PRODUCTS": {

    serviceType: "product",

    bannerMessages: [
      "Welcome to SHALOM PRODUCTS",
      "Quality Agro Products Direct From Tanzania",
      "Natural Products For A Better Life"
    ],

    bookingDetails: `
      Product Category : Natural Food Products<br><br>
      Availability : In Stock<br><br>
      Order Type : Wholesale & Retail<br><br>
      Delivery : Tanzania Wide<br><br>
      Payment : Mobile Money & Bank Transfer
        `,

      paymentAccounts: {

      mpesa: {
        enabled: true,
        number: "07XXXXXXXX",
        accountName: "SHALOM PRODUCTS"
      },

      airtel: {
        enabled: true,
        number: "07",
        accountName: "SHALOM PRODUCTS"
      },

      mixx: {
        enabled: true,
        number: "08",
        accountName: "SHALOM PRODUCTS"
      },

      nmb: {
        enabled: true,
        accountName: "SHALOM PRODUCTS",
        accountNumber: "06"
      },

      crdb: {
        enabled: true,
        accountName: "SHALOM PRODUCTS",
        accountNumber: "09"
      }

    }  
  },

};
