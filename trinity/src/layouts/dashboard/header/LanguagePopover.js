import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { Icon } from '@iconify/react';

const languageMap = {
  en: { label: "English", dir: "ltr", active: true },
  fr: { label: "हिंदी", dir: "ltr", active: false },
};

const LanguagePopover = () => {
  const [selected, setSelected] = React.useState("en");
  const { t } = useTranslation();

  const [menuAnchor, setMenuAnchor] = React.useState(null);
  React.useEffect(() => {
    document.body.dir = languageMap[selected].dir;
  }, [menuAnchor, selected]);

  return (
    <div className="d-flex justify-content-end align-items-center language-select-root">
      <Button SX={{marginRight:'20px'}} variant='outlined'>
        My Wallet
      </Button>
      <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
      <GTranslateIcon sx={{marginRight:'20px'}} />
        {languageMap[selected].label}
        <ArrowDropDownIcon fontSize="small" />
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div>
          <List>
            <ListSubheader>{t("select_language")}</ListSubheader>
            {Object.keys(languageMap)?.map((item) => (
              <ListItem
                //create a button and set it to true without deprecation warning
                component={ListItemButton}
                key={item}
                onClick={() => {
                  i18next.changeLanguage(item);
                  localStorage.setItem("i18nextLng", item);
                  setSelected(item);
                  setMenuAnchor(null);
                }}
              >
                {languageMap[item].label}
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default LanguagePopover;
