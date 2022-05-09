import React from "react";

function Search() {
  return (
    <section className="pick-food-pick-hotel container">
      <form action="#" className="inside-pick-food-hotel">
        <div className="food-name">
          <label htmlFor="fname">Pick Address</label>
          <br />
          <input type="text" id="fname" name="fname" defaultValue="Address A" />
          <br />
        </div>
        <div className="food-name">
          <label htmlFor="fname">Pick Hotel</label>
          <br />
          <input type="text" id="fname" name="fname" defaultValue="Hotel A" />
          <br />
        </div>
        <button id="search"> Search </button>
      </form>
    </section>
  );
}

export default Search;
