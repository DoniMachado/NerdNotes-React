import style from "./Search.module.css";
import { CONTENT_TYPE_MOVIE, CONTENT_TYPE_TVSERIE } from "../../Utils";
import { Tab, Tabs } from "@mui/material";
import { useState, useContext } from "react";
import { LanguageContext } from "../../Contexts/index.js";
import { CustomTab, Search } from "../../Componentes/index.js";

export default function SearchPage() {
  const [value, setValue] = useState(0);
  const { getTranslation } = useContext(LanguageContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id={style.search}>
      <div id={style.search_tabs}>
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
        <Search
          title={getTranslation("Common::Label::Search::Movies")}
          type={CONTENT_TYPE_MOVIE}
        />
      </CustomTab>

      <CustomTab value={value} index={1}>
        <Search
          title={getTranslation("Common::Label::Search::Series")}
          type={CONTENT_TYPE_TVSERIE}
        />
      </CustomTab>
    </div>
  );
}
