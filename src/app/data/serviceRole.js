export const pricingArray = [
  {
    _id: "1",
    name: "Basic",
    description: "Test",
    price: 0,
    abilities: [],
    status: "public",
    duration: "",
    isDeleted: false,
    revenue: 0,
    numberOfPayment: 0,
    numberOfUser: 0,
    isBestValue: true,
    // isOpenFreeTrial: true,
    // durationSaleOff: 7,
    // updatedAt: "2022-06-11T03:07:20.813Z",
    // isSaleOff: true,
    // percentSaleOff: 0.2,
    // timeEndSaleOff: "2022-06-11T03:07:20.813Z",
  },
  {
    _id: "2",
    name: "Standard",
    description: "Test",
    abilities: ["abiblities1", "abiblities2"],
    status: "private",
    price: 20.99,
    duration: 30,
    isDeleted: false,
    revenue: 0,
    numberOfPayment: 0,
    numberOfUser: 0,
    isBestValue: true,
    // isOpenFreeTrial: true,
    // updatedAt: "2022-06-11T03:07:20.813Z",
    // durationSaleOff: 7,
    // isSaleOff: true,
    // percentSaleOff: 0.2,
    // timeEndSaleOff: "2022-06-11T03:07:20.813Z",
  },
  {
    _id: "3",
    name: "Premium",
    description: "Test",
    abilities: ["abiblities1", "abiblities2", "abiblities3", "abiblities4"],
    status: "public",
    price: 20.99,
    duration: 30,
    isDeleted: false,
    updatedAt: "2022-06-11T03:07:20.813Z",
    revenue: 0,
    numberOfPayment: 0,
    numberOfUser: 0,
    // isBestValue: true,
    // isOpenFreeTrial: true,
    // durationSaleOff: 7,
    // isSaleOff: true,
    // percentSaleOff: 0.2,
    // timeEndSaleOff: "2022-06-11T03:07:20.813Z",
  },
];

export const abilitiesService = [
  {
    _id: "abiblities5",
    name: "Do real FE Exams",
    description: "Allow practice with real FE exams",
    isDefault: true,
  },
  {
    _id: "abiblities6",
    name: "Practice with many topics",
    description: "Allow practice with many questions of many different topics",
    isDefault: true,
  },
  {
    _id: "abiblities7",
    name: "Show statistic of studying process",
    description: "Allows users to view statistics of the learning process",
    isDefault: true,
  },
  {
    _id: "abiblities1",
    name: "Show right answer",
    description:
      "When user access to show result page, user can see right answer which highlighted by green color",
    isDefault: false,
  },
  {
    _id: "abiblities2",
    name: "Show explanation",
    description:
      "When user access to show result page, user can see exaplanation of this question",
    isDefault: false,
  },
  {
    _id: "abiblities3",
    name: "Show statistic of results of each test attemp",
    description:
      "When user access to show result page, the tab named Statistic of result will be appeard and user can see it",
    isDefault: false,
  },
  {
    _id: "abiblities4",
    name: "See next result prediction",
    description:
      'When user access to whatever exam detailed page, "See next result prediction" button will be appeard and user can click on this to show result of prediction',
    isDefault: false,
  },
];