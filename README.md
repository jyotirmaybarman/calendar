### Headless calendar api

### Installation

```bash
npm install @jyotirmay/calendar
```

### Usage

```js
import { Calendar } from "@jyotirmay/calendar";

const cal = new Calendar()
console.log(JSON.stringify(cal.generateMonth()));

/*
OUTPUT:

{
  "weeks": {
    "1": [
      { "day": "monday", "date": 1, "month": "january", "year": 2024 },
      { "day": "tuesday", "date": 2, "month": "january", "year": 2024 },
      { "day": "wednesday", "date": 3, "month": "january", "year": 2024 },
      { "day": "thursday", "date": 4, "month": "january", "year": 2024 },
      { "day": "friday", "date": 5, "month": "january", "year": 2024 },
      { "day": "saturday", "date": 6, "month": "january", "year": 2024 },
      { "day": "sunday", "date": 7, "month": "january", "year": 2024 }
    ],
    "2": [
      { "day": "monday", "date": 8, "month": "january", "year": 2024 },
      { "day": "tuesday", "date": 9, "month": "january", "year": 2024 },
      { "day": "wednesday", "date": 10, "month": "january", "year": 2024 },
      { "day": "thursday", "date": 11, "month": "january", "year": 2024 },
      { "day": "friday", "date": 12, "month": "january", "year": 2024 },
      { "day": "saturday", "date": 13, "month": "january", "year": 2024 },
      { "day": "sunday", "date": 14, "month": "january", "year": 2024 }
    ],
    "3": [
      { "day": "monday", "date": 15, "month": "january", "year": 2024 },
      { "day": "tuesday", "date": 16, "month": "january", "year": 2024 },
      { "day": "wednesday", "date": 17, "month": "january", "year": 2024 },
      { "day": "thursday", "date": 18, "month": "january", "year": 2024 },
      { "day": "friday", "date": 19, "month": "january", "year": 2024 },
      { "day": "saturday", "date": 20, "month": "january", "year": 2024 },
      { "day": "sunday", "date": 21, "month": "january", "year": 2024 }
    ],
    "4": [
      { "day": "monday", "date": 22, "month": "january", "year": 2024 },
      { "day": "tuesday", "date": 23, "month": "january", "year": 2024 },
      { "day": "wednesday", "date": 24, "month": "january", "year": 2024 },
      { "day": "thursday", "date": 25, "month": "january", "year": 2024 },
      { "day": "friday", "date": 26, "month": "january", "year": 2024 },
      { "day": "saturday", "date": 27, "month": "january", "year": 2024 },
      { "day": "sunday", "date": 28, "month": "january", "year": 2024 }
    ],
    "5": [
      { "day": "monday", "date": 29, "month": "january", "year": 2024 },
      { "day": "tuesday", "date": 30, "month": "january", "year": 2024 },
      { "day": "wednesday", "date": 31, "month": "january", "year": 2024 },
      { "day": "thursday", "date": 1, "month": "february", "year": 2024 },
      { "day": "friday", "date": 2, "month": "february", "year": 2024 },
      { "day": "saturday", "date": 3, "month": "february", "year": 2024 },
      { "day": "sunday", "date": 4, "month": "february", "year": 2024 }
    ]
  }
}

*/

```