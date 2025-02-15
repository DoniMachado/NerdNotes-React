import style from "./Discover.module.css";
import {
  CONTENT_TYPE_MOVIE,
  CONTENT_TYPE_TVSERIE,
  getGenres,
  getOrders,
} from "../../Utils";
import { Tab, Tabs } from "@mui/material";
import { CustomTab, Discover } from "../../Componentes/index.js";
import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../../Contexts/index.js";

export default function DiscoverPage() {
  const { language, getTranslation } = useContext(LanguageContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id={style.home}>
      <div id={style.home_tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={getTranslation("Common::Label::Movies")}
            id="simple-tab-0"
            aria-controls="simple-tabpanel-0"
          />
          <Tab
            label={getTranslation("Common::Label::Series")}
            id="simple-tab-1"
            aria-controls="simple-tabpanel-1"
          />
        </Tabs>
      </div>

      <CustomTab value={value} index={0}>
        <Discover
          title={getTranslation("Common::Label::Discover::Movies")}
          genres={getGenres(CONTENT_TYPE_MOVIE)}
          orders={getOrders(CONTENT_TYPE_MOVIE)}
          initialOrder={getOrders(CONTENT_TYPE_MOVIE).find(
            (o) => o.value === "popularity.desc"
          )}
          type={CONTENT_TYPE_MOVIE}
        />
      </CustomTab>

      <CustomTab value={value} index={1}>
        <Discover
          title={getTranslation("Common::Label::Discover::Series")}
          genres={getGenres(CONTENT_TYPE_TVSERIE)}
          orders={getOrders(CONTENT_TYPE_TVSERIE)}
          initialOrder={getOrders(CONTENT_TYPE_TVSERIE).find(
            (o) => o.value === "popularity.desc"
          )}
          type={CONTENT_TYPE_TVSERIE}
        />
      </CustomTab>
    </div>
  );
}
