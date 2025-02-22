import "../scss/_aboutpage.scss";

function About() {
  return (
    <>
      <section className="about-page">
        <article className="about-page--article">
          <img src="/menuheaderup.png" alt="Flower" className="menuheader-up" />
          <h1 className="about-page--header">Vårt kaffe</h1>
          <p className="about-page--text">
            <strong>
              Pumpkin spice mug, barista cup, sit macchiato, kopi-luwak, doppio,
              grounds dripper, crema, strong whipped, variety extra iced id
              lungo half and half mazagran. Pumpkin spice.
            </strong>
            <br />
            <br />
            Que dark fair trade, spoon decaffeinated, barista wings whipped, as
            rich aftertaste, con panna milk black, arabica white rich beans
            single shot extra affogato. So affogato macchiato sit extraction
            instant grinder seasonal organic, turkish single shot, single
            origin, and robusta strong to go so dripper. Viennese froth, grounds
            caramelization skinny aromatic cup kopi-luwak, fair trade flavour,
            frappuccino medium, café au lait flavour cultivar ut bar instant
            kopi-luwak.
            <br />
            <br />
            Roast id macchiato, single shot siphon mazagran milk fair trade est
            aroma a half and half and, so, galão iced to go, whipped as cream
            cup pumpkin spice iced. At extra, rich grinder, brewed to go,
            steamed half and half at, that, percolator macchiato trifecta and
            body as arabica dripper. In galão black java milk sit trifecta,
            robusta, acerbic café au lait instant shop latte. Seasonal bar shop
            filter aroma id, crema, affogato viennese cultivar aftertaste,
            seasonal, percolator cream black, galão flavour, milk aromatic
            turkish skinny crema.
          </p>
          <section className="hero-section">
            <figure>
              <img
                src="/aboutPageImage.png"
                alt=""
                className="aboutPageImage"
              />
            </figure>

            <h3 className="hero-name">Eva Cortado</h3>
            <p className="hero-para">VD & Grundare</p>
          </section>
          <img
            src="/menuheaderdown.png"
            alt="Flower"
            className="menuheader-down"
          />
        </article>
      </section>
    </>
  );
}

export default About;
