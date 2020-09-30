const faker = require("faker");

const senderClient = (faker) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: {
    country: faker.address.country(),
    state: faker.address.state(),
    city: faker.address.city(),
    phone: faker.phone.phoneNumber(),
  },
  remark: faker.random.words(5),
});

const reciverClient = (faker) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: {
    country: faker.address.country(),
    state: faker.address.state(),
    city: faker.address.city(),
    phone: faker.phone.phoneNumber(),
  },
  remark: faker.random.words(5),
  accountNumber: faker.finance.account(),
  bankName: faker.company.companyName(),
});

const money = (faker) => ({
  currency: {
    currencyName: faker.finance.currencyName(),
    shortName: faker.finance.currencySymbol(),
    country: faker.address.country(),
  },
  amount: faker.finance.amount(),
});

const action = (act, faker) => ({
  actor: {
    firstName: faker.name.firstName(),
  },
  action: act,
  reason: faker.random.word(),
  date: faker.date.recent(),
});

const generate = () => {
  const senderClosed = [];
  const receiverPending = [];

  const config = [
    {
      id: 1,
      isDelivered: true,
      isCanceled: false,
      isEdited: false,
      actions: [
        "DELIVER",
        // "EDIT",
        // "RETURN",
        // "CANCEL",
        // "NOT_DELIVER",
        // "REQUEST",
        // "ALLOW_REQUEST",
        // "REJECT_REQUEST",
      ],
    },
    {
      id: 2,
      isDelivered: true,
      isCanceled: false,
      isEdited: true,
      actions: ["DELIVER", "EDIT", "EDIT"],
    },
    {
      id: 3,
      isDelivered: false,
      isCanceled: true,
      isEdited: true,
      actions: ["CANCEL", "EDIT"],
    },
    {
      id: 4,
      isDelivered: false,
      isCanceled: true,
      isEdited: false,
      actions: ["CANCEL"],
    },
  ];

  const receiverPendingConfig = [
    {
      id: 101,
      isDelivered: false,
      isCanceled: false,
      isEdited: true,
      status: 200,
      actions: ["EDIT", "REQUEST"],
    },
    {
      id: 102,
      isDelivered: false,
      isCanceled: false,
      isEdited: false,
      actions: [],
    },
    {
      id: 103,
      isDelivered: false,
      isCanceled: false,
      isEdited: true,
      actions: ["EDIT"],
    },
    {
      id: 104,
      isDelivered: false,
      isCanceled: false,
      isEdited: false,
      actions: [],
    },
  ];

  for (let con of config) {
    senderClosed.push({
      _id: con.id,
      senderClient: senderClient(faker),
      receiverClient: reciverClient(faker),
      moneyToTransfer: money(faker),
      moneyToPay: money(faker),
      totalPayment: money(faker),
      remark: faker.random.words(5),
      status: 800,
      createdAt: faker.date.recent(),
      senderAgent: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
      receiverAgent: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
      admin: {
        firstName: faker.name.firstName(),
      },
      commissionRate: faker.random.number(50),
      exchangeRate: faker.random.number(50),
      isDelivered: con.isDelivered,
      isCanceled: con.isCanceled,
      isEdited: con.isEdited,
      actions: con.actions.map((a) => action(a, faker)),
    });
  }

  for (let con of receiverPendingConfig) {
    receiverPending.push({
      _id: con.id,
      senderClient: senderClient(faker),
      receiverClient: reciverClient(faker),
      moneyToTransfer: money(faker),
      moneyToPay: money(faker),
      totalPayment: money(faker),
      remark: faker.random.words(5),
      status: con.status || 100,
      createdAt: faker.date.recent(),
      senderAgent: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
      receiverAgent: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
      admin: {
        firstName: faker.name.firstName(),
      },
      commissionRate: faker.random.number(50),
      exchangeRate: faker.random.number(50),
      isDelivered: con.isDelivered,
      isCanceled: con.isCanceled,
      isEdited: con.isEdited,
      actions: con.actions.map((a) => action(a, faker)),
    });
  }

  return { senderClosed, receiverPending };
};

module.exports = generate;
