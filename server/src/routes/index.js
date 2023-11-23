/* express config */
const express = require("express");
const router = express.Router();
// const {Router} = require('express')

const { getAllCategoriesHandlers } = require('../handlers/getAllCategoriesHandlers');











router.get('/allCategories', getAllCategoriesHandlers)




























module.exports = {
    router
}







