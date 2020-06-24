/* eslint-disable import/no-commonjs */
const { resolve } = require("path")

const tsNode = require("ts-node")

const path = resolve(__dirname, "./tsconfig.json")

tsNode.register({ project: path })
