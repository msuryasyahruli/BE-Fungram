// const client = require("../config/redis");
// const { response } = require("../helper/common");

// const hitCacheExampleDetail = async (req, res, next) => {
//   const idExample = req.params.id;
//   const example = await client.get(`examples/${idExample}`);
//   if (example) {
//     return response(
//       res,
//       JSON.parse(example),
//       200,
//       "get data success from redis"
//     );
//   }
//   next();
// };

// const clearCacheExampleDetail = (req, res, next) => {
//   const idExample = req.params.id;
//   client.del(`examples/${idExample}`);
//   next();
// };

// module.exports = { hitCacheExampleDetail, clearCacheExampleDetail };
