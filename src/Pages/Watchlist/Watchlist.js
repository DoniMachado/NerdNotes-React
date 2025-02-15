import style from "./Watchlist.module.css";
import { CONTENT_TYPE_MOVIE, CONTENT_TYPE_TVSERIE } from "../../Utils";
import { Tab, Tabs } from "@mui/material";
import { CustomTab, CustomList } from "../../Componentes/index.js";
import { useState, useContext } from "react";
import { LanguageContext, AuthorizeContext } from "../../Contexts/index.js";

export default function WatchlistPage() {
  const { getTranslation } = useContext(LanguageContext);
  const { accountID } = useContext(AuthorizeContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id={style.watchlist}>
      <div id={style.watchlist_tabs}>
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
        <CustomList
          url={`https://api.themoviedb.org/3/account/${accountID}/watchlist/movies`}
          title={getTranslation("Common::Label::Watchlist::Movies")}
          type={CONTENT_TYPE_MOVIE}
        />
      </CustomTab>

      <CustomTab value={value} index={1}>
        <CustomList
          url={`https://api.themoviedb.org/3/account/${accountID}/watchlist/tv`}
          title={getTranslation("Common::Label::Watchlist::Series")}
          type={CONTENT_TYPE_TVSERIE}
        />
      </CustomTab>
    </div>
  );
}
