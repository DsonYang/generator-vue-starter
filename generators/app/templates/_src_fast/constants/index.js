/*
  This stores the Constants which will be exposed to global environment as "Constants"(The name "Constants" can be changed in config/webpack.config.common.js).
  So you can use it everywhere without importing anything

  eg.
  //in this file
  export const FOO = 1
  export const BAR = 2
  //the you can use them in every component
  console.log(Constants.FOO,Constants.FOO)
 */
export const API_STATUS = {
	OK:0
}
export const APIS = {
	GET_BINGO:`/some/api1/get/bingo`
}