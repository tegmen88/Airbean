import "../scss/_menupage.scss";

function Menupage() {
  const menuItems = [
    { name: "Bryggkaffe", price: "49 kr", text: "Bryggd på månadens bönor" },
    { name: "Caffe Doppio", price: "49 kr", text: "Bryggd på månadens bönor" },
    { name: "Cappuccino", price: "49 kr", text: "Bryggd på månadens bönor" },
    {
      name: "Latte Macchiato",
      price: "49 kr",
      text: "Bryggd på månadens bönor",
    },
    { name: "Kaffe Latte", price: "49 kr", text: "Bryggd på månadens bönor" },
    { name: "Cortado", price: "39 kr", text: "Bryggd på månadens bönor" },
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
                {item.name + " "}
                {item.price}
                <br />
                {item.text}
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
