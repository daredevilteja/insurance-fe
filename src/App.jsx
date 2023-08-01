import { Suspense, useState } from "react";
import "./App.css";
import DropDown from "./components/DropDown";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const INSURANCE_AMOUNT = ["300000", "400000", "500000"];
  const CITY_TIER = ["1", "2"];
  const INSURANCE_TENURE = ["1", "2", "3"];
  const [adultsCount, setAdultsCount] = useState(1);
  const [adultsAges, setAdultAges] = useState("");
  const [childCount, setChildCount] = useState(0);
  const [childAges, setChildAges] = useState("");
  const [sumInsured, setSumInsured] = useState("300000");
  const [cityTier, setCityTier] = useState("1");
  const [tenureOfInsurance, setTenureOfInsurance] = useState("1");
  const [calculatedPremium, setCalculatedPremium] = useState(null);

  const toNumberConverter = (arr) => {
    const newArr = [];
    arr.forEach((element) => {
      newArr.push(Number(element));
    });
    return newArr;
  };

  const calculatePremium = async () => {
    const newAdultAges = toNumberConverter(adultsAges.split(","));
    const newChildAges = toNumberConverter(childAges.split(","));
    const data = {
      adult_count: Number(adultsCount),
      child_count: Number(childCount),
      adult_ages: newAdultAges,
      child_ages: newChildAges,
      sum_insured: Number(sumInsured),
      city_tier: Number(cityTier),
      tenure_of_insurance: Number(tenureOfInsurance),
    };
    await fetch("https://rsz6hp-5000.csb.app/get-premium", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setCalculatedPremium(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="mainContainer">
      <Suspense fallback={<LoadingSpinner />}>
        <h1>Insurance Premium Cost Generator</h1>
        <div className="formContainer">
          <label>
            Enter number of adults:
            <input
              type="number"
              name="adults"
              value={adultsCount}
              onChange={(e) => setAdultsCount(e.target.value)}
              min={1}
              required
            />
          </label>
          <label>
            Enter ages of adults in comma-seperated format:
            <input
              type="text"
              name="adultsAges"
              value={adultsAges}
              onChange={(e) => setAdultAges(e.target.value)}
              placeholder={"90, 80"}
              required
            />
          </label>
          <label>
            Enter number of children:
            <input
              type="number"
              name="child"
              value={childCount}
              onChange={(e) => setChildCount(e.target.value)}
            />
          </label>
          <label>
            Enter ages of children in comma-seperated format:
            <input
              type="text"
              name="childAges"
              value={childAges}
              onChange={(e) => setChildAges(e.target.value)}
              placeholder={"90, 80"}
            />
          </label>
          <DropDown
            labelData={"Sum insured"}
            options={INSURANCE_AMOUNT}
            handleChange={(val) => setSumInsured(val)}
          />
          <DropDown
            labelData={"Select City Tier"}
            options={CITY_TIER}
            handleChange={(val) => setCityTier(val)}
          />

          <DropDown
            labelData={"Select Tenure of the Insurance"}
            options={INSURANCE_TENURE}
            handleChange={(val) => setTenureOfInsurance(val)}
          />

          <button onClick={calculatePremium}>Calculate Premium</button>
        </div>

        <div>Calculated Premium: {calculatedPremium}</div>
      </Suspense>
    </div>
  );
}

export default App;
