// import React, { useEffect } from "react";

// const Facebook = () => {
//   useEffect(() => {
//     !(function (f, b, e, v, n, t, s) {
//       if (f.fbq) return;
//       n = f.fbq = function () {
//         n.callMethod
//           ? n.callMethod.apply(n, arguments)
//           : n.queue.push(arguments);
//       };
//       if (!f._fbq) f._fbq = n;
//       n.push = n;
//       n.loaded = !0;
//       n.version = "2.0";
//       n.queue = [];
//       t = b.createElement(e);
//       t.async = !0;
//       t.src = v;
//       s = b.getElementsByTagName(e)[0];
//       s.parentNode.insertBefore(t, s);
//     })(
//       window,
//       document,
//       "script",
//       "https://connect.facebook.net/en_US/fbevents.js"
//     );
//     fbq("init", "YOUR_PIXEL_ID"); // Insert your Pixel ID here
//     fbq("track", "PageView");
//   }, []);

//   return null;
// };

// export default Facebook;

export const PageView = () => {
  // fbq("track", "PageView");
};
export const AddToCart = () => {
  // fbq("track", "AddToCart");
};

export const AddToWishList = () => {
  // fbq("track", "AddToWishlist");
};

export const InitialCheckout = () => {
  // fbq("track", "InitiateCheckout");
};

export const Purchase = (amount: number) => {
  console.log(amount);
  // fbq("track", "Purchase", { value: amount, currency: "PKR" });
};

export const Search = () => {
  // fbq("track", "Search");
};

export const ViewContent = () => {
  // fbq("track", "ViewContent");
};
