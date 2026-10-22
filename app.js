/*
 GADGET VAXO STARTER STORE
 Demo admin password: vaxo123
 IMPORTANT: This front-end demo stores cart/orders in this browser only.
 Do not use the demo password or localStorage for a real live store.
 Replace sample product names/prices/descriptions before publishing.
*/
const ADMIN_PASSWORD = "vaxo123";
const PRODUCTS = [
  {id:1,name:"Gaming Earphones",category:"Audio",price:650,emoji:"🎧",tag:"GAMING",desc:"Wired audio accessory for gaming and everyday listening."},
  {id:2,name:"Magnetic Phone Cooler",category:"Gaming",price:950,emoji:"❄️",tag:"POPULAR",desc:"A phone-cooling accessory for compatible devices."},
  {id:3,name:"20,000mAh Power Bank",category:"Power",price:1450,emoji:"🔋",tag:"POWER",desc:"Portable charging accessory. Confirm capacity before listing."},
  {id:4,name:"Bluetooth Earbuds",category:"Audio",price:1200,emoji:"🎵",tag:"WIRELESS",desc:"Compact wireless earbuds for everyday use."},
  {id:5,name:"RGB Gaming Mouse",category:"Gaming",price:750,emoji:"🖱️",tag:"GAMING",desc:"Wired mouse for gaming and desktop use."},
  {id:6,name:"USB-C Fast Cable",category:"Accessories",price:250,emoji:"🔌",tag:"ESSENTIAL",desc:"Charging cable. Check connector and compatibility."},
  {id:7,name:"Mobile Phone Stand",category:"Mobile",price:350,emoji:"📱",tag:"DESK SETUP",desc:"A stand for viewing and desk use."},
  {id:8,name:"Mini Bluetooth Speaker",category:"Audio",price:890,emoji:"🔊",tag:"PORTABLE",desc:"Compact speaker for everyday listening."},
  {id:9,name:"USB LED Desk Light",category:"Accessories",price:420,emoji:"💡",tag:"DESK",desc:"USB-powered light accessory. Confirm specifications."},
  {id:10,name:"Multi-Port USB Hub",category:"Accessories",price:590,emoji:"🧩",tag:"CONNECT",desc:"Adds USB connections to compatible devices."}
];
const money = n => "৳" + Number(n||0).toLocaleString("en-BD");
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
let cart = read("gv_cart", []);
let orders = read("gv_orders", []);
let toastTimer;
const $ = id => document.getElementById(id);
function toast(message){$("toast").textContent=message;$("toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),2300);}
function showModal(id){$(id).classList.remove("hidden");document.body.style.overflow="hidden";}
function closeModal(id){$(id).classList.add("hidden");if(!document.querySelector(".modal:not(.hidden)"))document.body.style.overflow="";}
function renderProducts(){
 const q=$("searchInput").value.trim().toLowerCase(), category=$("categoryFilter").value;
 const items=PRODUCTS.filter(p=>(category==="all"||p.category===category)&&`${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(q));
 $("productCount").textContent=`${items.length} product${items.length===1?"":"s"}`;
 $("productGrid").innerHTML=items.length?items.map(p=>`<article class="product-card"><div class="product-visual"><span class="product-tag">${p.tag}</span><span class="product-emoji" aria-hidden="true">${p.emoji}</span></div><div class="product-info"><span class="product-category">${p.category}</span><h3>${escapeHTML(p.name)}</h3><p class="product-desc">${escapeHTML(p.desc)}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" type="button" data-add="${p.id}" aria-label="Add ${escapeHTML(p.name)} to cart">+</button></div></div></article>`).join(""):`<div class="empty-state">No products found. Try another search.</div>`;
}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();toast("Added to your bag.");}
function saveCart(){write("gv_cart",cart);renderCart();}
function renderCart(){
 const count=cart.reduce((n,x)=>n+x.qty,0),total=cart.reduce((n,x)=>n+(PRODUCTS.find(p=>p.id===x.id)?.price||0)*x.qty,0);
 $("cartCount").textContent=count;$("cartTotal").textContent=money(total);
 $("cartItems").innerHTML=cart.length?cart.map(x=>{const p=PRODUCTS.find(p=>p.id===x.id);if(!p)return "";return `<div class="cart-line"><div class="cart-emoji">${p.emoji}</div><div><h3>${escapeHTML(p.name)}</h3><p>${money(p.price)} each</p><div class="qty-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><b>${x.qty}</b><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div></div><div><b>${money(p.price*x.qty)}</b><br><button class="remove-btn" data-remove="${p.id}">Remove</button></div></div>`}).join(""):`<div class="empty-state">Your bag is empty. Add a gadget to get started.</div>`;
 $("checkoutOpen").disabled=!cart.length;$("checkoutOpen").style.opacity=cart.length?1:.5;
}
function updateQty(id,delta){const x=cart.find(x=>x.id===id);if(!x)return;x.qty+=delta;if(x.qty<1)cart=cart.filter(y=>y.id!==id);saveCart();}
function openCheckout(){if(!cart.length){toast("Your bag is empty.");return;}closeModal("cartModal");showModal("checkoutModal");}
function renderAdmin(){
 $("adminOrderCount").textContent=orders.length;
 $("adminSales").textContent=money(orders.reduce((n,o)=>n+o.total,0));
 $("adminOrders").innerHTML=orders.length?[...orders].reverse().map(o=>`<article class="admin-order"><div class="admin-order-head"><b>${escapeHTML(o.id)} · ${escapeHTML(o.name)}</b><span>${money(o.total)}</span></div><p>Phone: ${escapeHTML(o.phone)}<br>Address: ${escapeHTML(o.address)}<br>Payment: ${escapeHTML(o.payment)}<br>Items: ${escapeHTML(o.items.map(i=>`${i.name} × ${i.qty}`).join(", "))}<br>Placed: ${escapeHTML(o.date)}</p><label>Status <select data-status="${escapeHTML(o.id)}"><option ${o.status==="Pending"?"selected":""}>Pending</option><option ${o.status==="Confirmed"?"selected":""}>Confirmed</option><option ${o.status==="Shipped"?"selected":""}>Shipped</option><option ${o.status==="Delivered"?"selected":""}>Delivered</option><option ${o.status==="Cancelled"?"selected":""}>Cancelled</option></select></label></article>`).join(""):`<div class="admin-empty">No orders yet. Orders placed in this browser will appear here.</div>`;
}
$("productGrid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(Number(b.dataset.add));});
$("searchInput").addEventListener("input",renderProducts);$("categoryFilter").addEventListener("change",renderProducts);
$("cartFab").addEventListener("click",()=>{renderCart();showModal("cartModal");});
$("checkoutOpen").addEventListener("click",openCheckout);
document.addEventListener("click",e=>{
 const close=e.target.closest("[data-close]");if(close)closeModal(close.dataset.close);
 const qty=e.target.closest("[data-qty]");if(qty)updateQty(Number(qty.dataset.qty),Number(qty.dataset.delta));
 const remove=e.target.closest("[data-remove]");if(remove){cart=cart.filter(x=>x.id!==Number(remove.dataset.remove));saveCart();}
});
$("checkoutForm").addEventListener("submit",e=>{
 e.preventDefault();if(!cart.length){toast("Your bag is empty.");closeModal("checkoutModal");return;}
 const form=new FormData(e.currentTarget), payment=form.get("payment");
 if(payment==="Online payment"){toast("Online payment is not connected yet. Please choose COD.");return;}
 const items=cart.map(x=>{const p=PRODUCTS.find(p=>p.id===x.id);return {id:p.id,name:p.name,price:p.price,qty:x.qty};});
 const total=items.reduce((n,x)=>n+x.price*x.qty,0);
 const order={id:"GV-"+Date.now().toString().slice(-8),name:String(form.get("name")).trim(),phone:String(form.get("phone")).trim(),address:String(form.get("address")).trim(),payment,items,total,status:"Pending",date:new Date().toLocaleString()};
 orders.push(order);write("gv_orders",orders);cart=[];saveCart();e.currentTarget.reset();closeModal("checkoutModal");$("successText").textContent=`Order ${order.id} was saved in this browser. Total: ${money(total)}.`;showModal("successModal");
});
$("adminOpen").addEventListener("click",()=>{showModal("adminModal");$("adminLogin").classList.remove("hidden");$("adminDashboard").classList.add("hidden");});
$("adminLoginForm").addEventListener("submit",e=>{e.preventDefault();if(new FormData(e.currentTarget).get("password")!==ADMIN_PASSWORD){toast("Incorrect demo password.");return;}$("adminLogin").classList.add("hidden");$("adminDashboard").classList.remove("hidden");renderAdmin();});
$("adminOrders").addEventListener("change",e=>{const s=e.target.closest("[data-status]");if(!s)return;const o=orders.find(o=>o.id===s.dataset.status);if(o){o.status=s.value;write("gv_orders",orders);toast("Order status updated.");}});
$("exportOrders").addEventListener("click",()=>{
 if(!orders.length){toast("No orders to export.");return;}
 const quote=v=>`"${String(v??"").replace(/"/g,'""')}"`;
 const rows=[["Order ID","Date","Name","Phone","Address","Payment","Items","Total","Status"],...orders.map(o=>[o.id,o.date,o.name,o.phone,o.address,o.payment,o.items.map(i=>`${i.name} x${i.qty}`).join("; "),o.total,o.status])];
 const csv="\ufeff"+rows.map(r=>r.map(quote).join(",")).join("\r\n");
 const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));const a=document.createElement("a");a.href=url;a.download="gadget-vaxo-orders.csv";a.click();URL.revokeObjectURL(url);
});
$("clearOrders").addEventListener("click",()=>{if(confirm("Delete all demo orders saved in this browser?")){orders=[];write("gv_orders",orders);renderAdmin();toast("Demo orders cleared.");}});
$("adminLogout").addEventListener("click",()=>{$("adminDashboard").classList.add("hidden");$("adminLogin").classList.remove("hidden");$("adminLoginForm").reset();});
$("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
