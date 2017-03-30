// Menu Options
export let PROFILE_OPTION = "PROFILE";

// Profile Options
export let PERSONAL_INFO_OPTION = "CONTACT INFO";
export let STATION_OPTION       = "STATION INFO";

export let MENU = [
                    {
                      "name": PROFILE_OPTION,
                      "showingSubMenus": false,
                      "items": [
                        {
                          "name": PERSONAL_INFO_OPTION
                        },
                        {
                          "name": STATION_OPTION
                        }
                      ]
                    }
                  ];