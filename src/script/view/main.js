import "../component/country-list.js";
import "../component/search-bar.js";
import DataSource from "../data/data-source.js";

const main = () => {
  // Initialize SearchBar and Result
  const searchElement = document.querySelector("search-bar");
  const countryListElement = document.querySelector("country-list");
  const onButtonSearchClicked = async () => {
    try {
      const result = await DataSource.searchCountry(searchElement.value);
      renderResult(result);
      document.getElementById("countrySearch").innerHTML =
        "Case in " + searchElement.value;
    } catch (message) {
      fallbackResult(message);
    }
  };
  const renderResult = (results) => {
    countryListElement.country = results;
  };
  const fallbackResult = (message) => {
    countryListElement.renderError(message);
  };
  searchElement.clickEvent = onButtonSearchClicked;

  // Get Global Status
  const baseUrlMathdroid = "https://covid19.mathdro.id/api";
  const getGlobalStatus = () => {
    fetch(`${baseUrlMathdroid}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          let lastUpdate = new Date(responseJson.lastUpdate);
          let update =
            lastUpdate.getDate() +
            "-" +
            (lastUpdate.getMonth() + 1) +
            "-" +
            lastUpdate.getFullYear();
          document.getElementById("globalLastUpdate").innerHTML =
            "Last Update " + update;
          document.getElementById("globalConfirmed").innerHTML =
            responseJson.confirmed.value;
          document.getElementById("globalRecovered").innerHTML =
            responseJson.recovered.value;
          document.getElementById("globalDeath").innerHTML =
            responseJson.deaths.value;
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  // Get kenya Status
  const getkenyaStatus = () => {
    fetch(`${baseUrlMathdroid}/countries/kenya/confirmed`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          let data = responseJson;
          document.getElementById("kenyaConfirmed").innerHTML =
            data[0].confirmed;
          document.getElementById("kenyaRecovered").innerHTML =
            data[0].recovered;
          document.getElementById("kenyaDeath").innerHTML = data[0].deaths;
          document.getElementById("kenyaActive").innerHTML = data[0].active;
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  // Get kenya Status by Province
  const getkenyaStatusProvince = () => {
    fetch("https://kenya-covid-19.mathdro.id/api/")
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          renderProvince(responseJson.data);
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  const renderProvince = (data) => {
    const listProvinsiElement = document.querySelector("#list-provinsi");
    listProvinsiElement.innerHTML = "";
    data.forEach((item) => {
      listProvinsiElement.innerHTML += `
            <tr>
                <td>${item.provinsi}</td>
                <td>${item.kasusPosi}</td>
                <td>${item.kasusSemb}</td>
                <td>${item.kasusMeni}</td>
            </tr>
            `;
    });
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  // Call each function
  getGlobalStatus();
  getkenyaStatus();
  getkenyaStatusProvince();
};

export default main;
