const timezones = [
    {
      "value": "Pacific/Midway",
      "text": "GMT-11:00 Pacific/Midway"
    },
    {
      "value": "Pacific/Niue",
      "text": "GMT-11:00 Pacific/Niue"
    },
    {
      "value": "Pacific/Pago_Pago",
      "text": "GMT-11:00 Pacific/Pago Pago"
    },
    {
      "value": "Pacific/Honolulu",
      "text": "GMT-10:00 Pacific/Honolulu"
    },
    {
      "value": "Pacific/Rarotonga",
      "text": "GMT-10:00 Pacific/Rarotonga"
    },
    {
      "value": "Pacific/Tahiti",
      "text": "GMT-10:00 Pacific/Tahiti"
    },
    {
      "value": "US/Hawaii",
      "text": "GMT-10:00 US/Hawaii"
    },
    {
      "value": "Pacific/Marquesas",
      "text": "GMT-09:30 Pacific/Marquesas"
    },
    {
      "value": "America/Adak",
      "text": "GMT-09:00 America/Adak"
    },
    {
      "value": "Pacific/Gambier",
      "text": "GMT-09:00 Pacific/Gambier"
    },
    {
      "value": "America/Anchorage",
      "text": "GMT-08:00 America/Anchorage"
    },
    {
      "value": "America/Juneau",
      "text": "GMT-08:00 America/Juneau"
    },
    {
      "value": "America/Metlakatla",
      "text": "GMT-08:00 America/Metlakatla"
    },
    {
      "value": "America/Nome",
      "text": "GMT-08:00 America/Nome"
    },
    {
      "value": "America/Sitka",
      "text": "GMT-08:00 America/Sitka"
    },
    {
      "value": "America/Yakutat",
      "text": "GMT-08:00 America/Yakutat"
    },
    {
      "value": "Pacific/Pitcairn",
      "text": "GMT-08:00 Pacific/Pitcairn"
    },
    {
      "value": "US/Alaska",
      "text": "GMT-08:00 US/Alaska"
    },
    {
      "value": "America/Creston",
      "text": "GMT-07:00 America/Creston"
    },
    {
      "value": "America/Dawson",
      "text": "GMT-07:00 America/Dawson"
    },
    {
      "value": "America/Dawson_Creek",
      "text": "GMT-07:00 America/Dawson Creek"
    },
    {
      "value": "America/Fort_Nelson",
      "text": "GMT-07:00 America/Fort Nelson"
    },
    {
      "value": "America/Hermosillo",
      "text": "GMT-07:00 America/Hermosillo"
    },
    {
      "value": "America/Los_Angeles",
      "text": "GMT-07:00 America/Los Angeles"
    },
    {
      "value": "America/Phoenix",
      "text": "GMT-07:00 America/Phoenix"
    },
    {
      "value": "America/Tijuana",
      "text": "GMT-07:00 America/Tijuana"
    },
    {
      "value": "America/Vancouver",
      "text": "GMT-07:00 America/Vancouver"
    },
    {
      "value": "America/Whitehorse",
      "text": "GMT-07:00 America/Whitehorse"
    },
    {
      "value": "Canada/Pacific",
      "text": "GMT-07:00 Canada/Pacific"
    },
    {
      "value": "US/Arizona",
      "text": "GMT-07:00 US/Arizona"
    },
    {
      "value": "US/Pacific",
      "text": "GMT-07:00 US/Pacific"
    },
    {
      "value": "America/Belize",
      "text": "GMT-06:00 America/Belize"
    },
    {
      "value": "America/Boise",
      "text": "GMT-06:00 America/Boise"
    },
    {
      "value": "America/Cambridge_Bay",
      "text": "GMT-06:00 America/Cambridge Bay"
    },
    {
      "value": "America/Chihuahua",
      "text": "GMT-06:00 America/Chihuahua"
    },
    {
      "value": "America/Costa_Rica",
      "text": "GMT-06:00 America/Costa Rica"
    },
    {
      "value": "America/Denver",
      "text": "GMT-06:00 America/Denver"
    },
    {
      "value": "America/Edmonton",
      "text": "GMT-06:00 America/Edmonton"
    },
    {
      "value": "America/El_Salvador",
      "text": "GMT-06:00 America/El Salvador"
    },
    {
      "value": "America/Guatemala",
      "text": "GMT-06:00 America/Guatemala"
    },
    {
      "value": "America/Inuvik",
      "text": "GMT-06:00 America/Inuvik"
    },
    {
      "value": "America/Managua",
      "text": "GMT-06:00 America/Managua"
    },
    {
      "value": "America/Mazatlan",
      "text": "GMT-06:00 America/Mazatlan"
    },
    {
      "value": "America/Ojinaga",
      "text": "GMT-06:00 America/Ojinaga"
    },
    {
      "value": "America/Regina",
      "text": "GMT-06:00 America/Regina"
    },
    {
      "value": "America/Swift_Current",
      "text": "GMT-06:00 America/Swift Current"
    },
    {
      "value": "America/Tegucigalpa",
      "text": "GMT-06:00 America/Tegucigalpa"
    },
    {
      "value": "America/Yellowknife",
      "text": "GMT-06:00 America/Yellowknife"
    },
    {
      "value": "Canada/Mountain",
      "text": "GMT-06:00 Canada/Mountain"
    },
    {
      "value": "Pacific/Easter",
      "text": "GMT-06:00 Pacific/Easter"
    },
    {
      "value": "Pacific/Galapagos",
      "text": "GMT-06:00 Pacific/Galapagos"
    },
    {
      "value": "US/Mountain",
      "text": "GMT-06:00 US/Mountain"
    },
    {
      "value": "America/Atikokan",
      "text": "GMT-05:00 America/Atikokan"
    },
    {
      "value": "America/Bahia_Banderas",
      "text": "GMT-05:00 America/Bahia Banderas"
    },
    {
      "value": "America/Bogota",
      "text": "GMT-05:00 America/Bogota"
    },
    {
      "value": "America/Cancun",
      "text": "GMT-05:00 America/Cancun"
    },
    {
      "value": "America/Cayman",
      "text": "GMT-05:00 America/Cayman"
    },
    {
      "value": "America/Chicago",
      "text": "GMT-05:00 America/Chicago"
    },
    {
      "value": "America/Eirunepe",
      "text": "GMT-05:00 America/Eirunepe"
    },
    {
      "value": "America/Guayaquil",
      "text": "GMT-05:00 America/Guayaquil"
    },
    {
      "value": "America/Indiana/Knox",
      "text": "GMT-05:00 America/Indiana/Knox"
    },
    {
      "value": "America/Indiana/Tell_City",
      "text": "GMT-05:00 America/Indiana/Tell City"
    },
    {
      "value": "America/Jamaica",
      "text": "GMT-05:00 America/Jamaica"
    },
    {
      "value": "America/Lima",
      "text": "GMT-05:00 America/Lima"
    },
    {
      "value": "America/Matamoros",
      "text": "GMT-05:00 America/Matamoros"
    },
    {
      "value": "America/Menominee",
      "text": "GMT-05:00 America/Menominee"
    },
    {
      "value": "America/Merida",
      "text": "GMT-05:00 America/Merida"
    },
    {
      "value": "America/Mexico_City",
      "text": "GMT-05:00 America/Mexico City"
    },
    {
      "value": "America/Monterrey",
      "text": "GMT-05:00 America/Monterrey"
    },
    {
      "value": "America/North_Dakota/Beulah",
      "text": "GMT-05:00 America/North Dakota/Beulah"
    },
    {
      "value": "America/North_Dakota/Center",
      "text": "GMT-05:00 America/North Dakota/Center"
    },
    {
      "value": "America/North_Dakota/New_Salem",
      "text": "GMT-05:00 America/North Dakota/New Salem"
    },
    {
      "value": "America/Panama",
      "text": "GMT-05:00 America/Panama"
    },
    {
      "value": "America/Rainy_River",
      "text": "GMT-05:00 America/Rainy River"
    },
    {
      "value": "America/Rankin_Inlet",
      "text": "GMT-05:00 America/Rankin Inlet"
    },
    {
      "value": "America/Resolute",
      "text": "GMT-05:00 America/Resolute"
    },
    {
      "value": "America/Rio_Branco",
      "text": "GMT-05:00 America/Rio Branco"
    },
    {
      "value": "America/Winnipeg",
      "text": "GMT-05:00 America/Winnipeg"
    },
    {
      "value": "Canada/Central",
      "text": "GMT-05:00 Canada/Central"
    },
    {
      "value": "US/Central",
      "text": "GMT-05:00 US/Central"
    },
    {
      "value": "America/Anguilla",
      "text": "GMT-04:00 America/Anguilla"
    },
    {
      "value": "America/Antigua",
      "text": "GMT-04:00 America/Antigua"
    },
    {
      "value": "America/Aruba",
      "text": "GMT-04:00 America/Aruba"
    },
    {
      "value": "America/Asuncion",
      "text": "GMT-04:00 America/Asuncion"
    },
    {
      "value": "America/Barbados",
      "text": "GMT-04:00 America/Barbados"
    },
    {
      "value": "America/Blanc-Sablon",
      "text": "GMT-04:00 America/Blanc-Sablon"
    },
    {
      "value": "America/Boa_Vista",
      "text": "GMT-04:00 America/Boa Vista"
    },
    {
      "value": "America/Campo_Grande",
      "text": "GMT-04:00 America/Campo Grande"
    },
    {
      "value": "America/Caracas",
      "text": "GMT-04:00 America/Caracas"
    },
    {
      "value": "America/Cuiaba",
      "text": "GMT-04:00 America/Cuiaba"
    },
    {
      "value": "America/Curacao",
      "text": "GMT-04:00 America/Curacao"
    },
    {
      "value": "America/Detroit",
      "text": "GMT-04:00 America/Detroit"
    },
    {
      "value": "America/Dominica",
      "text": "GMT-04:00 America/Dominica"
    },
    {
      "value": "America/Grand_Turk",
      "text": "GMT-04:00 America/Grand Turk"
    },
    {
      "value": "America/Grenada",
      "text": "GMT-04:00 America/Grenada"
    },
    {
      "value": "America/Guadeloupe",
      "text": "GMT-04:00 America/Guadeloupe"
    },
    {
      "value": "America/Guyana",
      "text": "GMT-04:00 America/Guyana"
    },
    {
      "value": "America/Havana",
      "text": "GMT-04:00 America/Havana"
    },
    {
      "value": "America/Indiana/Indianapolis",
      "text": "GMT-04:00 America/Indiana/Indianapolis"
    },
    {
      "value": "America/Indiana/Marengo",
      "text": "GMT-04:00 America/Indiana/Marengo"
    },
    {
      "value": "America/Indiana/Petersburg",
      "text": "GMT-04:00 America/Indiana/Petersburg"
    },
    {
      "value": "America/Indiana/Vevay",
      "text": "GMT-04:00 America/Indiana/Vevay"
    },
    {
      "value": "America/Indiana/Vincennes",
      "text": "GMT-04:00 America/Indiana/Vincennes"
    },
    {
      "value": "America/Indiana/Winamac",
      "text": "GMT-04:00 America/Indiana/Winamac"
    },
    {
      "value": "America/Iqaluit",
      "text": "GMT-04:00 America/Iqaluit"
    },
    {
      "value": "America/Kentucky/Louisville",
      "text": "GMT-04:00 America/Kentucky/Louisville"
    },
    {
      "value": "America/Kentucky/Monticello",
      "text": "GMT-04:00 America/Kentucky/Monticello"
    },
    {
      "value": "America/Kralendijk",
      "text": "GMT-04:00 America/Kralendijk"
    },
    {
      "value": "America/La_Paz",
      "text": "GMT-04:00 America/La Paz"
    },
    {
      "value": "America/Lower_Princes",
      "text": "GMT-04:00 America/Lower Princes"
    },
    {
      "value": "America/Manaus",
      "text": "GMT-04:00 America/Manaus"
    },
    {
      "value": "America/Marigot",
      "text": "GMT-04:00 America/Marigot"
    },
    {
      "value": "America/Martinique",
      "text": "GMT-04:00 America/Martinique"
    },
    {
      "value": "America/Montserrat",
      "text": "GMT-04:00 America/Montserrat"
    },
    {
      "value": "America/Nassau",
      "text": "GMT-04:00 America/Nassau"
    },
    {
      "value": "America/New_York",
      "text": "GMT-04:00 America/New York"
    },
    {
      "value": "America/Nipigon",
      "text": "GMT-04:00 America/Nipigon"
    },
    {
      "value": "America/Pangnirtung",
      "text": "GMT-04:00 America/Pangnirtung"
    },
    {
      "value": "America/Port-au-Prince",
      "text": "GMT-04:00 America/Port-au-Prince"
    },
    {
      "value": "America/Port_of_Spain",
      "text": "GMT-04:00 America/Port of Spain"
    },
    {
      "value": "America/Porto_Velho",
      "text": "GMT-04:00 America/Porto Velho"
    },
    {
      "value": "America/Puerto_Rico",
      "text": "GMT-04:00 America/Puerto Rico"
    },
    {
      "value": "America/Santiago",
      "text": "GMT-04:00 America/Santiago"
    },
    {
      "value": "America/Santo_Domingo",
      "text": "GMT-04:00 America/Santo Domingo"
    },
    {
      "value": "America/St_Barthelemy",
      "text": "GMT-04:00 America/St Barthelemy"
    },
    {
      "value": "America/St_Kitts",
      "text": "GMT-04:00 America/St Kitts"
    },
    {
      "value": "America/St_Lucia",
      "text": "GMT-04:00 America/St Lucia"
    },
    {
      "value": "America/St_Thomas",
      "text": "GMT-04:00 America/St Thomas"
    },
    {
      "value": "America/St_Vincent",
      "text": "GMT-04:00 America/St Vincent"
    },
    {
      "value": "America/Thunder_Bay",
      "text": "GMT-04:00 America/Thunder Bay"
    },
    {
      "value": "America/Toronto",
      "text": "GMT-04:00 America/Toronto"
    },
    {
      "value": "America/Tortola",
      "text": "GMT-04:00 America/Tortola"
    },
    {
      "value": "Canada/Eastern",
      "text": "GMT-04:00 Canada/Eastern"
    },
    {
      "value": "US/Eastern",
      "text": "GMT-04:00 US/Eastern"
    },
    {
      "value": "America/Araguaina",
      "text": "GMT-03:00 America/Araguaina"
    },
    {
      "value": "America/Argentina/Buenos_Aires",
      "text": "GMT-03:00 America/Argentina/Buenos Aires"
    },
    {
      "value": "America/Argentina/Catamarca",
      "text": "GMT-03:00 America/Argentina/Catamarca"
    },
    {
      "value": "America/Argentina/Cordoba",
      "text": "GMT-03:00 America/Argentina/Cordoba"
    },
    {
      "value": "America/Argentina/Jujuy",
      "text": "GMT-03:00 America/Argentina/Jujuy"
    },
    {
      "value": "America/Argentina/La_Rioja",
      "text": "GMT-03:00 America/Argentina/La Rioja"
    },
    {
      "value": "America/Argentina/Mendoza",
      "text": "GMT-03:00 America/Argentina/Mendoza"
    },
    {
      "value": "America/Argentina/Rio_Gallegos",
      "text": "GMT-03:00 America/Argentina/Rio Gallegos"
    },
    {
      "value": "America/Argentina/Salta",
      "text": "GMT-03:00 America/Argentina/Salta"
    },
    {
      "value": "America/Argentina/San_Juan",
      "text": "GMT-03:00 America/Argentina/San Juan"
    },
    {
      "value": "America/Argentina/San_Luis",
      "text": "GMT-03:00 America/Argentina/San Luis"
    },
    {
      "value": "America/Argentina/Tucuman",
      "text": "GMT-03:00 America/Argentina/Tucuman"
    },
    {
      "value": "America/Argentina/Ushuaia",
      "text": "GMT-03:00 America/Argentina/Ushuaia"
    },
    {
      "value": "America/Bahia",
      "text": "GMT-03:00 America/Bahia"
    },
    {
      "value": "America/Belem",
      "text": "GMT-03:00 America/Belem"
    },
    {
      "value": "America/Cayenne",
      "text": "GMT-03:00 America/Cayenne"
    },
    {
      "value": "America/Fortaleza",
      "text": "GMT-03:00 America/Fortaleza"
    },
    {
      "value": "America/Glace_Bay",
      "text": "GMT-03:00 America/Glace Bay"
    },
    {
      "value": "America/Goose_Bay",
      "text": "GMT-03:00 America/Goose Bay"
    },
    {
      "value": "America/Halifax",
      "text": "GMT-03:00 America/Halifax"
    },
    {
      "value": "America/Maceio",
      "text": "GMT-03:00 America/Maceio"
    },
    {
      "value": "America/Moncton",
      "text": "GMT-03:00 America/Moncton"
    },
    {
      "value": "America/Montevideo",
      "text": "GMT-03:00 America/Montevideo"
    },
    {
      "value": "America/Paramaribo",
      "text": "GMT-03:00 America/Paramaribo"
    },
    {
      "value": "America/Punta_Arenas",
      "text": "GMT-03:00 America/Punta Arenas"
    },
    {
      "value": "America/Recife",
      "text": "GMT-03:00 America/Recife"
    },
    {
      "value": "America/Santarem",
      "text": "GMT-03:00 America/Santarem"
    },
    {
      "value": "America/Sao_Paulo",
      "text": "GMT-03:00 America/Sao Paulo"
    },
    {
      "value": "America/Thule",
      "text": "GMT-03:00 America/Thule"
    },
    {
      "value": "Antarctica/Palmer",
      "text": "GMT-03:00 Antarctica/Palmer"
    },
    {
      "value": "Antarctica/Rothera",
      "text": "GMT-03:00 Antarctica/Rothera"
    },
    {
      "value": "Atlantic/Bermuda",
      "text": "GMT-03:00 Atlantic/Bermuda"
    },
    {
      "value": "Atlantic/Stanley",
      "text": "GMT-03:00 Atlantic/Stanley"
    },
    {
      "value": "Canada/Atlantic",
      "text": "GMT-03:00 Canada/Atlantic"
    },
    {
      "value": "America/St_Johns",
      "text": "GMT-02:30 America/St Johns"
    },
    {
      "value": "Canada/Newfoundland",
      "text": "GMT-02:30 Canada/Newfoundland"
    },
    {
      "value": "America/Miquelon",
      "text": "GMT-02:00 America/Miquelon"
    },
    {
      "value": "America/Noronha",
      "text": "GMT-02:00 America/Noronha"
    },
    {
      "value": "America/Nuuk",
      "text": "GMT-02:00 America/Nuuk"
    },
    {
      "value": "Atlantic/South_Georgia",
      "text": "GMT-02:00 Atlantic/South Georgia"
    },
    {
      "value": "Atlantic/Cape_Verde",
      "text": "GMT-01:00 Atlantic/Cape Verde"
    },
    {
      "value": "Africa/Abidjan",
      "text": "GMT+00:00 Africa/Abidjan"
    },
    {
      "value": "Africa/Accra",
      "text": "GMT+00:00 Africa/Accra"
    },
    {
      "value": "Africa/Bamako",
      "text": "GMT+00:00 Africa/Bamako"
    },
    {
      "value": "Africa/Banjul",
      "text": "GMT+00:00 Africa/Banjul"
    },
    {
      "value": "Africa/Bissau",
      "text": "GMT+00:00 Africa/Bissau"
    },
    {
      "value": "Africa/Conakry",
      "text": "GMT+00:00 Africa/Conakry"
    },
    {
      "value": "Africa/Dakar",
      "text": "GMT+00:00 Africa/Dakar"
    },
    {
      "value": "Africa/Freetown",
      "text": "GMT+00:00 Africa/Freetown"
    },
    {
      "value": "Africa/Lome",
      "text": "GMT+00:00 Africa/Lome"
    },
    {
      "value": "Africa/Monrovia",
      "text": "GMT+00:00 Africa/Monrovia"
    },
    {
      "value": "Africa/Nouakchott",
      "text": "GMT+00:00 Africa/Nouakchott"
    },
    {
      "value": "Africa/Ouagadougou",
      "text": "GMT+00:00 Africa/Ouagadougou"
    },
    {
      "value": "Africa/Sao_Tome",
      "text": "GMT+00:00 Africa/Sao Tome"
    },
    {
      "value": "America/Danmarkshavn",
      "text": "GMT+00:00 America/Danmarkshavn"
    },
    {
      "value": "America/Scoresbysund",
      "text": "GMT+00:00 America/Scoresbysund"
    },
    {
      "value": "Atlantic/Azores",
      "text": "GMT+00:00 Atlantic/Azores"
    },
    {
      "value": "Atlantic/Reykjavik",
      "text": "GMT+00:00 Atlantic/Reykjavik"
    },
    {
      "value": "Atlantic/St_Helena",
      "text": "GMT+00:00 Atlantic/St Helena"
    },
    {
      "value": "GMT",
      "@selected": "",
      "text": "GMT+00:00 GMT"
    },
    {
      "value": "UTC",
      "text": "GMT+00:00 UTC"
    },
    {
      "value": "Africa/Algiers",
      "text": "GMT+01:00 Africa/Algiers"
    },
    {
      "value": "Africa/Bangui",
      "text": "GMT+01:00 Africa/Bangui"
    },
    {
      "value": "Africa/Brazzaville",
      "text": "GMT+01:00 Africa/Brazzaville"
    },
    {
      "value": "Africa/Casablanca",
      "text": "GMT+01:00 Africa/Casablanca"
    },
    {
      "value": "Africa/Douala",
      "text": "GMT+01:00 Africa/Douala"
    },
    {
      "value": "Africa/El_Aaiun",
      "text": "GMT+01:00 Africa/El Aaiun"
    },
    {
      "value": "Africa/Kinshasa",
      "text": "GMT+01:00 Africa/Kinshasa"
    },
    {
      "value": "Africa/Lagos",
      "text": "GMT+01:00 Africa/Lagos"
    },
    {
      "value": "Africa/Libreville",
      "text": "GMT+01:00 Africa/Libreville"
    },
    {
      "value": "Africa/Luanda",
      "text": "GMT+01:00 Africa/Luanda"
    },
    {
      "value": "Africa/Malabo",
      "text": "GMT+01:00 Africa/Malabo"
    },
    {
      "value": "Africa/Ndjamena",
      "text": "GMT+01:00 Africa/Ndjamena"
    },
    {
      "value": "Africa/Niamey",
      "text": "GMT+01:00 Africa/Niamey"
    },
    {
      "value": "Africa/Porto-Novo",
      "text": "GMT+01:00 Africa/Porto-Novo"
    },
    {
      "value": "Africa/Tunis",
      "text": "GMT+01:00 Africa/Tunis"
    },
    {
      "value": "Atlantic/Canary",
      "text": "GMT+01:00 Atlantic/Canary"
    },
    {
      "value": "Atlantic/Faroe",
      "text": "GMT+01:00 Atlantic/Faroe"
    },
    {
      "value": "Atlantic/Madeira",
      "text": "GMT+01:00 Atlantic/Madeira"
    },
    {
      "value": "Europe/Dublin",
      "text": "GMT+01:00 Europe/Dublin"
    },
    {
      "value": "Europe/Guernsey",
      "text": "GMT+01:00 Europe/Guernsey"
    },
    {
      "value": "Europe/Isle_of_Man",
      "text": "GMT+01:00 Europe/Isle of Man"
    },
    {
      "value": "Europe/Jersey",
      "text": "GMT+01:00 Europe/Jersey"
    },
    {
      "value": "Europe/Lisbon",
      "text": "GMT+01:00 Europe/Lisbon"
    },
    {
      "value": "Europe/London",
      "text": "GMT+01:00 Europe/London"
    },
    {
      "value": "Africa/Blantyre",
      "text": "GMT+02:00 Africa/Blantyre"
    },
    {
      "value": "Africa/Bujumbura",
      "text": "GMT+02:00 Africa/Bujumbura"
    },
    {
      "value": "Africa/Cairo",
      "text": "GMT+02:00 Africa/Cairo"
    },
    {
      "value": "Africa/Ceuta",
      "text": "GMT+02:00 Africa/Ceuta"
    },
    {
      "value": "Africa/Gaborone",
      "text": "GMT+02:00 Africa/Gaborone"
    },
    {
      "value": "Africa/Harare",
      "text": "GMT+02:00 Africa/Harare"
    },
    {
      "value": "Africa/Johannesburg",
      "text": "GMT+02:00 Africa/Johannesburg"
    },
    {
      "value": "Africa/Juba",
      "text": "GMT+02:00 Africa/Juba"
    },
    {
      "value": "Africa/Khartoum",
      "text": "GMT+02:00 Africa/Khartoum"
    },
    {
      "value": "Africa/Kigali",
      "text": "GMT+02:00 Africa/Kigali"
    },
    {
      "value": "Africa/Lubumbashi",
      "text": "GMT+02:00 Africa/Lubumbashi"
    },
    {
      "value": "Africa/Lusaka",
      "text": "GMT+02:00 Africa/Lusaka"
    },
    {
      "value": "Africa/Maputo",
      "text": "GMT+02:00 Africa/Maputo"
    },
    {
      "value": "Africa/Maseru",
      "text": "GMT+02:00 Africa/Maseru"
    },
    {
      "value": "Africa/Mbabane",
      "text": "GMT+02:00 Africa/Mbabane"
    },
    {
      "value": "Africa/Tripoli",
      "text": "GMT+02:00 Africa/Tripoli"
    },
    {
      "value": "Africa/Windhoek",
      "text": "GMT+02:00 Africa/Windhoek"
    },
    {
      "value": "Antarctica/Troll",
      "text": "GMT+02:00 Antarctica/Troll"
    },
    {
      "value": "Arctic/Longyearbyen",
      "text": "GMT+02:00 Arctic/Longyearbyen"
    },
    {
      "value": "Europe/Amsterdam",
      "text": "GMT+02:00 Europe/Amsterdam"
    },
    {
      "value": "Europe/Andorra",
      "text": "GMT+02:00 Europe/Andorra"
    },
    {
      "value": "Europe/Belgrade",
      "text": "GMT+02:00 Europe/Belgrade"
    },
    {
      "value": "Europe/Berlin",
      "text": "GMT+02:00 Europe/Berlin"
    },
    {
      "value": "Europe/Bratislava",
      "text": "GMT+02:00 Europe/Bratislava"
    },
    {
      "value": "Europe/Brussels",
      "text": "GMT+02:00 Europe/Brussels"
    },
    {
      "value": "Europe/Budapest",
      "text": "GMT+02:00 Europe/Budapest"
    },
    {
      "value": "Europe/Busingen",
      "text": "GMT+02:00 Europe/Busingen"
    },
    {
      "value": "Europe/Copenhagen",
      "text": "GMT+02:00 Europe/Copenhagen"
    },
    {
      "value": "Europe/Gibraltar",
      "text": "GMT+02:00 Europe/Gibraltar"
    },
    {
      "value": "Europe/Kaliningrad",
      "text": "GMT+02:00 Europe/Kaliningrad"
    },
    {
      "value": "Europe/Ljubljana",
      "text": "GMT+02:00 Europe/Ljubljana"
    },
    {
      "value": "Europe/Luxembourg",
      "text": "GMT+02:00 Europe/Luxembourg"
    },
    {
      "value": "Europe/Madrid",
      "text": "GMT+02:00 Europe/Madrid"
    },
    {
      "value": "Europe/Malta",
      "text": "GMT+02:00 Europe/Malta"
    },
    {
      "value": "Europe/Monaco",
      "text": "GMT+02:00 Europe/Monaco"
    },
    {
      "value": "Europe/Oslo",
      "text": "GMT+02:00 Europe/Oslo"
    },
    {
      "value": "Europe/Paris",
      "text": "GMT+02:00 Europe/Paris"
    },
    {
      "value": "Europe/Podgorica",
      "text": "GMT+02:00 Europe/Podgorica"
    },
    {
      "value": "Europe/Prague",
      "text": "GMT+02:00 Europe/Prague"
    },
    {
      "value": "Europe/Rome",
      "text": "GMT+02:00 Europe/Rome"
    },
    {
      "value": "Europe/San_Marino",
      "text": "GMT+02:00 Europe/San Marino"
    },
    {
      "value": "Europe/Sarajevo",
      "text": "GMT+02:00 Europe/Sarajevo"
    },
    {
      "value": "Europe/Skopje",
      "text": "GMT+02:00 Europe/Skopje"
    },
    {
      "value": "Europe/Stockholm",
      "text": "GMT+02:00 Europe/Stockholm"
    },
    {
      "value": "Europe/Tirane",
      "text": "GMT+02:00 Europe/Tirane"
    },
    {
      "value": "Europe/Vaduz",
      "text": "GMT+02:00 Europe/Vaduz"
    },
    {
      "value": "Europe/Vatican",
      "text": "GMT+02:00 Europe/Vatican"
    },
    {
      "value": "Europe/Vienna",
      "text": "GMT+02:00 Europe/Vienna"
    },
    {
      "value": "Europe/Warsaw",
      "text": "GMT+02:00 Europe/Warsaw"
    },
    {
      "value": "Europe/Zagreb",
      "text": "GMT+02:00 Europe/Zagreb"
    },
    {
      "value": "Europe/Zurich",
      "text": "GMT+02:00 Europe/Zurich"
    },
    {
      "value": "Africa/Addis_Ababa",
      "text": "GMT+03:00 Africa/Addis Ababa"
    },
    {
      "value": "Africa/Asmara",
      "text": "GMT+03:00 Africa/Asmara"
    },
    {
      "value": "Africa/Dar_es_Salaam",
      "text": "GMT+03:00 Africa/Dar es Salaam"
    },
    {
      "value": "Africa/Djibouti",
      "text": "GMT+03:00 Africa/Djibouti"
    },
    {
      "value": "Africa/Kampala",
      "text": "GMT+03:00 Africa/Kampala"
    },
    {
      "value": "Africa/Mogadishu",
      "text": "GMT+03:00 Africa/Mogadishu"
    },
    {
      "value": "Africa/Nairobi",
      "text": "GMT+03:00 Africa/Nairobi"
    },
    {
      "value": "Antarctica/Syowa",
      "text": "GMT+03:00 Antarctica/Syowa"
    },
    {
      "value": "Asia/Aden",
      "text": "GMT+03:00 Asia/Aden"
    },
    {
      "value": "Asia/Amman",
      "text": "GMT+03:00 Asia/Amman"
    },
    {
      "value": "Asia/Baghdad",
      "text": "GMT+03:00 Asia/Baghdad"
    },
    {
      "value": "Asia/Bahrain",
      "text": "GMT+03:00 Asia/Bahrain"
    },
    {
      "value": "Asia/Beirut",
      "text": "GMT+03:00 Asia/Beirut"
    },
    {
      "value": "Asia/Damascus",
      "text": "GMT+03:00 Asia/Damascus"
    },
    {
      "value": "Asia/Famagusta",
      "text": "GMT+03:00 Asia/Famagusta"
    },
    {
      "value": "Asia/Gaza",
      "text": "GMT+03:00 Asia/Gaza"
    },
    {
      "value": "Asia/Hebron",
      "text": "GMT+03:00 Asia/Hebron"
    },
    {
      "value": "Asia/Jerusalem",
      "text": "GMT+03:00 Asia/Jerusalem"
    },
    {
      "value": "Asia/Kuwait",
      "text": "GMT+03:00 Asia/Kuwait"
    },
    {
      "value": "Asia/Nicosia",
      "text": "GMT+03:00 Asia/Nicosia"
    },
    {
      "value": "Asia/Qatar",
      "text": "GMT+03:00 Asia/Qatar"
    },
    {
      "value": "Asia/Riyadh",
      "text": "GMT+03:00 Asia/Riyadh"
    },
    {
      "value": "Europe/Athens",
      "text": "GMT+03:00 Europe/Athens"
    },
    {
      "value": "Europe/Bucharest",
      "text": "GMT+03:00 Europe/Bucharest"
    },
    {
      "value": "Europe/Chisinau",
      "text": "GMT+03:00 Europe/Chisinau"
    },
    {
      "value": "Europe/Helsinki",
      "text": "GMT+03:00 Europe/Helsinki"
    },
    {
      "value": "Europe/Istanbul",
      "text": "GMT+03:00 Europe/Istanbul"
    },
    {
      "value": "Europe/Kiev",
      "text": "GMT+03:00 Europe/Kiev"
    },
    {
      "value": "Europe/Kirov",
      "text": "GMT+03:00 Europe/Kirov"
    },
    {
      "value": "Europe/Mariehamn",
      "text": "GMT+03:00 Europe/Mariehamn"
    },
    {
      "value": "Europe/Minsk",
      "text": "GMT+03:00 Europe/Minsk"
    },
    {
      "value": "Europe/Moscow",
      "text": "GMT+03:00 Europe/Moscow"
    },
    {
      "value": "Europe/Riga",
      "text": "GMT+03:00 Europe/Riga"
    },
    {
      "value": "Europe/Simferopol",
      "text": "GMT+03:00 Europe/Simferopol"
    },
    {
      "value": "Europe/Sofia",
      "text": "GMT+03:00 Europe/Sofia"
    },
    {
      "value": "Europe/Tallinn",
      "text": "GMT+03:00 Europe/Tallinn"
    },
    {
      "value": "Europe/Uzhgorod",
      "text": "GMT+03:00 Europe/Uzhgorod"
    },
    {
      "value": "Europe/Vilnius",
      "text": "GMT+03:00 Europe/Vilnius"
    },
    {
      "value": "Europe/Volgograd",
      "text": "GMT+03:00 Europe/Volgograd"
    },
    {
      "value": "Europe/Zaporozhye",
      "text": "GMT+03:00 Europe/Zaporozhye"
    },
    {
      "value": "Indian/Antananarivo",
      "text": "GMT+03:00 Indian/Antananarivo"
    },
    {
      "value": "Indian/Comoro",
      "text": "GMT+03:00 Indian/Comoro"
    },
    {
      "value": "Indian/Mayotte",
      "text": "GMT+03:00 Indian/Mayotte"
    },
    {
      "value": "Asia/Baku",
      "text": "GMT+04:00 Asia/Baku"
    },
    {
      "value": "Asia/Dubai",
      "text": "GMT+04:00 Asia/Dubai"
    },
    {
      "value": "Asia/Muscat",
      "text": "GMT+04:00 Asia/Muscat"
    },
    {
      "value": "Asia/Tbilisi",
      "text": "GMT+04:00 Asia/Tbilisi"
    },
    {
      "value": "Asia/Yerevan",
      "text": "GMT+04:00 Asia/Yerevan"
    },
    {
      "value": "Europe/Astrakhan",
      "text": "GMT+04:00 Europe/Astrakhan"
    },
    {
      "value": "Europe/Samara",
      "text": "GMT+04:00 Europe/Samara"
    },
    {
      "value": "Europe/Saratov",
      "text": "GMT+04:00 Europe/Saratov"
    },
    {
      "value": "Europe/Ulyanovsk",
      "text": "GMT+04:00 Europe/Ulyanovsk"
    },
    {
      "value": "Indian/Mahe",
      "text": "GMT+04:00 Indian/Mahe"
    },
    {
      "value": "Indian/Mauritius",
      "text": "GMT+04:00 Indian/Mauritius"
    },
    {
      "value": "Indian/Reunion",
      "text": "GMT+04:00 Indian/Reunion"
    },
    {
      "value": "Asia/Kabul",
      "text": "GMT+04:30 Asia/Kabul"
    },
    {
      "value": "Asia/Tehran",
      "text": "GMT+04:30 Asia/Tehran"
    },
    {
      "value": "Antarctica/Mawson",
      "text": "GMT+05:00 Antarctica/Mawson"
    },
    {
      "value": "Asia/Aqtau",
      "text": "GMT+05:00 Asia/Aqtau"
    },
    {
      "value": "Asia/Aqtobe",
      "text": "GMT+05:00 Asia/Aqtobe"
    },
    {
      "value": "Asia/Ashgabat",
      "text": "GMT+05:00 Asia/Ashgabat"
    },
    {
      "value": "Asia/Atyrau",
      "text": "GMT+05:00 Asia/Atyrau"
    },
    {
      "value": "Asia/Dushanbe",
      "text": "GMT+05:00 Asia/Dushanbe"
    },
    {
      "value": "Asia/Karachi",
      "text": "GMT+05:00 Asia/Karachi"
    },
    {
      "value": "Asia/Oral",
      "text": "GMT+05:00 Asia/Oral"
    },
    {
      "value": "Asia/Qyzylorda",
      "text": "GMT+05:00 Asia/Qyzylorda"
    },
    {
      "value": "Asia/Samarkand",
      "text": "GMT+05:00 Asia/Samarkand"
    },
    {
      "value": "Asia/Tashkent",
      "text": "GMT+05:00 Asia/Tashkent"
    },
    {
      "value": "Asia/Yekaterinburg",
      "text": "GMT+05:00 Asia/Yekaterinburg"
    },
    {
      "value": "Indian/Kerguelen",
      "text": "GMT+05:00 Indian/Kerguelen"
    },
    {
      "value": "Indian/Maldives",
      "text": "GMT+05:00 Indian/Maldives"
    },
    {
      "value": "Asia/Colombo",
      "text": "GMT+05:30 Asia/Colombo"
    },
    {
      "value": "Asia/Kolkata",
      "text": "GMT+05:30 Asia/Kolkata"
    },
    {
      "value": "Asia/Kathmandu",
      "text": "GMT+05:45 Asia/Kathmandu"
    },
    {
      "value": "Antarctica/Vostok",
      "text": "GMT+06:00 Antarctica/Vostok"
    },
    {
      "value": "Asia/Almaty",
      "text": "GMT+06:00 Asia/Almaty"
    },
    {
      "value": "Asia/Bishkek",
      "text": "GMT+06:00 Asia/Bishkek"
    },
    {
      "value": "Asia/Dhaka",
      "text": "GMT+06:00 Asia/Dhaka"
    },
    {
      "value": "Asia/Omsk",
      "text": "GMT+06:00 Asia/Omsk"
    },
    {
      "value": "Asia/Qostanay",
      "text": "GMT+06:00 Asia/Qostanay"
    },
    {
      "value": "Asia/Thimphu",
      "text": "GMT+06:00 Asia/Thimphu"
    },
    {
      "value": "Asia/Urumqi",
      "text": "GMT+06:00 Asia/Urumqi"
    },
    {
      "value": "Indian/Chagos",
      "text": "GMT+06:00 Indian/Chagos"
    },
    {
      "value": "Asia/Yangon",
      "text": "GMT+06:30 Asia/Yangon"
    },
    {
      "value": "Indian/Cocos",
      "text": "GMT+06:30 Indian/Cocos"
    },
    {
      "value": "Antarctica/Davis",
      "text": "GMT+07:00 Antarctica/Davis"
    },
    {
      "value": "Asia/Bangkok",
      "text": "GMT+07:00 Asia/Bangkok"
    },
    {
      "value": "Asia/Barnaul",
      "text": "GMT+07:00 Asia/Barnaul"
    },
    {
      "value": "Asia/Ho_Chi_Minh",
      "text": "GMT+07:00 Asia/Ho Chi Minh"
    },
    {
      "value": "Asia/Hovd",
      "text": "GMT+07:00 Asia/Hovd"
    },
    {
      "value": "Asia/Jakarta",
      "text": "GMT+07:00 Asia/Jakarta"
    },
    {
      "value": "Asia/Krasnoyarsk",
      "text": "GMT+07:00 Asia/Krasnoyarsk"
    },
    {
      "value": "Asia/Novokuznetsk",
      "text": "GMT+07:00 Asia/Novokuznetsk"
    },
    {
      "value": "Asia/Novosibirsk",
      "text": "GMT+07:00 Asia/Novosibirsk"
    },
    {
      "value": "Asia/Phnom_Penh",
      "text": "GMT+07:00 Asia/Phnom Penh"
    },
    {
      "value": "Asia/Pontianak",
      "text": "GMT+07:00 Asia/Pontianak"
    },
    {
      "value": "Asia/Tomsk",
      "text": "GMT+07:00 Asia/Tomsk"
    },
    {
      "value": "Asia/Vientiane",
      "text": "GMT+07:00 Asia/Vientiane"
    },
    {
      "value": "Indian/Christmas",
      "text": "GMT+07:00 Indian/Christmas"
    },
    {
      "value": "Asia/Brunei",
      "text": "GMT+08:00 Asia/Brunei"
    },
    {
      "value": "Asia/Choibalsan",
      "text": "GMT+08:00 Asia/Choibalsan"
    },
    {
      "value": "Asia/Hong_Kong",
      "text": "GMT+08:00 Asia/Hong Kong"
    },
    {
      "value": "Asia/Irkutsk",
      "text": "GMT+08:00 Asia/Irkutsk"
    },
    {
      "value": "Asia/Kuala_Lumpur",
      "text": "GMT+08:00 Asia/Kuala Lumpur"
    },
    {
      "value": "Asia/Kuching",
      "text": "GMT+08:00 Asia/Kuching"
    },
    {
      "value": "Asia/Macau",
      "text": "GMT+08:00 Asia/Macau"
    },
    {
      "value": "Asia/Makassar",
      "text": "GMT+08:00 Asia/Makassar"
    },
    {
      "value": "Asia/Manila",
      "text": "GMT+08:00 Asia/Manila"
    },
    {
      "value": "Asia/Shanghai",
      "text": "GMT+08:00 Asia/Shanghai"
    },
    {
      "value": "Asia/Singapore",
      "text": "GMT+08:00 Asia/Singapore"
    },
    {
      "value": "Asia/Taipei",
      "text": "GMT+08:00 Asia/Taipei"
    },
    {
      "value": "Asia/Ulaanbaatar",
      "text": "GMT+08:00 Asia/Ulaanbaatar"
    },
    {
      "value": "Australia/Perth",
      "text": "GMT+08:00 Australia/Perth"
    },
    {
      "value": "Australia/Eucla",
      "text": "GMT+08:45 Australia/Eucla"
    },
    {
      "value": "Asia/Chita",
      "text": "GMT+09:00 Asia/Chita"
    },
    {
      "value": "Asia/Dili",
      "text": "GMT+09:00 Asia/Dili"
    },
    {
      "value": "Asia/Jayapura",
      "text": "GMT+09:00 Asia/Jayapura"
    },
    {
      "value": "Asia/Khandyga",
      "text": "GMT+09:00 Asia/Khandyga"
    },
    {
      "value": "Asia/Pyongyang",
      "text": "GMT+09:00 Asia/Pyongyang"
    },
    {
      "value": "Asia/Seoul",
      "text": "GMT+09:00 Asia/Seoul"
    },
    {
      "value": "Asia/Tokyo",
      "text": "GMT+09:00 Asia/Tokyo"
    },
    {
      "value": "Asia/Yakutsk",
      "text": "GMT+09:00 Asia/Yakutsk"
    },
    {
      "value": "Pacific/Palau",
      "text": "GMT+09:00 Pacific/Palau"
    },
    {
      "value": "Australia/Adelaide",
      "text": "GMT+09:30 Australia/Adelaide"
    },
    {
      "value": "Australia/Broken_Hill",
      "text": "GMT+09:30 Australia/Broken Hill"
    },
    {
      "value": "Australia/Darwin",
      "text": "GMT+09:30 Australia/Darwin"
    },
    {
      "value": "Antarctica/DumontDUrville",
      "text": "GMT+10:00 Antarctica/DumontDUrville"
    },
    {
      "value": "Antarctica/Macquarie",
      "text": "GMT+10:00 Antarctica/Macquarie"
    },
    {
      "value": "Asia/Ust-Nera",
      "text": "GMT+10:00 Asia/Ust-Nera"
    },
    {
      "value": "Asia/Vladivostok",
      "text": "GMT+10:00 Asia/Vladivostok"
    },
    {
      "value": "Australia/Brisbane",
      "text": "GMT+10:00 Australia/Brisbane"
    },
    {
      "value": "Australia/Hobart",
      "text": "GMT+10:00 Australia/Hobart"
    },
    {
      "value": "Australia/Lindeman",
      "text": "GMT+10:00 Australia/Lindeman"
    },
    {
      "value": "Australia/Melbourne",
      "text": "GMT+10:00 Australia/Melbourne"
    },
    {
      "value": "Australia/Sydney",
      "text": "GMT+10:00 Australia/Sydney"
    },
    {
      "value": "Pacific/Chuuk",
      "text": "GMT+10:00 Pacific/Chuuk"
    },
    {
      "value": "Pacific/Guam",
      "text": "GMT+10:00 Pacific/Guam"
    },
    {
      "value": "Pacific/Port_Moresby",
      "text": "GMT+10:00 Pacific/Port Moresby"
    },
    {
      "value": "Pacific/Saipan",
      "text": "GMT+10:00 Pacific/Saipan"
    },
    {
      "value": "Australia/Lord_Howe",
      "text": "GMT+10:30 Australia/Lord Howe"
    },
    {
      "value": "Antarctica/Casey",
      "text": "GMT+11:00 Antarctica/Casey"
    },
    {
      "value": "Asia/Magadan",
      "text": "GMT+11:00 Asia/Magadan"
    },
    {
      "value": "Asia/Sakhalin",
      "text": "GMT+11:00 Asia/Sakhalin"
    },
    {
      "value": "Asia/Srednekolymsk",
      "text": "GMT+11:00 Asia/Srednekolymsk"
    },
    {
      "value": "Pacific/Bougainville",
      "text": "GMT+11:00 Pacific/Bougainville"
    },
    {
      "value": "Pacific/Efate",
      "text": "GMT+11:00 Pacific/Efate"
    },
    {
      "value": "Pacific/Guadalcanal",
      "text": "GMT+11:00 Pacific/Guadalcanal"
    },
    {
      "value": "Pacific/Kosrae",
      "text": "GMT+11:00 Pacific/Kosrae"
    },
    {
      "value": "Pacific/Norfolk",
      "text": "GMT+11:00 Pacific/Norfolk"
    },
    {
      "value": "Pacific/Noumea",
      "text": "GMT+11:00 Pacific/Noumea"
    },
    {
      "value": "Pacific/Pohnpei",
      "text": "GMT+11:00 Pacific/Pohnpei"
    },
    {
      "value": "Antarctica/McMurdo",
      "text": "GMT+12:00 Antarctica/McMurdo"
    },
    {
      "value": "Asia/Anadyr",
      "text": "GMT+12:00 Asia/Anadyr"
    },
    {
      "value": "Asia/Kamchatka",
      "text": "GMT+12:00 Asia/Kamchatka"
    },
    {
      "value": "Pacific/Auckland",
      "text": "GMT+12:00 Pacific/Auckland"
    },
    {
      "value": "Pacific/Fiji",
      "text": "GMT+12:00 Pacific/Fiji"
    },
    {
      "value": "Pacific/Funafuti",
      "text": "GMT+12:00 Pacific/Funafuti"
    },
    {
      "value": "Pacific/Kwajalein",
      "text": "GMT+12:00 Pacific/Kwajalein"
    },
    {
      "value": "Pacific/Majuro",
      "text": "GMT+12:00 Pacific/Majuro"
    },
    {
      "value": "Pacific/Nauru",
      "text": "GMT+12:00 Pacific/Nauru"
    },
    {
      "value": "Pacific/Tarawa",
      "text": "GMT+12:00 Pacific/Tarawa"
    },
    {
      "value": "Pacific/Wake",
      "text": "GMT+12:00 Pacific/Wake"
    },
    {
      "value": "Pacific/Wallis",
      "text": "GMT+12:00 Pacific/Wallis"
    },
    {
      "value": "Pacific/Chatham",
      "text": "GMT+12:45 Pacific/Chatham"
    },
    {
      "value": "Pacific/Apia",
      "text": "GMT+13:00 Pacific/Apia"
    },
    {
      "value": "Pacific/Enderbury",
      "text": "GMT+13:00 Pacific/Enderbury"
    },
    {
      "value": "Pacific/Fakaofo",
      "text": "GMT+13:00 Pacific/Fakaofo"
    },
    {
      "value": "Pacific/Tongatapu",
      "text": "GMT+13:00 Pacific/Tongatapu"
    },
    {
      "value": "Pacific/Kiritimati",
      "text": "GMT+14:00 Pacific/Kiritimati"
    }
]

export default timezones;
