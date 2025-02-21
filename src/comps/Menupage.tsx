import "../scss/_menupage.scss";

function Menupage() {
  const menuItems = [
    { name: "Bryggkaffe", price: "49 kr" },
    { name: "Caffe Doppio", price: "49 kr" },
    { name: "Cappuccino", price: "49 kr" },
    { name: "Latte Macchiato", price: "49 kr" },
    { name: "Kaffe Latte", price: "49 kr" },
    { name: "Cortado", price: "39 kr" },
  ];

  return (
    <>
      <div className="menu-page">
        <img src="/menuheaderup.png" alt="Flower" className="menuheader up" />

        <h1>Meny</h1>
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <span className="menu-item-name">
                <button className="menu-add-btn">+</button>
                {item.name}
              </span>
            </li>
          ))}
        </ul>

        <img
          src="/menuheaderdown.png"
          alt="Flower"
          className="menuheader down"
        />
      </div>
    </>
  );
}

export default Menupage;
