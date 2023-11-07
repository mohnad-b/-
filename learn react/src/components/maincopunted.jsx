import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./prayer";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import "moment/dist/locale/ar-dz";
moment.locale("ar-dz");
export default function maincopunted() {
  const [timings, timingupdate] = useState({
    Fajr: "05:15",
    Sunrise: "06:44",
    Dhuhr: "12:56",
    Asr: "16:26",
    Sunset: "19:07",
    Maghrib: "19:07",
    Isha: "20:37",
    Imsak: "05:05",
    Midnight: "00:55",
    Firstthird: "22:59",
    Lastthird: "02:52",
  });

  const [selectedCity, setSelectedCity] = useState({
    displayName: "الاسكندريه",
    apiName: "alexandria",
  });
  const [today, setToday] = useState("");
  const [timer, setTimer] = useState(10);
  const avalibleCity = [
    {
      displayName: "الرياض",
      apiName: "Riyadh",
      country: "Saudi Arabia",
    },
    {
      displayName: "الاسكندريه",
      apiName: "alexandria",
      country: "Egypt",
    },
    {
      displayName: "الرباط",
      apiName: "Rabat",
      country: "Morocco",
    },
    {
      displayName: "بغداد",
      apiName: "Baghdad",
      country: "Ireq",
    },
  ];
  const getTiming = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity.apiName}&country=${selectedCity.country}&method=8`
    );
    timingupdate(response.data.data.timings);
  };

  useEffect(() => {
    getTiming();
  }, [selectedCity]);

  useEffect(() => {
    const t = moment();
    setToday(t.format("MMM Do YYYY | H:mm"));
    let inverval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);
    return () => {
      clearInterval(inverval);
    };
  });

  const setupCountdownTimer = () => {};
  function handleChange(event) {
    const cityObject = avalibleCity.find((city) => {
      return city.apiName == event.target.value;
    });
    console.log(event.target.velue);
    setSelectedCity(cityObject);
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>{selectedCity.displayName}</h1>
            <h2>{timer}</h2>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h2>متبقى حتى صلاه العصر</h2>
            <h1>00:10:20</h1>
          </div>
        </Grid>
      </Grid>
      <Divider style={{ borderColor: "white", opacity: "0.1" }} />
      <Stack
        direction="row"
        justifyContent={"space-between"}
        style={{ marginTop: "50px" }}
      >
        <Prayer
          name="الفجر"
          time={timings.Fajr}
          image="../../public/fajr-prayer.png"
        />
        <Prayer
          name="الظهر"
          time={timings.Dhuhr}
          image="../../public/fajr-prayer.png"
        />
        <Prayer
          name="العصر"
          time={timings.Asr}
          image="../../public/fajr-prayer.png"
        />
        <Prayer
          name="المغرب"
          time={timings.Maghrib}
          image="../../public/fajr-prayer.png"
        />
        <Prayer
          name="العشاء"
          time={timings.Isha}
          image="../../public/fajr-prayer.png"
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent={"center"}
        style={{ marginTop: "50px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">المدينه</InputLabel>
          <Select
            style={{ color: "White" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            onChange={handleChange}
          >
            {avalibleCity.map((city) => {
              return (
                <MenuItem value={city.apiName} key={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
