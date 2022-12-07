const { query } = require("express");
const dbObj = require("../db/connect");
const collectionName = "restaurantlist";
let database = null;

dbObj.connect(function (err) {
  if (err) {
    console.log(err);
  }
  database = dbObj.getDb();
});

const controller = {
  // localhost:3500/restaurants/getall?page=1&limit=2
  // this one works
  getAllList: async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = req.query.limit ? parseInt(req.query.limit) : 2;
    const startIndex = (page - 1) * limit; // if page - 1, startIndex = 0
    // if page = 4, startIndex = 3 * 2 = 6
    const endIndex = page * limit; // endIndex = 2 if page =1

    // if count = 7, you will have 4 pages

    const paginationInfo = {};

    const count = await database
      .collection(collectionName)
      .countDocuments({ _id: { $exists: true } });
    // console.log(count); // count = 7

    if (endIndex < count) {
      // 2 < 7
      paginationInfo.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      paginationInfo.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    database
      .collection(collectionName)
      .find()
      .limit(limit)
      .skip(startIndex)
      .toArray((err, result) => {
        if (err) {
          res.status(500).send({ message: "Server side error" });
        } else {
          res.send({
            status: 200,
            message: "Data sent",
            data: result,
            total: count,
            paginationInfo: paginationInfo,
          });
        }
      });
  },

  getDataByLocation: (req, res) => {
    let requestObj = {};
    if (req.query.location) {
      requestObj = {
        location: req.query.location,
      };
    }
    if (req.query.restaurant) {
      requestObj.restaurant_id = req.query.restaurant;
    }

    // localhost:3500/restaurants?location=1
    // localhost:3500/restaurants?restaurant=1
    database
      .collection(collectionName)
      .find(requestObj)
      .toArray((err, result) => {
        if (err) {
          res.status(500).send({ message: "Server side error" });
        } else {
          res.send({ status: 200, message: "Success", data: result });
        }
      });
  },

  myFilter: (req, res) => {
    const bodyParams = req.body; // capturing all the params from request body

    const location = bodyParams.location;
    const cuisine = bodyParams.cuisine;
    const price = bodyParams.price;
    // const hcost = bodyParams.hcost;
    // const lcost = bodyParams.lcost;
    let sort = bodyParams.sort ? bodyParams.sort : 1; // 1 means ascending order & -1 means descending order
    sort = sort === "hl" ? -1 : 1;
    // const page = bodyParams.page ? bodyParams.page : 1; // 1 is default value for page
    // const perPageCount = bodyParams.perPageCount
    //   ? bodyParams.perPageCount
    //   : 5; // number of items per page

    let cuisineIds = [];

    if (cuisine.length > 1) {
      cuisine.forEach((id) => {
        cuisineIds.push(id.toString());
      });
    } else {
      cuisineIds.push(cuisine[0].toString());
    }

    let payload = {
      location: location,
      cuisine: { $in: cuisineIds },
    };

    if (price) {
      if (price === "lcost") {
        payload = {
          ...payload,
          cost: { $lte: 500 },
        };
      }

      if (price === "hcost") {
        payload = {
          ...payload,
          cost: { $gte: 500 },
        };
      }
    }

    console.log(payload);

    database
      .collection(collectionName)
      .find(payload)
      .sort({ cost: sort })
      .toArray((err, result) => {
        if (err) {
          res.status(500).send({ message: "Server side error" });
        } else {
          res.send({ status: 200, message: "Success", data: result });
        }
      });
  },

  // localhost:3500/restaurants/filter?location=2&cuisine=1,2,3,4&cost=hcost&sort=hl
  filter: (req, res) => {
    const queryParams = req.query;
    let payload = {};

    const location = queryParams.location;
    const cuisine = queryParams.cuisine;
    const price = queryParams.cost;
    let sort = queryParams.sort ? queryParams.sort : 1; // 1 means ascending order & -1 means descending order
    sort = sort === "hl" ? -1 : 1;

    if (location) {
      payload = {
        location: location,
      };
    }

    if (cuisine) {
      let cuisineArr = cuisine.split(",");

      payload = {
        ...payload,
        cuisine: { $in: cuisineArr },
      };
    }

    if (price) {
      if (price === "lcost") {
        payload = {
          ...payload,
          cost: { $lte: 500 },
        };
      }

      if (price === "hcost") {
        payload = {
          ...payload,
          cost: { $gte: 500 },
        };
      }
    }

    console.log(payload);

    // page and limit
    // const page = parseInt(req.query.page);
    // const limit = req.query.limit ? parseInt(req.query.limit) : 2;
    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;

    // const paginationInfo = {};

    // const count = await database
    //   .collection(collectionName)
    //   .find(payload)
    //   .count();
    // let countArr = [];
    // for (let i = 1; i <= count; i++) {
    //   countArr.push(i);
    // }
    // let pages;
    // if (count % 2 !== 0) {
    //   pages = Math.floor(count / 2 + 1);
    // } else {
    //   pages = count / 2;
    // }

    // const foo = [];

    // for (let i = 1; i <= pages; i++) {
    //   let temp = [];
    //   let index = i * 2;

    //   temp.push(index - 1);

    //   if (index - 1 !== count) {
    //     temp.push(index);
    //   }

    //   foo.push(temp);
    // }

    // if (endIndex < count) {
    //   paginationInfo.next = {
    //     page: page + 1,
    //     limit: limit,
    //   };
    // }

    // if (startIndex > 0) {
    //   paginationInfo.previous = {
    //     page: page - 1,
    //     limit: limit,
    //   };
    // }

    database
      .collection(collectionName)
      .find(payload)
      // .limit(limit)
      // .skip(startIndex)
      .sort({ cost: sort })
      .toArray((err, result) => {
        if (err) {
          res.status(500).send({ message: "Server side error" });
        } else {
          res.send({
            status: 200,
            message: "Success",
            data: result,
          });
        }
      });
  },
};

module.exports = controller;
